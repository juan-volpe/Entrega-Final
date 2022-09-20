const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    watchForFileChanges: false,
    "baseUrl": "https://pushing-front.vercel.app/",
    defaultCommandTimeout: 6000,
    viewportHeight: 660,
    viewportWidth: 1000
  },
});