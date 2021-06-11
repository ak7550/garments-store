import React, { useContext, useEffect, useState } from 'react'
import {
    Button,
    Chip,
    Divider,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    makeStyles,
    Radio,
    RadioGroup,
    TextField,
    Typography
} from '@material-ui/core';
import { useHistory, useParams } from 'react-router'
import { addReivewAPI, getProductAPI, getSimiliarProductAPI } from '../API/Product';
import CarouselBox from '../Components/Carousel';
import { blue, green, grey, } from '@material-ui/core/colors';
import ShoppingBasketOutlinedIcon from '@material-ui/icons/ShoppingBasketOutlined';
import AttachMoneySharpIcon from '@material-ui/icons/AttachMoneySharp';
import { useForm } from 'react-hook-form';
import { MainLayOutContext } from '../Components/MainLayOut';
import { addToCartAPI } from '../API/Cart';
import ProductCard from '../Components/ProductCard';
import { handleError } from '../Helper/handleError';
import { Helmet } from 'react-helmet';


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
}));

const ProductPage = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState({
        name: '',
        description: '',
        imageLinks: [],
        sizes: [],
        reviews: [],
    });
    const [sizeSelected, setSizeSelected] = useState(null);
    const classes = useStyles();
    const { user, setUser } = useContext(MainLayOutContext);
    const [similiarProduct, setSimiliarProduct] = useState([]);

    useEffect(() => {
        getProductAPI(productId, data => {
            setProduct(data);
            console.log(`product: `, data);
        });
        getSimiliarProductAPI(productId,
            data => setSimiliarProduct(data),
            err => handleError(err));
    }, [productId]);

    const { register, handleSubmit, formState: { errors }, reset, clearErrors, } = useForm();

    const onSubmit = (reviewInfo, event) => {
        console.log(`info:`, reviewInfo);
        addReivewAPI(user._id, productId,
            { description: reviewInfo.review },
            data => {
                setProduct(data);
                console.log(`product: `, data);
            },
            err => handleError(err));
        reset();
    }

    const onError = (errors, event) => {
        console.log("error is: ", errors);
        reset();
        clearErrors();
    }

    const reviewForm = () =>
        <form
            onSubmit={handleSubmit(onSubmit, onError)}
            style={{
                marginTop: '3em'
            }}
        >
            <Grid
                direction="column"
                justify="center"
                alignItems="stretch"
            >
                <Grid item >
                    <FormLabel
                        component="legend"
                        className={classes.formlabel}
                        required
                    >
                        Review
                                </FormLabel>
                    <TextField
                        fullWidth
                        size="small"
                        variant="outlined"
                        type="text"
                        placeholder="Enter Your Review.."
                        {
                        ...register("review", {
                            minLength: {
                                value: 2,
                                message: "Your review has to be descriptive"
                            },
                            maxLength: {
                                value: 300,
                                message: "Your review has to be descriptive"

                            },

                        })
                        }
                        required
                        error={Boolean(errors.review)}
                        helperText={errors.review?.message}
                        multiline
                        rows={4}
                    />
                </Grid>
                <Grid item container
                    direction="column"
                    justify="center"
                    alignItems="flex-end"
                    style={{
                        marginTop: '2em'
                    }}
                >

                    <Button
                        color="default"
                        type="submit"
                        variant="contained"
                    >
                        Submit
                    </Button>
                </Grid>
            </Grid>

        </form>


    const bodySection = () => (
        <>
            <Grid item>
                <Typography gutterBottom variant="h3">
                    {product.name}
                </Typography>
            </Grid>
            <Divider />
            <Grid item>
                <Typography gutterBottom variant="subtitle1">
                    {product.description}
                </Typography>
            </Grid>
            <Divider />
            <Grid item>
                <Typography gutterBottom variant="subtitle1"
                    style={{
                        color: `${green[600]}`
                    }}
                >
                    Delivery all over the world in your dreams.
                </Typography>
            </Grid>

            <Grid item>
                <FormControl component="fieldset" >
                    <FormLabel component="legend"
                        style={{
                            color: 'black',
                            fontWeight: 'bold',
                            marginBottom: '2em'
                        }}
                    >
                        Select Size
                    </FormLabel>
                    <RadioGroup
                        aria-label="sizeSelection"
                        name="sizeSelection"
                        onChange={e => setSizeSelected({
                            size: e.target.value,
                            price: parseInt(e.target.name)
                        })}
                        style={{
                            display: 'inline-block'
                        }}
                    >
                        {
                            product.sizes.map((obj, i) => (
                                <FormControlLabel
                                    value={obj.size}
                                    control={<Radio />}
                                    key={i}
                                    name={obj.price}
                                    label={
                                        <>
                                            {obj.size}
                                            <Chip
                                                icon={
                                                    <span style={{
                                                        paddingLeft: 1
                                                    }}>
                                                        ₹
                                                    </span>
                                                }
                                                color="primary"
                                                label={obj.price}
                                                style={{
                                                    fontWeight: 'bold',
                                                    marginLeft: '1em',
                                                    fontSize: '1em'
                                                }}
                                                disabled={obj.stockCount <= 0}
                                                clickable
                                            />

                                        </>
                                    }
                                    disabled={obj.stockCount <= 0}
                                    style={{
                                        marginLeft: '0.5em'
                                    }}
                                />
                            ))
                        }

                    </RadioGroup>
                </FormControl>
            </Grid>
            <Grid item style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '2em'

            }}>

                <Button
                    variant="contained"
                    size="large"
                    color="secondary"
                    endIcon={<ShoppingBasketOutlinedIcon />}
                    onClick={e => {
                        sizeSelected &&
                            addToCartAPI(user._id,
                                productId,
                                sizeSelected,
                                data => setUser(data),
                                err => handleError(err));
                    }}
                    disabled={!user}
                >
                    {
                        !user ? `LogIn / SignIn first to place orders` : sizeSelected ? `Add To Cart` : `Select Size`
                    }
                </Button>
            </Grid>
        </>
    )


    const reviewSection = () =>
        <Grid container
            style={{
                // border: '2px solid black',
                // height: '30em',
                paddingTop: '2em'
            }}
            // spacing={1}
            justify="flex-start"
            alignItems="center"
            wrap
            direction="column"
        >
            {
                product.reviews.length === 0 ?
                    <Typography align="center" variant="subtitle1"
                        style={{
                            textAlign: 'left',
                            marginRight: 'auto',
                            color: `${blue[900]}`
                        }}
                    >
                        <span style={{
                            fontStyle: 'italic',

                        }}>
                            {product.name}
                        </span> do not have any reviews so far.
                        </Typography>
                    :
                    (
                        <>
                            <Typography align="center" variant="subtitle1"
                                style={{
                                    // textAlign: 'left',
                                    marginRight: 'auto',
                                    color: `${blue[600]}`,
                                    marginTop: '3em',
                                    fontSize: '1.3em',
                                    fontWeight: 'bold',
                                    marginLeft: '2em'
                                }}
                            >
                                <span style={{
                                    fontStyle: 'italic',

                                }}>
                                    {product.name}
                                </span>'s reviews so far.
                        </Typography>
                            {
                                product.reviews.map((review, i) => (

                                    <Grid container direction="row"
                                        justify="flex-start"
                                        alignItems="flex-start"
                                        wrap
                                        direction="column"
                                        key={i}
                                        style={{
                                            backgroundColor: `${grey[200]}`,
                                            margin: '2em',
                                            minHeight: '4em',
                                            overflow: 'hidden',
                                            maxWidth: '98%',
                                        }}>
                                        <Grid item>
                                            <Typography style={{
                                                padding: '0.5em'
                                            }}
                                                variant="h5"
                                            >
                                                {review.user?.firstName} {review.user?.lastName}
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Divider />
                                        </Grid>
                                        <Grid item
                                            style={{
                                                padding: '0.5em'
                                            }}
                                        >
                                            <Typography
                                                style={{
                                                    padding: '0.5em'
                                                }}
                                                variant="caption2"
                                            >
                                                {review.description}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                ))
                            }
                        </>
                    )
            }

        </Grid>

    const showSimiliarProducts = () =>
        <Grid container direction="column" style={{
            marginTop: '5em'
        }}>
            <Grid item style={{
                marginBottom: '3em',
                marginLeft: 0
            }}>
                <Typography align="center" variant="subtitle1"
                    style={{
                        textAlign: 'left',
                        marginRight: 'auto',
                        color: `${blue[600]}`,
                        marginTop: '3em',
                        fontSize: '1.3em',
                        fontWeight: 'bold',
                        marginLeft: '2em'
                    }}
                >
                    Similiar Products from same Category...
                </Typography>
            </Grid>
            {
                similiarProduct.map((p, i) =>
                    p._id !== productId &&
                    <Grid item
                        style={{
                            paddingLeft: '1em',
                            maxWidth: '20%',
                            maxHeight: '20%',
                            margin: '3em'
                        }}
                    >
                        <ProductCard
                            product={p}
                            linkTo={`/product/${p._id}`}
                            toggle={() => { }}
                        />
                    </Grid>
                )
            }
        </Grid>



    return (
        <>
            <Helmet>
                <title>{product.name}</title>
            </Helmet>
            <Grid container direction="column">
                <Grid item>
                    <Grid container
                        style={{
                            // border: '2px solid black',
                            height: '30em'
                        }}
                        // spacing={1}
                        justify="flex-start"
                        alignItems="center"
                        wrap
                        direction="row"
                    >
                        <Grid item xs={4} wrap
                            style={{
                                minHeight: '25em',
                                minWidth: '5em'
                            }}
                        >
                            <CarouselBox images={product.imageLinks} />
                        </Grid>
                        <Grid item xs={8}>
                            <Grid
                                container direction="column" justify="flex-start" alignItems="stretch" spacing={3} wrap
                                style={{
                                    // backgroundColor: '#f7f7f7',
                                    maxWidth: '65%',
                                    position: 'absolute',
                                    top: "18%"
                                }}
                            >
                                {bodySection()}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item >
                    {
                        reviewSection()
                    }
                </Grid>
                <Grid item>
                    {
                        reviewForm()
                    }
                </Grid>
                <Grid item>
                    {
                        showSimiliarProducts()
                    }
                </Grid>
            </Grid>
        </>
    )
}

export default ProductPage
