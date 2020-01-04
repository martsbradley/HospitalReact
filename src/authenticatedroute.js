import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from "react-redux";
import PropTypes from 'prop-types';

let AuthenticatedRoute = ({ isAuthenticated,
                        component: Component, 
                        ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}

AuthenticatedRoute.propTypes = {
    isAuthenticated: PropTypes.bool,
    location: PropTypes.object,
    component: PropTypes.func
}

    //component: PropTypes.object,

function mapStateToProps(state) {

    const result = {
        isAuthenticated         : state.userStatus.userAuthenticated
    };

    return result;
}

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticatedRoute);
