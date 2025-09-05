import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/home/Home";
import Manu from "../pages/manu/manu/Manu";
import Order from "../pages/order/order/Order";
import Login from "../pages/login/Login";
import SignUp from "../pages/SignUp";
import PrivectRoute from "./PrivectRoute";
import Secret from "../compoment/Secret";
import Dashbord from "../layout/Dashbord";
import Cart from "../dashbord/cart/Cart";
import Allusers from "../pages/login/allusers/Allusers";
import AddItem from "../pages/dashbord/AddItem";
import AdminRoute from "./AdminRoute";
import ManageItem from "../dashbord/manageItem/ManageItem";
import UpdateItem from "../dashbord/updateItem/UpdateItem";
import PaymentHistory from "../dashbord/paymentHistory/PaymentHistory";
import UserHome from "../dashbord/userHome/UserHome";
import AdminHome from "../dashbord/adminHome/AdminHome";
import StripePayment from "../dashbord/payment/StripePayment";
import SslcommerzPayment from "../dashbord/payment/SslcommerzPayment";

const router= createBrowserRouter([
    {
        path:"/",
        element:<Main></Main>,
       children:[
            {
              path:"/",
              element:<Home></Home>
            },
            {
              path:"/menu",
              element:<Manu></Manu>
            },
            {
              path:"/order/:category",
              element: <Order></Order>
            },
            {
              path:"/login",
              element:<Login></Login>
            },
            {
              path:"/signup",
              element:<SignUp></SignUp>
            },
            {
              path:"/secret",
              element:<PrivectRoute> <Secret></Secret></PrivectRoute>
            },
        ]
    },
    {
      path:'/dashbord',
      element:<PrivectRoute><Dashbord></Dashbord></PrivectRoute>,
      children:[
        //normal rotues
        {
         path:"/dashbord/userhome",
         element:<UserHome></UserHome>
        },
        {
         path:"/dashbord/cart",
         element:<Cart></Cart>
        },
        {
         path:"/dashbord/stripePayment",
         element:<StripePayment></StripePayment>
        },
        {
         path:"/dashbord/sslcommerzPayment",
         element:<SslcommerzPayment></SslcommerzPayment>
        },
        {
         path:"/dashbord/paymentHistory",
         element:<PaymentHistory></PaymentHistory>
        },

        //admin rotues
        {
         path:"/dashbord/adminhome",
         element:<AdminRoute><AdminHome></AdminHome></AdminRoute>
        },
        {
         path:"/dashbord/additems",
         element:<AdminRoute><AddItem></AddItem></AdminRoute>
        },
        {
         path:"/dashbord/allusers",
         element:<Allusers></Allusers>
        },
        {
         path:"/dashbord/manageitems",
         element:<ManageItem></ManageItem>
        },
        {
         path:"/dashbord/update/:id",
         element:<UpdateItem></UpdateItem>,
         loader:({params})=>fetch(`http://localhost:5000/menu/${params.id}`)
        },
      ]

    }
])

export default router;