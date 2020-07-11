import React from 'react'
import {render}  from 'react-dom'
import App from './app'
import configureStore from './redux/configureStore';
import {Provider as ReduxProvider} from 'react-redux';

const store = configureStore();


const renderApp = () =>{
    render(<ReduxProvider store={store}>
               <App/>
           </ReduxProvider>,
           document.getElementById('root'));
}

// eslint-disable-next-line no-undef
if (process.env.NODE_ENV !== 'production' && module.hot) {
  // eslint-disable-next-line no-undef
  module.hot.accept('./app', renderApp)
  console.log('hot accepted');
}

// eslint-disable-next-line no-undef
console.log('index.js ENVIRONMENT is ' + process.env.ENVIRONMENT);
console.log('index.js module.hot is:');
// eslint-disable-next-line no-undef
console.log(module.hot);


renderApp();


