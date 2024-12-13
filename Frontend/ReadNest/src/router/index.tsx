import { createBrowserRouter } from 'react-router-dom'
import { AuthRoute } from "@/components/AuthRoute"
import Home from '@/pages/User/home'
import Admin from '@/pages/Admin/admin'
import Detail from '@/pages/Detail'
import Login from '@/pages/login'
import Signup from '@/pages/signup'
import Analysis from '@/pages/Admin/analysis'
import UserManage from '@/pages/Admin/userManagement'
import BookManage from '@/pages/Admin/bookManagement'
import Reservation from '@/pages/Admin/reservation'
import Categories from '@/pages/Admin/categoriesManagement'


const router = createBrowserRouter([
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/signup',
        element: <Signup />,
    },
    {
        path: '/home',
        element: <AuthRoute><Home /></AuthRoute>,
    },
    {
        path: '/detail',
        element: <AuthRoute><Detail /></AuthRoute>,
    },
    {
        path: '/admin',
        element: <AuthRoute><Admin /></AuthRoute>,
        children: [
            {
                path: 'analysis',
                element: <AuthRoute><Analysis /></AuthRoute>
            },
            {
                path: 'usermanage',
                element: <AuthRoute><UserManage /></AuthRoute>
            }, 
            {
                path: 'bookmanage',
                element: <AuthRoute><BookManage /></AuthRoute>
            },
            {
                path: 'appoint',
                element: <AuthRoute><Reservation /></AuthRoute>
            },
            {
                path: 'categories',
                element: <AuthRoute><Categories /></AuthRoute>
            },
        ]
    },
])

export { router }