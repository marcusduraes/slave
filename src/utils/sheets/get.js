import { sheets, spreadsheetId } from './conn.js';

export default async function getDataSheet(range) {
  const request = {
    spreadsheetId,
    range,
  };
  const response = await sheets.spreadsheets.values.get(request);

  return response.data;
}