import { BigQuery } from '@google-cloud/bigquery';
import { google } from 'googleapis';

const keyJson = JSON.parse(process.env.GCP_KEY);
const projectId = 'seppi-gcp';
const playerTable = 'registrations.players';

const credentials = new google.auth.JWT(keyJson.client_email, null, keyJson.private_key, ['https://www.googleapis.com/auth/bigquery']);
const today = new Date().toISOString().slice(0, 10);

const columnsPlayerTable = ['email', 'name', 'date'];

async function uploadPlayerData(playerData) {
  const bigquery = new BigQuery({ projectId, credentials });

  const playerFields = columnsPlayerTable.map((columnName) => ({ name: columnName }));

  const playerTableData = {
    schema: {
      fields: playerFields,
    },
    rows: playerData.map((entry) => ({
      json: entry.reduce((acc, value, index) => {
        acc[columnsPlayerTable[index]] = value;
        return acc;
      }, {}),
    })),
  };

  const options = {
    schema: playerTableData.schema,
    skipInvalidRows: true,
    ignoreUnknownValues: true,
  };

  try {
    const [job] = await bigquery
      .dataset(playerTable.split('.')[0])
      .table(playerTable.split('.')[1])
      .insert(playerTableData.rows, options);

    await job.getMetadata();
    console.log('Data uploaded successfully.');
  } catch (error) {
    console.error('Error uploading data:', error);
  }
}

document.getElementById('solo-form').addEventListener('submit', (event) => {
  event.preventDefault();

  const emailInput = document.getElementById('email');
  const nameInput = document.getElementById('player-name');

  const email = emailInput.value.trim();
  const name = nameInput.value.trim();
  const date = today;

  const playerData = [[email, name, date]];
  uploadPlayerData(playerData);
});
