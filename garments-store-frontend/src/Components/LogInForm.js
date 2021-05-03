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


const LogInForm = () => {
    const classes = useStyles();

    const logInHeader = () => {

    }

    //! read about setValue method ==> https://react-hook-form.com/api/useform/setvalue
    //docs: https://react-hook-form.com/api/useform/reset (reset)


    const { register, handleSubmit, setError, formState: { errors }, reset } = useForm({
        password: "",
        email: "",
    });

    const onSubmit = data => {
        console.log(data);
        console.log(`submit button clicked`);
        logInApiCall(data);
        reset({
            password: "",
            email: "",
        });
    }
    console.log(errors);

    return (
        <Container className={classes.container} maxWidth="xs">
            {logInHeader()}
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="EmailId"
                                    size="small"
                                    variant="outlined"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <AccountCircleOutlinedIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                    type="text"
                                    placeholder="Email"
                                    name="email"
                                    {
                                    ...register("email",
                                        {
                                            required: {
                                                value: true,
                                                message: "Email is required...",
                                            },
                                            pattern: {
                                                value: /^\S+@\S+$/i,
                                                message: "Valid email has to be prvided"
                                            },
                                            maxLength: {
                                                value: 50,
                                                message: "maximum length has exceeded."
                                            }
                                        }
                                    )
                                    }
                                // value={values.email}
                                // onChange={handleChange("email")}
                                />
                                {/* //! not showing */}
                                {
                                    errors.name
                                    &&
                                    errors.name.type === "required"
                                    &&
                                    <span className={classes.error}>{errors.name.message} </span>
                                }
                                {
                                    errors.name
                                    &&
                                    errors.name.type === "pattern"
                                    &&
                                    <span className={classes.error}>{errors.name.message} </span>
                                }
                                {
                                    errors.name
                                    &&
                                    errors.name.type === "maxLength"
                                    &&
                                    <span className={classes.error}>{errors.name.message} </span>
                                }
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Password"
                                    size="small"
                                    type="password"
                                    variant="outlined"
                                    name="password"
                                    {
                                    ...register("password", {
                                        required: {
                                            value: true,
                                            message: "Enter your password."
                                        }
                                    })
                                    }

                                // value={values.password}
                                // onChange={handleChange("password")}
                                />
                                {/* //! not showing */}
                                {
                                    errors.name
                                    &&
                                    errors.name.type === "required"
                                    &&
                                    <span className={classes.error}>{errors.name.message} </span>
                                }
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            color="secondary"
                            fullWidth
                            type="submit"
                            variant="contained"
                            onClick={() => {
                                //creating custom messages.
                                //docs: https://react-hook-form.com/api/useform/seterror
                                [
                                    {
                                        type: "required",
                                        name: "email",
                                        message: "Email Id is required"
                                    },
                                    {
                                        type: "pattern",
                                        name: "email",
                                        message: "Valid Email Id is required"
                                    },
                                    {
                                        type: "maxLength",
                                        name: "email",
                                        message: "Email can't be longer than 200 symbols."
                                    },
                                    {
                                        type: "required",
                                        name: "password",
                                        message: "Enter your password."
                                    },
                                ].forEach(({ name, type, message }) =>
                                    setError(name, { type, message }, { shouldFocus: true })
                                );
                            }}
                        >Log in</Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
}

export default LogInForm;
