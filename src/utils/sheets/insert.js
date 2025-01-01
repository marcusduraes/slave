import { sheets, spreadsheetId } from './conn.js';

export default async function insertDataSheet(range, values) {
  try {
    const request = {
      spreadsheetId,
      range,
      valueInputOption: 'USER_ENTERED',
      resource: { values },
    };

    return await sheets.spreadsheets.values.update(request);
  } catch (error) {
    console.error('Erro ao inserir dados:', error);
  }
}