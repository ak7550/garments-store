import { CssBaseline } from '@material-ui/core'
import React, { useCallback, useState } from 'react'
import Navbar from './Navbar'
import SideBar from './SideBar';

const MainLayOut = ({
    children,
}) => {
    const [sideBar, setSideBar] = useState(true); //todo: make it false

    //docs: https://flaviocopes.com/react-hook-usecallback/ ==> only those components will re-render which are somehow dependant on sideBar state.
    const toggleSideBar = useCallback(() => setSideBar(!sideBar), [sideBar]);
    return (
        <>
            <CssBaseline />
            <Navbar user={undefined} toggleSideBar={toggleSideBar} sideBar={sideBar} />
            {
                sideBar && <SideBar toggleSideBar={toggleSideBar} sideBar={sideBar} user={undefined} />
            }
            main layout
            {children}
        </>
    )
}


export default MainLayOut
