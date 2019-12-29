import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from "react-redux";

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

function mapStateToProps(state) {
    const patient = state.patient;

    const result = {
        isAuthenticated         : state.userStatus.userAuthenticated
    };

    return result;
}

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticatedRoute);
