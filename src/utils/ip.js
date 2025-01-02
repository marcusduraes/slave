import ip from 'ip';
import getRowTarget from './row.js';
import getDataSheet from './sheets/get.js';
import insertDataSheet from './sheets/insert.js';

const { SHEETNAME } = process.env;

export async function getIPAddress(designation) {
  const rowTarget = await getRowTarget();
  await insertDataSheet(`${SHEETNAME}!F${rowTarget}`, [[designation]]);

  let ip = await getDataSheet(`${SHEETNAME}!M${rowTarget}`);
  let mask = await getDataSheet(`${SHEETNAME}!N${rowTarget}`);

  ip = ip && ip.values && ip.values.length > 0 ? ip.values[0][0] : null;
  mask = mask && mask.values && mask.values.length > 0 ? mask.values[0][0] : null;

  if (ip === null || mask === null) return;
  else return getFirewallIPAddress(ip, mask);
}

function getFirewallIPAddress(ipAddress, maskAddress) {
  const prefix = ip.subnet(ipAddress, maskAddress).subnetMaskLength;
  const subnet = ip.cidrSubnet(`${ipAddress}/${prefix}`);
  return subnet.lastAddress;
}
