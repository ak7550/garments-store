import React from 'react'
import { Navbar } from './Navbar'

const MainLayOut = ({
    children,
}) => {
    return (
        <>
            <Navbar />
            main layout
            {children}
        </>
    )
}


export default MainLayOut
