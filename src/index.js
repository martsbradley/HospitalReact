import React from 'react'
import ReactDOM  from 'react-dom'
import {BrowserRouter, Route} from 'react-router-dom'
import App from './app'
import load from './api/PatientAPI';
import configureStore from './redux/configureStore';
import {Provider as ReduxProvider} from 'react-redux';
import DrawItComp from './counter/drawItContainer';

console.log("Please load here.  ok ");

try {
    load();

    console.log("well ok.. success");

} catch (e) {
    console.log("caught exception " + e);
}


const store = configureStore();

ReactDOM.render(<BrowserRouter basename='/'>
                <ReduxProvider store={store}>
                    <DrawItComp ></DrawItComp>
                 </ReduxProvider>
                </BrowserRouter>,
                document.getElementById('root'));

               //      <Route component={App}/>
