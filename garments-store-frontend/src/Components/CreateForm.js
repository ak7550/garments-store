import React, { useContext } from 'react'
import clsx from 'clsx'
import {
    Button,
    ButtonGroup,
    ClickAwayListener,
    Divider,
    FormLabel,
    Grid,
    Grow,
    makeStyles,
    MenuItem,
    MenuList,
    Paper,
    Popper,
    TextField
} from '@material-ui/core';
import { MainLayOutContext } from '../Components/MainLayOut';
import { drawerWidth } from '../Utils/backEnd'
import { useForm } from 'react-hook-form';
import { handleError } from './handleError';
import { createCategoryAPI } from '../API/Category';
import { createProductAPI } from '../API/Product';

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
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        //* necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
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
        marginBottom: theme.spacing(2)
    },

}));

const CreateForm = ({ category = false, product = false }) => {
    console.log(`hi from create`);
    const classes = useStyle();
    const { user } = useContext(MainLayOutContext);
    const { reset, register, handleSubmit, formState: { errors }, clearErrors } = useForm();
    const onSubmit = (info, event) => {
        console.log(info);
        category && createCategoryAPI(user._id, info, data => { }, err => handleError(err));
        product && createProductAPI(user._id, info, data => { }, err => handleError(err));
        console.log(`submit button clicked`);

        reset();
    }
    const onError = (errors, event) => {
        console.log("error is: ", errors);
        handleError(errors);
        reset();
        clearErrors();
    }

    return (
       <>
            <div className={classes.drawerHeader} />

            <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
                wrap
                style={{
                    marginTop: "5em"
                }}
                // spacing={3}
            >
                <form
                    onSubmit={handleSubmit(onSubmit, onError)}
                >
                    <Grid item xs={12}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <FormLabel
                                    component="legend"
                                    className={classes.formlabel}
                                >
                                    New {category ? "category" : "product"} Name
                                </FormLabel>
                                <TextField
                                    fullWidth
                                    size="medium"
                                    variant="standard"
                                    type="text"
                                    placeholder="New Category Name"
                                    {
                                    ...register("cateName", {
                                        required: "Enter the name of the new Category",
                                        maxLength: {
                                            value: 50,
                                            message: "Name should not more than 50 in length"
                                        }
                                    })
                                    }
                                    required
                                    error={Boolean(errors.cateName)}
                                    helperText={errors.cateName?.message}
                                />
                            </Grid>
                            {
                                // *form for product decription
                                product &&
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
                            }
                            <Grid item xs={12}>
                                <Button
                                    color="secondary"
                                    fullWidth
                                    type="submit"
                                    variant="contained"
                                >Create{category ? "category" : "product"}</Button>

                            </Grid>

                        </Grid>

                    </Grid>
                </form>
            </Grid>
        </>
    )
}

export default CreateForm
