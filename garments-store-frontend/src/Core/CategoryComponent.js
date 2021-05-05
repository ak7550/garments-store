import { List, ListItem, makeStyles, Typography } from '@material-ui/core';
import clsx from 'clsx';
import React, { useContext, useEffect, useState } from 'react'
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

const CategoryComponent = () => {

    const { categoryIndex } = useParams();
    const classes = useStyle();
    console.log(`into category, index is: `, categoryIndex, "\n", useParams());
    const [productArr, setProductArr] = useState([]);
    const { sideBar } = useContext(MainLayOutContext);

    useEffect(() => {
        console.log(`hi from useEffect of categorycomponent`);
        loadAllProducts(categoryIndex, data => setProductArr(data));
    });

    console.log(`product arr: `, productArr);

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
                            productArr.length &&
                            productArr.map((product, index) => (
                                <ListItem button key={index}>
                                    <Link
                                        to={`/category/${categoryIndex}/product/${index}`}
                                        className={classes.link}
                                        style={{
                                            border: "1px solid black",
                                            display: "inline",
                                            width: "40em",
                                            height: "60em",
                                            background: "red",
                                            marginLeft: "20em"
                                        }}
                                    >
                                        <ProductCart product={product} />
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

export default CategoryComponent
