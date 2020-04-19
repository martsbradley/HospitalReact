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
      devServer: {
        /*clientLogLevel: 'trace',*/
        clientLogLevel: 'silent',
        publicPath: '/',
        hot: true,
        proxy: {
            '/user' : { target: 'http://localhost:3001', secure: false},
            '/auth' : { target: 'http://localhost:3001', secure: false}
        }
      }
    });
    //console.log(result);
    return result;
};
