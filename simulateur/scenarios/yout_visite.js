const {Builder, By, Key, until} = require('selenium-webdriver');
const { suite } = require('selenium-webdriver/testing');
const assert = require("assert");

let proxy = require('selenium-webdriver/proxy');

const ProxyList = require('free-proxy');
const proxyList = new ProxyList();


// proxyList.getByCountryCode('FR')
// .then(function (proxies) {
//   // get proxies here
// })
// .catch(function (error) {
//   throw new Error(error);
// });

let proxynet;
// try {

// } catch (error) {
//   throw new Error(error);
// }


let driver;


suite(function(env) {
  console.log(env)
  describe('Basic', function() {
    this.timeout(300000)

    before(async function() {
      proxynet =  await proxyList.random();
      let proxynet_url = proxynet.url.split('//')[1]
      console.log(proxynet_url)
      driver = await new Builder()
      .forBrowser('firefox')
      .usingServer('http://selenium_ff:4444/wd/hub') //https://www.selenium.dev/selenium/docs/api/javascript/index.html
      .setProxy(proxy.manual({http: proxynet_url}))
      .build();
    });



    it('First Selenium script', async function() {
      this.timeout(20000)
      await driver.get('https://www.youtube.com/watch?v=YT61BcjGfwc');

      let title = await driver.getTitle();
      console.log('title', title)
      // assert.equal("Web form", title);

      // await driver.manage().setTimeouts({ implicit: 500 });
      //
      let content = await driver.findElement(By.css('body'));
      // console.log(content)
      // let submitButton = await driver.findElement(By.css('button'));
      //
      await content.sendKeys(Key.SPACE);

      let wait = Math.floor(Math.random() * 40);
      // console.log(wait)

      setTimeout(function(){
        console.log("Executed after "+wait+" second");
      }, wait*1000 );
      // await submitButton.click();
      //
      // let message = await driver.findElement(By.id('message'));
      // let value = await message.getText();
      // assert.equal("Received!", value);
    });

    after(async () => await driver.quit());

  });
});
