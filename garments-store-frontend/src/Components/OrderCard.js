import {
    Chip,
    Divider,
    Grid,
    makeStyles,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@material-ui/core';
import { cyan } from '@material-ui/core/colors';
import React, { useContext, useEffect, useState } from 'react'
import { getOrderAPI } from '../API/Order'
import { MainLayOutContext } from './MainLayOut';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexGrow: 1,
    },
    table: {
        // minWidth: '355%',
    },

}));

const OrderCard = ({ orderId }) => {
    const { user } = useContext(MainLayOutContext);
    const classes = useStyles();
    const [orderDetails, setOrderDetails] = useState({
        products: [],
        transactionDetails: "",
        totalCost: 0,
        status: "Delivered",
        createdAt: new Date(),
        _id: ""
    });
    useEffect(() => getOrderAPI(user._id, orderId, d => setOrderDetails(d)), []);

    console.log("orderDetails: ", orderDetails);

    const makeTable = () =>
        <TableContainer component={Paper}
        >
            <Table className={classes.table} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell>Size</TableCell>
                        <TableCell>Quantity</TableCell>
                        <TableCell>Cost Of Each(₹)</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        orderDetails.products.map((product, i) => (
                            <TableRow>
                                <TableCell align="left">{i + 1}.</TableCell>
                                <TableCell align="left" style={{
                                    paddingLeft: '2rem'
                                }}>{product.size}</TableCell>
                                <TableCell align="left" style={{
                                    paddingLeft: '2rem'
                                }}>{product.quantity}</TableCell>
                                <TableCell align="left" style={{
                                    paddingLeft: '2rem'
                                }}>{product.costOfEachItem}</TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </TableContainer>



    return (
        <div className={classes.root}>
            <Paper className={classes.paper} color={cyan[50]} elevation={2}
                style={{
                    minWidth: '50em'
                }}
            >
                <Grid container spacing={2} direction="column">
                    <Grid item style={{
                        margin: 2,
                    }}>
                        <Typography variant="h6">
                            <span style={{
                                fontWeight: 'bold',
                                padding: 4,
                            }}>
                                Order Id:
                            </span>
                        </Typography>
                        {orderDetails._id}
                        <Divider />
                    </Grid>
                    <Grid item>
                        {makeTable()}
                        <Divider />
                    </Grid>
                    <Grid item style={{
                        margin: 2,
                        marginTop: 4,
                    }}>
                        <span style={{
                            fontWeight: 'bold',
                            paddingRight: 4
                        }}>
                            TotalCost:
                        </span>
                        <Chip
                            color="secondary"
                            label={`₹${orderDetails.totalCost}`}
                            size="small"
                            clickable
                        />
                        <span style={{
                            fontWeight: 'bold',
                            paddingRight: 4,
                            marginLeft: '5%'
                        }}>
                            Status:
                        </span>
                        <Chip
                            color="primary"
                            label={orderDetails.status}
                            size="small"
                            clickable
                        />
                    </Grid>
                </Grid>
            </Paper>
        </div>
    )
}

export default OrderCard
