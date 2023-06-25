import os, json
import pandas as pd

from datetime import datetime
from google.oauth2.service_account import Credentials

key_json = json.loads(os.environ.get('GCP_KEY'))
project_id = "seppi-gcp"
player_table = "registrations.players"

credentials = Credentials.from_service_account_info(key_json, scopes=["https://www.googleapis.com/auth/bigquery"])
today = datetime.today().strftime('%Y-%m-%d')

columns_player_table = ["email", "name", "date"]

example_player_entry = ["lopo@email.com", "Lopo", today]

player_df = pd.DataFrame(data=[example_player_entry], columns=columns_player_table)

player_df.to_gbq(destination_table=player_table, project_id=project_id, if_exists="append", credentials=credentials)
