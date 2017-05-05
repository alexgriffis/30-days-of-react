module.exports = {
  'get to the login page': (browser) => {
    browser
      .url(browser.launchUrl)
      .waitForElementVisible('.navbar', 1000)
      .click('a[href="#/login"')
    browser.assert.urlContains('login')
  },
  'logging in': (browser) => {
    browser
      .setValue('input[type=email]', 'alexgriffis@gmail.com')
      .click('input[type=submit]')
      .waitForElementVisible('.navbar', 1000)
      .getText('.content h1', function (comp) {
        this.assert.equal(comp.value, 'Hiiii Guysss')
      })
    browser.assert.urlContains(`${browser.launchUrl}`)
  },
  'logging out': (browser) => {
    browser
      .click('a[href="#/logout"]')
      .waitForElementVisible('button', 1000)
      .click('button')
      .waitForElementVisible('h1', 1000)
      .getText('h1', function (res) {
        this.assert.equal(res.value, 'Hiiii Guysss')
      })
      .waitForElementVisible('a[href="#/login"]', 1000)
  },
  'close': (browser) => { browser.end() }
}
