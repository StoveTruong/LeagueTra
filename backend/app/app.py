from config import API_KEY
from flask import Flask, session

app = Flask(__name__)

    
    
@app.route("/homepage")
def homepage():
    
    return {"testing1": ["value1", "value2", "value3"]}

if __name__ == "__main__":
    app.run(debug=True)