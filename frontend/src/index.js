import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Route, RouterProvider, createRoutesFromElements } from 'react-router';
import { createBrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import store from './redux/store';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}/>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
