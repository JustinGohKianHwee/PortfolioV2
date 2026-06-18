# keepalive.py

import requests
from datetime import datetime

URL = "https://modernportfolio-vcx0.onrender.com/api/whyme/health"
TIMEOUT = 10  # seconds

def ping():
    try:
        r = requests.get(URL, timeout=TIMEOUT)
        if r.status_code == 200:
            print(f"[{datetime.now()}] Ping successful")
        else:
            print(f"[{datetime.now()}] Ping returned {r.status_code}")
    except requests.exceptions.ReadTimeout:
        print(f"[{datetime.now()}] Ping timed out after {TIMEOUT}s")
    except requests.RequestException as e:
        print(f"[{datetime.now()}] Ping failed: {e}")

if __name__ == "__main__":
    ping()
