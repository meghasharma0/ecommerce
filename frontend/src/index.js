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
