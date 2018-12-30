const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  entry: {
    base: './static/js/base.js',
    faction: './static/js/pages/faction/faction.js',
    index: './static/js/index.js',
    journey: './static/js/journey.js',
    'fleet/details': './static/js/pages/fleet/details.js',
    'fleet/list': './static/js/pages/fleet/list.js',
    main: './static/js/main.js',
    map: './static/js/map.js',
    planet: './static/js/pages/planet/planet.js',
    overview: './static/js/pages/overview.js',
    'planet/production': './static/js/pages/planet/production.js',
    profile: './static/js/profile.js',
    registration: './static/js/registration.js',
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
