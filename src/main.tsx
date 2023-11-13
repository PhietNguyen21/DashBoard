import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import HomeTemplate from './template/home.template.tsx';
import { Home } from './page/Home.tsx';
import DashBoard from './page/DashBoard.tsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [{
      path: '/',
      element: <HomeTemplate />,
      children: [{
        path: '/',
        element: <Home />
      }, {
        path: '/dashboard',
        element: <DashBoard />
      }]
    }]
  },
]);
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />

  </React.StrictMode>,
)
