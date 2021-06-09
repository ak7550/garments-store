import React, { useContext } from 'react'
import clsx from 'clsx';
import {
    AppBar,
    Avatar,
    Badge,
    Grid,
    IconButton,
    makeStyles,
    Toolbar,
    Typography,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import SearchBar from './SearchBar';
import FaceOutlinedIcon from '@material-ui/icons/FaceOutlined';
import AccountCircle from '@material-ui/icons/AccountCircle';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import { Link, useHistory } from 'react-router-dom';
import { MainLayOutContext } from './MainLayOut';
import { drawerWidth } from '../Utils/backEnd';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import logo from '../RedwithXBandLogo.jpg';

// -> extra stylings are being provided like this, others are already being given by the material ui
// docs: https://material-ui.com/components/app-bar/#app-bar


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
    link: {
        display: "inherit",
        textDecoration: "none",
        color: "inherit"
    }
}));

const Navbar = () => {
    const classes = useStyles();
    const { user, sideBar, toggleSideBar } = useContext(MainLayOutContext);
    const history = useHistory();
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
                            <Link to="/" className={classes.link}>
                                <Typography
                                    variant="h6"
                                    className={classes.title}
                                >
                                    G - STORE

                                </Typography>
                            </Link>
                        </Grid>
                        <Grid container
                            xs={6}
                        >
                            {/* <SearchBar /> */}
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
                                        <Badge
                                            badgeContent={user.shoppingCart.length}
                                            color="error"
                                            max={9}
                                        >
                                            <IconButton
                                                onClick={e => history.push(`/user/cart`)}
                                            >
                                                <ShoppingCartOutlinedIcon
                                                    color="inherit"
                                                    style={{
                                                        fontSize: '1.4em',
                                                        position: 'absolute',
                                                        top: '2px',
                                                        right: '3px',
                                                        color: 'white',
                                                        opacity: '1'
                                                    }}
                                                />
                                            </IconButton>
                                        </Badge>
                                        :
                                        <Avatar>
                                            <AccountCircle fontSize="medium"
                                                style={{
                                                    height: '2em',
                                                    width: '2em',
                                                }}
                                                color="inherit"
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
