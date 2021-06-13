import React, { useContext } from 'react'
import { Redirect, Route } from 'react-router';
import { MainLayOutContext } from '../Components/MainLayOut';


const SellerRoute = ({ component: Component, ...rest }) => {
    const { user } = useContext(MainLayOutContext);
    const token = user?.token;
    return (
        <Route
            {...rest}
            render={props =>
                token && user.role === 1 ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/" />
                )
            }
        />
    );
}
export default SellerRoute
