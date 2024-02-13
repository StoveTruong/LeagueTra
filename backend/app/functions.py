import requests
import datetime
import asyncio
import aiohttp

from flask import Flask, request, redirect, render_template, session
from functools import wraps
from config import API_KEY



#Base url
base_server = {
    "na" : "na1",
    "euw" :"euw1",
    "eun" : "eun1",
    "oc" : "oc",
    "kr" : "kr",
    "jp" : "jp1",
    "sg" : "sg2",
}


def get_server(server):
    if server in base_server:
        return base_server[server]
    else:
        return None

def get_region(server):
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
        return print(f'Error: {response.status_code}')
    
    
def getMatchList(server, puuid):
    api_key = API_KEY
    headers = {"X-Riot-Token" : api_key}
    selected_region = get_region(server)
    
    url = f"https://{selected_region}.api.riotgames.com/lol/match/v5/matches/by-puuid/{puuid}/ids?start=0&count=10"
    response = requests.get(url, headers=headers)
    
    if response.status_code == 200:
        return response.json()
    else:
        data = response.json()
        if 'status' in data:
            return print(f"1) Error with {server} and {puuid}")

async def getMatchDetails(session, server, matchid):
    api_key = API_KEY
    headers = {"X-Riot-Token" : api_key}
    selected_region = get_region(server)
    
    url = f"https://{selected_region}.api.riotgames.com/lol/match/v5/matches/{matchid}"
    
    
    async with session.get(url, headers=headers) as response:
        if response.status == 200:
            return await response.json()
            #data = await response.json()
        
        else:
            data = await response.json()
            if 'status' in data:
                return print(f"1) Error with {server} and {matchid}")

def getSummonerDetails(server, puuid):
    api_key = API_KEY
    headers = {"X-Riot-Token" : api_key}
    selected_server = get_server(server)
    
    url = f"https://{selected_server}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/{puuid}"
    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        return response.json()
    else:
        data = response.json()
        if 'status' in data:
            return print(f"1) Error with {server} and {puuid}")
