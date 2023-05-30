import { createBrowserRouter, Navigate } from "react-router-dom";

import Error404Page from "./Error404Page";
import LoginPage from "./LoginPage";
import LandingPage from "./LandingPage";
import DietUpload from "./DietUpload";
import DietChange from "./DietChange";
import MemberUpload from "./MemberUpload";
import MemberRead from "./MeberRead";

const routes = [
  {
    path: "/",
    element: <Navigate to='/manager' />,
  },
  {
    path: "*",
    element: <Error404Page />,
  },
  {
    path: "/manager/login",
    element: <LoginPage />,
  },
  {
    path: "/manager",
    element: <LandingPage />,
  },
  {
    path: "/manager/diet/upload",
    element: <DietUpload />,
  },
  {
    path: "/manager/diet/update",
    element: <DietChange />,
  },
  {
    path: "/manager/statistics/daily",
    element: <LandingPage />,
  },
  {
    path: "/manager/statistics/weekly",
    element: <LandingPage />,
  },
  {
    path: "/manager/member/upload",
    element: <MemberUpload />,
  },
  {
    path: "manager/member/read",
    element: <MemberRead />,
  },
];

const router = createBrowserRouter(routes);

export default router;
