from config import API_KEY
from flask import Flask, flash, redirect, render_template, request, session
from functions import errors, puuidsearch, matchhistory

app = Flask(__name__, template_folder= 'htmlpagetesting')


#Testing
@app.route("/homepage", methods=["GET", "POST"])
def homepage():
    jsonfileexample = '''{
  "puuid": "J1sloKTsCpwuJ8bUfLnd6R9Urd28m9zpiPBQchjLXKcgImOINR7DTEoktx3oFGICFzzUgt5yUtCL9g",
  "gameName": "Steben",
  "tagLine": "Hehe"
}'''
    
    return jsonfileexample


@app.route("/search", methods=["GET", "POST"])
def profile():
    """Profile search"""
    if request.method == "POST":
        
        gameName = request.form.get("gameName")
        tagLine = request.form.get("tagLine")
        server = request.form.get("server")
        
        if not gameName:
            return errors("must provide game name", 400)
        elif not tagLine:
            return errors("must provide tagline", 400)
        
        puuid = puuidsearch(gameName, tagLine)
        
        # session[puuid] = puuid
        # session[server] = server
        
        data_mh = matchhistory(server, puuid)
        # data_champ = championstats(puuid)
        # data_rank = rank(puuid)
        
        #data_champ = data_champ, data_rank = data_rank
        
        return render_template("homepage.html", data_mh=data_mh), 200
    else:
        return render_template("search.html")


if __name__ == "__main__":
    app.run(debug=True)
    
#Dont do redirects let react handle it.