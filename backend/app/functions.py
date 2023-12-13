import requests

from flask import flask, request, redirect, render_template, session
from functools import wraps
from config import API_KEY


#Base url
base_urls = {
    "na" : "https://na1.api.riotgames.com/lol",
    "euw" :"https://euw1.api.riotgames.com/lol",
    "eun" : "https://eun1.api.riotgames.com/lol",
    "oc" : "https://oc.api.riotgames.com/lol",
    "kr" : "https://kr.api.riotgames.com/lol",
    "jp" : "https://jp1.api.riotgames.com/lol",
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

def get_region_url(region):
    if region in base_urls:
        return base_urls[region]
    else:
        return None
    

def username_required(f):
    """
    Decorate routes to require username to access features
    
    https://flask.palletsprojects.com/en/3.0.x/patterns/viewdecorators/
    """
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if session.get("username") is None:
            return redirect ("/lookup")
        return f(*args, **kwargs)
    return decorated_function



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
    
