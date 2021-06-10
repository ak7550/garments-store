import React, { useContext } from 'react'
import { Helmet } from 'react-helmet';
import { MainLayOutContext } from '../Components/MainLayOut'

const OrderList = () => {
    const { user } = useContext(MainLayOutContext);
    return (
        <div>
            <Helmet>
                <title>{ user.firstName}'s Orders</title>
            </Helmet>
            OrderList
            OrderList
        </div>
    )
}

export default OrderList
