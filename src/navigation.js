import  React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import SignInOutButton from './signin'

export class Navigation extends Component {
    render() {
        return (<nav> 
            <ul>
               <li><NavLink exact activeClassName='isactive' to="/">Home</NavLink></li>
               <li><NavLink activeClassName='isactive' to="/patients/list">Patients</NavLink></li>
               <li><SignInOutButton auth={this.props.auth}/></li>
            </ul>
           </nav>);
    }
}

Navigation.propTypes = {
    auth  : PropTypes.object
}
