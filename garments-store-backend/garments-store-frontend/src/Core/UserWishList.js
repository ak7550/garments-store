import { Grid, Typography, } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router';
import { getWishListItemAPI } from '../API/Product';
import ProductCard from '../Components/ProductCard';



const UserWishList = () => {
    const { userId } = useParams();
    const [productArr, setProductArr] = useState([]);
    const [toggler, setToggler] = useState(true);


    useEffect(() => {
        getWishListItemAPI(userId, data => {
            console.log(`data is: ${data}`);
            setProductArr(data);
        });
    }, []);

    return (
        <>
            <Helmet>
                <title> Wish List</title>
            </Helmet>
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
                        productArr.length !== 0 &&
                        productArr.map((product, index) => (
                            <Grid item
                                style={{
                                    paddingLeft: '1em',
                                }}
                            >
                                <ProductCard
                                    product={product}
                                    linkTo={`/product/${product._id}`}
                                    key={index}
                                />
                            </Grid>
                        ))

                    }
                    {
                        productArr.length === 0 &&
                        <Typography variant="h3" align="center"> Wish List is empty!!</Typography>
                    }

                </Grid>
            }
        </>
    )
}

export default UserWishList
