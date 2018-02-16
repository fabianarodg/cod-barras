const webpack = require('webpack');
const Compression = require('compression-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const extractTextPlugin = require('extract-text-webpack-plugin');
const rules = require('./webpack.config.rules');
const optimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MinifyPlugin = require('babel-minify-webpack-plugin');
const path = require('path');


module.exports = {
  entry: './src/index.jsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve('dist'),
  },
  module: rules,
  plugins: [
    new MinifyPlugin(), // minify o bundle
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        API_BASE_URL_EXTERNAL: JSON.stringify(process.env.API_BASE_URL_EXTERNAL),
      },
    }),
    new optimizeCSSAssetsPlugin({ // minify a classe style no bundle
      cssProcessor: require('cssnano'),
      cssProcessorOptions: {
        discardComments: {
          removeAll: true,
        },
      },
      canPrint: true,
    }),
    // Scope Hoisting. Consiste em concatenar o escopo de todos os módulos em um único wrapper,
    // permitindo assim que nosso código seja executado mais rapidamente no navegador.
    new webpack.optimize.ModuleConcatenationPlugin(),
    new HtmlWebpackPlugin({
      hash: true,
      minify: {
        html5: true,
        collapseWhitespace: true,
        collapseInlineTagWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
      },
      filename: 'index.html',
      template: './src/index.html',
    }),
    new Compression({
      test: /\.(js|jsx|css)$/,
      asset: '[path].gz',
      algorithm: 'gzip',
    }),
  ],
  resolve: { extensions: ['.js', '.jsx'] },
};
