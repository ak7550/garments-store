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
    Popper
} from '@material-ui/core';
import { MainLayOutContext } from '../Components/MainLayOut';
import { drawerWidth } from '../Utils/backEnd'
import { deleteCategoryAPI } from '../API/Category'
import { deleteProductAPI } from '../API/Product'
import { handleError } from './handleError';
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
}));

const DeleteForm = ({ category = false, product = false }) => {
    console.log(`hi from delete`);
    const classes = useStyle();
    const { user } = useContext(MainLayOutContext);
    const { reset, register, handleSubmit, formState: { errors }, clearErrors } = useForm();
    const onSubmit = (info, event) => {
        console.log(info);
        category && deleteCategoryAPI(user._id, info, data => { }, err => handleError(err));
        product && deleteProductAPI(user._id, info, data => { }, err => handleError(err));
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
                                //!chnage to make
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    color="secondary"
                                    fullWidth
                                    type="submit"
                                    variant="contained"
                                >
                                    Delete{category ? "category" : "product"}
                                </Button>
                            </Grid>

                        </Grid>

                    </Grid>
                </form>
            </Grid>
        </>
    )
}

export default DeleteForm
