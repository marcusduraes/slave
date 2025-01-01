import puppeteer from 'puppeteer';
import designation from './src/utils/designation.js';

const { SERVER_URL, SERVER_LOGIN, SERVER_PASSWORD, CODE } = process.env;

const browser = await puppeteer.launch({
  headless: true,
  defaultViewport: null,
  args: ['--ignore-certificate-errors'],
});

const page = await browser.newPage();

await page.goto(SERVER_URL, {
  waitUntil: 'load',
});

await page.type('input[name="login_usuario"]', SERVER_LOGIN);
await page.type('input[name="login_senha"]', SERVER_PASSWORD);
await page.click('button.btn-login');

await page
  .waitForSelector('::-p-xpath(//*[@id="layout-static"]/div/div/div/div/div[1]/div[3]/div/div/a)')
  .then(e => e.click());

await page.waitForSelector('::-p-xpath(//*[@id="topnav"]/ul/li[1])').then(e => e.click());

await page.waitForSelector('input[name="Search_Text"]');
await page.type('input[name="Search_Text"]', CODE);
await page.keyboard.press('Enter');

await page.waitForSelector('::-p-xpath(//*[@id="Window_Result"]/div/div[3])').then(e => e.click());

async function fetchAndProcessIframeData() {
  const iframeElement = await page.waitForSelector('::-p-xpath(//*[@id="IframeFav"])');
  const iframe = await iframeElement.contentFrame();
  await iframe.waitForSelector('::-p-xpath(//*[@id="header"]/ul/li[2])');

  const elementHandle = await iframe.$('::-p-xpath(//*[@id="header"]/ul/li[2])');
  if (elementHandle) await elementHandle.click();

  await iframe.waitForSelector('::-p-xpath(/html/body/div[4]/div[2])');

  await new Promise((resolve, reject) => setTimeout(resolve, 1500))

  const list = new Set();

  const filteredTable = await iframe.$$eval('table[cellspacing]', tableElements => {
    return tableElements
      .filter((_, index) => (index + 1) % 3 === 0)
      .map(table => {
        const fontElement = table.querySelector('tbody tr:nth-child(2) td:nth-child(2) font');
        return fontElement ? fontElement.innerText : null;
      });
  });

  for (const [key, value] of filteredTable.entries()) {
    filteredTable[key] = designation(value);
  }

  if (!list.size) 
    filteredTable.forEach(item => list.add(item));

  filteredTable.forEach(item => {
    if (!list.has(item)) {
      list.add(item);
      // obter ip pingar e enviar mensagem
    }
  })

  console.log(list)

}
fetchAndProcessIframeData();

setInterval(fetchAndProcessIframeData, 30000);


