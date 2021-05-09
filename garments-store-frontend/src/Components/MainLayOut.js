import { CssBaseline } from '@material-ui/core'
import React, { createContext, useCallback, useEffect, useState } from 'react'
import Navbar from './Navbar'
import SideBar from './SideBar';


const MainLayOutContext = createContext();

const MainLayOut = ({
    children,
}) => {
    const [sideBar, setSideBar] = useState(true);
    const [user, setUser] = useState({role: 1}); //todo: put null

    //todo: method to fetch user information
    useEffect(() => {

    }, [user])

    //docs: https://flaviocopes.com/react-hook-usecallback/ ==> only those components will re-render which are somehow dependant on sideBar state.

    console.log(`user is:`, user);
    const toggleSideBar = useCallback(() => setSideBar(!sideBar), [sideBar]);
    return (
        <>
            <MainLayOutContext.Provider value={{sideBar, toggleSideBar, user, setUser}} >
            <CssBaseline />
            <Navbar />
            {
                sideBar && <SideBar />
            }
            main layout
            {children}
            </MainLayOutContext.Provider>
        </>
    )
}


export { MainLayOut, MainLayOutContext };
