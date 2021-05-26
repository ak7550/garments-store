import React, { useEffect, useState } from 'react'
import { Grid, Paper } from '@material-ui/core';
import { useParams } from 'react-router'
import { getProductAPI } from '../API/Product';
import CarouselBox from '../Components/Carousel';

const ProductPage = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState({
        name: '',
        description: '',
        imageLinks: [],
        sizes: [],
        reviews: [],
    });

    useEffect(() => {
        getProductAPI(productId, data => setProduct(data));
    }, []);

    const bodySection = () => {

    }



    return (
        <Paper elevation={2}>
            <Grid container
                style={{
                    border: '2px solid black',
                    height: '10em'
                }}
                spacing={1}
                justify="flex-start"
                alignItems="center"
            >
                <Grid item xs={4}
                    style={{
                        border: '2px solid red',
                        height: '5em',
                        width: '5em'
                    }}
                >
                    <CarouselBox images={product.imageLinks} />
                </Grid>
                <Grid item container
                    style={{
                        border: '2px solid green',
                        height: '5em',
                        width: '5em'
                    }}
                >
                    {bodySection()}
                </Grid>
            </Grid>
        </Paper>
    )
}

export default ProductPage
