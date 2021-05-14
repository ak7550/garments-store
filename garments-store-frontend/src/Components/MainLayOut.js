import { CssBaseline } from '@material-ui/core'
import React, { createContext, useCallback, useEffect, useState } from 'react'
import Navbar from './Navbar'
import SideBar from './SideBar';
import localforage from 'localforage';
import Footer from './Footer';


const MainLayOutContext = createContext();

const MainLayOut = ({
    children,
}) => {
    const [sideBar, setSideBar] = useState(true);
    const [user, setUser] = useState(null); //todo: user should have the
    //todo: method to fetch user information
    useEffect(() =>
        localforage.getItem("user", (err, value) => setUser(value)), []);

    //docs: https://flaviocopes.com/react-hook-usecallback/ ==> only those components will re-render which are somehow dependant on sideBar state.

    console.log(`user is:`, user);
    const toggleSideBar = useCallback(() => setSideBar(!sideBar), [sideBar]);
    return (
        <>
            <MainLayOutContext.Provider value={{ sideBar, toggleSideBar, user, setUser }} >
                <CssBaseline />
                <Navbar />
                {
                    sideBar && <SideBar />
                }
            main layout
            {children}
                <Footer />
            </MainLayOutContext.Provider>
        </>
    )
}


export { MainLayOut, MainLayOutContext };
