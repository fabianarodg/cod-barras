const autoprefixer = require('autoprefixer');
const eslintFormatter = require('react-dev-utils/eslintFormatter');
const path = require('path');

module.exports = {
  rules: [
    {
      test: /\.json$/,
      exclude: /node_modules/,
      use: 'json-loader',
    },
    {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: ['babel-loader','eslint-loader'],
    },
    {
      test: /\.(css|sass|scss)$/,
      use: [
        require.resolve('style-loader'),
        {
          loader: require.resolve('css-loader'),
          options: {
            importLoaders: 1,
          },
        },
        {
          loader: require.resolve('postcss-loader'),
          options: {
            ident: 'postcss',
            plugins: () => [
              require('postcss-flexbugs-fixes'),
              autoprefixer({
                browsers: [
                  '>1%',
                  'last 4 versions',
                  'Firefox ESR',
                  'not ie < 9',
                ],
                flexbox: 'no-2009',
              }),
            ],
          },
        },
      ],
    },
    {
      test: /\.(png|jpg|gif|svg)$/,
      exclude: /node_modules/,
      use: 'url-loader?limit=10000&name=assets/images/[name].[hash:8].[ext]',
    }, {
      test: /\.(ttf|eot|woff|woff2|otf)$/,
      exclude: /node_modules/,
      use: 'url-loader?limit=0&name=assets/fonts/[name].[ext]',
    },
  ],
};
