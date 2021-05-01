import React from 'react'
import PropTypes from 'prop-types'
import { Route, Switch } from 'react-router'
import Home from './Core/Home'
import MainLayOut from './Components/MainLayOut'

const Routes = props => {
    return (
        <Switch>
            
            <MainLayOut>

                <Route to="/" exact><Home /></Route>
            </MainLayOut>
        </Switch>
    )
}

Routes.propTypes = {

}

export default Routes
