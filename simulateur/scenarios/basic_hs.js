const { By, Builder } = require('selenium-webdriver');
const { suite } = require('selenium-webdriver/testing');
const assert = require("assert");
let driver;


suite(function(env) {
  console.log(env)
  describe('Basic HS', function() {
      this.timeout(30000)

    before(async function() {
      driver = await new Builder()
      .forBrowser('firefox')
      .usingServer('http://172.17.0.7:4444/wd/hub') //https://www.selenium.dev/selenium/docs/api/javascript/index.html
      .build();
    });



    it('First Selenium script', async function() {
      this.timeout(20000)
      await driver.get('https://www.selenium.dev/selenium/web/web-form.html');

      let title = await driver.getTitle();
      console.log('title', title)
      assert.equal("Web form", title);

      await driver.manage().setTimeouts({ implicit: 500 });

      let textBox = await driver.findElement(By.name('my-text'));
      let submitButton = await driver.findElement(By.css('buHStton'));

      await textBox.sendKeys('Selenium');
      await submitButton.click();

      let message = await driver.findElement(By.id('message'));
      let value = await message.getText();
      assert.equal("Received!", value);
    });

    after(async () => await driver.quit());

  });
});
