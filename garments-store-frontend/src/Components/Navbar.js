import React from 'react'
import {
    AppBar,
    Button,
    Grid,
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
                        </Grid>
                        <Grid container
                            xs={6}
                            style={{
                                border: '1px solid red',
                            }}
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
                            <Button color="inherit">Login</Button>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </div>
    )
}
