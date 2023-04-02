import { createBrowserRouter } from "react-router-dom";

import Error404Page from "./Error404Page"
import LandingPage from "./LandingPage";
import LoginPage from "./LoginPage"
import SignUpPage from "./SignUpPage"
import PasswordFind from "./PasswordFindPage"
import BoardPage from "./BoardPage";
import BoardDetailPage from "./BoardDetailPage";
import UserPage from "./UserPage";
import LoadingPage from "./LoadingPage";
import UserInfoChangePage from "./UserInfoChangePage";
import RecordMeal from "./RecordMeal";
import DrawingPage from "./DrawingPage"
import JanbanPresentPage from "./JanbanPresentPage";
import MenusTestPage from "./test/MenusTestPage";
import TestRoutingPage from "./test/TestRoutingPage";
import LeftoversTestPage from "./test/LeftoversTestPage";

const routes = [
    // error pages
    {
        path: "*",
        element: <Error404Page/>,
    },
    {
        path: "/loading",
        element: <LoadingPage/>,
    },
    // member pages
    {
        path: "/",
        element: <LandingPage/>,
    },
    {  
        path: "/login",
        element: <LoginPage/>,
    },
    {
        path: "/signup",
        element: <SignUpPage/>
    },
    {
        path: "/find-password",
        element: <PasswordFind />
    },
    {
        path: "/user/:string",
        element: <UserPage />
    },
    {
        path: "/user/:string/update",
        element: <UserInfoChangePage />
    },
    // board page
    {
        path: "/board",
        element: <BoardPage />
    },
    {
        path: "/board/:int",
        element: <BoardDetailPage />
    },
    // AI Func
    {
        path: "/record-meal",
        element: <RecordMeal />
    },
    {
        path: "/drawing",
        element: <DrawingPage />
    },
    {
        path: "/janban",
        element: <JanbanPresentPage />
    },
    // Testing
    {
        path: "/test/test",
        element: <TestRoutingPage />
    },    {
        path: "/test/test/menus",
        element: <MenusTestPage />
    },    {
        path: "/test/test/leftovers",
        element: <LeftoversTestPage />
    },
]

const router = createBrowserRouter(routes);

export default router;