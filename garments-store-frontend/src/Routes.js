import React from 'react'
import { Route, Switch } from 'react-router'
import { MainLayOut } from './Components/MainLayOut'
import CategoryComponent from './Core/CategoryComponent'
import Home from './Core/Home'
import ManageCategories from './Core/ManageCategories'
import ManageProducts from './Core/ManageProducts'
import OrderList from './Core/OrderList'
import PrivateRoute from './Core/PrivateRoute'
import ProductPage from './Core/ProductPage'
import SellerDashBoard from './Core/SellerDashBoard'
import SellerRoute from './Core/SellerRoute'
import UserCart from './Core/UserCart'
import UserDashboard from './Core/UserDashboard'
import UserList from './Core/UserList'
import UserWishList from './Core/UserWishList'

const Routes = () => {
    return (
        <Switch>
            <MainLayOut>
                <Route path="/" exact ><Home /></Route>

                //todo: make them id instead of index, change in localforage accordingly
                <Route path="/category/:categoryIndex" exact><CategoryComponent /></Route>
                <Route path="product/:productId" exact><ProductPage /></Route>  
                <Route path="/user/dashboard/:userId" exact component={UserDashboard} /> //_ this is look into anyone's dashboard
                <Route path="/user/orderList/:userId" component={OrderList} exact />
                <Route path="/user/wishList/:userId" component={UserWishList} exact />
                <Route path="/user/followerList/:userId" component={UserList} exact />
                <Route path="/user/followingList/:userId" component={UserList} exact />

                <PrivateRoute path="" exact component={UserCart} />

                <SellerRoute path="/seller/dashboard/:userId" exact component={SellerDashBoard} />
                <SellerRoute path="/seller/category/:userId" exact component={ManageCategories} />
                <SellerRoute path="/seller/product/:userId" exact component={ManageProducts} />

            </MainLayOut>
        </Switch>
    )
}


export default Routes
