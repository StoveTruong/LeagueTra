import asyncio
import aiohttp

from config import API_KEY
from flask import Flask, flash, redirect, render_template, request, session
# from flask_session import Session
from functions import getPuuid, getMatchList, getMatchDetails, getSummonerDetails

app = Flask(__name__, template_folder= 'htmlpagetesting')

# app.config["SESSION_PERMANENT"] = False
# app.config["SESSION_TYPE"] = "filesystem"
# Session(app)
listOfErrors = [400, 401, 403, 404, 405, 500, 502, 503, 504]


#Testing
@app.route("/homepage", methods=["GET", "POST"])
def homepage():
    jsonfileexample = '''{
  "puuid": "J1sloKTsCpwuJ8bUfLnd6R9Urd28m9zpiPBQchjLXKcgImOINR7DTEoktx3oFGICFzzUgt5yUtCL9g",
  "gameName": "Steben",
  "tagLine": "Hehe"
}'''
    
    return jsonfileexample

# user_profile = {
#     "profiledata": {
#         "puuid": "",
#         "gameName": "",
#         "tagLine": "",
#         "server": ""
#     },
#     "matchHistory": {
        
#     }
# }
# #Split the API calls into these parts...
# #userID call
# #summonerIcon call
# #matchList call
# #specificMatch call

# @app.route("/", methods=["GET", "POST"])
# def profile():
#     """Profile search"""
#     if request.method == "POST":
#         #Get the user's info look up
#         gameName = request.form.get("gameName")
#         tagLine = request.form.get("tagLine")
#         server = request.form.get("server")
        
        
#         #Work on possible test cases:
#         if not gameName:
#             return errors("must provide game name", 400)
#         elif not tagLine:
#             return errors("must provide tagline", 400)
        
        
#         #API calls
#         puuid_result = puuidsearch(gameName, tagLine)
#         #Check to see if account exists
#         if puuid_result == 403:
#             return errors("Does not exist", 403)
        
#         puuid = puuid_result["puuid"]
#         user_profile["profiledata"]["puuid"] = puuid
#         user_profile["profiledata"]["gameName"] = gameName
#         user_profile["profiledata"]["tagLine"] = tagLine
#         user_profile["profiledata"]["server"] = server

#         #Get a list of match id & get details of specific match then append to json
#         matchHistory_result = matchhistory(server, puuid)
#         for match_id in matchHistory_result:
#             match_details = specific_match(server, match_id)
          
#             match_data = {
#                 "metaData": [],
#                 "userGameData": [],
#                 "otherPlayers": []
#             }
            
#             #Total seconds in the game
#             gameDuration = match_details["info"]["gameDuration"]
#             minutes = gameDuration // 60
#             seconds = gameDuration % 60
            
#             match_data["metaData"].append(minutes)
#             match_data["metaData"].append(seconds)
#             match_data["metaData"].append(match_details["info"]["gameEndTimestamp"])
            
#             for player in match_details["info"]["participants"]:
#                 if player["puuid"] == puuid:
#                     match_data["userGameData"].append(player["championName"])
#                     match_data["userGameData"].append(player["teamId"])
#                     match_data["userGameData"].append(player["item0"])
#                 else:
#                     match_data["otherPlayers"].append(player["championName"])
#                     match_data["otherPlayers"].append(player["riotIdGameName"])
#                     match_data["otherPlayers"].append(player["teamId"])
            
#             user_profile["matchHistory"][str(match_id)] = match_data
#             #Do datadragon calls here 

#         return render_template("homepage.html", puuid_result=puuid_result, user_profile=user_profile), 200
    
#     else:
#         return render_template("search.html")
    

# user_profile = {
#     "profiledata": {
#         "puuid": "",
#         "gameName": "",
#         "tagLine": "",
#         "server": ""
#     }
# } 

# Gave the endpoint a name because having a blank endpoint is asking it to get called on whenever we load in
@app.route("/getFullInfo", methods=["GET"])
async def run():
    # if request.method == "GET":
    gameName = request.args.get("gameName")
    tagLine = request.args.get("tagLine")
    server = request.args.get("server")

    # Commented this out because this was relying on the search.html from the backend
    # No need to render html from backend, defeats purpose of frontend at that rate
    # gameName = request.form.get("gameName")
    # tagLine = request.form.get("tagLine")
    # server = request.form.get("server")

    PlayerProfile = getPuuid(gameName, tagLine)

    # We send the PlayerProfile to frontend because it contains the error status code and the message
    # Let the frontend process the error and display the appropriate page
    if(PlayerProfile["status"]["status_code"] in listOfErrors):
        return (PlayerProfile)

    MatchIds = getMatchList(server, PlayerProfile["puuid"])
    if(MatchIds["status"]["status_code"] in listOfErrors):
        return (MatchIds)
    
    #Does the async call concurrently
    async with aiohttp.ClientSession() as session:
        
        tasks = [getMatchDetails(session, server, match_id) for match_id in match_ids['arrayOfIds']]
        results = await asyncio.gather(*tasks)
        
    return (results)
    
    # If we are relying on frontend for UI, no need to render an html page if it's not an HTTP Request
    # else:
    #     return render_template("search.html")
            


if __name__ == "__main__":
    app.run(debug=True)

    
#Dont do redirects let react handle it. We can use it for now. Will remove html pages testing  for react 


#Todo (steve):
#Confirm python can take specific 