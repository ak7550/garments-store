import React, { useContext } from 'react'
import DashboardIcon from '@material-ui/icons/Dashboard';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { drawerWidth } from '../Utils/backEnd';
import {
    Badge,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    makeStyles,
} from '@material-ui/core';
import { Redirect, useHistory } from 'react-router-dom';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PersonIcon from '@material-ui/icons/Person';
import RssFeedIcon from '@material-ui/icons/RssFeed';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { logOutApiCall } from '../API/Auth';
import { MainLayOutContext } from './MainLayOut';
import { handleError } from '../Helper/handleError';
import CategoryOutlinedIcon from '@material-ui/icons/CategoryOutlined';
import CachedOutlinedIcon from '@material-ui/icons/CachedOutlined';
import clsx from 'clsx';
import GroupIcon from '@material-ui/icons/Group';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: drawerWidth,
        backgroundColor: theme.palette.background.paper,
    },
    listItemSecondary: {
        '&:hover': {
            color: theme.palette.secondary,
            backgroundColor: theme.palette.secondary
        }
    },
    listItemPrimary: {
        '&:hover': {
            color: theme.palette.primary,
            backgroundColor: theme.palette.primary
        }
    },

}));

const SideBarOptionsForLoggedInUser = () => {
    //* user to check either buyer or seller
    const { user, setUser, toggleSideBar } = useContext(MainLayOutContext);
    const classes = useStyles();
    const history = useHistory();
    const listArrForBuyer = [{
        name: "My Dashboard",
        icon: <DashboardIcon />,
        linkTo: `/user/dashboard/${user._id}`,
        onClick: link => history.push(link),
    },
    {
        name: "My Orders",
        icon: <LocalMallIcon />,
        linkTo: `/user/orderList/${user._id}`,
        onClick: link => history.push(link),
    },
    {
        name: "My WishLists",
        icon: <FavoriteIcon />,
        linkTo: `/user/wishList/${user._id}`,
        onClick: link => history.push(link),

    },
    {
        name: "My Shopping Cart",
        icon: <ShoppingCartIcon />,
        linkTo: `/user/cart`,
        onClick: link => history.push(link),

    },
    {
        name: "My Followers",
        icon: <PersonAddIcon />,
        linkTo: `/user/followerList`,
        onClick: link => history.push(link),
    },
    {
        name: "Me Following",
        icon: <Badge
            badgeContent={
                <RssFeedIcon style={{
                    fontSize: 17,
                    position: 'absolute',
                    top: '5px',
                    left: '2px',
                    opacity: '1'
                }} />
            }
        >
            <PersonIcon />
        </Badge>,
        linkTo: `/user/followingList`,
        onClick: link => history.push(link),
    },
    {
        name: 'All Users',
        icon: <GroupIcon />,
        linkTo: `/user/allUsers`,
        onClick: link => history.push(link),
    },
    {
        name: "LogOut",
        icon: <ExitToAppIcon />,
        linkTo: "/logOut",
        onClick: link => {
            history.push("/");
            logOutApiCall(data => {
                setUser(null);
            },
                err => handleError(err));
        }
    }],
        listArrForSeller = [{
            name: "My Dashboard",
            icon: <DashboardIcon />,
            linkTo: `/user/dashboard/${user._id}`,
            onClick: link => history.push(link),
        },
        {
            name: "CRUD Category",
            icon: <CategoryOutlinedIcon />,
            linkTo: `/seller/category/${user._id}`,
            onClick: link => history.push(link),
        },
        {
            name: "CRUD Product",
            icon: <CachedOutlinedIcon />,
            linkTo: `/seller/product/${user._id}`,
            onClick: link => history.push(link),
        },
        {
            name: "LogOut",
            icon: <ExitToAppIcon />,
            linkTo: "/logOut",
            onClick: link => {
                console.log(`i have been called`);
                history.push("/");
                logOutApiCall(data => {
                    setUser(null);
                },
                    err => handleError(err));
            }
        },];
    const listArr = user.role ? listArrForSeller : listArrForBuyer;
    return (
        <div className={classes.root} >
            <List component="nav" aria-label="main user option folder">
                {
                    listArr.map((item, index) => (
                        <ListItem
                            button
                            key={index}
                            onClick={() => {
                                item.onClick(item.linkTo);
                                toggleSideBar();
                            }}
                        >
                            <ListItemIcon style={item.iconStyle}
                                className={classes.listItemPrimary}
                            >
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.name}
                                className={classes.listItemPrimary}
                            />
                        </ListItem>
                    ))
                }

            </List>
        </div>
    );
}

export default SideBarOptionsForLoggedInUser
