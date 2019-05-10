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
        clientLogLevel: 'info',
        hot: true,
        proxy: {
            '/auth0callback': { target: 'https://localhost:8443', secure: false},
            '/login':         { target: 'https://localhost:8443', secure: false},
            '/logout':        { target: 'https://localhost:8443', secure: false},
            '/rest':          { target: 'https://localhost:8443', secure: false}
        }
      }
    });
};
