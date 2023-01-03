import requests
import numpy as np
import pandas as pd
BASE_URL = "http://13.127.241.250/api"

# Authenticating user
try:
  r = requests.post(BASE_URL+"/token/",{"username":"djjs","password":"ramayan"})
  token = r.json().get("access")
except Exception:
  print("Error in authentication")
  exit(1)

# Fetching data
try:
  r = requests.get(BASE_URL+"/visitor?is_checked_in=True",headers={"Authorization":f"Bearer {token}"})
  data = r.json()
  df = pd.DataFrame(data["data"])
  df.to_csv("output.csv",index=False)
except Exception as e:
  print(e)
  exit(1)