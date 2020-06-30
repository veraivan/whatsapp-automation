const { Builder, until, By } = require('selenium-webdriver');
const path = require('path');
const { ServiceBuilder, Options } = require('selenium-webdriver/chrome');


//Load html template
let loader, bscanner;
document.addEventListener('DOMContentLoaded', () =>{
    loader = document.querySelector('#loader');
    loader.style.display = 'none';
    bscanner = document.querySelector('#text');
    let scaner = document.querySelector('#scanerQR');
    scaner.addEventListener('click', OpenChrome, false);
});


async function OpenChrome(){

    bscanner.style.display = 'none';
    loader.style.display = 'block';

    let PATH = path.join(process.env.HOME, 'whatsapp-automation/src/scripts', 'chromedriver');
    let geoko = new ServiceBuilder(PATH);

    let options = new Options();
    options.addArguments("start-maximized");
    options.addArguments("user-data-dir=profile");
    options.addArguments("user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.113 Safari/537.36");
        
    let driver = await new Builder()
    .forBrowser('chrome')
    .setChromeService(geoko)
    .setChromeOptions(options)
    .build();

    await driver.get('https://web.whatsapp.com/');

    try {
        await driver.wait(until.elementLocated(By.xpath('//div[@class="landing-main"]//span/div'), 10000));
        let psession = await driver.findElement(By.name('rememberMe'));
        await psession.click();
    } catch (error) {}
}