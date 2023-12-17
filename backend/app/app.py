from config import API_KEY
from flask import Flask, flash, redirect, render_template, request, session
from functions import errors, username_required, profile

app = Flask(__name__)


#Testing
@app.route("/homepage")
def homepage():
    
    return {"testing1": ["value1", "value2", "value3"]}


@app.route("/")
def search():
    """Profile search"""
    session.clear()

    if request.method == "POST":
        
        gameName = request.form.get("username")
        tagLine = request.form.get("tagline")
        
        if gameName:
            return errors("must provide game name", 403)
        elif tagLine:
            return errors("must provide tagline", 403)
        
        puuid = profile(gameName, tagLine)
        
        session[puuid] = puuid
        
        return redirect("/", ), 200
    else:
        return render_template("search-page.html"), 200
    
    
@app.route("/matchhistory")
@username_required
def matchhistory():
    if request.method == "GET":
        puuidMH = session.get("puuid")
        
        
        


if __name__ == "__main__":
    app.run(debug=True)