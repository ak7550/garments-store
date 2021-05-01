import React, { useEffect } from 'react'
import Navbar from './Components/Navbar';

const Home = () => {
    useEffect(() => {
        console.log("hi");
    }, [])
    return (
        // we need to pass some props here. (wo bad mein dekha jayega)
        <Navbar />
    );
}

export default Home
