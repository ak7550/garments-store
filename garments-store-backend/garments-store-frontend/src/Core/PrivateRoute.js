import React, { useContext, } from 'react'
import { Redirect, Route } from 'react-router';
import { MainLayOutContext } from '../Components/MainLayOut';


const PrivateRoute = ({ component: Component, ...rest }) => {
    const { user } = useContext(MainLayOutContext);
    return (
        <Route
            {...rest}
            render={props =>
                user ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/" />
                )
            }
        />
    );
}
export default PrivateRoute
