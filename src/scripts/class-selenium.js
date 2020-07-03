const { Builder, By } = require('selenium-webdriver');
const path = require('path');
const { ServiceBuilder, Options } = require('selenium-webdriver/chrome');
const file = require('fs');
const util = require('util');
const sleep = util.promisify(setTimeout);

class Selenium{

    #driver;

    async openBrowser(){
        try {
            let PATH = path.join(process.env.HOME, 'whatsapp-automation/src/scripts', 'chromedriver');
            let geoko = new ServiceBuilder(PATH);

            let options = new Options();
            options.addArguments("start-maximized");
            options.headless();
            options.addArguments("user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.113 Safari/537.36");
        
            this.#driver = await new Builder()
            .forBrowser('chrome')
            .setChromeService(geoko)
            .setChromeOptions(options)
            .build();

            await this.#driver.get('https://web.whatsapp.com/');
            await sleep(3000);

            let image64  = await this.#driver.takeScreenshot();
            file.writeFileSync('./recursos/images/codigoQR.png', image64, 'base64');
        }catch(error){
            console.log(error);
        }
    }

    async oneMessage(data){
        try{
            let url = "https://web.whatsapp.com/send?phone=";
            let numberPhone = "595" + data.numero.replace("0", "");
            let encodeText = encodeURI(data.text);
            let text = "&text=";
            await this.#driver.manage().setTimeouts( { implicit: 8000 } );
            await this.#driver.get(url + numberPhone + text + encodeText);
            let enter =  await this.#driver.findElement(By.xpath('//div[@id="main"]//footer/div[1]/div[3]/button'));
            enter.click();
        }catch(error){
            console.log(error);
        }
    }

    async closedSession() {
        try{
            let menu = await this.#driver.findElement(By.xpath('//div[@title="Menu"]'));
            await menu.click();
            let closed = await this.#driver.findElement(By.xpath('//header//div[2]/div/span/div[3]/span/div/ul/li[7]/div'));
            await closed.click();
            await sleep(2500);
            await this.#driver.quit();
        }catch(error){
            console.log(error);
        }
    }
}

module.exports = { Selenium }