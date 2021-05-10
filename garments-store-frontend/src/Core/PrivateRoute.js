import React, { useEffect, useState } from 'react'
import localforage from 'localforage'
import { Redirect, Route } from 'react-router';


const PrivateRoute = ({ component: Component, ...rest }) => {
    const [token, setToken] = useState();

    useEffect(() => {
        console.log(`hi from ueEffct of private route`);
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
                token ? (
                    <Component {...props} />
                ) : (
                        <Redirect to="/" />
                    )
            }
        />
    );
}
export default PrivateRoute
