const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://www.saucedemo.com',
    specPattern: 'cypress/e2e/**/*.cy.{js,ts}',
    supportFile: false,
    video: true,
    ////videoUploadOnPasses:false,
    screenshotOnRunFailure: true,
    setupNodeEvents(on, config) {
      return config
    }
  }
})
