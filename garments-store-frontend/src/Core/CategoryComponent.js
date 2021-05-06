import { List, ListItem, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import ProductCart from '../Components/ProductCart';
import { loadAllProducts } from '../Utils/Product';
import { drawerWidth } from '../backEnd'
import { MainLayOutContext } from '../Components/MainLayOut';

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


//! component is redering too many times

const CategoryComponent = () => {
    const { categoryIndex } = useParams();
    const classes = useStyle();
    const [productArr, setProductArr] = useState({
        arr: [],
        cateIndex: categoryIndex,
    });
    const { sideBar } = useContext(MainLayOutContext);

    console.log(`product arr: `, productArr);
    console.log(`into category, index is: `, categoryIndex, "\n", useParams());

    useEffect(() => {
        // will get inside it, only when the condition is true
        console.log(`length: ${productArr.arr.length} \n categoryIndex: ${categoryIndex}`);
        console.log(`condition is: ${productArr.arr.length == 0 || productArr.cateIndex != categoryIndex}`);

        if (productArr.arr.length == 0 || productArr.cateIndex != categoryIndex) {
            loadAllProducts(categoryIndex, data => {
                console.log("fixing the shit");
                setProductArr({
                    arr: data,
                    cateIndex: categoryIndex,
                });
            });
        }

    }, [sideBar]);


    return (
        <>
            <div
                className={clsx(classes.content, {
                    [classes.contentShift]: sideBar,
                })}
            >
                <div className={classes.drawerHeader} />
                {
                    <List component="div" disablePadding>
                        {
                            productArr.arr.length &&
                            productArr.arr.map((product, index) => (
                                <ListItem button key={index}>
                                    <Link
                                        to={`/category/${categoryIndex}/product/${index}`}
                                        className={classes.link}
                                        style={{
                                            border: "1px solid black",
                                            display: "inline",
                                            width: "40em",
                                            height: "10em",
                                            background: "red",
                                            marginLeft: "20em"
                                        }}
                                    >
                                        <ProductCart
                                            product={product}
                                        />
                                    </Link>
                                </ListItem>
                            ))

                        }

                    </List>
                }
            </div>
        </>
    );
}

export default CategoryComponent;
