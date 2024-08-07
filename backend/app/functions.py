import requests
import datetime
import asyncio
import aiohttp
import json

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
        if 'status' in response.json():
            return print(f"1) Error with {server} and {puuid}")

async def getMatchDetails(session, server, matchid, puuid):
    api_key = API_KEY
    headers = {"X-Riot-Token" : api_key}
    selected_region = get_region(server)
    
    url = f"https://{selected_region}.api.riotgames.com/lol/match/v5/matches/{matchid}"
    
    
    async with session.get(url, headers=headers) as response:
        if response.status == 200:
            data = await response.json()
            matchData = await processMatchDetails(data, puuid)
            return matchData
        else:
            if 'status' in await response.json():
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
        if 'status' in response.json():
            return print(f"1) Error with {server} and {puuid}")


def fetch_spell_data():
    response = requests.get("https://ddragon.leagueoflegends.com/cdn/14.8.1/data/en_US/summoner.json")
    if response.status_code == 200:
        spells = response.json()['data']
        
        spell_name_by_id = {details['key']: spell_name for spell_name, details in spells.items()}
        return spell_name_by_id
    return {}


async def processMatchDetails(response, puuid):
   
    matchDetails = {
        "info": {
            "gameCreation": 0,
            "gameDuration": None,
            "gameEndTimestamp": None,
            "gameId": None,
            "gameStartTimestamp": None,
            "gameVersion": None,
            "participants": {
                "assists": [],
                "champLevel": [],
                "championId": [],
                "championName": [],
                "deaths":[],
                "goldEarned": [],
                "summoner1Id": [],
                "summoner2Id": [],
                "item0": [],
                "item1": [],
                "item2": [],
                "item3": [],
                "item4": [],
                "item5": [],
                "item6": [],
                "kills": [],
                "lane": [],
                "largestKillingSpree": [],
                "largestMultiKill": [],
                "magicDamageDealtToChampions": [],
                "magicDamageTaken": [],
                "participantId": [],
                "physicalDamageDealtToChampions": [],
                "physicalDamageTaken": [],
                "trueDamageDealtToChampions": [],
                "puuid": [],
                "riotIdGameName": [],
                "riotIdTagline": [],
                "teamId": []
                },
            "queueId": None, #rank, norms, aram
            "teams":{
                "teamId": [],
                "win": [],
            }
        },
        "myPlayerIndex": 0,
        "metadata": {
            "matchId": "",
            "participants": [],
        }

    }
    # matchDetails["info"]
    matchDetails["info"]["gameCreation"] =(response["info"]["gameCreation"])
    matchDetails["info"]["gameDuration"] = (response["info"]["gameDuration"])
    matchDetails["info"]["gameEndTimestamp"] = (response["info"]["gameEndTimestamp"])
    matchDetails["info"]["gameId"] = (response["info"]["gameId"])
    matchDetails["info"]["gameStartTimestamp"] = (response["info"]["gameStartTimestamp"])
    matchDetails["info"]["gameVersion"] = (response["info"]["gameVersion"])

    for player in response["info"]["participants"]:
        matchDetails["info"]["participants"]["assists"].append(player["assists"])
        matchDetails["info"]["participants"]["champLevel"].append(player["champLevel"])
        matchDetails["info"]["participants"]["championId"].append(player["championId"])
        matchDetails["info"]["participants"]["championName"].append(player["championName"])
        matchDetails["info"]["participants"]["deaths"].append(player["deaths"])
        matchDetails["info"]["participants"]["goldEarned"].append(player["goldEarned"])
        matchDetails["info"]["participants"]["summoner1Id"].append(player[("summoner1Id")])
        matchDetails["info"]["participants"]["summoner2Id"].append(player[("summoner2Id")])
        matchDetails["info"]["participants"]["item0"].append(player["item0"])
        matchDetails["info"]["participants"]["item1"].append(player["item1"])
        matchDetails["info"]["participants"]["item2"].append(player["item2"])
        matchDetails["info"]["participants"]["item3"].append(player["item3"])
        matchDetails["info"]["participants"]["item4"].append(player["item4"])
        matchDetails["info"]["participants"]["item5"].append(player["item5"])
        matchDetails["info"]["participants"]["item6"].append(player["item6"])
        matchDetails["info"]["participants"]["kills"].append(player["kills"])
        matchDetails["info"]["participants"]["lane"].append(player["lane"])
        matchDetails["info"]["participants"]["largestKillingSpree"].append(player["largestKillingSpree"])
        matchDetails["info"]["participants"]["largestMultiKill"].append(player["largestMultiKill"])
        matchDetails["info"]["participants"]["magicDamageDealtToChampions"].append(player["magicDamageDealtToChampions"])
        matchDetails["info"]["participants"]["magicDamageTaken"].append(player["magicDamageTaken"])
        matchDetails["info"]["participants"]["participantId"].append(player["participantId"])
        matchDetails["info"]["participants"]["physicalDamageDealtToChampions"].append(player["physicalDamageDealtToChampions"])
        matchDetails["info"]["participants"]["physicalDamageTaken"].append(player["physicalDamageTaken"])
        matchDetails["info"]["participants"]["trueDamageDealtToChampions"].append(player["trueDamageDealtToChampions"])
        matchDetails["info"]["participants"]["puuid"].append(player["puuid"])
        matchDetails["info"]["participants"]["riotIdGameName"].append(player["riotIdGameName"])
        matchDetails["info"]["participants"]["riotIdTagline"].append(player["riotIdTagline"])
        matchDetails["info"]["participants"]["teamId"].append(player["teamId"])
    
    matchDetails["info"]["queueId"] = (response["info"]["queueId"])

    for team in response["info"]["teams"]:
        matchDetails["info"]["teams"]["teamId"].append(team["teamId"])
        matchDetails["info"]["teams"]["win"].append(team["win"])  # Append win status to match the teamId


    # matchDetails["metadata"]
    matchDetails["metadata"]["matchId"] = (response["metadata"]["matchId"])
    for participant in response["metadata"]["participants"]:
        matchDetails["metadata"]["participants"].append(participant)

    #matchDetails["myPlayerIndex"]
    for PlayerIndex, puuidoflist in enumerate(matchDetails["metadata"]["participants"]):
        if puuidoflist == puuid:
            matchDetails["myPlayerIndex"] = (PlayerIndex)
            break
        

    return (matchDetails)