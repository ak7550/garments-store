import { Grid, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { loadAllProducts } from '../Utils/Product';
import { drawerWidth } from '../Utils/backEnd'
import { MainLayOutContext } from '../Components/MainLayOut';
import ProductCard from '../Components/ProductCard';

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
        console.log(`condition is: ${productArr.arr.length === 0 || productArr.cateIndex !== categoryIndex}`);

        if (productArr.arr.length === 0 || productArr.cateIndex !== categoryIndex) {
            loadAllProducts(categoryIndex, data => {
                console.log("fixed issue");
                setProductArr({
                    arr: data,
                    cateIndex: categoryIndex,
                });
            });
        }

    }, [sideBar]); //as i need to call the method useEffect everytime the component updates ==> how do i know that the value needs to be changed ==> at that monet an obvious thing is occuring that the sidebar is changing it's value // don't think about es lint warning. //docs: https://www.akashmittal.com/useeffect-missing-dependency/


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
                            productArr.arr.length &&
                            productArr.arr.map((product, index) => (
                                <Grid item
                                    style={{
                                        paddingLeft: '1em',
                                    }}
                                >
                                    <ProductCard
                                        product={product}
                                        linkTo={`/category/${index}/product/${index}`}
                                    />
                                </Grid>
                            ))

                        }

                    </Grid>
                }
            </div>
        </>
    );
}

export default CategoryComponent
