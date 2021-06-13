import React, { useContext, useEffect, useState } from 'react'
import {
    Button,
    Divider,
    Grid,
    Typography
} from '@material-ui/core';
import { MainLayOutContext } from '../Components/MainLayOut'
import CartItem from '../Components/CartItem';
import AkBackDrop from '../Components/AkBackDrop';
// import RazorPayForm from './Auth/RazorPayForm';
import { createOrderAPI } from '../API/Order';
import { Redirect } from 'react-router';
import { Helmet } from 'react-helmet';


const UserCart = () => {
    const { user, setUser } = useContext(MainLayOutContext);
    const [totalCost, setTotalCost] = useState(0);
    const { shoppingCart = [] } = user;
    console.log(`cart: `, shoppingCart);

    const calculateTotalSum = (cartItems = []) => {
        let total = 0;
        cartItems.forEach(obj => total += (obj.costOfEachItem * obj.quantity));
        setTotalCost(total);
    }


    useEffect(() => calculateTotalSum(user.shoppingCart), [user]);

    const loadCheckOut = e =>
        createOrderAPI(user._id, totalCost,
            u => {
                setUser(u);
                <Redirect to="/" />
            }
        );


    return (
        <div>
            <Helmet>
                <title>{user?.firstName}'s Cart</title>
            </Helmet>
            {
                shoppingCart.length === 0 &&
                <Typography variant="h3" align="center">Your Shopping Cart is empty!!</Typography>
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
                                    index={i}
                                >
                                    <CartItem id={item} />
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
                            onClick={loadCheckOut}
                        >
                            Procceed To CheckOut ₹{totalCost}
                        </Button>
                    </Grid>
                </>
            }
        </div>
    )
}

export default UserCart
