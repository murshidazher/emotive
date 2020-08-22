import React, {Component} from 'react';

import {
  Route,
  Redirect
} from 'react-router-dom';

const AdminGuardRoute = ({ component, isAuthenticated, user, ...rest }) => (
    <Route {...rest} render={(props) => (
      isAuthenticated && !!user.id
        ? <Component {...props} />
        : <Redirect to='/401' />
    )} />
);

export default AdminGuardRoute;

