import  React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

export class Navigation extends Component {

    render() {
        const isAuthenticated = this.props.auth.isAuthenticated();
        const isOnLoginScreen = this.props.isOnLoginScreen;

        return (
            
        <nav className="navbar navbar-expand-sm navbar-light bg-light">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" >
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <NavLink exact className="nav-link" activeClassName='isactive' activeClassName='isactive' to="/">Home</NavLink>
                    </li>
                    <li className="nav-item active">
                        <NavLink exact className="nav-link" activeClassName='isactive' activeClassName='isactive' to="/count">Count</NavLink>
                    </li>

                    { !this.props.onLoginscreen && isAuthenticated ? 
                            <li className="nav-item">
                                <NavLink className="nav-link" activeClassName='isactive' to="/patients/list">Patients</NavLink>
                            </li>
                            : null
                    }

                    { !this.props.onLoginscreen ?
                        <li className="nav-item">
                            {this.props.auth.isAuthenticated() ?
                                <NavLink className="nav-link" activeClassName='isactive' to="/logout">Log Out</NavLink>
                            :
                                <NavLink className="nav-link" activeClassName='isactive' to="/login">Log In</NavLink>
                            }

                        </li>
                        :null
                    }
                </ul>
            </div>
        </nav>
        );
    }
}

Navigation.propTypes = {
    auth  : PropTypes.object
}


///////     <nav> 
///////     <ul>
///////        <li><NavLink exact activeClassName='isactive' to="/">Home</NavLink></li>

///////        { !this.props.onLoginscreen && isAuthenticated ? 
///////          <li><NavLink activeClassName='isactive' to="/patients/list">Patients</NavLink></li>
///////          : null 
///////        }

///////        { !this.props.onLoginscreen ?
///////         <li><SignInOutButton auth={this.props.auth}/></li>
///////         :null
///////         }

///////     </ul>
///////    </nav>);