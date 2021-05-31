import React, { useContext, useEffect, useState } from 'react'
import {
    Button,
    Divider,
    Grid,
    Typography
} from '@material-ui/core';
import { MainLayOutContext } from '../Components/MainLayOut'
import CartItem from '../Components/CartItem';

const UserCart = () => {
    const { user } = useContext(MainLayOutContext);
    const [totalCost, setTotalCost] = useState(0);
    const { shoppingCart = [] } = user;
    console.log(`cart: `, shoppingCart);

    const calculateTotalSum = (cartItems=[]) => {
        let total = 0;
        cartItems.forEach(obj => total += (obj.costOfEachItem * obj.quantity));
        setTotalCost(total);
    }


    useEffect(() => calculateTotalSum(user.shoppingCart), [user]);


    return (
        <div>
            {
                shoppingCart.length === 0 &&
                <Typography variant="h3">Your Shopping Cart is empty!!</Typography>
            }
            {
                shoppingCart.length !== 0 &&
                <>
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
                                    xs={12}
                                    style={{
                                        margin: '2em',
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
                    <Divider />
                    <Grid container
                        justify="center"
                        alignItems='center'
                        style={{
                            minWidth: '2em',
                            minHeight: '2em',
                            // border: '2px solid black',
                            marginTop: '2em'
                        }}
                    >
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                        // className={classes.button}
                        // endIcon={<SaveIcon />}
                        >
                            Procceed To CheckOut {totalCost}
                        </Button>
                    </Grid>
                </>
            }
        </div>
    )
}

export default UserCart
