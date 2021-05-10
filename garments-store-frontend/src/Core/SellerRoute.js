import React, { useContext, useEffect, useState } from 'react'
import localforage from 'localforage'
import { Redirect, Route } from 'react-router';
import { MainLayOutContext } from '../Components/MainLayOut';


const SellerRoute = ({ component: Component, ...rest }) => {
    const [token, setToken] = useState();
    const { user } = useContext(MainLayOutContext);

    useEffect(() => {
        console.log(`hi from ueEffct of seller route`);
        localforage.getItem("token")
            .then(val => {
                setToken(val);
                console.log(`token received`);
            })
            .catch(err => console.log(err));
    }, []); //docs: https://www.akashmittal.com/useeffect-missing-dependency/

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
