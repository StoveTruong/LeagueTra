from config import API_KEY
from flask import Flask, flash, redirect, render_template, request, session
from functions import errors

app = Flask(__name__)

    
    
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
        #Test for all possible cases:
        #
        if not request.form.get("username"):
            return errors("must provide username", 403)
        else:
            if not request.form.get("tagline"):
                return placeholderremoveplease()
                #If summonername exist:
                    #return profile
                
                
        #Getting session need to finish all the test cases:
        #session["userprofile"] == request.get["username"] + '' + ["tagline"]
    else:
        return render_template("search-page.html"), 200


if __name__ == "__main__":
    app.run(debug=True)