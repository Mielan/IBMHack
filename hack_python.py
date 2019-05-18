
# coding: utf-8

# In[2]:


import urllib
from urllib import request
import json
import csv
import time
import datetime
import json


# In[3]:


endpoint = 'https://maps.googleapis.com/maps/api/directions/json?'
api_key = 'AIzaSyAhabdOdxovuHzy7VOfyY-7RIlDHj1ldP4'
origin = input('Where are you?').replace(' ','+')
destination = input('Where do you want to go?:').replace(' ','+')
nav_request = 'origin={}&destination={}&key={}&alternatives=true&mode=walking'.format(origin, destination, api_key)
request = endpoint + nav_request
response = urllib.request.urlopen(request).read()
directions = json.loads(response)
routes = directions['routes']


# In[6]:


#print(directions)
with open('complete_route.json', 'w') as outfile:
    json.dump(directions, outfile)



# In[5]:


total_routes = []
i = 0
while(i < len(routes)):
    polylines = []
    k = 0
    legs = routes[i]['legs']
    while(k < len(legs)):
        h = 0
        steps = legs[k]['steps']
        while(h < len(steps)):
            polylines.append(steps[h]['polyline'].get('points'))
            
            h += 1
        k += 1
    total_routes.append(polylines)
    i += 1


# In[6]:


with open('total_route.json', 'w') as outfile:
    json.dump(total_routes, outfile)
    

