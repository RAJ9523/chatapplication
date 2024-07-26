import { createBrowserRouter } from "react-router-dom";
import App from "../App.js";
import RegisterPage from "../pages/Register.js";
import CheckPasswordPage from "../pages/checkpassword.js";
import Home from "../pages/Home.js";
import MessagePage from "../components/MessagePage.js";

import Forgotpassword from "../pages/Forgotpassword.js";

import CheckEmailPage from "../pages/checkEmail.js";
import AuthLayouts from "../layout/index.js";
const router = createBrowserRouter([
{
    path : "/",
    element : <App/>,
    children : [
        {
            path : "register",
            element :<AuthLayouts><RegisterPage/></AuthLayouts>
        },
        {
            path : 'email',
            element :<AuthLayouts><CheckEmailPage/></AuthLayouts>
        },
        {
            path : 'password',
            element :<AuthLayouts><CheckPasswordPage/></AuthLayouts>
        },
        {
            path : 'forgot-password',
            element :<AuthLayouts><Forgotpassword/></AuthLayouts> 
        },
        {
            path : "",
            element : <Home/>,
            children : [
                {
                    path : ':userId',
                    element : <MessagePage/>
                }
            ]
        }
    ]
}
])

export default router