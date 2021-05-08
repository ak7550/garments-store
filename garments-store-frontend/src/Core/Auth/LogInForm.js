import React, { useContext } from 'react'
import {
    Button,
    Container,
    Grid,
    makeStyles,
    TextField,
} from '@material-ui/core'
import { useForm } from 'react-hook-form';
import { logInApiCall } from '../../API/Auth';
import { MainLayOutContext } from '../../Components/MainLayOut';

//docs: https://www.williamkurniawan.com/blog/building-a-simple-login-form-with-material-ui-and-react-hook-form


//*Express-validator is rejecting the request

const useStyles = makeStyles((theme) => ({
    container: {
        padding: theme.spacing(3),
    },
    error: {
        backgroundColor: theme.palette.error,
        display: "block !important",
    }
}));

const LogInForm = () => {
    const classes = useStyles();

    const logInHeader = () => {

    }

    const { register, handleSubmit, formState: { errors }, reset, clearErrors, watch } = useForm({
        mode: "onBlur",
        reValidateMode: "onBlur",
        criteriaMode: "all",
        // shouldFocusError: true,
    });

    const { setUser } = useContext(MainLayOutContext);

    const handleError = err => {
        console.log(`error is: `, err);
        //todo: idea is to put an alert an let the user know about the error.
    }


    const onSubmit = (unserInfo, event) => {
        console.log(unserInfo);
        console.log(`submit button clicked`);
        logInApiCall(unserInfo,
            data => {
                setUser(data); // setting the user
                console.log(`user information from the login form after setting user state: ${data}`);
            },
            resErr => {
                handleError(resErr);
                console.log(`error information from the login from after the try of getting an user from the server: ${resErr}`);
            });
        //_ after getting an error
        reset();
    }

    const onError = (errors, event) => {
        console.log("error is: ", errors);
        handleError(errors);
        reset();
        clearErrors();
    }

    // console.log(errors);
    // console.log(watch());

    return (
        <Container className={classes.container} maxWidth="xs">
            {logInHeader()}
            <form
                onSubmit={handleSubmit(onSubmit, onError)}
            >
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="EmailId"
                                    size="small"
                                    variant="outlined"
                                    type="text"
                                    placeholder="Email"
                                    {
                                    ...register("email", {
                                        pattern: {
                                            value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                            message: "Provide a valid email"
                                        },
                                        maxLength: {
                                            value: 50,
                                            message: "Invalid mail id"
                                        }
                                    })
                                    }
                                    required
                                    error={Boolean(errors.email)}
                                    helperText={errors.email?.message}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Password"
                                    size="small"
                                    type="password"
                                    variant="outlined"
                                    required
                                    placeholder="password"
                                    {
                                        ...register("password")
                                    }
                                    error={Boolean(errors.password)}
                                    helperText={errors.password?.message}
                                />

                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            color="secondary"
                            fullWidth
                            type="submit"
                            variant="contained"
                        >Log in</Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
}

export default LogInForm;
