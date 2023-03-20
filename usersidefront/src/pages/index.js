import { createBrowserRouter } from "react-router-dom";

import Error404Page from "./Error404Page"
import LandingPage from "./LandingPage";
import LoginPage from "./LoginPage"
import SignUpPage from "./SignUpPage"
import PasswordFind from "./PasswordFindPage"
import BoardPage from "./BoardPage";

const routes = [
    // error pages
    {
        path: "*",
        element: <Error404Page/>,
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
        path: "/board",
        element: <BoardPage />
    }
]

const router = createBrowserRouter(routes);

export default router;