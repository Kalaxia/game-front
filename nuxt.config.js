const pkg = require('./package');
const path = require('path');

module.exports = {
  mode: 'universal',

  env: {
    apiUrl: process.env.API_URL
  },

  /*
  ** Headers of the page
  */
  head: {
    title: 'Kalaxia',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: "Jeu de stratégie multijoueurs dans l'espace" },
      { hid: 'og:type', name: 'og:type', content: 'website' },
      { hid: 'og:title', name: 'og:title', content: 'Kalaxia' },
      { hid: 'og:site_name', name: 'og:site_name', content: 'Kalaxia' },
      { hid: 'og:locale', name: 'og:locale', content: 'fr' },
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  watchers: {
    webpack: {
      aggregateTimeout: 300,
      poll: 1000
    }
  },
  /*
  ** Global CSS
  */
  css: [
    '@/assets/less/main.less'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/api.js',
    '~/plugins/i18n.js',
    '~/plugins/resources.js',
    '~/plugins/websocket.js',
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [,
    '@nuxtjs/pwa',
    ['nuxt-env', {
      keys: ['PORTAL_URL']
    }]
  ],

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      config.resolve.modules.push(path.resolve(__dirname, 'assets'));
    }
  }
}
