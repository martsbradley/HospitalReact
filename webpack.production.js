const webpack = require('webpack');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path'); 
const baseConfig = require('./webpack.js');
const merge = require('webpack-merge');

module.exports = (env) => {
    return merge(baseConfig(env), {
    });
};
