import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Route, RouterProvider, createRoutesFromElements } from 'react-router';
import { createBrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import store from './redux/store';

// Auth
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import PrivateRoute from './components/PrivateRoute';
import Profile from './pages/User/Profile';
import AdminRoute from './pages/Admin/AdminRoute';
import UserList from './pages/Admin/UserList';
import CategoryList from './pages/Admin/CategoryList';
import ProductList from './pages/Admin/ProductList';
import AllProducts from './pages/Admin/AllProducts';
import ProductUpdate from './pages/Admin/productUpdate';
import OrderList from './pages/Admin/OrderList';
import AdminDashboard from './pages/Admin/AdminDashboard';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/register' element={<Register />}></Route>

      <Route path='' element={<PrivateRoute />}>
        <Route path='/profile' element={<Profile />} />
      </Route>

      <Route path='/admin' element={<AdminRoute />}>
        <Route path='userlist' element={<UserList />} />
        <Route path='categorylist' element={<CategoryList />} />
        <Route path='productlist' element={<ProductList />} />
        <Route path='allproductslist' element={<AllProducts />} />
        <Route path="productlist/:pageNumber" element={<ProductList />} />
        <Route path="product/update/:_id" element={<ProductUpdate />} />
        <Route path="orderlist" element={<OrderList />} />
        <Route path="dashboard" element={<AdminDashboard />} />
      </Route>
    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
