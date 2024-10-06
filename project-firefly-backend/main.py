# Imports

# Backend
from flask import Flask, Response
# CV
from ultralytics import YOLO
import cv2
# time
from time import time, sleep
# json
from json import load

# Flask
app = Flask(__name__)


# NOT USING FOR NOW, BANDWIDTH NOT GOOD ENOUGH FOR STREAMING
def generate_frames(stream_url):
    model = YOLO('models/epoch_100.pt')
    capture = cv2.VideoCapture(stream_url)

    while capture.isOpened():
        # Read frames from video capture
        success, frame = capture.read()

        if success:
            results = model(frame, stream=True)

            for result in results:
                boxes = result.boxes
                for box in boxes:
                    x1, y1, x2, y2 = box.xyxy[0]
                    x1, y1, x2, y2 = int(x1), int(y1), int(x2), int(y2)

                    cv2.rectangle(frame, (x1, y1), (x2, y2), (255, 0, 0), 2)
                    cv2.putText(frame, 'Fire', (x1, y1), cv2.FONT_HERSHEY_SIMPLEX, 1.5, (255, 0, 0), 1)

            # Encoding frame into JPEG
            ret, buffer = cv2.imencode('.jpg', frame)
            frame = buffer.tobytes()

            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')
        else:
            raise ValueError("Frame not successfully read.")


def get_rtmp_link(key="justin"):
    with open('keys.json', 'r') as keys:
        data = load(keys)

    return data[key]


# Initiate listening on RTMP Nginx server
def initialize_data(stream_url, debug=False):
    # Initialize YOLO model:
    model = YOLO('models/epoch_100.pt')

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
            results = model(video_frame, stream=True)

            # Results from the YOLO algorithm
            for result in results:
                # Highlighted items from YOLO
                boxes = result.boxes
                for box in boxes:
                    x1, y1, x2, y2 = box.xyxy[0]  # x1, y1, x2, y2 represent the positional data of the corners
                    x1, y1, x2, y2 = int(x1), int(y1), int(x2), int(y2)

                    # Handling boxes for debug live stream
                    if debug:
                        last_box_time = time()
                        last_pos = [(x1, y1), (x2, y2)]

                    # TODO: Add logic/function to send data to frontend, maybe keep track of some data and let client
                    # request it

        # Create a new box at the last recorded position instead of clearing immediately. We do this for visual
        # debugging purposes
        if debug and last_pos and (time() - last_box_time) < box_duration:
            cv2.rectangle(video_frame, last_pos[0], last_pos[1], (255, 0, 0), 2)  # Draw the rectangle
            cv2.putText(video_frame, 'Fire', last_pos[0], cv2.FONT_HERSHEY_SIMPLEX, 2, (255, 0, 0), 1)

        # Let user close preview window on debug
        if debug:
            key = cv2.waitKey(1)
            if key & 0xFF == ord('q'):
                raise KeyboardInterrupt("User stopped program in debug mode.")

        if success:
            cv2.imshow('DEBUG: Video Frame', video_frame)
        else:
            raise ValueError("Frame not successfully read.")


# Endpoints
@app.route('/')
def home():
    return "<p>Firefly Backend - Made with love and redbull by Justin Abuyuan :)</p>"


@app.route("/fire-feed")
def video_feed():
    print("Showing video feed:")
    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')


if __name__ == '__main__':
    # Stream data
    url = get_rtmp_link(key="webcam")

    # Initializing OpenCV with drone footage, video only shows on debug mode
    initialize_data(stream_url=url, debug=False)
    app.run(debug=True)
