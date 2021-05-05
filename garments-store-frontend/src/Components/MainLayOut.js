import { CssBaseline } from '@material-ui/core'
import React, { createContext, useCallback, useEffect, useState } from 'react'
import Navbar from './Navbar'
import SideBar from './SideBar';


const SideBarContext = createContext();

const MainLayOut = ({
    children,
}) => {
    const [sideBar, setSideBar] = useState(true); //todo: make it false
    const [user, setUser] = useState({});

    //todo: method to fetch user information
    useEffect(() => {

    }, [user])

    //docs: https://flaviocopes.com/react-hook-usecallback/ ==> only those components will re-render which are somehow dependant on sideBar state.
    const toggleSideBar = useCallback(() => setSideBar(!sideBar), [sideBar]);
    return (
        <>
            <SideBarContext.Provider value={{sideBar, toggleSideBar}} >
            <CssBaseline />
            <Navbar user={undefined} toggleSideBar={toggleSideBar} sideBar={sideBar} />
            {
                sideBar && <SideBar toggleSideBar={toggleSideBar} sideBar={sideBar} user={user} />
            }
            main layout
            {children}
            </SideBarContext.Provider>
        </>
    )
}


export { MainLayOut, SideBarContext };
