import  React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function Navigation({ isAuthenticated, isOnLoginScreen}) {

    return (<nav className="navbar navbar-expand-sm navbar-light bg-light">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" >
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                    <NavLink exact className="nav-link" activeClassName='isactive' to="/">Home</NavLink>
                </li>
                <li className="nav-item active">
                    <NavLink exact className="nav-link" activeClassName='isactive' to="/count">Count</NavLink>
                </li>

                { !isOnLoginScreen && isAuthenticated ?
                        <li className="nav-item">
                            <NavLink className="nav-link" activeClassName='isactive' to="/patient">Patients</NavLink>
                        </li>
                        : null
                }

                { !isOnLoginScreen ?
                    <li className="nav-item">
                        {isAuthenticated ?
                            <NavLink className="nav-link" activeClassName='isactive' to="/auth/logout">Log Out</NavLink>
                        :
                            <NavLink className="nav-link" activeClassName='isactive' to="/auth/login">Log In</NavLink>
                        }

                    </li>
                    :null
                }
            </ul>
        </div>
    </nav>
    );
}

Navigation.propTypes = {
    isAuthenticated  : PropTypes.bool,
    isOnLoginScreen  : PropTypes.bool
}

