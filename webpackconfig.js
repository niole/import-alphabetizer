var path = require('path');
var alphabetizeImports = require('./alphabetizeImports');

var config = {
  // Gives you sourcemaps without slowing down rebundling
  devtool: 'eval-source-map',
  entry: path.join(__dirname, 'app/main.js'),
  output: {
    path: path.join(__dirname, '/dist/'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
      loaders: [{
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'alphabetizeImports'
      }]
    },
    resolveLoader: {
        alias: {
          "alphabetizeImports": path.join(__dirname, "./alphabetizeImports.js")
        }
    }
};

module.exports = config;
