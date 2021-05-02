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

const useStyles = makeStyles((theme) => ({
    container: {
        padding: theme.spacing(3),
    },
}));


const LogInForm = () => {
    const classes = useStyles();

    const logInHeader = () => {

    }

    //! read about setValue method ==> https://react-hook-form.com/api/useform/setvalue
    //docs: https://react-hook-form.com/api/useform/reset (reset)
    const { register, handleSubmit, setError, formState: { errors } } = useForm();
    const [values, setValues] = useState({
        email: "",
        password: "",
    });
    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
    };
    const onSubmit = data => {
        console.log(data);
        console.log(`submit button clicked`);
        logInApiCall(data);
        setValues({ email: "", password: "" });
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
                                    label="Email"
                                    name="email"
                                    size="small" variant="outlined"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <AccountCircleOutlinedIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                    type="text"
                                    placeholder="Email"
                                    {...register("email", { required: true, pattern: /^\S+@\S+$/i, maxLength: 50 })}
                                    value={values.email}
                                    onChange={handleChange("email")}
                                />
                                {
                                    errors.name && errors.name.type === "required" && <span>This is required</span>
                                }
                                {
                                    errors.name && errors.name.type === "maxLength" && <span>Max length exceeded</span>
                                }
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Password"
                                    name="password"
                                    size="small"
                                    type="password"
                                    variant="outlined"
                                    {...register("password", { required: true })}
                                    value={values.password}
                                    onChange={handleChange("password")}
                                />
                                {
                                    errors.name && errors.name.type === "required" && <span>This is required</span>
                                }
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            color="secondary"
                            fullWidth type="submit"
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
                                        message: "Enter your password"
                                    },
                                ].forEach(({ name, type, message }) =>
                                    setError(name, { type, message })
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
