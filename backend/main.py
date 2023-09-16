from flask import Flask

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
    print("asd")
    return ["link1", "link2"]

if __name__ == "__main__":
    app.run(debug=True, port=5000)