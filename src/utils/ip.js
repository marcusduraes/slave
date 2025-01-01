import getRowTarget from './row';
import getDataSheet from './sheets/get';
import insertDataSheet from './sheets/insert';

const { SHEETNAME } = process.env;

export default async function getIPAddress(designation) {
  const rowTarget = await getRowTarget();
  await insertDataSheet(`${SHEETNAME}!F${rowTarget}`, [[designation]]);

  let ip = await getDataSheet(`${SHEETNAME}!M${rowTarget}`);
  let mask = await getDataSheet(`${SHEETNAME}!N${rowTarget}`);

  ip = ip && ip.values && ip.values.length > 0 ? ip.values[0][0] : null;
  mask = mask && mask.values && mask.values.length > 0 ? mask.values[0][0] : null;

  if (ip === null || mask === null) return;
  else return { ip, mask };
}
