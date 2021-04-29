import { CssBaseline, MuiThemeProvider } from '@material-ui/core'
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './Core/Home'


const Routes = () =>
    <Router>
        {/* will take default theme.... source: https://rossbulat.medium.com/theming-with-material-ui-in-react-49cc767dfc86 */}




        
        <MuiThemeProvider className> 
            <CssBaseline />
            <Switch>
                <Route path="/"> <Home /> </Route>
            </Switch>
        </MuiThemeProvider>
    </Router>

export default Routes
