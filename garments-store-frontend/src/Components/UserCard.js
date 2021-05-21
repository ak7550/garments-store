import { ButtonBase, Grid, IconButton, makeStyles, Paper, Typography } from '@material-ui/core';
import { cyan, red } from '@material-ui/core/colors';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { getRandomImages } from '../Helper/Random'
import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabled';

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

const UserCard = ({ info }) => {
    const classes = useStyles();

    // const { firstName, lastName, userInfo, profilePicture, description } = info;

    const [photo, setPhoto] = useState("");

    useEffect(() => {
        getRandomImages("person", data => setPhoto(data));
    }, []);

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
                                    Dummy User Name
                                 </Typography>
                                <Typography variant="body2" gutterBottom>
                                    Dummy User Description
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Dummy User Age
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Dummy User Male / Female
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="body2" style={{ cursor: 'pointer' }}>
                                    Remove
                                </Typography>
                            </Grid>
                        </Grid>

                    </Grid>
                    <Grid item alignContent="center" justify="center">
                        <IconButton color={red[100]}
                            style={{
                                marginTop: '1em',
                                width: '2em',
                                color: `${red[500]}`

                            }}
                        >
                            <PersonAddDisabledIcon color={red[100]} />
                        </IconButton>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
}

export default UserCard
