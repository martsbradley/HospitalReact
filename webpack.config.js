const webpack = require('webpack');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path'); 
const HtmlWebpackPlugin = require('html-webpack-plugin');

const readEnvironment = (env) => {
    // Default to production if the provided environment is missing 
    //
    // Two files wth key=value
    //        .env.development
    //        .env.production
    //
    //
    const productionPath = path.join(__dirname) + '/.env.production';
    const envPath        = path.join(__dirname) + '/.env.' + env.ENVIRONMENT;

    let finalPath = productionPath;
    if (fs.existsSync(envPath)) {
        console.log('Building for ' + env.ENVIRONMENT);
        finalPath = envPath;
    }
    else {
        console.log('Building for Production');
    }

    const envConfig = dotenv.parse(fs.readFileSync(finalPath));

    details = {};

    for (let k in envConfig) {
        details[k] = JSON.stringify(envConfig[k]);
    }
    console.log("Details coming ");
    console.log(details);
    return details;
}

module.exports = (env) => {
    const details  = readEnvironment(env);

    return {
      entry: './src/index.js',
      output: {
        filename   : 'bundle.js',
        path       : path.resolve(__dirname, './dist'),
        publicPath : 'https://localhost:3000/',
      },
      module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: ['babel-loader', 'eslint-loader']
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
      devServer: {
         contentBase:  false, 
         hotOnly: true,
         historyApiFallback: true,
         clientLogLevel: 'trace',
         publicPath       : '/',
         proxy: {
             '/user' : { target: 'http://localhost:3001', secure: false},
             '/meds' : { target: 'http://localhost:3001', secure: false},
             '/auth' : { target: 'http://localhost:3001', secure: false}
         },
      },
      plugins: [
         new webpack.DefinePlugin(details),
         new HtmlWebpackPlugin({ template: "./src/index.html",
                                 inject: false,
                                 title:  "Title" }),
      ],
    }
};
