const webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const rules = require("./webpack.config.rules");
const path = require('path');

let plugins = [];

module.exports = {
    watch: true,
    devtool: "cheap-module-eval-source-map",
    entry: ['./src/index.jsx'],
    output: {
        filename: 'bundle.js',
        path: path.resolve('dist')
    },
    module: rules,
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
                'API_BASE_URL_EXTERNAL': JSON.stringify(process.env.API_BASE_URL_EXTERNAL)
            }
        }),
        new HtmlWebpackPlugin({
            hash: true,
            minify: {
                html5: true,
                collapseWhitespace: true,
                removeComments: true,
            },
            template: './src/index.html'
        })
    ],
    resolve: { extensions: ['.js', '.jsx'] }
}