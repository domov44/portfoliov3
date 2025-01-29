const { defineConfig } = require('cypress');
const dotenv = require('dotenv');

dotenv.config({ path: './cypress.env' });

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://develop.dive6x6x6bd4r.amplifyapp.com',
    env: {
      name: process.env.NAME,
      surname: process.env.SURNAME,
    },
    supportFile: 'cypress/support/e2e.js',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}', 
    setupNodeEvents(on, config) {
    }
  }
});