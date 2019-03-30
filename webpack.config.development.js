const webpack = require('webpack');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path'); 
const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.js');

module.exports = (env) => {
    console.log("GOT HERE");
    return merge(baseConfig(env), {
      plugins: [
         new webpack.HotModuleReplacementPlugin()
      ],
      devServer: {
        hot: true,
        proxy: {
            '/firstcup': 'http://localhost:8080'
        }
      }
    });
};
