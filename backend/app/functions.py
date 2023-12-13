import requests

from flask import redirect, render_template, session
from functools import wraps

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



def league_api():
    
    
    
    api_key = API_KEY
    header = {}
    url = '/lol/league/v4/entries/by-summoner/{e_username}'
    
    response = (url, header)
    data = response.json
    
    
    
    
    
    
    
    