import React from 'react'
import {
    AppBar,
    Button,
    IconButton,
    makeStyles,
    Toolbar,
    Typography,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import SearchBar from './SearchBar';

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
}));

export const Navbar = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100vw',
            }}
        >
            <AppBar position="static" className={classes.root}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="menu"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        className={classes.title}
                    >
                        OurAppLogo
                    </Typography>
                    <SearchBar />
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
        </div>
    )
}
