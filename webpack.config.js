var path = require('path');

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
        use: [
          { loader: 'style-loader' }, // creates style nodes from JS strings
          { loader: 'css-loader' }, // translates CSS into CommonJS
          { loader: 'sass-loader' }, // compiles Sass to CSS
        ],
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: "bundle.js"
  }
};
