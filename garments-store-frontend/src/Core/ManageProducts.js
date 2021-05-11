import React, { useContext } from 'react'
import clsx from 'clsx'
import { Grid, makeStyles } from '@material-ui/core';
import { MainLayOutContext } from '../Components/MainLayOut';
import { drawerWidth } from '../Utils/backEnd'


const useStyle = makeStyles(theme => ({
    link: {
        display: "inherit",
        textDecoration: "none",
        color: "inherit"
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        //* necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
}));


const ManageProducts = () => {
    const classes = useStyle();
    const { sideBar } = useContext(MainLayOutContext);

    return (
        <div
            className={clsx(classes.content, {
                [classes.contentShift]: sideBar,
            })}
            style={{
                maxWidth: "100%"
            }}
        >
            <div className={classes.drawerHeader} />

            <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="center"
                wrap
                style={{
                    marginLeft: "20em"
                }}
            >
                hello
            </Grid>
        </div>
    )
}

export default ManageProducts
