const webpack = require('webpack');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path'); 
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

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
                              //path.join(__dirname, 'dist'),
         contentBase:  false, 
         hotOnly: true,
         historyApiFallback: true,
         clientLogLevel: 'trace',
         /*clientLogLevel: 'silent',*/
         publicPath       : '/',
         proxy: {
             '/user' : { target: 'http://localhost:3001', secure: false},
             '/meds' : { target: 'http://localhost:3001', secure: false},
             '/auth' : { target: 'http://localhost:3001', secure: false}
         },
      },
      plugins: [
         new webpack.DefinePlugin(details),
         //new CleanWebpackPlugin(),
         new HtmlWebpackPlugin({ template: "./src/index.html",
                                 title:  "Title" }),
         //new webpack.HotModuleReplacementPlugin()
      ],
      output: {
        path: __dirname + '/dist',
        filename: 'bundle.js'
      }
    }
};
