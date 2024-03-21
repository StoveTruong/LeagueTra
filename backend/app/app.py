import asyncio
import aiohttp

from config import API_KEY
from flask import Flask, flash, redirect, render_template, request, session, url_for
# from flask_session import Session
from functions import getPuuid, getMatchList, getMatchDetails, getSummonerDetails

app = Flask(__name__, template_folder= 'htmlpagetesting')

# app.config["SESSION_PERMANENT"] = False
# app.config["SESSION_TYPE"] = "filesystem"
# Session(app)

@app.route("/getFullInfo/<gameName>/<tagLine>/<server>")
async def index(gameName, tagLine, server):
    # print(gameName)
    # print(tagLine)
    # print(server)
    
    profile_info = getPuuid(gameName, tagLine)
    
    print(profile_info)
    match_ids = getMatchList(server, profile_info["puuid"])
    
    #Does the async call concurrently
    async with aiohttp.ClientSession() as session:
        
        tasks = [getMatchDetails(session, server, match_id, profile_info["puuid"]) for match_id in match_ids]
        results = await asyncio.gather(*tasks)
        
    return (results)

# Just for flask backend testing


@app.route("/", methods=["GET", "POST"])
def search():
    if request.method == "POST":
        gameName = request.form.get("gameName")
        tagLine = request.form.get("tagLine")
        server = request.form.get("server")
    
        # gameName = request.args.get("gameName")
        # tagLine = request.args.get("tagLine")
        # server = request.args.get("server")
        
        return redirect(url_for('index', gameName=gameName, tagLine=tagLine, server=server))
    return render_template("search.html")
            

if __name__ == "__main__":
    app.run(debug=True)

    
#Dont do redirects let react handle it. We can use it for now. Will remove html pages testing  for react 


#Todo (steve):
#Confirm python can take specific 