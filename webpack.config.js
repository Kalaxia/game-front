const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  entry: {
    app: './src/app.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist/js')
  },
  resolve: {
    extensions: ['.js', '.json', '.vue'],
    modules: [
      path.resolve(__dirname, 'assets'),
      path.resolve(__dirname, 'src'),
      path.resolve(__dirname, 'static'),
      path.resolve(__dirname, 'node_modules')
    ],
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
  ],
  mode: 'production'
};
