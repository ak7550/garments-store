import { CssBaseline } from '@material-ui/core'
import React from 'react'
import { Navbar } from './Navbar'

const MainLayOut = ({
    children,
}) => {
    return (
        <>
            <CssBaseline />
            <Navbar />
            main layout
            {children}
        </>
    )
}


export default MainLayOut
