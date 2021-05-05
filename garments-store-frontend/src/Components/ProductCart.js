import React from 'react'
import { makeStyles } from '@material-ui/core';

const useStyle = makeStyles(theme => ({
    link: {
        display: "inherit",
        textDecoration: "none",
        color: "inherit"
    }
}));

const ProductCart = ({ product }) => {
    const classes = useStyle();
    return (
        <div>
            ProductCart
            ProductCart
        </div>
    )
}

export default ProductCart
