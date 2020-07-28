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
        let url = "https://web.whatsapp.com/send?phone=";
        let encodeText = encodeURI(data.text);
        let text = "&text=";
        await this.#driver.manage().setTimeouts( { implicit: 11000 } );
        await this.#driver.get(url + data.numero + text + encodeText);
        let enter =  await this.#driver.findElement(By.xpath('//div[@id="main"]//footer/div[1]/div[3]/button'));
        await enter.click();
    }

    async deleteContact(number){
        let cut_one  = number.substr(0,2);
        let cut_two  = number.substr(3,5);
        let cut_three = number.substr(6,11);
        let numberPhone = "+" + cut_one + " " + cut_two +  " " + cut_three;
        let clickRight = await this.#driver.findElement(By.xpath('//span[@title="' + numberPhone + '"' + ']'));
        await this.#driver.actions().contextClick(clickRight).perform();
        let clickDelete = await this.#driver.findElement(By.xpath('//div[@title="Delete chat"]'));
        await clickDelete.click();
        clickDelete = await this.#driver.findElement(By.xpath('//div[1]/div[1]/span[2]/div/div/div/div/div/div/div[2]/div[2]'));
        clickDelete.click();
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