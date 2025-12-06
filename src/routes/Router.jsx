import { createBrowserRouter } from "react-router";
import RootLayouts from "../layouts/RootLayouts";
import Home from "../pages/Home/Home";
import Tutions from "../pages/NavbarPages/Tutions";
import Tutors from "../pages/NavbarPages/Tutors";
import About from "../pages/NavbarPages/About";
import Contact from "../pages/NavbarPages/Contact";

import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/AuthLayout/Login";
import Register from "../pages/AuthLayout/Register";



export const router = createBrowserRouter([
  {
    path: "/",
    Component:RootLayouts,
    children:[
        {
            index:true,
            Component:Home
        },
        {
           path:'tuitions',
           Component:Tutions
        },
        {
          path:'tutors',
          Component:Tutors
        },
        {
          path:'about',
          Component:About
        },
        {
          path:'contact',
          Component:Contact
        }
    ]
  },
    {
      path:'/',
      Component:AuthLayout,
      children:[
        {
          path:'login',
          Component:Login

        },
        {
          path:'register',
          Component:Register
        }
      ]
    }



]);