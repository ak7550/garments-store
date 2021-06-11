import {
    Grid,
    makeStyles,
    Typography
} from '@material-ui/core';
import React, { useContext } from 'react'
import { Helmet } from 'react-helmet';
import { MainLayOutContext } from '../Components/MainLayOut'
import OrderCard from '../Components/OrderCard';

const useStyles = makeStyles({
    table: {
        // minWidth: 650,
    },
});


const OrderList = () => {
    const { user } = useContext(MainLayOutContext);
    const classes = useStyles();

    return (
        <div>
            <Helmet>
                <title>{user?.firstName}'s Orders</title>
            </Helmet>
            {
                user.orders.length === 0 &&
                <Typography variant="h3" align="center">Your have not place any order so far.</Typography>
            }
            {
                user.orders.length > 0 &&
                <Grid
                    container
                    direction="column"
                    justify="flex-start"
                    alignItems="center"
                    wrap
                    className={classes.table}
                >
                    {
                        user.orders.map((id, i) => (
                            <Grid item
                                xs={12}
                                key={i}
                                style={{
                                    marginTop: '2em',
                                }}
                            >
                                <OrderCard orderId={id} />
                            </Grid>
                        ))
                    }
                </Grid>
            }
        </div>
    )
}

export default OrderList
