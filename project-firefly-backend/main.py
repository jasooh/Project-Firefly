from flask import Flask, Response

import cv2

# Stream data
stream_url = "rtmp://172.20.10.10:1935/live"  # TODO: Put this in a gitignore


def generate_frames():
    cap = cv2.VideoCapture(stream_url)
    while cap.isOpened():
        success, frame = cap.read()
        if not success:
            raise ValueError("Frame not successfully read.")

        # Encoding frame into JPEG
        ret, buffer = cv2.imencode('.jpg', frame)
        frame = buffer.tobytes()

        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')


# Flask
app = Flask(__name__)


# Endpoints
@app.route("/fire-feed")
def video_feed():
    print("Showing video feed:")
    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')


if __name__ == '__main__':
    app.run(debug=True)