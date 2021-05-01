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
        <div className={classes.root}>
            <AppBar position="static">
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
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
        </div>
    )
}
