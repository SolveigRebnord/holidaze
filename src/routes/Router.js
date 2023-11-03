import React from "react";
import { createBrowserRouter} from "react-router-dom";
import Layout from "../components/Layout";
import Venues from "../pages/Venues";
import OneVenue from "../pages/OneVenue";
import LogIn from "../pages/LogIn";
import Account from "../pages/Account";
import Homepage from "../pages/Homepage";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,

    children: [
      {
        index: true,
        element: <Homepage />,
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
        path: "/login",
        element: <LogIn />,
      },

      {
        path: "/account",
        element: <Account />,
      },
    ],
  },
]);

export default router;
