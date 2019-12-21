import React from 'react'
import ReactDOM  from 'react-dom'
import {BrowserRouter, Route} from 'react-router-dom'
import App from './app'
import load from './api/PatientAPI';
import configureStore from './redux/configureStore';
import {Provider as ReduxProvider} from 'react-redux';

console.log("Please load here.  ok ");


const store = configureStore();

ReactDOM.render(<BrowserRouter basename='/'>
                <ReduxProvider store={store}>
                    <App/>
                 </ReduxProvider>
                </BrowserRouter>,
                document.getElementById('root'));

               //      <Route component={App}/>
