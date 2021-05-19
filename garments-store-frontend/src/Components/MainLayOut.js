import { CssBaseline, makeStyles } from '@material-ui/core'
import React, { createContext, useCallback, useEffect, useState } from 'react'
import Navbar from './Navbar'
import SideBar from './SideBar';
import localforage from 'localforage';
import Footer from './Footer';
import clsx from 'clsx';
import { drawerWidth } from '../Utils/backEnd';

const MainLayOutContext = createContext();

const useStyles = makeStyles(theme => ({
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        //* necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },

    contentArea: {
        border: '2px solid green',
    }
}));

const MainLayOut = props => {
    const {
        children: mainContent,
    } = props;
    const [sideBar, setSideBar] = useState(true);
    const [user, setUser] = useState(null); //todo: user should have the
    //todo: method to fetch user information
    const classes = useStyles();

    useEffect(() =>
        localforage.getItem("user", (err, value) => setUser(value)), []);

    //docs: https://flaviocopes.com/react-hook-usecallback/ ==> only those components will re-render which are somehow dependant on sideBar state.

    console.log(`user is:`, user);
    console.log(`whole prop is: `, props);
    const toggleSideBar = useCallback(() => setSideBar(!sideBar), [sideBar]);
    return (
        <>
            <MainLayOutContext.Provider value={{ sideBar, toggleSideBar, user, setUser }} >
                <CssBaseline />
                <Navbar />
                {
                    sideBar && <SideBar />
                }

                <div
                    className={clsx(classes.content, {
                        [classes.contentShift]: sideBar,
                    }, classes.contentArea)}
                >
                    <div className={classes.drawerHeader} />
                        main layout
                    {mainContent}
                </div>
            </MainLayOutContext.Provider>
        </>
    )
}


export { MainLayOut, MainLayOutContext };
