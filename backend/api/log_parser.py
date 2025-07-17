import json
import requests

def parse_log_file(filepath, jwt_token):
    with open(filepath, 'r') as f:
        for line in f:
            try:
                event = json.loads(line.strip())
                response = requests.post(
                    'http://127.0.0.1:8000/api/log-event/',
                    headers={'Authorization': f'Bearer {jwt_token}'},
                    json=event
                )
                print(response.status_code, response.text)
            except Exception as e:
                print("Error:", e)
