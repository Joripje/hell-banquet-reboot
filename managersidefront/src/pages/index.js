import { createBrowserRouter } from "react-router-dom";

import Error404Page from "./Error404Page";
import LoginPage from "./LoginPage";
import LandingPage from "./LandingPage"
import DietUpload from "./DietUpload";
import DietChange from "./DietChange";
import MemberUpload from "./MemberUpload";
import MemberRead from "./MeberRead";

const router = createBrowserRouter([
    {
        path: '*',
        element: <Error404Page />
    },
    {
        path: '/login',
        element: <LoginPage />
    },
    {
        path: '/',
        element: <LandingPage />
    },
    {
        path: '/diet/upload',
        element: <DietUpload />
    },
    {
        path: '/diet/update',
        element: <DietChange />
    },
    {
        path: '/statistics/daily',
        element: <LandingPage />
    },
    {
        path: '/statistics/weekly',
        element: <LandingPage />
    },
    {
        path: '/member/upload',
        element: <MemberUpload />
    },
    {
        path: '/member/read',
        element: <MemberRead />
    },



])


export default router;
