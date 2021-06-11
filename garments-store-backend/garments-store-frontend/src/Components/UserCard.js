import {
    Avatar,
    Button,
    ButtonBase,
    Chip,
    Divider,
    Grid,
    IconButton,
    makeStyles,
    Paper,
    Typography
} from '@material-ui/core';
import { cyan, green, red } from '@material-ui/core/colors';
import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import { getRandomImages } from '../Helper/Random'
import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabled';
import { addFollowingAPI, getUserAPI, removeFollowingAPI } from '../API/User';
import girlIcon from '../Assets/girl-svgrepo-com.png'
import FaceIcon from '@material-ui/icons/Face';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { MainLayOutContext } from './MainLayOut';
import DoneIcon from '@material-ui/icons/Done';
import localforage from 'localforage';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        minWidth: '100%',
    },
    image: {
        width: 128,
        height: 128,
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
}));

const UserCard = ({ id, follower = false, following = false, all = false }) => {
    const { user, setUser } = useContext(MainLayOutContext);
    const classes = useStyles();
    const [photo, setPhoto] = useState("");
    const [userData, setUserData] = useState({
        firstName: "",
        lastName: "",
        userInfo: {
            sex: "", age: 1
        },
        description: "",
        role: 1,
        watchList: [],
    });

    useEffect(() => {
        following && getUserAPI(id, d => {
            setUserData(d);
            getRandomImages(d.userInfo.sex, data => setPhoto(data));
        });
        follower && getUserAPI(id, d => {
            setUserData(d);
            getRandomImages(d.userInfo.sex, data => setPhoto(data));
        });
        if (all) {
            setUserData(id);
            getRandomImages(id.userInfo.sex, data => setPhoto(data)); // id is not id in case of all
        }
    }, []);

    const downButtons = () =>
        <Grid container justify="flex-start" spacing={2}>
            <Grid item>
                <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    href={`wishList/${userData._id}`}
                >
                    {userData.firstName}'s WishList
                </Button>
            </Grid>

        </Grid>

    const followButtonClicked = e => {
        // if user is already following him, then do nothing ==> wont make noise in back end
        const v = user.followings.find(id => id === userData._id);
        !v && addFollowingAPI(user._id, userData._id, () => {
            user.followings.push(userData._id);
            setUser(user);
            console.log("pushed to user followings array");
            localforage.setItem("user", user);
        });
        following = true;
    }

    const unFollowButtonClicked = e => {
        // if v does not exist in follwoing array, that means, ==> user does not follow him
        const newArr = user.followings.filter(id => id !== userData._id);
        newArr.length !== user.followings.length
            &&
            removeFollowingAPI(user._id, userData._id, () => {
                user.followings = newArr;
                setUser(user);
                localforage.setItem("user", user);
                console.log("removed to user followings array");
            });
        following = false;
    }


    const followUnFollowSection = () =>
        <Grid
            container
            direction="column"
            spacing={3}
            justify="space-evenly"
            alignItems="center"
        >
            {
                follower || all &&
                <Grid item>
                    <Chip
                        variant="outlined"
                        color="primary"
                        icon={<PersonAddIcon />}
                        label="Follow"
                        size="large"
                        clickable
                        onClick={followButtonClicked}
                        deleteIcon={following && <DoneIcon />}
                    />
                </Grid>
            }
            <Grid item>
                {
                    following &&
                    <Chip
                        variant="outlined"
                        color="primary"
                        icon={<PersonAddIcon />}
                        label="UnFollow"
                        size="small"
                        clickable
                        onClick={unFollowButtonClicked}
                    />
                }

            </Grid>

        </Grid>

    console.log(`user id: `, id);

    return (
        <div className={classes.root}>
            <Paper className={classes.paper} color={cyan[50]} elevation={2}>
                <Grid container spacing={2}>
                    <Grid item>
                        <ButtonBase className={classes.image}>
                            <img className={classes.img} alt="User Profile Picture" src={photo} />
                        </ButtonBase>
                    </Grid>
                    <Grid item xs={11} sm container>
                        <Grid item xs container direction="column" spacing={2} >
                            <Grid item xs>
                                <Typography gutterBottom variant="subtitle1">
                                    {`${userData.firstName} ${userData.lastName}`}
                                </Typography>
                                <Typography variant="body2" gutterBottom style={{
                                    backgroundColor: 'grey'
                                }}>
                                    {userData.description}
                                </Typography>
                                <Divider />
                                <Typography variant="body2" color="textSecondary">
                                    {Math.abs(userData.userInfo.age)} yrs.
                                </Typography>
                                <Typography variant="h5" color="textSecondary">
                                    <Chip
                                        color={userData.userInfo.sex === "male" ? "primary" : "secondary"}
                                        label={userData.userInfo.sex}
                                        clickable
                                        variant="outlined"
                                        avatar={
                                            userData.userInfo.sex === "female" && <Avatar src={girlIcon} />
                                        }
                                        icon={userData.userInfo.sex === "male" && <FaceIcon />}
                                        style={{
                                            position: "relative",
                                            fontWeight: 'normal',
                                            right: '0.4em',
                                            fontSize: '1rem',
                                            marginTop: "0.4rem",
                                            cursor: "text"
                                        }}
                                        size="small"
                                    />
                                </Typography>
                            </Grid>
                            <Grid item>
                                {downButtons()}
                            </Grid>
                        </Grid>

                    </Grid>
                    <Grid item alignContent="center" justify="center">
                        {followUnFollowSection()}
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
}

export default UserCard
