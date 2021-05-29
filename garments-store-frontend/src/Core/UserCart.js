import React, { useContext, useEffect, useState } from 'react'
import {
    Grid,
    Typography
} from '@material-ui/core';
import { MainLayOutContext } from '../Components/MainLayOut'
import CartItem from '../Components/CartItem';

const UserCart = () => {
    const { user } = useContext(MainLayOutContext);
    const { shoppingCart = [] } = user;
    console.log(`cart: `, shoppingCart);
    

    return (
        <div>
            {
                shoppingCart.length === 0 &&
                <Typography variant="h3">Your Shopping Cart is empty!!</Typography>
            }
            {
                <Grid
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="center"
                    wrap
                >
                    {
                        shoppingCart.map((item, i) => (
                            <Grid item
                                style={{
                                    marginLeft: '2em',
                                    maxWidth: '20%',
                                    maxHeight: '20%'
                                }}
                            >
                                <CartItem
                                    id={item}
                                />
                            </Grid>
                        ))
                    }

                </Grid>
            }
        </div>
    )
}

export default UserCart
