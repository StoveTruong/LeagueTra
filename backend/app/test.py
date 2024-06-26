user_profile = {
    "profiledata": {
        "puuid": "", # P-hjrqUHT4RVHAb2yet2EUAN_eNzvNtXjLfM3VxplKXMd40GC-X6SAlfHr7Tzv1nBBstH_VuinXDYQ
        "gameName": "", # cuc cho
        "tagLine": "", # 6974
        "server": "" # na
    },
    "matchHistory": {
        
    }
}
#Split the API calls into these parts...
#userID call
#summonerIcon call
#matchList call
#specificMatch call

@app.route("/", methods=["GET", "POST"])
def profile():
    """Profile search"""
    if request.method == "POST":
        #Get the user's info look up
        gameName = request.form.get("gameName")
        tagLine = request.form.get("tagLine")
        server = request.form.get("server")
        
        
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
          
            match_data = {
                "metaData": [],
                "userGameData": [],
                "otherPlayers": []
            }
            
            #Total seconds in the game
            gameDuration = match_details["info"]["gameDuration"]
            minutes = gameDuration // 60
            seconds = gameDuration % 60
            
            match_data["metaData"].append(minutes)
            match_data["metaData"].append(seconds)
            match_data["metaData"].append(match_details["info"]["gameEndTimestamp"])
            
            for player in match_details["info"]["participants"]:
                if player["puuid"] == puuid:
                    match_data["userGameData"].append(player["championName"])
                    match_data["userGameData"].append(player["teamId"])
                    match_data["userGameData"].append(player["item0"])
                else:
                    match_data["otherPlayers"].append(player["championName"])
                    match_data["otherPlayers"].append(player["riotIdGameName"])
                    match_data["otherPlayers"].append(player["teamId"])
            
            user_profile["matchHistory"][str(match_id)] = match_data
            #Do datadragon calls here 

        return render_template("homepage.html", puuid_result=puuid_result, user_profile=user_profile), 200
    
    else:
        return render_template("search.html")
    

user_profile = {
    "profiledata": {
        "puuid": "",
        "gameName": "",
        "tagLine": "",
        "server": ""
    }
} 