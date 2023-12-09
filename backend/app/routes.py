from config import API_KEY
from flask import Flask

app = Flask(__name__)

def league_api():
    api_key = API_KEY
    header = {}
    
    
@app.route("/homepage")
def homepage():
    return {"testing1": ["value1", "value2", "value3"]}

if __name__ == "__main__":
    app.run(debug=True)