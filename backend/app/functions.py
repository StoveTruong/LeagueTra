import requests

from flask import redirect, render_template, session
from functools import wraps

def errors(message, code=400):
    """
    "Render error messages to users"
    """

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