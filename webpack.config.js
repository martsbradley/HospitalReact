const webpack = require('webpack');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path'); 


  

module.exports = (env) => {
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

    return {
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
    }
};
