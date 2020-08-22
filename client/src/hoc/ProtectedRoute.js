import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { AuthConsumer } from '../context/AuthContext'

const ProtectedRoute = ({ component: Component, ...rest }) => (
  <AuthConsumer>
    {({ isAuthenticated }) => (
      <Route
        render={props =>
          isAuthenticated ? <Component {...props} /> : <Redirect to={{
          pathname: '/signin',
          state: { from: props.location }
        }} />
        }
        {...rest}
      />
    )}
  </AuthConsumer>
)

export default ProtectedRoute

