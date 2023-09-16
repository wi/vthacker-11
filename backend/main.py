import requests
import io
from icalendar import Calendar
from flask import Flask, request
from flask_cors import CORS
from datetime import datetime, timedelta


app = Flask(__name__)

CORS(app, origins=["*"])


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

@app.route("/getUserPersonalization")
def getUserPersonalization():
    return {"success": False}

@app.route("/setUserPersonalization")
def setUserPersonalization():
    return {"success": False}

@app.route("/getAssignments")
def getAssignments():
    # Retrieve the 'urls' header and split it into a list
    urls = request.headers.get("urls", "").split(',')
    
    if not urls:
        return {"error": "No URLs provided"}, 400

    results = []
    for url in urls:
        url = url.strip()
        if not url.endswith("ics"):
            continue
        try:
            response = requests.get(url)
            with io.BytesIO(response.content) as f:
                # Read the contents of the file.
                file_contents = f.read()
                cal = Calendar.from_ical(file_contents)
                for component in cal.walk():
                    if component.name == "VEVENT":
                        startdt = component.get("dtstart", None)
                        enddt = component.get('dtend', None)
                        if not enddt or not startdt:
                            continue
                        startdt = startdt.dt
                        enddt = enddt.dt
                        now = datetime.now()
                        future_max = now + timedelta(days=14)
                        # If the event ended skip it
                        if enddt.timestamp() < now.timestamp():
                            continue
                        # More then 2 weeks in the future skip it
                        elif startdt.timestamp() > future_max.timestamp():
                            continue
                        print(component.keys())
                        desc = component.get("description")
                        zoom = False
                        if "zoom" in component.get("location", ""):
                            zoom = True

                        results.append({"summary": component.get("summary"), "start": startdt.timestamp(), "end": enddt.timestamp(), "zoom": zoom })

        except requests.RequestException as e:
            raise e

    return {"success": True, "events": sorted(results, key=lambda x: x['end'])}, 200


if __name__ == "__main__":
    app.run(debug=True, port=5000)