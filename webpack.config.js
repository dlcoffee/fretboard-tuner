var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var extractCSS = new ExtractTextPlugin('app.bundle.css');

module.exports = {
  entry: __dirname + '/app/index.js',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modles/,
        use: [
          {
            loader: 'babel-loader',
          }
        ],
      },
      {
        test: /\.scss$/,
        use: extractCSS.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader'], // css(sass(())
        }),
      },
    ],
  },
  plugins: [
    extractCSS,
  ],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: "bundle.js"
  }
};
