const webpack = require('webpack');
//const dotenv = require('dotenv');
const fs = require('fs');
//const path = require('path'); 
const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.js');

module.exports = (env) => {
    console.log("GOT HERE");
    let result = merge(baseConfig(env), {
      plugins: [
         new webpack.HotModuleReplacementPlugin()
      ],
      mode: 'development',
      devServer: {
        clientLogLevel: 'silent',
        hot: true,
      }
    });
    return result;
};
