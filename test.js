var settings = require('./settings.json')
var cleaner = require('./directoryCleaner.js')
var webdriver = require('selenium-webdriver')
var By = webdriver.By
var until = webdriver.until
var promise = require('selenium-webdriver').promise
var fs = require('fs')
const testMain = 'http://localhost:3000'
const screenshotPath = 'C:\\selenium_local_map\\'

var driver = new webdriver.Builder().forBrowser('chrome').build()

cleaner.clearDirectory(screenshotPath)



// login
logIn()
// test Resources Route
testResources()
// test support routes
testSupport()
// test payment routes
testDaily()

function logIn () {
  driver.get('http://localhost:3002/login')
  driver.wait(until.elementLocated(By.id('login')))
  driver.takeScreenshot().then(function (data) {
    writeScreenshot(data, 'login.png')
  })

  driver.findElement(By.id('email')).sendKeys(settings.username)
  driver.findElement(By.id('password')).sendKeys(settings.password)
  driver.findElement(By.id('login')).click()
}


function testDaily () {
  driver.get(testMain + '/licensing/daily')
  driver.wait(until.elementLocated(By.className('float-right')))
  driver.takeScreenshot().then(function (data) {
    writeScreenshot(data, 'daily2.png')
  })

  driver.get(testMain + '/licensing/daily/select?productId=geo')
  driver.wait(until.elementLocated(By.className('float-right')))
  driver.takeScreenshot().then(function (data) {
    writeScreenshot(data, 'daily-geo.png')
  })

  driver.get(testMain + '/licensing/daily/select?productId=geothermal')
  driver.wait(until.elementLocated(By.className('float-right')))
  driver.takeScreenshot().then(function (data) {
    writeScreenshot(data, 'daily-geothermal.png')
  })

  driver.get(testMain + '/licensing/daily/select?productId=hydro')
  driver.wait(until.elementLocated(By.className('float-right')))
  driver.takeScreenshot().then(function (data) {
    writeScreenshot(data, 'daily-hydro.png')
  })
}

  /* -------------------------------------------------------------------------------------------
  Code here to test resource uri's
  ---------------------------------------------------------------------------------------------*/
function testResources () {
  driver.get(testMain + '/resources')
  driver.wait(until.elementLocated(By.id('events')))
  driver.takeScreenshot().then(function (data) {
    writeScreenshot(data, 'resources.png')
  })

  driver.get(testMain + '/resources/training')
  driver.wait(until.elementLocated(By.id('training-events')))
  driver.takeScreenshot().then(function (data) {
    writeScreenshot(data, 'resources_training.png')
  })
}


function testSupport () {
  driver.get(testMain + '/support')
  driver.wait(until.elementLocated(By.className('accordion-heading')))
  driver.takeScreenshot().then(function (data) {
    writeScreenshot(data, 'support.png')
  })
}

driver.quit()

function writeScreenshot (data, name) {
  name = name || 'ss.png'
  fs.writeFileSync(screenshotPath + name, data, 'base64')
}
