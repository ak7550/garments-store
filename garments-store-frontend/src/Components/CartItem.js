import React, { useContext, useEffect, useState } from 'react'
import {
    Avatar,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    Chip,
    CircularProgress,
    Divider,
    FormControl,
    Grid,
    IconButton,
    InputLabel,
    makeStyles,
    OutlinedInput,
    TextField,
    Typography
} from '@material-ui/core';
import { getCartAPI, removeFromCartAPI, updateQuantityAPI } from '../API/Cart';
import { MainLayOutContext } from './MainLayOut';
import clsx from 'clsx';
import { blue, green, grey, orange, pink, purple, red } from '@material-ui/core/colors';
import CallMadeIcon from '@material-ui/icons/CallMade';
import { Link } from 'react-router-dom';
import produce from 'immer';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import DeleteIcon from '@material-ui/icons/Delete';
import AttachMoneySharpIcon from '@material-ui/icons/AttachMoneySharp';
import { getProductAPI } from '../API/Product';

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 345,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    card: ({ color }) => ({
        minWidth: 256,
        borderRadius: 16,
        boxShadow: 'none',
        '&:hover': {
            boxShadow: `0 6px 12px 0 ${color}`,
        },

    }),

    avatar: {
        color: theme.palette.getContrastText(blue[500]),
        backgroundColor: blue[500],
        width: theme.spacing(4),
        height: theme.spacing(4),
        opacity: 0.2,
        '&:hover': {
            color: theme.palette.getContrastText(pink[500]),
            backgroundColor: pink[500],
            opacity: 1,
        }
    },
    cardAction: {
        backgroundColor: grey[200],
    },
    pink: {
        backgroundColor: pink[700],
        color: theme.palette.getContrastText(pink[700]),
        width: theme.spacing(2),
        height: theme.spacing(2),
    },
    red: {
        backgroundColor: red[700],
        color: theme.palette.getContrastText(red[700]),
        width: theme.spacing(2),
        height: theme.spacing(2),
    },
    green: {
        backgroundColor: green[700],
        color: theme.palette.getContrastText(green[700]),
        width: theme.spacing(2),
        height: theme.spacing(2),
    },
    purple: {
        backgroundColor: purple[700],
        color: theme.palette.getContrastText(purple[700]),
        width: theme.spacing(2),
        height: theme.spacing(2),
    },
    orange: {
        backgroundColor: orange[700],
        color: theme.palette.getContrastText(orange[700]),
        width: theme.spacing(2),
        height: theme.spacing(2),
    },
    link: {
        display: "inherit",
        textDecoration: "none",
        color: "inherit"
    },
    large: {
        width: theme.spacing(3),
        height: theme.spacing(3),
        color: `${blue[50]}`,
        opacity: 1
    },
    button: {
        margin: theme.spacing(1),
    },
    cardAction: {
        backgroundColor: grey[200],
        minHeight: '3em'
    },
}));

const CartItem = ({ id: cartInformation }) => {
    const [cartInfo, setCartInfo] = useState({
        productDetail: null,
        quantity: 0,
        size: "S",
        costOfEachItem: 100
    });
    const { user, setUser } = useContext(MainLayOutContext);
    const classes = useStyles({ color: '#203f52' });
    const [loading, setLoading] = useState(false);


    useEffect(() =>
        getCartAPI(cartInformation._id, d => setCartInfo(d), err => console.log(err)), []);

    const minusButtonPressed = e => {
        setLoading(true);
        updateQuantityAPI(cartInfo._id, user._id,
            {
                quantity: cartInfo.quantity - 1
            },
            (u, c) => {
                setUser(u);
                setCartInfo(c);
                console.log(`updated cart info is: `, c);
                setLoading(false);
            },
            err => console.log(err));
    }


    const addButtonPressed = e => {
        setLoading(true);
        updateQuantityAPI(cartInfo._id, user._id,
            {
                quantity: cartInfo.quantity + 1
            },
            (u, c) => {
                setUser(u);
                setCartInfo(c);
                console.log(`updated cart info is: `, c);
                setLoading(false);
            },
            err => console.log(err));
    }

    //!check
    const deleteButtonPressed = e =>
        removeFromCartAPI(cartInfo._id,
            user._id,
            u => setUser(u),
            err => console.log(err));




    const quantitySection = () => (
        <Grid container
            direction="row"
            justify="flex-start"
            alignItems="center"
            wrap
        >
            <Grid item xs={6}>
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                >
                    <Grid item>
                        <IconButton
                            color="warning"
                            onClick={minusButtonPressed}
                            disabled={cartInfo.quantity <= 1}
                        >
                            <RemoveCircleOutlineIcon />
                        </IconButton>
                    </Grid>
                    <Grid item xs={1}>
                        <Typography style={{
                            // textDecoration: 'underline',
                            fontWeight: 'bold'
                        }}>
                            {
                                loading ? <CircularProgress className={classes.large} />
                                    :
                                    <>
                                        {cartInfo.quantity}
                                    </>
                            }
                        </Typography>
                    </Grid>
                    <Grid item>
                        <IconButton color="secondary" onClick={addButtonPressed} >
                            <AddCircleOutlineIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item>
                <Button
                    variant="outlined"
                    color="primary"
                    // className={classes.button}
                    startIcon={<DeleteIcon />}
                    onClick={deleteButtonPressed}
                >
                    Remove
                </Button>
            </Grid>

        </Grid>
    )


    return (
        <Card className={clsx(classes.root, classes.card)}>
            <CardHeader
                title={cartInfo.productDetail?.name}
                subheader={
                    <Avatar
                        className={clsx(classes.avatar, classes.orange, classes.large)}
                    >
                        {cartInfo.size}
                    </Avatar>
                }
                action={
                    <Link to={`/product/${cartInfo.productDetail?._id}`} className={classes.link}>
                        <Avatar className={classes.avatar}>
                            <CallMadeIcon />
                        </Avatar>
                    </Link>
                }
            />
            <CardMedia
                className={classes.media}
                image={cartInfo.productDetail?.imageLinks[0]}
                title={cartInfo.productDetail?.name}
            />
            <Divider />
            <CardContent>
                {
                    quantitySection()
                }
            </CardContent>
            <Divider />
            <CardActions disableSpacing className={classes.cardAction}>
                <Chip
                    icon={
                        <span>₹</span>
                    }
                    color="secondary"
                    label={cartInfo.costOfEachItem}
                    style={{
                        position: "relative",
                        fontWeight: 'normal',
                        fontSize: '1rem',
                        margin: 'auto'
                    }}
                    clickable
                />
            </CardActions>
        </Card>
    )
}

export default CartItem
