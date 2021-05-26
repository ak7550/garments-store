import React from 'react'
import { getRandomImages } from '../Helper/Random'
import Carousel from 'react-material-ui-carousel'


const CarouselBox = ({ images = [] }) => {

    images.length === 0 && getRandomImages("fashion", data => images.push(data));

    console.log(`images: `, images);
    return (
        <Carousel>
            {
                images.map((image, i) => <img src={image} />)
            }
        </Carousel>
    )
}

export default CarouselBox
