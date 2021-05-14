import { Grid, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { getWishListItemAPI } from '../API/Product';
import { MainLayOutContext } from '../Components/MainLayOut';
import ProductCard from '../Components/ProductCard';
import { drawerWidth } from '../Utils/backEnd';


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


const UserWishList = () => {
    const { userId } = useParams();
    const [productArr, setProductArr] = useState([]);
    const classes = useStyle();
    const { sideBar, user } = useContext(MainLayOutContext);
    const [toggler, setToggler] = useState(true);
    useEffect(() => {
        getWishListItemAPI(userId, data => {
            console.log(`data is: ${data}`);
            setProductArr(data);
        });
    }, []);
    return (
        <>
            <div
                className={clsx(classes.content, {
                    [classes.contentShift]: sideBar,
                })}
                style={{
                    maxWidth: "100%"
                }}
            >
                <div className={classes.drawerHeader} />
                {
                    <Grid
                        container
                        direction="row"
                        justify="flex-start"
                        alignItems="center"
                        wrap
                        style={{
                            marginLeft: "20em"
                        }}
                    >
                        {
                            productArr.length &&
                            productArr.map((product, index) => (
                                <Grid item
                                    style={{
                                        paddingLeft: '1em',
                                    }}
                                >
                                    <ProductCard
                                        product={product}
                                        linkTo={`/product/${product._id}`}
                                        fav
                                        toggle={()=> setToggler(!toggler)}
                                    />
                                </Grid>
                            ))

                        }

                    </Grid>
                }
            </div>
        </>
    )
}

export default UserWishList
