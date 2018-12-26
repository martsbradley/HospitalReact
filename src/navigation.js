import  React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import SignInOutButton from './signin'


let Links = (props) => {
    return props.auth.isAuthenticated() ? <li><NavLink activeClassName='isactive' to={props.to}>{props.label}</NavLink></li> :null;
}

export class Navigation extends Component {
    render() {

        return (<nav> 
            <ul>
               <li><NavLink exact activeClassName='isactive' to="/">Home</NavLink></li>
                <Links auth={this.props.auth} to="/profile" label="Profile"/>
                <Links auth={this.props.auth} to="/patients/list" label="Patients"/>
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
