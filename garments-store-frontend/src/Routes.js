import { CssBaseline, MuiThemeProvider } from '@material-ui/core'
import React from 'react'
import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './Core/Home'
import SignInPage from './Core/SignInPage'
import SignupPage from './Core/SignUpPage'
import { getUser } from './Core/Utils/coreApiCalls';


const Routes = () => {
    const [user, setUser] = useState({
        name: undefined,
    });

    useEffect(() => {
        //todo: method call to fetch the user data from database
        const data = getUser();
        console.log(`data from getUser is ${data}`);
        console.log(`useeffct from routes`);
    }, []);
    return (
        <Router>
            {/* will take default theme.... source: https://rossbulat.medium.com/theming-with-material-ui-in-react-49cc767dfc86 */}
            <MuiThemeProvider className>
                <CssBaseline />
                <Switch>
                    <Route path="/"> <Home /> </Route>
                    <Route path="/signin" component={ SignInPage }> <SignInPage /> </Route>
                    <Route path="/signup"> <SignupPage /> </Route>
                </Switch>
            </MuiThemeProvider>
        </Router>
    );
}

export default Routes
