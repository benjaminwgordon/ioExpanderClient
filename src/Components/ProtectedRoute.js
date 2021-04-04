import React, {useContext} from 'react'
import {Route, Redirect} from 'react-router-dom'
import authenticationContext from '../authenticationContext'

const ProtectedRoute = (props) => {

    const {component:Component, path, ...rest} = props
    const authContext = useContext(authenticationContext)

    return (
        <Route path={path}>
            {
                authContext.user.token
                ? <Component {...rest} />
                : <Redirect to='/login' />
            }
        </Route>
    )
}

export default ProtectedRoute
