import React, { useContext, } from 'react';
import Box from '@material-ui/core/Box';
import cx from 'clsx';
import { Avatar, Divider, IconButton, makeStyles, Typography } from '@material-ui/core';
import { blue, indigo } from '@material-ui/core/colors';
import clsx from 'clsx';
import { drawerWidth } from '../Utils/backEnd';
import { MainLayOutContext } from './MainLayOut';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import { Link } from 'react-router-dom';

const useRowFlexStyles = makeStyles(theme => ({
    parent: {
        display: 'flex',
        alignItems: 'center',
    },
    relativeParent: {
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
    },
    centeredChild: {
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
    },
    rightChild: {
        marginLeft: 'auto',
    },
    autoChild: {
        flex: 'auto',
    },
    leftChild: {
        marginRight: 'auto'
    }
}));

const useStyles = makeStyles(theme => ({
    rot: {
        flexGrow: 1,
        marginTop: '5em',
        position: 'absolute', //todo: need to change this property
        bottom: '0',
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
    title: {
        flexGrow: 1,
    },
    link: {
        display: "inherit",
        textDecoration: "none",
        color: "inherit"
    }
}))

const Footer = () => {
    const flexStyles = useRowFlexStyles();
    const classes = useStyles();
    const { sideBar } = useContext(MainLayOutContext);
    const arr = [{
        icon: <FacebookIcon />
    },
    {
        icon: <TwitterIcon />
    },
    {
        icon: <InstagramIcon />
    },
    {
        icon: <MailOutlineIcon />
    },];


    return (
        <div className={classes.root}>
            <Box
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: sideBar,
                }, flexStyles.relativeParent)}
                minWidth={{ xs: 300, sm: 500 }}
                bgcolor={indigo[500]}

            >
                <Box width={72} height={120} bgcolor={'primary'} m={1} />
                <Box
                    className={cx(flexStyles.leftChild, flexStyles.parent)}
                    m={1}
                    p={1}
                >
                    {
                        arr.map((item, index) => (
                            <>
                                <IconButton style={{
                                    color: 'white'
                                }}>
                                    {item.icon}
                                </IconButton>
                                <Divider orientation="vertical" flexItem
                                    light
                                    style={{
                                        color: 'white',
                                        backgroundColor: 'white'
                                    }}
                                />
                            </>
                        ))
                    }


                </Box>
                <Box
                    className={flexStyles.centeredChild}
                    borderRadius={'50%'}
                    height={40}
                    width={40}
                    bgcolor={'common.white'}
                    border={'1px solid #888'}
                >

                </Box>
                <Link to="/" className={classes.link}>
                    <Box
                        className={cx(flexStyles.rightChild, flexStyles.parent)}
                        m={1}
                        p={1}
                        style={{
                            color: 'white',
                            paddingRight: '10em',
                            position: 'absolute',
                            right: '10%',
                            bottom: '25%'
                        }}

                    >
                        <Typography
                            variant="h6"
                            className={classes.title}
                        >
                            OurAppLogo
                    </Typography>
                    </Box>
                </Link>

            </Box>
        </div>
    );
};

export default Footer;