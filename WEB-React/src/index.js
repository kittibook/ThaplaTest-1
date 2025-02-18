import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './User/Home';
import "./index.css"
import Formcheck from './User/Form/Formcheck';
import Check from './User/Check/Check';
import HomeAdmin from './Admin/Home';
import Upload from './Admin/Uploaddata/Uploaddata';
import DataSTD from './Admin/Data/Data';
import SettingWeb from './Admin/Setting/Web';
import Login from './Admin/auth/Login';
import Register from './Admin/auth/Register';
import Level from './Admin/Setting/Level';
import Img from './Admin/Setting/Img';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/form",
    element: <Formcheck />,
  },
  {
    path: "/check",
    element: <Check />,
  },


  {
    path: "/thaplatest/home/admin",
    element: <HomeAdmin />,
  },
  {
    path: "/thaplatest/home/admin/uploaddata",
    element: <Upload />,
  },
  {
    path: "/thaplatest/home/admin/datastd",
    element: <DataSTD />,
  },
  {
    path: "/thaplatest/home/admin/settingweb",
    element: <SettingWeb />,
  },
  {
    path: "/thaplatest/home/admin/img",
    element: <Img />,
  },
  {
    path: "/thaplatest/home/admin/level",
    element: <Level />,
  },
  {
    path: "/thaplatest/home/login",
    element: <Login />,
  },
  {
    path: "/thaplatest/home/reg",
    element: <Register />,
  },
])


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
