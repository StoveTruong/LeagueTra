from config import API_KEY
from flask import Flask, flash, redirect, render_template, request, session
from flask_session import Session
from functions import errors, puuidsearch, matchhistory, specific_match

app = Flask(__name__, template_folder= 'htmlpagetesting')

app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)


#Testing
@app.route("/homepage", methods=["GET", "POST"])
def homepage():
    jsonfileexample = '''{
  "puuid": "J1sloKTsCpwuJ8bUfLnd6R9Urd28m9zpiPBQchjLXKcgImOINR7DTEoktx3oFGICFzzUgt5yUtCL9g",
  "gameName": "Steben",
  "tagLine": "Hehe"
}'''
    
    return jsonfileexample


@app.route("/", methods=["GET", "POST"])
def profile():
    """Profile search"""
    if request.method == "POST":
        gameName = request.form.get("gameName")
        tagLine = request.form.get("tagLine")
        server = request.form.get("server")
        
        session['server'] = server
        
        #Work on possible test cases:
        if not gameName:
            return errors("must provide game name", 400)
        elif not tagLine:
            return errors("must provide tagline", 400)
        
        puuid_result = puuidsearch(gameName, tagLine)
        puuid = puuid_result["puuid"]
        print(puuid)
        
        matchhistory_result = matchhistory(server, puuid)
        mh_result = matchhistory(server, puuid)

        return render_template("homepage.html", puuid_result=puuid_result, matchhistory_result=matchhistory_result), 200
    
    else:
        return render_template("search.html")


@app.route("/match/{match_id}", methods=["GET, POST"])
def match():
    if request.method == "POST":
        matchid = request.form.get("matchid")
        server = session['server']
        
        
        data = specific_match(server, matchid)
    return render_template("match.html", data=data)
    


if __name__ == "__main__":
    app.run(debug=True)

    
#Dont do redirects let react handle it. We can use it for now. Will remove html pages testing  for react 