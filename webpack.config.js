const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  entry: {
    base: './static/js/base.js',
    faction: './static/js/pages/faction/faction.js',
    fleet: './static/js/fleet.js',
    hangar: './static/js/hangar.js',
    index: './static/js/index.js',
    journey: './static/js/journey.js',
    main: './static/js/main.js',
    map: './static/js/map.js',
    planet: './static/js/pages/planet/planet.js',
    overview: './static/js/pages/overview.js',
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
  },
  resolve: {
    extensions: ['.js', '.json', '.vue'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.less$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'less-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new CompressionPlugin()
  ],
  mode: 'production'
};
