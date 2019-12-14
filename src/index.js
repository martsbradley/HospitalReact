import React from 'react'
import ReactDOM  from 'react-dom'
import {BrowserRouter, Route} from 'react-router-dom'
import App from './app'

ReactDOM.render( <BrowserRouter basename='/'>
                     <Route component={App}/>
                 </BrowserRouter>, 
    
                document.getElementById('root'))
