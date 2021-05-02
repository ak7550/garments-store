import React from 'react'
import { Route, Switch } from 'react-router'
import Home from './Core/Home'
import MainLayOut from './Components/MainLayOut'

const Routes = () => {
    return (
        <Switch>
            <MainLayOut>
                <Route to="/" exact><Home /></Route>
            </MainLayOut>
        </Switch>
    )
}


export default Routes
