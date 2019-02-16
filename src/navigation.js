import  React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import SignInOutButton from './signin'

let isAuthorized = (auth, groupName) => {

    const authenticated = auth.isAuthenticated();

    let inGroup = auth.userInGroup(groupName);

    let result = false;

    if (authenticated && inGroup) {
        result = true;
    }
    return result;
}

export class Navigation extends Component {
    render() {
        const securityGroup="adminGroup"
        const isShown = isAuthorized(this.props.auth, securityGroup);

        return (<nav> 
            <ul>
               <li><NavLink exact activeClassName='isactive' to="/">Home</NavLink></li>

               {!isShown ?  null:
                   <li><NavLink activeClassName='isactive' to="/profile">Profile</NavLink></li>}

               {!isShown ? null :
               <li><NavLink activeClassName='isactive' to="/patients/list">Patients</NavLink></li> }

               <li><SignInOutButton auth={this.props.auth}/></li>
            </ul>
           </nav>);
    }
}

Navigation.propTypes = {
    auth  : PropTypes.object
}
