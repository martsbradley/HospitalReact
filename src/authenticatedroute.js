import React from 'react'
import { Route, Redirect } from 'react-router-dom'

let AuthenticatedRoute = ({ auth: auth, 
                        component: Component, 
                        ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        auth.isAuthenticated() ? (
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
export default AuthenticatedRoute;
