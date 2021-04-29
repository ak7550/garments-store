import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { AppBar, fade, Grid, InputBase, makeStyles, Toolbar } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'

// codes taken from docs ==> https://material-ui.com/components/app-bar/#app-bar

const modifiedTheme = makeStyles(theme => ({

    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100% !important',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

const useStyles = makeStyles({
    makeBorder: {
        border: '1px solid red'
    },



});

const AkSearchBar = () => {
    const classes = useStyles();
    const updatedTheme = modifiedTheme();
    return (
        <div className={updatedTheme.search} style={{
            width: '100% ',
        }}>
            <div className={updatedTheme.searchIcon}>
                <SearchIcon />
            </div>
            <InputBase
                placeholder="Search…"
                classes={{
                    root: updatedTheme.inputRoot,
                    input: updatedTheme.inputInput
                }}
                inputProps={{ 'aria-label': 'search' }}
                style={{
                    width: '100%',
                }}
            />
        </div>

    );
}


const Navbar = props => {
    const newStyles = useStyles();
    const updatedTheme = modifiedTheme();
    return (
        <AppBar
            style={{ flexGrow: 1 }}
        >
            <Toolbar>
                <Grid container direction="row" alignItems="center">
                    <Grid item container
                        justify="center"
                        md={2}
                        className={newStyles.makeBorder}
                    >
                        Logo section
                    </Grid>
                    <Grid
                        item
                        container
                        justify="flex-start"
                        md={6}
                        className={`${newStyles.makeBorderl} `}
                        style={{
                            display: 'flex',
                            alignItems: "center",
                            justifyContent: "flex-start",
                        }}
                    >
                        <AkSearchBar  />
                    </Grid>
                    <Grid item container justify="flex-end" md={4} className={newStyles.makeBorder} >
                        <div className={updatedTheme.grow} >da </div>
                        notification, messages, user icon
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}

Navbar.propTypes = {

}

export default Navbar
