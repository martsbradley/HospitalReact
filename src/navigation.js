import  React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import SignInOutButton from './signin'

export class Navigation extends Component {

    render() {
        const isAuthenticated = this.props.auth.isAuthenticated();

        return (<nav> 
            <ul>
               <li><NavLink exact activeClassName='isactive' to="/">Home</NavLink></li>

               { isAuthenticated ? 
                 <li><NavLink activeClassName='isactive' to="/patients/list">Patients</NavLink></li>
                 : null 
               }

               <li><SignInOutButton auth={this.props.auth}/></li>
            </ul>
           </nav>);
    }
}

Navigation.propTypes = {
    auth  : PropTypes.object
}
