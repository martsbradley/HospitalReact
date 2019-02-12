import  React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import SignInOutButton from './signin'


let Links = (props) => {

    const authenticated = props.auth.isAuthenticated();
    let groupOk = true;

    if (props.hasOwnProperty('group')) {
        const groupName = props.group;
        groupOk = props.auth.userInGroup(groupName);
    }

    let result = null;

    if (props.auth.isAuthenticated() && groupOk) {
        result = <NavLink activeClassName='isactive' to={props.to}>{props.label}</NavLink>;
    }
    return result;
}

export class Navigation extends Component {
    render() {

        return (<nav> 
            <ul>
               <li><NavLink exact activeClassName='isactive' to="/">Home</NavLink></li>
               <li><Links auth={this.props.auth} to="/profile" label="Profile"/></li>
               <li><Links auth={this.props.auth} to="/patients/list" label="Patients"/></li>
               <li><SignInOutButton auth={this.props.auth}/></li>
               <li><Links auth={this.props.auth} group="adminGroup"
                                                 to="/patients/list" label="Show When In Group"/></li>
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
    group : PropTypes.string,
}
