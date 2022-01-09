import React from 'react';
import {Switch,Route,BrowserRouter,Link} from 'react-router-dom'
import AdminRoute from './auth/helper/AdminRoutes';
import Home from './core/Home';
import AdminDashBoard from './user/AdminDashBoard';
import Signin from './user/Signin';
import Signup from './user/Signup';
import PrivateRoute from './auth/helper/PrivateRoutes.js';
import UserDashBoard from './user/UserDashBoard';
import AddCategory from './admin/AddCategory';
import Referral from './user/Referal';
import ManageCategory from './admin/ManageCategory';
import AddProduct from './admin/AddProduct';
import ManageProducts from './admin/ManageProducts';
import UpdateProduct from './admin/UpdateProduct';
import UpdateCategory from './admin/UpdateCategory';
import Cart from './core/Cart';
import ManageOrders from './admin/ManageOrders';

 
const Routes = ()=>{
  return(
      <BrowserRouter>
        <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/signup' exact component={Signup} />
            <Route path='/signin' exact component={Signin} />
            <Route path='/cart' exact component={Cart} />

            <PrivateRoute  path='/user/dashboard' exact component={UserDashBoard} />
            <AdminRoute path='/admin/dashboard' exact component={AdminDashBoard} />
            <AdminRoute path='/admin/create/category' exavt component={AddCategory} />
            <PrivateRoute  path='/user/referral' exact component={Referral} />
            <AdminRoute path='/admin/categories' exact component={ManageCategory} />
            <AdminRoute path='/admin/create/product' exact component={AddProduct} />
            <AdminRoute path='/admin/products' exact component={ManageProducts} />
            <AdminRoute path='/admin/product/update/:productId' exact component={UpdateProduct} />
            <AdminRoute path='/admin/category/update/:categoryId' exact component={UpdateCategory} />
            <AdminRoute path='/admin/orders' exact component={ManageOrders} />


        </Switch>
      </BrowserRouter>
  )

}

export default Routes