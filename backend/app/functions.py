import requests
import datetime


from flask import Flask, request, redirect, render_template, session
from functools import wraps
from config import API_KEY



#Base url
base_server_urls = {
    "na" : "https://na1.api.riotgames.com/lol/",
    "euw" :"https://euw1.api.riotgames.com/lol/",
    "eun" : "https://eun1.api.riotgames.com/lol/",
    "oc" : "https://oc.api.riotgames.com/lol/",
    "kr" : "https://kr.api.riotgames.com/lol/",
    "jp" : "https://jp1.api.riotgames.com/lol/",
    "sg" : "https://sg2.api.riotgames.com/lol/"
}
    

def errors(message, code=400):
    def escape(s):
        """
        Render error messages to users
        """
        
        for old, new in [("-", "--"), (" ", "-"), ("_", "__"), ("?", "~q"),
                        ("%", "~p"), ("#", "~h"), ("/", "~s"), ("\"", "''")]:
            s = s.replace(old, new)
        return s
    return render_template("apology.html", top=code, bottom=escape(message)), code

def get_server_url(server):
    if server in base_server_urls:
        return base_server_urls[server]
    else:
        return None

def region_section(region):
    if request.get.form(region) == 'na':
        return 'america'
    elif request.get.form(region) == 'eun' or 'euw':
        return 'europe'
    elif request.get.form(region) == 'kr' or 'jp' or 'oc':
        return 'asia'


# May not need this because all data is being render at the same time.
# def username_required(f):
#     """
#     Decorate routes to require username to access features
    
#     https://flask.palletsprojects.com/en/3.0.x/patterns/viewdecorators/
#     """
#     @wraps(f)
#     def decorated_function(*args, **kwargs):
#         if session.get("username") is None:
#             return redirect ("/lookup")
#         return f(*args, **kwargs)
#     return decorated_function

def puuidsearch(gameName, tagLine):
    #API authentication 
    api_key = API_KEY
    header = {"X-Riot-Token" : api_key}
    
    #HTTP GET
    url = f'https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/{gameName}/{tagLine}'
    
    #Reponse from server
    response = request.get(url, header=header)
    
    #Success
    if response.status_code == 200:
        #Need to adjust so that it returns
        data = response.json() 
        return data
    
    #Fail or I can return the error code
    else:
        return errors(f'Error: {response.status_code}')
    
    
def matchhistory(region, puuid):
    api_key = API_KEY
    header = {"X-Riot-Token" : api_key}
    selected_region = region_section(region)
    
    #Needs to be adjusted for different regions
    url = "https://{selected_region}.api.riotgames.com/lol/match/v5/matches/by-puuid/{puuid}/ids?type=ranked&start=0&count=20"
    
    response = (url, header)
    data = response.json
    
    if response.status_code == 200:
        return data
    else:
        if data["status"]["message"]:
            return errors(data["status"]["message"], response.status_code)
        else:
            return errors("Error", response.status_code)


def specificmatch(matchId):
    api_key = API_KEY
    header = {"X-Riot-Token" : api_key}
    selected_region = region_section(region)
    
    #Needs to be adjusted for different regions
    url = "https://{selected_region}.api.riotgames.com/lol/match/v5/matches/{matchId}"
    
    response = (url, header)
    data = response.json
    
    if response.status_code == 200:
        return data
    else:
        if data["status"]["message"]:
            return errors(data["status"]["message"], response.status_code)
        else:
            return errors("Error", response.status_code)
    
    
    
    
    
    
    
    
    
    
    
    
    

# def summoner_call(region, summoner_username):
    
#     #API authentication 
#     api_key = API_KEY
#     header = {"X-Riot-Token" : API_KEY}
    
#     #HTTP GET
#     url = get_region_url(region)
#     endpoint = f'{url}/summoner/v4/summoners/by-name/{summoner_username}'
    
#     #Reponse from server
#     response = (url, header)
#     data = response.json
    
#     #Success
#     if response.status_code == 200:
#         #Need to adjust so that it returns 
#         return data
    
#     #Fail or I can return the error code
#     else:
#         return errors(f'', response.status_code)