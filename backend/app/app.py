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

user_profile = {
    "profiledata": {
        "puuid":"",
        "gameName": "",
        "tagLine": "",
        "server": "",
        "matchHistory": {
        }
    }
}

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
        
        
        #API calls
        puuid_result = puuidsearch(gameName, tagLine)
        #Check to see if account exists
        if puuid_result == 403:
            return errors("Does not exist", 403)
        
        puuid = puuid_result["puuid"]
        user_profile["profiledata"]["puuid"] = puuid
        user_profile["profiledata"]["gameName"] = gameName
        user_profile["profiledata"]["tagLine"] = tagLine
        user_profile["profiledata"]["server"] = server

        #Get a list of match id & get details of specific match then append to json
        matchHistory_result = matchhistory(server, puuid)
        for match_id in matchHistory_result:
            match_details = specific_match(server, match_id)
            for player in match_details["metadata"]["participants"]:
                if player == puuid:
                    return player
                    break
                else:
                    return errors("Riot API error", 404)
            
            user_profile["profiledata"]["matchHistory"][match_id] = match_details

        return render_template("homepage.html", puuid_result=puuid_result, user_profile=user_profile), 200
    
    else:
        return render_template("search.html")





if __name__ == "__main__":
    app.run(debug=True)

    
#Dont do redirects let react handle it. We can use it for now. Will remove html pages testing  for react 