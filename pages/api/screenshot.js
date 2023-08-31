const puppeteer = require('puppeteer-extra');
const stealthPlugin = require('puppeteer-extra-plugin-stealth');

puppeteer.use(stealthPlugin());

const delay = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

export default async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'URL parameter is required' });
  }

  let browser;

  try {
    // ScraperAPI proxy configuration
    let PROXY_USERNAME = 'scraperapi';
    let PROXY_PASSWORD = '6fac52e0612bf29c97ef8b6f8b61dc67'; // <-- enter your API_Key here
    let PROXY_SERVER = 'proxy-server.scraperapi.com';
    let PROXY_SERVER_PORT = '8001';

    browser = await puppeteer.launch({ 
      ignoreHTTPSErrors: true,
      headless: false,
      args: [
        `--proxy-server=http://${PROXY_SERVER}:${PROXY_SERVER_PORT}`
      ]
    });
    const page = await (await browser.pages())[0];
    await page.authenticate({
      username: PROXY_USERNAME,
      password: PROXY_PASSWORD
    })
    

    const proxy = "http://api.scraperapi.com?api_key=6fac52e0612bf29c97ef8b6f8b61dc67&url=";
    // const url = proxy+"http://httpbin.org/ip";
    const url = "https://users.premierleague.com/";
    await page.goto(url, {timeout: 180000});
    // await page.goto("https://users.premierleague.com/");

    console.log('Accepting cookies...');
    
    try {
      await page.waitForSelector("#onetrust-accept-btn-handler", {timeout: 500});
      await page.click("#onetrust-accept-btn-handler");
    } catch (e) {
      console.log('Timeout waiting for cookie prompt, continuing...');
    }
    

    console.log('Inputting username...');
    await page.waitForSelector('#ism-email');
    await page.type('#ism-email', 'rob.bettison94@gmail.com', {delay: 20});

    console.log('Inputting password...');
    await page.waitForSelector('#ism-password');
    await page.type('#ism-password', 'BigFarke9*!!', {delay: 20});

    // Submit the form
    console.log('Pressing enter...');
    await page.waitForSelector("button[type=submit]");

    await page.screenshot({path: 'beforeNav.jpg'});

    await delay(2000);
    await page.click("button[type=submit]");


    await page.waitForNavigation();

    // Wait for navigation to complete
    console.log('Awaiting navigation...');

    // const screenshot = await page.screenshot({ type: 'png' });
    console.log('Taking screenshot...');
    await page.screenshot({path: 'afterNav.jpg'});
    await browser.close();
    return res.status(200).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};