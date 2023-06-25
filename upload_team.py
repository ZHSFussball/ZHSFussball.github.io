import os, json
import pandas as pd

from datetime import datetime
from google.oauth2.service_account import Credentials

key_json = json.loads(os.environ.get('GCP_KEY'))
project_id = "seppi-gcp"
team_table = "registrations.teams"

credentials = Credentials.from_service_account_info(key_json, scopes=["https://www.googleapis.com/auth/bigquery"])
today = datetime.today().strftime('%Y-%m-%d')

columns_team_table = ["email", "team_name", "team_size", "full", "date"]

example_team_entry = ["seppi@email.com", "Kickers", 7, True, today]

team_df = pd.DataFrame(data=[example_team_entry], columns=columns_team_table)

team_df.to_gbq(destination_table=team_table, project_id=project_id, if_exists="append", credentials=credentials)
