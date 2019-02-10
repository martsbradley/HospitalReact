import  React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import SignInOutButton from './signin'


let Links = (props) => {
    return props.auth.isAuthenticated() ? <NavLink activeClassName='isactive' to={props.to}>{props.label}</NavLink> :null;
}

export class Navigation extends Component {
    render() {

        return (<nav> 
            <ul>
               <li><NavLink exact activeClassName='isactive' to="/">Home</NavLink></li>
               <li><Links auth={this.props.auth} to="/profile" label="Profile"/></li>
               <li><Links auth={this.props.auth} to="/patients/list" label="Patients"/></li>
               <li><SignInOutButton auth={this.props.auth}/></li>
            </ul>
           </nav>);
    }
}

Navigation.propTypes = {
    auth  : PropTypes.object
}
Links.propTypes = {
    to : PropTypes.string,
    label : PropTypes.string,
    auth : PropTypes.object,
}
