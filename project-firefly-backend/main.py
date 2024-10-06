# Imports

# Backend
from flask import Flask, Response, jsonify, request
from flask_cors import CORS
# CV
from ultralytics import YOLO
import cv2
# time
from time import time, sleep
# json
from json import load
import threading

# Flask
app = Flask(__name__)
CORS(app)

# Backend variables
# TODO: given the time, these would have been stored in a database (ex. aws s3/ddb)
fire_count = 0
x_coordinate = 0
y_coordinate = 0
reported_temperature = 0


def get_fire_data():
    return jsonify({
        "fires_spotted": fire_count,
        "x_coordinate": x_coordinate,
        "y_coordinate": y_coordinate,
        "temp": reported_temperature}
    )


def generate_frames(stream_url):
    # Initialize YOLO model:
    model = YOLO('models/epoch_300.pt')

    # Initialize OpenCV VideoCapture, this retrieves frame data from live stream
    capture = cv2.VideoCapture(stream_url)
    if not capture.isOpened():
        for retry_count in range(1, 4):
            print(f"(Attempt #{retry_count}): Video not opened, retrying in 5 seconds...")
            sleep(5)
            capture = cv2.VideoCapture(stream_url)
            if not capture.isOpened() and retry_count >= 3:
                raise ValueError("Video stream was not found.")

    print("Video successfully opened, proceeding...")

    # Loop tracking
    loop_count = 0  # We keep track of the capture loop to control when we want to process the live stream data
    check_every = 5  # We process the data every x iterations

    # OpenCV box tracking
    box_duration = 3  # How long the debug boxes stay on the debug live stream
    last_box_time = 0  # Timestamp of when the last box was placed
    last_pos = None  # Positional data of the last box placed
    while capture.isOpened():
        loop_count += 1
        success, video_frame = capture.read()

        # Processing data using OpenCV
        if loop_count % check_every == 0:
            results = model(video_frame, stream=True, conf=0.75)

            # Results from the YOLO algorithm
            for result in results:
                # Highlighted items from YOLO
                boxes = result.boxes
                for box in boxes:
                    x1, y1, x2, y2 = box.xyxy[0]  # x1, y1, x2, y2 represent the positional data of the corners
                    x1, y1, x2, y2 = int(x1), int(y1), int(x2), int(y2)
                    # Handling boxes for debug live stream

                    last_box_time = time()
                    last_pos = [(x1, y1), (x2, y2)]

                    if last_pos and (time() - last_box_time) < box_duration:
                        cv2.rectangle(video_frame, last_pos[0], last_pos[1], (255, 0, 0), 2)  # Draw the rectangle
                        cv2.putText(video_frame, 'Fire', last_pos[0], cv2.FONT_HERSHEY_SIMPLEX, 2, (255, 0, 0), 1)

                # Encoding frame into JPEG
                ret, buffer = cv2.imencode('.jpg', video_frame)
                video_frame = buffer.tobytes()

                yield (b'--frame\r\n'
                       b'Content-Type: image/jpeg\r\n\r\n' + video_frame + b'\r\n')


def get_rtmp_link(key="justin"):
    with open('keys.json', 'r') as keys:
        data = load(keys)

    return data[key]


# Initiate listening on RTMP Nginx server
def initialize_data(stream_url, debug=False, live_streaming=False):
    # Initialize YOLO model:
    global fire_count
    model = YOLO('models/epoch_300.pt')

    # Initialize OpenCV VideoCapture, this retrieves frame data from live stream
    capture = cv2.VideoCapture(stream_url)
    if not capture.isOpened():
        for retry_count in range(1, 4):
            print(f"(Attempt #{retry_count}): Video not opened, retrying in 5 seconds...")
            sleep(5)
            capture = cv2.VideoCapture(stream_url)
            if not capture.isOpened() and retry_count >= 3:
                raise ValueError("Video stream was not found.")

    print("Video successfully opened, proceeding...")

    # Loop tracking
    loop_count = 0  # We keep track of the capture loop to control when we want to process the live stream data
    check_every = 5  # We process the data every x iterations

    # OpenCV box tracking
    box_duration = 3  # How long the debug boxes stay on the debug live stream
    last_box_time = 0  # Timestamp of when the last box was placed
    last_pos = None  # Positional data of the last box placed
    while capture.isOpened():
        loop_count += 1
        success, video_frame = capture.read()

        # Processing data using OpenCV
        if loop_count % check_every == 0:
            results = model(video_frame, stream=True, conf=0.75)

            # Results from the YOLO algorithm
            for result in results:
                # Highlighted items from YOLO
                boxes = result.boxes
                for box in boxes:
                    x1, y1, x2, y2 = box.xyxy[0]  # x1, y1, x2, y2 represent the positional data of the corners
                    x1, y1, x2, y2 = int(x1), int(y1), int(x2), int(y2)
                    fire_count += 1
                    # Handling boxes for debug live stream
                    if debug:
                        last_box_time = time()
                        last_pos = [(x1, y1), (x2, y2)]
                        print("Confidence: ", box.conf[0].item())
                        print("----- ! -----\nFIRE\n----- ! -----")

        # Create a new box at the last recorded position instead of clearing immediately. We do this for visual
        # debugging purposes
        if last_pos and (time() - last_box_time) < box_duration:
            cv2.rectangle(video_frame, last_pos[0], last_pos[1], (255, 0, 0), 2)  # Draw the rectangle
            cv2.putText(video_frame, 'Fire', last_pos[0], cv2.FONT_HERSHEY_SIMPLEX, 2, (255, 0, 0), 1)

        # Let user close preview window on debug
        if debug:
            key = cv2.waitKey(1)
            if key & 0xFF == ord('q'):
                raise KeyboardInterrupt("User stopped program in debug mode.")

        if success and debug:
            cv2.imshow('DEBUG: Video Frame', video_frame)
        else:
            pass


# Endpoints

# Home page
@app.route('/')
def home():
    return "<p>Firefly Backend - Made with ❤️ and RedBull by Justin Abuyuan at HTV 9 :) (06/08/2024)</p>"


# Arduino data endpoint
@app.route('/arduino-data', methods=['GET'])
def data():
    try:
        data = request.get_json()
        temperature = data.get('tempC')
        x_coordinate = data.get('xcoord')
        y_coordinate = data.get('ycoord')

        return jsonify({
            "message": "Data saved.",
            "temperature": temperature,
            "x_coordinate": x_coordinate,
            "y_coordinate": y_coordinate
        }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400


# Fire data endpoint - frontend fetches this endpoint for data
@app.route('/fire-data', methods=['GET'])
def fire_data():
    return get_fire_data(), 200


# Fire feed endpoint - frontend uses this to render a livestream of the drone
@app.route("/fire-feed")
def video_feed():
    print("Showing video feed:")
    return Response(generate_frames(stream_url=get_rtmp_link(key="justin")),
                    mimetype='multipart/x-mixed-replace; boundary=frame')


# Main execution
if __name__ == '__main__':
    # Stream data
    url = get_rtmp_link(key="justin")

    # Setting up Flask server
    server_thread = threading.Thread(target=app.run, kwargs={'host': '0.0.0.0', 'port': 5000})
    server_thread.start()

    # Initializing OpenCV with drone footage, video only shows on debug mode
    initialize_data(url, debug=False)
