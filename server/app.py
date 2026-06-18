from dotenv import load_dotenv
load_dotenv()

import os
from flask import Flask
from flask_cors import CORS
from flask_apscheduler import APScheduler
import requests
from datetime import datetime
from routes.whyme import whyme_bp

def ping_health():
    URL = os.environ.get("HEALTH_URL",
        "https://modernportfolio-vcx0.onrender.com/api/whyme/health"
    )
    try:
        r = requests.get(URL, timeout=10)
        status = "✅ 200 OK" if r.status_code == 200 else f"⚠️ {r.status_code}"
    except Exception as e:
        status = f"❌ {e}"
    print(f"[{datetime.now():%Y-%m-%d %H:%M:%S}] keepalive → {status}")

class Config:
    SCHEDULER_API_ENABLED = False

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    CORS(app)
    app.register_blueprint(whyme_bp)

    scheduler = APScheduler()
    scheduler.init_app(app)
    scheduler.start()

    scheduler.add_job(
        id="keepalive_job",
        func=ping_health,
        trigger="interval",
        minutes=10
    )

    return app

app = create_app()

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=False)
