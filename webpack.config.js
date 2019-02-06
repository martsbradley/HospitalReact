const webpack = require('webpack');
const dotenv = require('dotenv');
const fs = require('fs');

const envConfig = dotenv.parse(fs.readFileSync('.env'));

details = {};

for (let k in envConfig) {
    details[k] = JSON.stringify(envConfig[k]);
}

console.log("Details coming ");
console.log(details);

module.exports = {
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test:/\.css$/,
        exclude: /node_modules/,
        use:['style-loader','css-loader']
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
     new webpack.HotModuleReplacementPlugin(),
     new webpack.DefinePlugin(details)
  ],
  devServer: {
    contentBase: './dist',
    hot: true,
    historyApiFallback: true,
    proxy: {
        '/firstcup': 'http://localhost:8080'
    }
  }
};
