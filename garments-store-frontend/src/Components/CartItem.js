import React, { useContext, useEffect, useState } from 'react'
import {
    Avatar,
    Card,
    CardHeader,
    CardMedia,
    Divider,
    makeStyles
} from '@material-ui/core';
import { getCartAPI } from '../API/Cart';
import { MainLayOutContext } from './MainLayOut';
import clsx from 'clsx';
import { blue, green, grey, orange, pink, purple, red } from '@material-ui/core/colors';
import CallMadeIcon from '@material-ui/icons/CallMade';
import { Link } from 'react-router-dom';


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
    }
}));

const CartItem = ({ id }) => {
    const [cartInfo, setCartInfo] = useState({
        productDetail: null,
        quantity: 0,
        size: "S",
        costOfEachItem: 100
    });
    const { user } = useContext(MainLayOutContext);
    const classes = useStyles({ color: '#203f52' });

    useEffect(() =>
        getCartAPI(id, user._id, d => {
            setCartInfo(d);
            console.log(`cartInfo: `, d.productDetail);
        }, err => console.log(err))
        , []);

    return (
        <Card className={clsx(classes.root, classes.card)}>
            <CardHeader
                title={cartInfo.productDetail?.name}
                subheader={<Avatar className={clsx(classes.avatar, classes.orange)}>{cartInfo.size}</Avatar>}
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
        </Card>
    )
}

export default CartItem
