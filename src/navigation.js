import  React, {Component} from 'react'
import { NavLink } from 'react-router-dom'


export class Navigation extends Component {
    render() {
        return (<nav> 
            <ul>
               <li><NavLink exact activeClassName='isactive' to="/">Home</NavLink></li>
               <li><NavLink activeClassName='isactive' to="/patients/list">Patients</NavLink></li>
            </ul>
           </nav>);
    }
}


