from config import API_KEY
from flask import Flask, flash, redirect, render_template, request, session
from functions import errors

app = Flask(__name__)

    
#Testing
@app.route("/homepage")
def homepage():
    
    return {"testing1": ["value1", "value2", "value3"]}


@app.route("/")
def search():
    
    session.clear()
    
    if request.method == "POST":
        """
        Get summoner profile
        """
        
        username = request.form.get("username")
        tagline = request.form.get("tagline")
        
        
                
        #Getting session need to finish all the test cases:
        #session["userprofile"] == request.get["username"] + '' + ["tagline"]
    else:
        return render_template("search-page.html"), 200


if __name__ == "__main__":
    app.run(debug=True)