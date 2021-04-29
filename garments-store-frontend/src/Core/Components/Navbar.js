import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { AppBar, Badge, fade, Grid, IconButton, InputBase, makeStyles, Toolbar } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import ChatIcon from '@material-ui/icons/Chat';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';

// codes taken from docs ==> https://material-ui.com/components/app-bar/#app-bar

const modifiedTheme = makeStyles(theme => ({
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
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
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
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
    const [anchorEl, setAnchorEl] = useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = event => setAnchorEl(event.currentTarget);

    const handleMobileMenuClose = () => setMobileMoreAnchorEl(null);

    const handleMobileMenuOpen = event => setMobileMoreAnchorEl(event.currentTarget);

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    //! write code
    const handleClickOnChatIcon = event => {

    }

    //! write code
    const handleClickOnNotification = event => {

    }

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={4} color="secondary">
                        <MailIcon />
                    </Badge>
                </IconButton>
                <p>Messages</p>
            </MenuItem>
            <MenuItem>
                <IconButton aria-label="show 11 new notifications" color="inherit">
                    <Badge badgeContent={11} color="secondary">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );



    return (
        <div>
            <AppBar
                style={{ flexGrow: 1 }}
            >
                <Toolbar>
                    <Grid container direction="row" alignItems="center">
                        <Grid item container
                            justify="center"
                            md={2}
                            className={newStyles.makeBorders}
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
                            <AkSearchBar />
                        </Grid>
                        <Grid item container
                            justify="flex-end" md={4}
                            className={newStyles.makeBorders}
                            style={{
                                paddingRight: '2em',
                            }}
                        >
                            {/* <div className={updatedTheme.grow} /> */}
                            <div className={updatedTheme.sectionDesktop}>
                                <IconButton aria-label="show 4 new mails" color="inherit" onClick={handleClickOnChatIcon}
                                >
                                    <Badge badgeContent={4} color="secondary">
                                        < ChatIcon />
                                    </Badge>
                                </IconButton>
                                <IconButton aria-label="show 17 new notifications" color="inherit"
                                    onClick={handleClickOnNotification}
                                >
                                    <Badge badgeContent={17} color="secondary">
                                        <NotificationsIcon />
                                    </Badge>
                                </IconButton>
                                <IconButton
                                    edge="end"
                                    aria-label="account of current user"
                                    aria-controls={menuId}
                                    aria-haspopup="true"
                                    onClick={handleProfileMenuOpen}
                                    color="inherit"
                                >
                                    <AccountCircle />
                                </IconButton>
                            </div>
                            <div className={updatedTheme.sectionMobile}>
                                <IconButton
                                    aria-label="show more"
                                    aria-controls={mobileMenuId}
                                    aria-haspopup="true"
                                    onClick={handleMobileMenuOpen}
                                    color="inherit"
                                >
                                    <MoreIcon />
                                </IconButton>
                            </div>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>

        </div>
    )
}

Navbar.propTypes = {

}

export default Navbar
