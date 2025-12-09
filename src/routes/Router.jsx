import { createBrowserRouter } from "react-router";
import RootLayouts from "../layouts/RootLayouts";
import Home from "../pages/Home/Home";
import About from "../pages/NavbarPages/About";
import Contact from "../pages/NavbarPages/Contact";
import Tutions from "../pages/NavbarPages/Tutions";
import Tutors from "../pages/NavbarPages/Tutors";

import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import TuitionManagement from "../pages/Admin/TuitionManagement";
import UserManagement from "../pages/Admin/UserManagement";
import Login from "../pages/AuthLayout/Login";
import Register from "../pages/AuthLayout/Register";
import TuitionDetails from "../pages/Home/TuitionDetails";
import AppliedTuitor from "../pages/Student/AppliedTuitor";
import MyTution from "../pages/Student/MyTution";
import Payment from "../pages/Student/Payment";
import PaymentCancel from "../pages/Student/PaymentCancel";
import PaymentSuccess from "../pages/Student/PaymentSuccess";
import PostTution from "../pages/Student/PostTution";
import MyApplication from "../pages/Tuitor/MyApplication";
import OnGoingTution from "../pages/Tuitor/OnGoingTution";
import RevenueHistory from "../pages/Tuitor/RevenueHistory";
import PrivetRoute from "./PrivateRoute";
import MyPayments from "../pages/Student/MyPayments";
import ReportAnalysis from "../pages/Admin/ReportAnalysis";
import StudentRoute from "./StudentRoute";
import TutorRoute from "./TutorRoute";
import AdminRoute from "./AdminRoute";
import ProfileSetting from "../layouts/ProfileSetting";
import ManagePost from "../pages/Student/ManagePost";
import ErrorPage from "../pages/ErrorPage/ErrorPage";

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
        element: (
          <PrivetRoute>
            <TuitionDetails />
          </PrivetRoute>
        ),
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
      // Payment success/cancel routes (outside dashboard)
      {
        path: "payment/success",
        element: <PaymentSuccess />,
      },
      {
        path: "payment/cancel",
        element: <PaymentCancel />,
      },
      {
        path: "*",
        element: <ErrorPage />,
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
        element: (
          <StudentRoute>
            <MyTution></MyTution>
          </StudentRoute>
        ),
      },
      {
        path: "/dashboard/post-tuition",
        element: (
          <StudentRoute>
            <PostTution></PostTution>
          </StudentRoute>
        ),
      },
      {
        path: "/dashboard/applied-tutors",
        element: (
          <StudentRoute>
            <AppliedTuitor></AppliedTuitor>
          </StudentRoute>
        ),
      },
      {
        path: "/dashboard/payments",
        element: (
          <StudentRoute>
            <MyPayments></MyPayments>
          </StudentRoute>
        ),
      },
      {
        path: "/dashboard/payments/:id",
        element: (
          <StudentRoute>
            <Payment></Payment>
          </StudentRoute>
        ),
      },
      {
        path: "/dashboard/manage-tuition",
        element: (
          <StudentRoute>
            <ManagePost></ManagePost>
          </StudentRoute>
        ),
      },
      {
        path: "/dashboard/my-applications",
        element: (
          <TutorRoute>
            <MyApplication></MyApplication>
          </TutorRoute>
        ),
      },
      {
        path: "/dashboard/ongoing-tuitions",
        element: (
          <TutorRoute>
            <OnGoingTution></OnGoingTution>
          </TutorRoute>
        ),
      },
      {
        path: "/dashboard/revenue-history",
        element: (
          <TutorRoute>
            <RevenueHistory></RevenueHistory>
          </TutorRoute>
        ),
      },
      {
        path: "/dashboard/userManagement",
        element: (
          <AdminRoute>
            <UserManagement></UserManagement>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/reportAnalysis",
        element: (
          <AdminRoute>
            <ReportAnalysis></ReportAnalysis>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/tuitionManagement",
        element: (
          <AdminRoute>
            <TuitionManagement></TuitionManagement>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/profile",
        element: <ProfileSetting></ProfileSetting>,
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
]);
