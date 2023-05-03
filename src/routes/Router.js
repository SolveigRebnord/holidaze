import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
import Venues from "../pages/Venues";
import OneVenue from "../pages/OneVenue";
import Bookings from "../pages/Bookings";
import LogIn from "../pages/LogIn";
import Register from "../pages/Register";
import Profiles from "../pages/Profiles";
import Account from "../pages/Account";
import Homepage from "../pages/Homepage";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,

    children: [
      {
        index: true,
        element: <Homepage />
      },
      {
        path: "/venues",
        element: <Venues />,
      },
      {
        path: "/venues/:id",
        element: <OneVenue />,
      },
      {
        path: "/bookings",
        element: <Bookings />,
      },
      {
        path: "/login",
        element: <LogIn />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/profiles",
        element: <Profiles />,
      },
      {
        path: "/account",
        element: <Account />,
      },

    ],
  },
]);

export default router;
