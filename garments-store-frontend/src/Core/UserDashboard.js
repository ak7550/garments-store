import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { MainLayOutContext } from '../Components/MainLayOut';
import {
    Avatar,
    Badge,
    Box,
    Divider,
    FormLabel,
    Grid,
    makeStyles,
    Paper,
    TextField
} from '@material-ui/core';
import { getUserAPI } from '../API/User';
import clsx from 'clsx';
import { drawerWidth } from '../Utils/backEnd';
import { amber, grey, red } from '@material-ui/core/colors';
import CreateIcon from '@material-ui/icons/Create';
import { useForm } from 'react-hook-form';


const useStyle = makeStyles(theme => ({
    link: {
        display: "inherit",
        textDecoration: "none",
        color: "inherit"
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
        maxWidth: '100vw'
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
        marginRight: drawerWidth
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        //* necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    large: {
        width: theme.spacing(22),
        height: theme.spacing(22),
    },
    small: {
        width: theme.spacing(5),
        height: theme.spacing(5),
    },
    paper: {
        boxShadow: 'none',
        '&:hover': {
            boxShadow: `0 6px 12px 0 ${grey[600]}`,
        },
    },
    formlabel: {
        marginBottom: theme.spacing(1),
        fontWeight: theme.typography.fontWeightBold,
        marginBottom: theme.spacing(2)
    },
}));


const UserDashboard = () => {
    const { userId } = useParams();
    const classes = useStyle();
    const { user, sideBar } = useContext(MainLayOutContext);
    const [userInfo, setUserInfo] = useState(user);
    const [readOnly, setReadOnly] = useState(false);
    const { reset, register, handleSubmit, formState: { errors }, clearErrors } = useForm();

    useEffect(() => {
        console.log(`user is: `, user._id);
        console.log(`condition is: ${userId != user._id}`);
        if (userId != user._id) {
            getUserAPI(userId, data => setUserInfo(data));
            setReadOnly(true);
        }
        console.log(`hi from the useEffect of user dashboard`);
    }, []);


    const profilePictureSection = () => {
        const { firstName, profilePicture } = userInfo;
        console.log(`firstName: ${firstName}`);
        return (
            <>
                <Paper elevation={3}
                    style={{
                        border: `12px solid ${grey[50]}`,
                        borderRadius: '50%'
                    }}
                >
                    <Box>
                        <Badge
                            overlap="circle"
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            invisible={readOnly}
                            badgeContent={
                                <Avatar
                                    style={{
                                        backgroundColor: 'white'
                                    }}
                                    className={classes.small}
                                    onClick={() => { }} //todo:
                                >
                                    <Paper elevation={3}
                                        className={classes.paper}
                                        style={{
                                            border: `4px solid white`,
                                            borderRadius: '50%',
                                        }}
                                        variant='outlined'
                                    >
                                        <CreateIcon />
                                    </Paper>
                                </Avatar>
                            }
                        >
                            <Avatar alt={firstName} src={profilePicture} className={classes.large} />
                        </Badge>

                    </Box>
                </Paper>
            </>
        );
    }
    const nameSection = () => {
        return (
            <>
                <Box border={`1px solid pink`} p={5} m={2} minWidth={'90%'}>
                    <FormLabel
                        component="legend"
                        className={classes.formlabel}
                    >
                        Name:
                </FormLabel>
                    <TextField
                        fullWidth
                        size="medium"
                        variant="standard"
                        type="text"
                        {
                        ...register("name")
                        }
                        required
                        disabled={readOnly}
                    />
                </Box>
            </>
        );
    }

    const descriptionSection = () => {
        return (
            <>
                <Box border={`1px solid pink`} p={5} m={2} minWidth={'90%'}>
                    <FormLabel
                        component="legend"
                        className={classes.formlabel}
                    >
                        Description:
                </FormLabel>
                    <TextField
                        fullWidth
                        size="medium"
                        variant="standard"
                        type="text"
                        {
                        ...register("description")
                        }
                        required
                        disabled={readOnly}
                    />
                </Box>
            </>
        );
    }




    return (
        <div
            className={clsx(classes.content, {
                [classes.contentShift]: sideBar,
            })}

        >
            <div className={classes.drawerHeader} />
            <Grid
                container
                direction="column"
                justify="flex-start"
                alignItems="center"
                wrap
                style={{
                    maxWidth: '100%',
                    marginLeft: "20em",
                    // border: '2px solid blue',
                    // height: '12em'
                }}
            >
                {profilePictureSection()}
                {nameSection()}
                {descriptionSection()}
            </Grid>
        </div>
    )
}

export default UserDashboard
