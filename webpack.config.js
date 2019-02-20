const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  entry: {
    app: './src/app.js',
  },
  output: {
    filename: '[name]-[hash].js',
    chunkFilename: '[id]-[chunkhash].js',
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
  optimization: {
    minimizer: [new TerserPlugin()],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.PORTAL_URL': process.env.PORTAL_URL
    }),
    new VueLoaderPlugin()
  ],
  mode: 'production'
};
