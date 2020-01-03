import React from 'react'
import ReactDOM  from 'react-dom'
import App from './app'
import configureStore from './redux/configureStore';
import {Provider as ReduxProvider} from 'react-redux';

const store = configureStore();

ReactDOM.render(<ReduxProvider store={store}>
                    <App/>
                </ReduxProvider>,
                document.getElementById('root'));

