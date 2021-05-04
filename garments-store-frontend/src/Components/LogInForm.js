import React, { useState } from 'react'
import {
    Button,
    Container,
    Grid,
    InputAdornment,
    makeStyles,
    TextField,
} from '@material-ui/core'
import AccountCircle from '@material-ui/icons/AccountCircle';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import { useForm } from 'react-hook-form';
import { logInApiCall } from '../Utils/Auth';

//docs: https://www.williamkurniawan.com/blog/building-a-simple-login-form-with-material-ui-and-react-hook-form

//todo: study bit more about react hook form to use them properly.


const useStyles = makeStyles((theme) => ({
    container: {
        padding: theme.spacing(3),
    },
    error: {
        backgroundColor: theme.palette.error,
        display: "block !important",
    }
}));

const formValue = {

}

const LogInForm = () => {
    const classes = useStyles();

    const logInHeader = () => {

    }

    //! read about setValue method ==> https://react-hook-form.com/api/useform/setvalue
    //docs: https://react-hook-form.com/api/useform/reset (reset)


    const { register, handleSubmit, formState: { errors }, reset, clearErrors, watch } = useForm({
        mode: "onBlur",
        reValidateMode: "onBlur",
        defaultValues: {
            email: "",
            password: "",
        },
        criteriaMode: "all",
        // shouldFocusError: true,
    });
    //docs: https://react-hook-form.com/api/useform

    const onSubmit = (data, e) => {
        console.log(data);
        console.log(`submit button clicked`);
        logInApiCall(data);
        reset();

    }

    const onError = (errors, e) => {
        console.log("error is: ", errors);
        reset();
        clearErrors();
    }

    console.log(errors);
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
                                        ...register("email ", {
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
