import React, { useContext, useEffect, useState } from 'react'
import clsx from 'clsx'
import {
    Button,
    ButtonGroup,
    ClickAwayListener,
    Divider,
    FormControl,
    FormLabel,
    Grid,
    Grow,
    InputAdornment,
    InputLabel,
    makeStyles,
    MenuItem,
    MenuList,
    OutlinedInput,
    Paper,
    Popper,
    Select,
    TextField
} from '@material-ui/core';
import { MainLayOutContext } from '../Components/MainLayOut';
import { drawerWidth } from '../Utils/backEnd'
import { useForm } from 'react-hook-form';
import { handleError } from '../Helper/handleError';
import { updateCategoryAPI } from '../API/Category';
import { createProductAPI, updateProductAPI } from '../API/Product';
import { loadAllCategories } from '../Utils/Category';
import produce from 'immer';
import { Redirect } from 'react-router';
import { getAllProducts } from '../Utils/Product';
import { formatProductInfo } from '../Helper/format';

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
    formlabel: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        fontWeight: theme.typography.fontWeightBold,
        marginBottom: theme.spacing(2)
    },
}));

const UpdateForm = ({ category = false, product = false }) => {
    console.log(`hi from update of ${product ? `product` : `category`}`);
    const classes = useStyle();
    const { user } = useContext(MainLayOutContext);
    const { reset, register, handleSubmit, formState: { errors }, clearErrors } = useForm();
    const [categoryList, setCategoryList] = useState([]);
    const [productList, setProductList] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState({});
    const [selectedProduct, setSelectedProduct] = useState({});
    const [openCategoryWindow, setOpenCategoryWindow] = useState(false);
    const [openProductWindow, setOpenProductWindow] = useState(false);
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

    const handleClose = () => setOpenCategoryWindow(false);

    const handleOpen = () => setOpenCategoryWindow(true);

    useEffect(() => {
        loadAllCategories(data => setCategoryList(data));
        product && getAllProducts(data => setProductList(data));
    }, []);


    const onSubmit = (info, event) => {
        console.log(`submit button clicked from product update`);
        console.log(`info:`);
        console.log(info);
        console.log(`selected category: ${JSON.stringify(selectedCategory)}`);
        console.log(selectedCategory);
        console.log(`sizeArr: ${JSON.stringify(sizesArr)}`);
        console.log(sizesArr);

        if (product) {
            const productId = info.existingProduct._id;
            updateProductAPI(user._id, productId, formatProductInfo(info, sizesArr), data => { }, err => handleError(err));
        }

        else {
            const categoryId = info.category._id;
            const name = info.newName;
            updateCategoryAPI(user._id, categoryId, { name }, data => {}, err => handleError(err));
        }

        reset();
        clearErrors();
        <Redirect to="/" />
    }

    const onError = (errors, event) => {
        console.log("error is: ", errors);
        handleError(errors);
        reset();
        clearErrors();
    }




    return (
        <div style={{
            maxWidth: '90%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            marginTop: '10em',
            left: '5em'
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
                                    open={openCategoryWindow}
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


                            <Grid item xs={12}>
                                <FormLabel
                                    component="legend"
                                    className={classes.formlabel}
                                >
                                    New {category ? "Category" : "Product"} Name
                                </FormLabel>
                                <TextField
                                    fullWidth
                                    size="medium"
                                    variant="standard"
                                    type="text"
                                    placeholder={`New ${category ? "Category" : "Product"} Name`}
                                    {
                                    ...register("newName", {
                                        maxLength: {
                                            value: 50,
                                            message: "Name should not more than 50 in length"
                                        }
                                    })
                                    }
                                    error={Boolean(errors.cateName)}
                                    helperText={errors.cateName?.message}
                                />
                            </Grid>







                            {
                                // *form for product decription
                                product && (
                                    <>

                                        //* existingProduct
                                        <Grid item xs={12}>
                                            <FormLabel
                                                component="legend"
                                                className={classes.formlabel}
                                            >
                                                Select from the existing Product
                                            </FormLabel>
                                            <Select
                                                labelId="demo-controlled-open-select-label"
                                                id="demo-controlled-open-select"
                                                open={openProductWindow}
                                                onClose={() => setOpenProductWindow(false)}
                                                onOpen={() => setOpenProductWindow(true)}
                                                value={selectedProduct.name}
                                                onChange={e => setSelectedProduct(e.target.value)}
                                                style={{
                                                    width: "100%"
                                                }}
                                                {
                                                ...register("existingProduct")
                                                }
                                            >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                {
                                                    productList.map((ele, ind) => (
                                                        <MenuItem value={ele} key={ind}>
                                                            {ele.name}
                                                        </MenuItem>
                                                    ))
                                                }
                                            </Select>
                                        </Grid>

                                    //*description
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
                                    //* size and quantity
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
                                >Update{category ? "category" : "product"}</Button>

                            </Grid>

                        </Grid>

                    </Grid>
                </form>
            </Grid>
        </div>
    )
}

export default UpdateForm
