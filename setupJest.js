//setupJest.js or similar file
global.fetch = require('jest-fetch-mock');

process.env.API_URL=  'http://kalaxia_nginx';