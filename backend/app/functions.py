import requests
import datetime
import asyncio
import aiohttp

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
    

def errors(message, code=400): #Try to improve it/
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

def region_section(server):
    if server == 'na':
        return 'americas'
    elif server == 'eun' or server =='euw':
        return 'europe'
    elif server == 'kr' or server =='jp' or server == 'oc':
        return 'asia'
    elif server =='sg':
        return 'sea'


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

def getPuuid(gameName, tagLine):
    #API authentication 
    api_key = API_KEY
    headers = {"X-Riot-Token" : api_key}
    
    #HTTP GET
    url = f'https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/{gameName}/{tagLine}'
    #Reponse from server
    response = requests.get(url, headers=headers)
    
    #Success
    if response.status_code == 200:
        #Need to adjust so that it returns
        data = response.json() 
        return data
    
    #Fail or I can return the error code
    else:
        return errors(f'Error: {response.status_code}')
    
    
def getMatchList(server, puuid):
    api_key = API_KEY
    headers = {"X-Riot-Token" : api_key}
    selected_region = region_section(server)
    
    url = f"https://{selected_region}.api.riotgames.com/lol/match/v5/matches/by-puuid/{puuid}/ids?start=0&count=20"
    response = requests.get(url, headers=headers)
    
    if response.status_code == 200:
        return response.json()
    else:
        data = response.json()
        if 'status' in data:
            return errors(data["status"]["message"], response.status_code)
        else:
            return errors("Error", response.status_code)


async def getMatchDetails(session, server, matchid):
    api_key = API_KEY
    headers = {"X-Riot-Token" : api_key}
    selected_region = region_section(server)
    
    url = f"https://{selected_region}.api.riotgames.com/lol/match/v5/matches/{matchid}"
    
    
    async with session.get(url, headers=headers) as response:
        if response.status_code == 200:
            return response.json()
        else:
            data = response.json()
            if 'status' in data:
                return errors(data["status"]["message"], response.status_code)
            else:
                return errors("Error", response.status_code)