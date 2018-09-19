import React from 'react'
import { BrowserRouter as Router, Route,Link} from "react-router-dom";

const Folks = () => (<div>Thats all folks</div>);

export default class Home extends React.Component
{
    render() {
        return (
            <div>
                <h1>You are on the home page</h1>
                <ul>
                  <li><Link to="/about">About</Link></li>
                  <li><Link to="/patients">Patients</Link></li>
                </ul>
            </div>);
    }
}

          //<Router>
          //</Router>);

              //<Route path="/" render={() => (<h1>Home</h1>)}/>
              //<Route path="/home" render={() => (<h1>Abhile</h1>)}/>
