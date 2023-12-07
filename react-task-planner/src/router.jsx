import { Navigate, createBrowserRouter } from "react-router-dom";
import Login from "./views/Login";
import Signup from "./views/Signup";
import DefaultLayout from "./Layouts/DefaultLayout";
import GuestLayout from "./Layouts/GuestLayout";
import Index from "./views/Index";
import NotFound from "./views/NotFound";
import UserAccount from "./views/UserAccount";
import Project from "./views/Project";


const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        path: '/',
        element: <Navigate to='/index' />
      },
      {
        path: '/index',
        element: <Index />
      },
      {
        path: '/account',
        element: <UserAccount />
      },
      {
        path: '/project/:projectId',
        element: <Project />
      },
      {
        path: '*',
        element: <NotFound />
      }
    ]
  },
  {
    path: '/',
    element: <GuestLayout />,
    children: [
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/signup',
        element: <Signup />
      }
    ]
  },
  {
    path: '*',
    element: <NotFound />
  }
])

export default router;