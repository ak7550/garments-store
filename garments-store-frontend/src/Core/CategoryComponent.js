import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { loadAllProducts } from '../Utils/Product';


const CategoryComponent = () => {

    const { categoryIndex } = useParams();
    console.log(`into category, index is: `, categoryIndex, "\n", useParams());
    const [productArr, setProductArr] = useState([]);
    useEffect(() => {
        loadAllProducts(categoryIndex, data => {
            console.log(data);
            setProductArr(data);
        });
    }, []);
    console.log(`product arr: `, productArr);
    return (
        <div>
            Category
            Category
        </div>
    )
}

export default CategoryComponent
