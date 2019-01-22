import urllib
import json

def getClientUserCookie(request):
    if request.COOKIES.get('clientUser'):
        cookie_val = request.COOKIES.get('clientUser')
        cookie_val = urllib.parse.unquote(cookie_val)
        client = json.loads(cookie_val)
        return client
    return None