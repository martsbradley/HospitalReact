const webpack = require('webpack');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path'); 
const baseConfig = require('./webpack.config.js');

module.exports = (env) => {
    return merge(baseConfig(env), {
      output: {
        publicPath: '/',
      },
      devServer: {
        contentBase:  path.join(__dirname, '/dist'),
      }
    }
};
