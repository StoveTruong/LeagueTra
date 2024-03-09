import requests
import datetime
import asyncio
import aiohttp

from flask import Flask, request, redirect, render_template, session
from functools import wraps
from config import API_KEY

from model.PlayerProfile import PlayerProfile
from model.MatchIds import MatchIds

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

def getPuuid(gameName, tagLine):
    """
    Retrieves player profile given Game Name and Tag Line \n
    Returns a dictionary of PlayerProfile
    """

    #API authentication 
    api_key = API_KEY
    headers = {"X-Riot-Token" : api_key}
    
    #HTTP GET
    url = f'https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/{gameName}/{tagLine}'
    #Reponse from server
    response = requests.get(url, headers=headers)
    
    # Return the Player Profile regardless of what the status is
    # We error handle on the main function and send to front end
    if('status' in response.json()):
        PlayerProfile["status"]["status_code"] = response.status_code
        PlayerProfile["status"]["message"] = response.json()["status"]["message"]
        return PlayerProfile

    PlayerProfile["puuid"] = response.json()["puuid"]
    PlayerProfile["gameName"] = response.json()["gameName"]
    PlayerProfile["tagLine"] = response.json()["tagLine"]

    return PlayerProfile
    
def getMatchList(server, puuid):
    """
    Retrieves an array of match ids given server and puuid \n
    Returns a dictionary of MatchIds
    """

    api_key = API_KEY
    headers = {"X-Riot-Token" : api_key}
    selected_region = get_region(server)
    
    url = f"https://{selected_region}.api.riotgames.com/lol/match/v5/matches/by-puuid/{puuid}/ids?start=0&count=10"
    response = requests.get(url, headers=headers)
    
    if('status' in response.json()):
        MatchIds["status"]["status_code"] = response.status_code
        MatchIds["status"]["message"] = response.json()["status"]["message"]
        return MatchIds
    
    MatchIds['arrayOfIds'] = response.json()

    return MatchIds

async def getMatchDetails(session, server, matchid):
    api_key = API_KEY
    headers = {"X-Riot-Token" : api_key}
    selected_region = get_region(server)
    
    url = f"https://{selected_region}.api.riotgames.com/lol/match/v5/matches/{matchid}"
    
    async with session.get(url, headers=headers) as response:
        if response.status == 200:
            return await response.json()
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
