const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://demoqa.com",
    setupNodeEvents(on, config) {
      // plugins aqui se precisar
    },
  },
});
