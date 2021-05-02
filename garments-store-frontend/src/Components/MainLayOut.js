import { CssBaseline } from '@material-ui/core'
import React, { useState } from 'react'
import Navbar  from './Navbar'
import SideBar from './SideBar';

const MainLayOut = ({
    children,
}) => {
    const [sideBar, setSideBar] = useState(false);
    const toggleSideBar = () => setSideBar(!sideBar);
    return (
        <>
            <CssBaseline />
            <Navbar user={undefined} />
            <SideBar toggleSideBar={toggleSideBar} sideBar={sideBar} user={undefined} />
            main layout
            {children}
        </>
    )
}


export default MainLayOut
