const path = require('path');

module.exports = {
  entry: {
    base: './static/js/base.js',
    faction: './static/js/faction.js',
    fleet: './static/js/fleet.js',
    hangar: './static/js/hangar.js',
    index: './static/js/index.js',
    journey: './static/js/journey.js',
    main: './static/js/main.js',
    map: './static/js/map.js',
    overview: './static/js/overview.js',
    production: './static/js/production.js',
    profile: './static/js/profile.js',
    registration: './static/js/registration.js',
    ship: './static/js/ship.js',
    shipyard: './static/js/shipyard.js',
    system: './static/js/system.js',
    trade: './static/js/trade.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist/js')
  }
};
