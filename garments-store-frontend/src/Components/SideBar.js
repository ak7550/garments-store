import React from 'react'
import {
    Avatar,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    makeStyles,
    Typography
} from '@material-ui/core';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import PersonIcon from '@material-ui/icons/Person';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import SideBarOptionsForLoggedInUser from './SideBarOptionsForLoggedInUser';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'center',
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
    large: {
        width: theme.spacing(10),
        height: theme.spacing(10),
    },

}));

const SideBar = ({
    toggleSideBar,
    sideBarStatus,
    user
}) => {
    const classes = useStyles();
    return (
        <Drawer
            className={classes.drawer}
            anchor="left"
            open={sideBarStatus}
            classes={{
                paper: classes.drawerPaper,
            }}
            onClose={toggleSideBar}
        >
            <div
                className={classes.drawerHeader}
                style={{
                    marginTop: '2em',
                    marginBottom: '2em'
                }}
            >
                <IconButton
                    onClick={toggleSideBar}
                    disableFocusRipple
                    disableRipple
                >
                    {
                        user ?
                            <Avatar alt={user.name} src={user.profilePic}
                                className={classes.large}
                            />
                            :
                            <Avatar className={classes.large}>
                                <Typography variant="h3" align="justify">U</Typography>
                            </Avatar>
                    }
                </IconButton>
            </div>
            <Divider />
            <List>
                {
                    user ?
                        <>
                            {/*// todo: lot of things to add */}
                            <SideBarOptionsForLoggedInUser user={user} />
                        </>
                        :
                        <>
                            {/* //! add onClick event */}
                            <ListItem button onClick>
                                <ListItemIcon>
                                    <PersonIcon />
                                </ListItemIcon>
                                <ListItemText primary="Login" />
                            </ListItem>
                            <ListItem button onClick>
                                <ListItemIcon>
                                    <PersonAddIcon />
                                </ListItemIcon>
                                <ListItemText primary="SignUp" />
                            </ListItem>
                        </>

                }
            </List>
            <Divider />
        </Drawer>
    )
}

export default SideBar
