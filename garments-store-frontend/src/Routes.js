import React from 'react'
import { Route, Switch } from 'react-router'
import MainLayOut from './Components/MainLayOut'
import CategoryComponent from './Core/CategoryComponent'
import Home from './Core/Home'

const Routes = () => {
    return (
        <Switch>
            <MainLayOut>
                <Route path="/" ><Home /></Route>
                <Route path="/category/:categoryIndex" exact><CategoryComponent /></Route>
            </MainLayOut>
        </Switch>
    )
}


export default Routes
