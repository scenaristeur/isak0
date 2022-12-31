const { By, Builder } = require('selenium-webdriver');
const { suite } = require('selenium-webdriver/testing');
const assert = require("assert");
const randomWordFR = require('random-word-fr');

// const search_url = 'https://www.google.com/search?tbm=isch&q='
const search_url = 'https://www.google.com/search?q='
const number_of_words = 2

let words = []
let links = {}
let imageSet = {}

let driver;


suite(function(env) {
  console.log(env)
  describe('Basic', function() {
    this.timeout(30000)

    before(async function() {
      driver = await new Builder()
      .forBrowser('firefox')
      .usingServer('http://selenium_ff:4444/wd/hub') //https://www.selenium.dev/selenium/docs/api/javascript/index.html
      .build();

      for (let i = 0; i < number_of_words; i++){
        //let word = randomWordFR()
        words.push(randomWordFR())
      }
      console.log(words)
    });


    it('get links', async function() {
      this.timeout(20000)

      for (let i = 0; i < words.length; i++){

        let word = words[i]
        links[word] =[]

        console.log("# "+word)

        let search = search_url+word
        console.log( search)
        await driver.get(search);
        let center_col = await driver.findElement(By.id("center_col"))
        let linkElements = await center_col.findElements(By.css('a'))
        console.log(linkElements.length+ 'liens')

        for await (const l of linkElements){
          // console.log(l)
          let link = await l.getAttribute("href")
          //let text = await l.getText()
          if (!link.startsWith('https://www.google.com')){
            links[word].push(link)
          }


          // console.log(link)
          // await driver.get(link)
          // await l.click()
          // let title = await driver.getTitle();
          // console.log('title', title)
          // let images = await driver.findElements(By.css('img'))
          // console.log(images.length+" images")


          // await driver.sleep(100)


        }





        // let linkElements = await driver.findElements(By.xpath("//h3/a"));
        // console.log(linkElements.length)
        // let links = []
        // for /*await*/ (let l of linkElements){
        //   links.push(await l.getAttribute('href'))
        // }
        // console.log("links",links)


        // let islrc = await driver.findElement(By.className('islrc'))
        // console.log('islrc',islrc)
        // let images = await islrc.findElements(By.css('img'), "pas trouvé d'images")
        // console.log(images.length+" images")
        //
        // for await (let img of images){
        //   console.log(img)
        //   let src = await img.getAttribute("src")
        //   let title = await img.getAttribute("title")
        //   console.log("-src ", src)
        //   console.log("-title ", title)
        //   // alt
        // }

        //  await driver.sleep(1000)


      }


    //  console.log(links)
      //  done()

      // let title = await driver.getTitle();
      // console.log('title', title)
      // assert.equal("Web form", title);
      //
      // await driver.manage().setTimeouts({ implicit: 500 });
      //
      // let textBox = await driver.findElement(By.name('my-text'));
      // let submitButton = await driver.findElement(By.css('button'));
      //
      // await textBox.sendKeys('Selenium');
      // await submitButton.click();
      //
      // let message = await driver.findElement(By.id('message'));
      // let value = await message.getText();
      // assert.equal("Received!", value);
    });


    // it('get images', async function() {
    //   this.timeout(20000)
    //   console.log("deux",links)
    //   // for (const [word, linkArray] of Object.entries(links)) {
    //   //   // it('dummy'+word, function(done) {
    //   //
    //   //
    //   //   console.log(`${word}: ${linkArray}`);
    //   // //  done()
    //   // // })
    //   // }
    // })

    it('dummy', async function() {
      describe('Testing elements', async function() {
        for await  (const [word, linkArray] of Object.entries(links)) {
          console.log(word,'--', linkArray)
          for await (const link of linkArray) {
            console.log(link)
            // it('testing' + link, async function() {
            let d = await new Builder()
            .forBrowser('firefox')
            .usingServer('http://selenium_ff:4444/wd/hub') //https://www.selenium.dev/selenium/docs/api/javascript/index.html
            .build();

            //expect(link).to.be.a('string');
            await d.get(link)
            let title = await d.getTitle();
          //  console.log('title', title)
            let images = await d.findElements(By.css('img'))
            console.log(images.length+" images")

            for await (let img of images){
              //  console.log(img)
              let i = {}
              i.search_word = word
              i.found_at = link
              i.src = await img.getAttribute("src")
              i.title = await img.getAttribute("title")
              i.alt = await img.getAttribute("alt")
              i.width = await img.getAttribute("width")
              i.height = await img.getAttribute("height")
              console.log (i)
              // alt
            }

            //imageSet.push(i)







            await d.quit()
            //done();
            // });
          }

        }

      });
      //  done();
    });


    console.log(imageSet)

    after(async () => await driver.quit());

  });
});
