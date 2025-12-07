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
import PrivetRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import MyTution from "../pages/Student/MyTution";
import PostTution from "../pages/Student/PostTution";
import AppliedTuitor from "../pages/Student/AppliedTuitor";
import Payment from "../pages/Student/Payment";
import MyApplication from "../pages/Tuitor/MyApplication";
import OnGoingTution from "../pages/Tuitor/OnGoingTution";
import RevenueHistory from "../pages/Tuitor/RevenueHistory";
import UserManagement from "../pages/Admin/UserManagement";
import TuitionManagement from "../pages/Admin/TuitionManagement";
import TuitionDetails from "../pages/Home/TuitionDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayouts,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "tuitions",
        Component: Tutions,
      },
      {
        path: "tuitions/:id",
        Component: TuitionDetails,
      },
      {
        path: "tutors",
        Component: Tutors,
      },
      {
        path: "about",
        Component: About,
      },
      {
        path: "contact",
        Component: Contact,
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivetRoute>
        <DashboardLayout></DashboardLayout>
      </PrivetRoute>
    ),
    children: [
      {
        path: "/dashboard/my-tuitions",
        element: <MyTution></MyTution>,
      },
      {
        path: "/dashboard/post-tuition",
        element: <PostTution></PostTution>,
      },
      {
        path: "/dashboard/applied-tutors",
        element: <AppliedTuitor></AppliedTuitor>,
      },
      {
        path: "/dashboard/payments",
        element: <Payment></Payment>,
      },
      {
        path: "/dashboard/my-applications",
        element: <MyApplication></MyApplication>,
      },
      {
        path: "/dashboard/ongoing-tuitions",
        element: <OnGoingTution></OnGoingTution>,
      },
      {
        path: "/dashboard/revenue-history",
        element: <RevenueHistory></RevenueHistory>,
      },
      {
        path: "/dashboard/userManagement",
        element: <UserManagement></UserManagement>,
      },
      {
        path: "/dashboard/tuitionManagement",
        element: <TuitionManagement></TuitionManagement>,
      },
    ],
  },
]);
