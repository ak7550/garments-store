import React, { useState } from 'react'
import clsx from 'clsx';
import {
    AppBar,
    Avatar,
    Button,
    Grid,
    IconButton,
    makeStyles,
    Toolbar,
    Typography,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import SearchBar from './SearchBar';
import SideBar from './SideBar';
import FaceOutlinedIcon from '@material-ui/icons/FaceOutlined';

// -> extra stylings are being provided like this, others are already being given by the material ui
// docs: https://material-ui.com/components/app-bar/#app-bar

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    hide: {
        display: 'none',
    },
}));

const Navbar = ({ user, toggleSideBar, sideBar }) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <AppBar position="fixed"
                className={
                    clsx(classes.appBar, {
                        [classes.appBarShift]: sideBar,
                    })}
            >
                {/* //docs: https://stackoverflow.com/questions/57557271/how-to-use-clsx-in-react */}
                <Toolbar>
                    <Grid container
                        direction="row"
                        alignItems="center"
                    >
                        <Grid
                            container
                            direction="row"
                            alignItems="center"
                            xs={2}
                            justify="flex-start"
                        >
                            <IconButton
                                edge="start"
                                className={clsx(classes.menuButton, {
                                    [classes.hide]: sideBar
                                })}
                                color="inherit"
                                aria-label="menu"
                                onClick={toggleSideBar}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography
                                variant="h6"
                                className={classes.title}
                            >
                                OurAppLogo
                            </Typography>
                        </Grid>
                        <Grid container
                            xs={6}
                        >
                            <SearchBar />
                        </Grid>
                        <Grid
                            container
                            xs={4}
                            justify="flex-end"
                            alignItems="center"
                            direction="row"
                        >
                            <IconButton onClick={toggleSideBar}>
                                {
                                    user ?
                                        <Avatar
                                            alt={user.name}
                                            src={user.profilePic}
                                        />
                                        :
                                        <Avatar>
                                            <FaceOutlinedIcon fontSize="medium"
                                                style={{
                                                    height: '2em',
                                                    width: '2em',
                                                }}
                                            />
                                        </Avatar>
                                }
                            </IconButton>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </div>
    )
}
export default Navbar;
