import { Grid, } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { loadAllProducts } from '../Utils/Product';
import { MainLayOutContext } from '../Components/MainLayOut';
import ProductCard from '../Components/ProductCard';
import Footer from '../Components/Footer';


const CategoryComponent = () => {
    const { categoryIndex } = useParams();
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
            <div>
                {
                    <Grid
                        container
                        direction="row"
                        justify="flex-start"
                        alignItems="center"
                        wrap
                        // style={{
                        //     marginLeft: "20em"
                        // }}
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
                                        linkTo={`/product/${product._id}`}
                                        toggle={() => { }}
                                    />
                                </Grid>
                            ))

                        }

                    </Grid>
                }
                <Footer />
            </div>
        </>
    );
}

export default CategoryComponent
