const pkg = require('./package');
const path = require('path');

module.exports = {
  mode: 'universal',

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
  ],

  router: {
    middleware: ['auth']
  },

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
