import React, { useContext, useState } from 'react'
import {
    Button,
    Container,
    FormControlLabel,
    FormLabel,
    Grid,
    makeStyles,
    Radio,
    RadioGroup,
    SvgIcon,
    TextField,
} from '@material-ui/core'
import { Controller, useForm } from 'react-hook-form';
import { signUpApiCall } from '../../API/Auth';
import { MainLayOutContext } from '../../Components/MainLayOut';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { Redirect } from 'react-router';
import { handleError } from '../../Helper/handleError';
import { createFormHeader } from '../../Components/formHeader';


const useStyles = makeStyles((theme) => ({
    container: {
        padding: theme.spacing(3),
    },
    error: {
        backgroundColor: theme.palette.error,
        display: "block !important",
    },
    formlabel: {
        marginBottom: theme.spacing(1),
        fontWeight: theme.typography.fontWeightBold,
    },
    radiogroup: {
        marginTop: -theme.spacing(1),
    }
}));

const SignUpForm = ({close}) => {

    //docs: https://react-hook-form.com/api/useform
    const { register, handleSubmit, formState: { errors }, reset, clearErrors, control, setValue } = useForm({
        mode: "onBlur",
        reValidateMode: "onBlur",
        criteriaMode: "all",
        // defaultValues: {
        //     gender: "female",
        //     role: "0"
        // }
    });

    const [date, setDate] = useState(new Date());
    const classes = useStyles();




    const { setUser, toggleSideBar } = useContext(MainLayOutContext);

    const onSubmit = (userInfo, event) => {
        console.log(userInfo);
        console.log(`submit button clicked`);
        userInfo.dob = date;


        signUpApiCall(userInfo,
            data => {
                setUser(data); // setting the user
                console.log(`user information from the login from after setting user state: ${data}`);
                close();
                toggleSideBar();
                <Redirect to="/" />
            },
            resErr => {
                handleError(resErr);
                console.log(`error information from the signup form after the try of getting an user from the server: ${resErr}`);
            });
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
            {createFormHeader("Sign Up Form")}
            <form
                onSubmit={handleSubmit(onSubmit, onError)}
            >
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <FormLabel component="legend" className={classes.formlabel} required>Name</FormLabel>
                                <TextField
                                    fullWidth
                                    size="small"
                                    variant="outlined"
                                    type="text"
                                    placeholder="Enter Your Name.."
                                    {
                                    ...register("name", {
                                        minLength: {
                                            value: 5,
                                            message: "Write your name in between 5 to 30"
                                        },
                                        maxLength: {
                                            value: 30,
                                            message: "Write your name in between 5 to 30"
                                        },

                                    })
                                    }
                                    required
                                    error={Boolean(errors.name)}
                                    helperText={errors.name?.message}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormLabel component="legend" className={classes.formlabel} required>Email</FormLabel>
                                <TextField
                                    fullWidth
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
                                        },

                                    })
                                    }
                                    required
                                    error={Boolean(errors.email)}
                                    helperText={errors.email?.message}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormLabel
                                    component="legend"
                                    className={classes.formlabel}
                                >
                                    DOB:
                                </FormLabel>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                        format="dd/MM/yyyy"
                                        margin="normal"
                                        id="date-picker-inline"
                                        inputVariant="outlined"
                                        variant="inline"
                                        name="dob"
                                        value={date}
                                        minDate={new Date('1400-01-01')}
                                        minDateMessage="Date must be after 1400"
                                        maxDateMessage="Future dates are not allowed"
                                        autoOk
                                        disableFuture
                                        onChange={(e, d) => setDate(d)}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}

                                        className={classes.radiogroup}
                                        style={{
                                            marginTop: '0.1em'
                                        }}
                                    />
                                </MuiPickersUtilsProvider>

                            </Grid>
                            <Grid item xs={12}>
                                <FormLabel component="legend" className={classes.formlabel}>Description</FormLabel>
                                <TextField
                                    fullWidth
                                    size="small"
                                    variant="outlined"
                                    type="text"
                                    placeholder="Tell us something about you....."
                                    {
                                    ...register("description")
                                    }
                                    multiline
                                    rows={4}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                {/* //docs: https://react-hook-form.com/api/usecontroller/controller */}
                                <FormLabel component="legend" className={classes.formlabel}>Gender</FormLabel>
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
                            </Grid>
                            <Grid item xs={12}>
                                {/* //docs: https://react-hook-form.com/api/usecontroller/controller */}
                                <FormLabel component="legend" className={classes.formlabel} required>You are a: </FormLabel >
                                <Controller
                                    render={
                                        ({ field }) => (
                                            <RadioGroup aria-label="role" row className={classes.radiogroup}
                                                {
                                                ...register("role", {
                                                    require: "Please Enter your role in this application"
                                                })
                                                }
                                            >
                                                <FormControlLabel
                                                    value="0"
                                                    control={<Radio />}
                                                    label="Buyer"
                                                />
                                                <FormControlLabel
                                                    value="1"
                                                    control={<Radio />}
                                                    label="Seller"
                                                />
                                            </RadioGroup>
                                        )
                                    }
                                    name="Role"
                                    control={control}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormLabel component="legend" className={classes.formlabel} required>Password</FormLabel>
                                <TextField
                                    fullWidth
                                    // label="Password"
                                    size="small"
                                    type="password"
                                    variant="outlined"
                                    placeholder="password"
                                    {
                                    ...register("password")
                                    }
                                    error={Boolean(errors.password)}
                                    helperText={errors.password?.message}
                                    required
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
                        >Sign Up</Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
}

export default SignUpForm
