const path = require('path');

const entry = './src/';
const libraryName = 'VMark';
const filename = 'vmark';

const baseConfig = {
  entry,
  module: {
    loaders: [{
      exclude: /node_modules/,
      test: /\.js$/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['babel-preset-env']
        }
      }
    }]
  }
};

const npmConfig = Object.assign({}, baseConfig, {

  output: {
    filename: `${filename}.npm.js`,
    library: libraryName,
    libraryTarget: 'umd',
    path: path.join(__dirname, 'dist')
  }

});

module.exports = npmConfig;
