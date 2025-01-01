import getDataSheet from './src/utils/sheets/get.js';

const { SHEETNAME } = process.env

export default async function getRowTarget() {
  const rows = await getDataSheet(`${SHEETNAME}!F:F`);
  return rows.values.length + 1;
}