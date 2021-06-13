import React, { useContext, useEffect, useRef, useState } from 'react'
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
    Select
} from '@material-ui/core';
import { MainLayOutContext } from '../Components/MainLayOut';
import { drawerWidth } from '../Utils/backEnd'
import { deleteCategoryAPI } from '../API/Category'
import { deleteProductAPI } from '../API/Product'
import { handleError } from '../Helper/handleError';
import { useForm } from 'react-hook-form';
import { getAllProducts } from '../Utils/Product';
import { loadAllCategories } from '../Utils/Category';
import { Redirect } from 'react-router';

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
    console.log(`hi from delete\n cate is: ${category}`);
    const classes = useStyle();
    const { user } = useContext(MainLayOutContext);
    const { reset, register, handleSubmit, formState: { errors }, clearErrors } = useForm();


    const [arr, setArr] = useState([]);
    const [selection, setSelection] = useState({});
    const [open, setOpen] = useState(false);

    const handleChange = (event) => setSelection(event.target.value);

    const handleClose = () => setOpen(false);

    const handleOpen = () => setOpen(true);

    useEffect(() => {
        console.log(`call from useEffect of DeleteForm\n this should be one time only`);
        category && loadAllCategories(data => {
            console.log(`data is: ${data}`);
            setArr(data);
        });
        product && getAllProducts(data => {
            console.log(`data is: ${data}`);
            setArr(data);
        });
    }, []); // only run, when the component mounts


    const onSubmit = (info, event) => {
        console.log(info);
        console.log(selection);
        category && deleteCategoryAPI(user._id, info.name, data => setArr(data), err => handleError(err));
        product && deleteProductAPI(user._id, info.name, data => setArr(data), err => handleError(err));
        console.log(`submit button clicked`);
        setSelection({});
        reset();
        <Redirect to="/" />
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
                                    {category ? "Category" : "Product"} Name
                                </FormLabel>
                                <Select
                                    labelId="demo-controlled-open-select-label"
                                    id="demo-controlled-open-select"
                                    open={open}
                                    onClose={handleClose}
                                    onOpen={handleOpen}
                                    value={selection.name}
                                    onChange={handleChange}
                                    style={{
                                        width: "100%"
                                    }}
                                    {
                                    ...register("name")
                                    }
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {
                                        arr.map((ele, ind) => (
                                            <MenuItem value={ele} key={ind}>
                                                {ele.name}
                                            </MenuItem>
                                        ))
                                    }
                                </Select>




                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    color="secondary"
                                    fullWidth
                                    type="submit"
                                    variant="contained"
                                >
                                    Delete {category ? "Category" : "Product"}
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
