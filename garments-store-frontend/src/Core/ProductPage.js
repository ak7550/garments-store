import React from 'react'
import { useParams } from 'react-router'

const ProductPage = () => {
    const { categoryIndex, productIndex } = useParams();

    return (
        <div>
            ProductPage
            ProductPage
        </div>
    )
}

export default ProductPage
