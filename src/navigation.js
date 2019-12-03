import  React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import SignInOutButton from './signin'

export class Navigation extends Component {

    render() {
        const isAuthenticated = this.props.auth.isAuthenticated();
        const isOnLoginScreen = this.props.isOnLoginScreen;

        return (<nav> 
            <ul>
               <li><NavLink exact activeClassName='isactive' to="/">Home</NavLink></li>

               { !this.props.onLoginscreen && isAuthenticated ? 
                 <li><NavLink activeClassName='isactive' to="/patients/list">Patients</NavLink></li>
                 : null 
               }

               { !this.props.onLoginscreen ?
                <li><SignInOutButton auth={this.props.auth}/></li>
                :null
                }

            </ul>
           </nav>);
    }
}

Navigation.propTypes = {
    auth  : PropTypes.object
}
