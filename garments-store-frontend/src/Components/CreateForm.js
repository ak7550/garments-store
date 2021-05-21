import React, { useContext, useEffect, useState } from 'react'
import clsx from 'clsx'
import {
    Button,
    FormControl,
    FormLabel,
    Grid,
    InputLabel,
    makeStyles,
    MenuItem,
    OutlinedInput,
    Select,
    TextField
} from '@material-ui/core';
import { MainLayOutContext } from '../Components/MainLayOut';
import { drawerWidth } from '../Utils/backEnd'
import { useForm } from 'react-hook-form';
import { handleError } from '../Helper/handleError';
import { createCategoryAPI } from '../API/Category';
import { createProductAPI } from '../API/Product';
import { loadAllCategories } from '../Utils/Category';
import produce from 'immer';
import { formatProductInfo } from '../Helper/format';
import { Redirect, useHistory } from 'react-router';
import { handleSuccess } from '../Helper/handleSuccess';
import Footer from './Footer';

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
    console.log(`hi from create of ${product ? `product` : `category`}`);
    const classes = useStyle();
    const history = useHistory();
    const { user } = useContext(MainLayOutContext);
    const { reset, register, handleSubmit, formState: { errors }, clearErrors } = useForm();
    const [categoryList, setCategoryList] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState({});
    const [open, setOpen] = useState(false);

    const [sizesArr, setSizesArr] = useState([
        {
            name: "S",
            quantity: 0,
            price: 0,
        },
        {
            name: "M",
            quantity: 0,
            price: 0,
        },
        {
            name: "L",
            quantity: 0,
            price: 0,
        },
        {
            name: "XL",
            quantity: 0,
            price: 0,
        },
        {
            name: "XXL",
            quantity: 0,
            price: 0,
        },
    ]);

    const handleQuantityPriceChange = (index, str) => event => {
        console.log(`value is: ${event.target.value}`);
        const newSizeArr = produce(sizesArr, draft => {
            if (str === 'price')
                draft[index].price = event.target.value;
            else
                draft[index].quantity = event.target.value;
        });
        setSizesArr(newSizeArr);
    }

    const handleChange = (event) => setSelectedCategory(event.target.value);

    const handleClose = () => setOpen(false);

    const handleOpen = () => setOpen(true);

    useEffect(() => {
        product && loadAllCategories(data => setCategoryList(data));
    }, []);


    const onSubmit = (info, event) => {
        console.log(info);
        console.log(sizesArr);
        if (category) {
            const name = info.cateName;
            createCategoryAPI(user._id, { name }, data => {
                console.log(`${data.name} is created`);
                handleSuccess(data);
                history.push("/");
                // <Redirect to="/" />
            }, err => handleError(err));
        }
        else
            createProductAPI(user._id, formatProductInfo(info, sizesArr), data => {
                console.log(`${data.name} is created`);
                handleSuccess(data);
                history.push("/");
                // <Redirect to="/" />
            }, err => handleError(err));

        console.log(`submit button clicked`);
        reset();
        <Redirect to="/" />
        history.push("/");
    }
    const onError = (errors, event) => {
        console.log("error is: ", errors);
        handleError(errors);
        reset();
        clearErrors();
    }

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            maxWidth: '90%',
            position: 'absolute',
            left: '5em',
            marginTop: '10em'
        }}>
            <div className={classes.drawerHeader} />

            <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
                wrap
                style={{
                    maxWidth: '100vw',
                }}
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
                                product && (
                                    <>
                                        < Grid item xs={12}>
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


                                //* to select category
                                        <Grid item xs={12}>
                                            <FormLabel
                                                component="legend"
                                                className={classes.formlabel}
                                            >
                                                Select Category
                                            </FormLabel>
                                            <Select
                                                labelId="demo-controlled-open-select-label"
                                                id="demo-controlled-open-select"
                                                open={open}
                                                onClose={handleClose}
                                                onOpen={handleOpen}
                                                value={selectedCategory.name}
                                                onChange={handleChange}
                                                style={{
                                                    width: "100%"
                                                }}
                                                {
                                                ...register("category")
                                                }
                                            >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                {
                                                    categoryList.map((ele, ind) => (
                                                        <MenuItem value={ele} key={ind}>
                                                            {ele.name}
                                                        </MenuItem>
                                                    ))
                                                }
                                            </Select>




                                        </Grid>

                                //* to add images
                                        < Grid item xs={12}>
                                            <FormLabel component="legend" className={classes.formlabel}>Image Links</FormLabel>
                                            <TextField
                                                fullWidth
                                                size="small"
                                                variant="outlined"
                                                type="text"
                                                placeholder="Enter the image links onr by one..."
                                                {
                                                ...register("imageLinks")
                                                }
                                                multiline
                                                rows={6}
                                            />
                                        </Grid>

                                        <Grid item xs={12}>
                                            <Grid container direction="column">
                                                <Grid item xs={12}>
                                                    <Grid
                                                        container
                                                        direction="row"
                                                        alignItems="center"
                                                        justify="center"
                                                        style={{
                                                            border: `1px solid red`
                                                        }}
                                                    >
                                                        {
                                                            sizesArr.map((item, index) => (
                                                                <Grid
                                                                    container
                                                                    item
                                                                    xs={12}
                                                                    alignItems="center"
                                                                    justify="center"
                                                                >

                                                                </Grid>
                                                            ))
                                                        }

                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>

                                        <Grid item xs={12}>
                                            <Grid container direction="column">
                                                <Grid item xs={12}>
                                                    <Grid
                                                        container
                                                        direction="column"
                                                        alignItems="center"
                                                        justify="center"
                                                        style={{
                                                            // border: `1px solid red`
                                                        }}
                                                    >
                                                        {
                                                            sizesArr.map((item, index) => (
                                                                <Grid
                                                                    container
                                                                    item
                                                                    xs={12}
                                                                    alignItems="center"
                                                                    justify="center"
                                                                    direction="row"
                                                                    style={{
                                                                        width: '70%',
                                                                        marginTop: '1em',
                                                                        boxSizing: "border-box",
                                                                    }}
                                                                    spacing={-1}
                                                                >
                                                                    <Grid item xs>
                                                                        <FormControl fullWidth className={classes.margin} variant="standard">
                                                                            <InputLabel
                                                                                htmlFor="outlined-adornment-amount"
                                                                            >
                                                                                Size
                                                                            </InputLabel>
                                                                            <OutlinedInput
                                                                                id="outlined-adornment-amount"
                                                                                value={item.name}
                                                                                readOnly
                                                                                disabled
                                                                                style={{
                                                                                    maxWidth: '3em'
                                                                                }}
                                                                            />
                                                                        </FormControl>
                                                                    </Grid>
                                                                    <Grid item xs>
                                                                        <FormControl
                                                                            fullWidth
                                                                            className={classes.margin}
                                                                            variant="outlined"
                                                                        >
                                                                            <InputLabel
                                                                                htmlFor="outlined-adornment-amount"
                                                                            >
                                                                                Quantities
                                                                            </InputLabel>
                                                                            <OutlinedInput
                                                                                id="outlined-adornment-quantity"
                                                                                value={item.quantity}
                                                                                onChange={handleQuantityPriceChange(index, 'quantity')}
                                                                                labelWidth={2}
                                                                                type="number"
                                                                                color="primary"
                                                                                style={{
                                                                                    maxWidth: '8em'
                                                                                }}
                                                                            />
                                                                        </FormControl>
                                                                    </Grid>
                                                                    <Grid item xs >
                                                                        <FormControl
                                                                            fullWidth
                                                                            className={classes.margin}
                                                                            variant="outlined"
                                                                        >
                                                                            <InputLabel htmlFor="outlined-adornment-amount">
                                                                                Amount
                                                                            </InputLabel>
                                                                            <OutlinedInput
                                                                                id="outlined-adornment-amount"
                                                                                value={item.price}
                                                                                onChange={handleQuantityPriceChange(index, 'price')}
                                                                                labelWidth={2}
                                                                                type="number"
                                                                                color="primary"
                                                                                style={{
                                                                                    maxWidth: '8em'
                                                                                }}
                                                                            />
                                                                        </FormControl>
                                                                    </Grid>
                                                                </Grid>
                                                            ))
                                                        }

                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>


                                    </>
                                )

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
            {/* <Footer /> */}
        </div>
    )
}

export default CreateForm
