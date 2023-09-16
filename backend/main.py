from flask import Flask, request

app = Flask(__name__)

@app.after_request
def add_header(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    return response


@app.route("/")
def index():
    return {"hello": "world"}

@app.route("/getUserLinks")
def getUserLinks():
    return ["link1", "link2"]

@app.route("/setUserLinks")
def setUserLinks():
    email = request.headers.get("email", None)
    return {"success": True}

@app.route("getUserPersonalization")
def getUserPersonalization():
    return {"success": False}

@app.route("setUserPersonalization")
def setUserPersonalization():
    return {"success": False}

if __name__ == "__main__":
    app.run(debug=True, port=5000)