import React, { useContext, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router';
import { MainLayOutContext } from '../Components/MainLayOut';
import {
    Avatar,
    Badge,
    Box,
    Button,
    Divider,
    FormControlLabel,
    FormLabel,
    Grid,
    makeStyles,
    Paper,
    Radio,
    RadioGroup,
    TextField
} from '@material-ui/core';
import { getUserAPI, updateUserAPI } from '../API/User';
import clsx from 'clsx';
import { drawerWidth } from '../Utils/backEnd';
import { amber, grey, red } from '@material-ui/core/colors';
import CreateIcon from '@material-ui/icons/Create';
import { Controller, useForm } from 'react-hook-form';
import Footer from '../Components/Footer';
import { formatUserUpdateInfo } from '../Helper/format';
import { handleSuccess } from '../Helper/handleSuccess';
import { handleError } from '../Helper/handleError';


const useStyle = makeStyles(theme => ({
    link: {
        display: "inherit",
        textDecoration: "none",
        color: "inherit"
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
    const { user, setUser } = useContext(MainLayOutContext);
    const [userInfo, setUserInfo] = useState(user);
    const [readOnly, setReadOnly] = useState(false);
    const { reset, control, register, handleSubmit, formState: { errors }, clearErrors, getValues } = useForm();
    const firstName = user?.firstName?.toUpperCase();

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
                <Grid container justify='center'  >
                    <Grid item >
                        <Box border={`1px solid pink`} p={5} m={2} minWidth={'90%'}>
                            <FormLabel
                                component="legend"
                                className={classes.formlabel}
                            >
                                First Name:
                </FormLabel>
                            <TextField
                                fullWidth
                                size="medium"
                                variant="standard"
                                type="text"
                                {
                                ...register("firstName")
                                }
                                required
                                disabled={readOnly}
                            />
                        </Box>
                    </Grid>
                    <Grid item>
                        <Box border={`1px solid pink`} p={5} m={2} minWidth={'90%'}>
                            <FormLabel
                                component="legend"
                                className={classes.formlabel}
                            >
                                Last Name:
                </FormLabel>
                            <TextField
                                fullWidth
                                size="medium"
                                variant="standard"
                                type="text"
                                {
                                ...register("lastName")
                                }
                                required
                                disabled={readOnly}
                            />
                        </Box>
                    </Grid>
                </Grid>

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

    const ageSection = () => {
        return (
            <>
                <Box border={`1px solid pink`} p={5} m={2} minWidth={'90%'}>
                    <FormLabel
                        component="legend"
                        className={classes.formlabel}
                    >
                        {firstName}'s Age:
                </FormLabel>
                    <TextField
                        fullWidth
                        size="medium"
                        variant="standard"
                        type="number"
                        {
                        ...register("age")
                        }
                        required
                        disabled={readOnly}
                    />
                </Box>
            </>
        );
    }

    const genderSection = () => {
        return (
            <>
                <Box border={`1px solid pink`} p={5} m={2} minWidth={'90%'}>
                    <FormLabel
                        component="legend"
                        className={classes.formlabel}
                    >
                        {firstName} is a:
                </FormLabel>
                    <Controller
                        render={
                            ({ field }) => (
                                <RadioGroup
                                    aria-label="gender"
                                    row
                                    className={classes.radiogroup}
                                    {
                                    ...register("gender")
                                    }
                                >
                                    <FormControlLabel
                                        value="female"
                                        control={<Radio />}
                                        label="Female"
                                    />
                                    <FormControlLabel
                                        value="male"
                                        control={<Radio />}
                                        label="Male"
                                    />
                                </RadioGroup>
                            )
                        }
                        name="Gender"
                        control={control}
                    />
                </Box>
            </>
        );
    }


    const editFabIcon = () => {

    }
    const history = useHistory();

    const onSubmit = (info, event) => {
        console.log(`submit button clicked: `, info);
        if (!readOnly)
            updateUserAPI(formatUserUpdateInfo(info), userId, data => {
                setUser(data);
                setUserInfo(data);
                handleSuccess(data);
                history.push("/");
            },
                err => {
                    handleError(err);
                    reset();
                    clearErrors();
                });
        else handleError("You can't the information of another user.");
    }

    const onError = (errors, event) => {
        console.log("error is: ", errors);
        handleError(errors);
        reset();
        clearErrors();
    }

    return (
        <>
            <form
                onSubmit={handleSubmit(onSubmit, onError)}
            >
                <Grid
                    container
                    direction="column"
                    justify="flex-start"
                    alignItems="center"
                    wrap
                    style={{
                        maxWidth: '100%',
                        border: '2px solid blue',
                        // height: '12em',
                        marginBottom: '9em',
                        overflowX: 'hidden'
                    }}
                >
                    {profilePictureSection()}
                    {nameSection()}
                    {descriptionSection()}
                    <Grid container justify='center'  >
                        <Grid item >
                            {ageSection()}
                        </Grid>
                        <Grid item>
                            {genderSection()}
                        </Grid>
                    </Grid>
                    {
                        !readOnly && <Grid item>
                            <Button
                                color="secondary"
                                fullWidth
                                type="submit"
                                variant="contained"
                            >Update {firstName}'s Information </Button>

                        </Grid>
                    }
                    {editFabIcon()}
                </Grid>
            </form>
        </>
    )
}

export default UserDashboard
