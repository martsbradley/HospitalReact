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

console.log("Doing the hot stuff");
// eslint-disable-next-line no-undef
if (process.env.NODE_ENV !== 'production' && typeof module.hot !== 'undefined') {
    console.log("Within the hotstuff if ");
  // eslint-disable-next-line no-undef
  module.hot.accept('./app', renderApp)
  console.log('hot accepted');
}
console.log("After the hot stuff iff.");

// eslint-disable-next-line no-undef
console.log('index.js ENVIRONMENT is ' + process.env.ENVIRONMENT);


renderApp();


