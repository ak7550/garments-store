import React from 'react'
import { Route, Switch } from 'react-router'
import { MainLayOut } from './Components/MainLayOut'
import CategoryComponent from './Core/CategoryComponent'
import Home from './Core/Home'
import ProductPage from './Core/ProductPage'

const Routes = () => {
    return (
        <Switch>
            <MainLayOut>
                <Route path="/" exact ><Home /></Route>
                <Route path="/category/:categoryIndex" exact><CategoryComponent /></Route>
                <Route path="/category/:categoryIndex/product/:productIndex" exact><ProductPage /></Route>
            </MainLayOut>
        </Switch>
    )
}


export default Routes
