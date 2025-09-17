import { createBrowserRouter } from 'react-router-dom'
import { AuthRoute } from "@/components/AuthRoute"
import { lazy, Suspense } from 'react';
import Loading from '@/components/Loading';

const Login = lazy(() => import('@/pages/login'));
const Signup = lazy(() => import('@/pages/signup'));
const Home = lazy(() => import('@/pages/User/home'));
const Admin = lazy(() => import('@/pages/Admin/admin'));
const UserManage = lazy(() => import('@/pages/Admin/userManagement'));
const BookManage = lazy(() => import('@/pages/Admin/bookManagement'));
const Borrowing = lazy(() => import('@/pages/Admin/borrowingRecords'));
const Categories = lazy(() => import('@/pages/Admin/categoriesManagement'));
const Detail = lazy(() => import('@/pages/Admin/Detail'));
const Info = lazy(() => import('@/pages/User/Info'));
const Borrow = lazy(() => import('@/pages/User/Borrow'));
const BookDetail = lazy(() => import('@/pages/User/bookDetail'));
const Search = lazy(() => import('@/pages/User/Search'));

const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <Suspense fallback={<Loading />}>
                <Login />
            </Suspense>
        ),
    },
    {
        path: '/signup',
        element: (
            <Suspense fallback={<Loading />}>
                <Signup />
            </Suspense>
        ),
    },
    {
        path: '/user',
        element: (
            <AuthRoute>
                <Suspense fallback={<Loading />}>
                    <Home />
                </Suspense>
            </AuthRoute>
        ),
        children: [
            {
                path: 'myInfo',
                element: <Info />
            },
            {
                path: 'myBorrow',
                element: <Borrow />
            },
            {
                path:'bookDetail/:id',
                element:<BookDetail/>
            },
            {
                path: 'search',
                element: <Search />
            },
        ],
    },
    {
        path: '/admin',
        element: (
            <AuthRoute>
                <Suspense fallback={<Loading />}>
                    <Admin />
                </Suspense>
            </AuthRoute>
        ),
        children: [
            {
                path: 'usermanage',
                element: <UserManage />
            },
            {
                path: 'bookmanage',
                element: <BookManage />
            },
            {
                path: 'borrowing',
                element: <Borrowing />
            },
            {
                path: 'categories',
                element: <Categories />
            },
            {
                path: 'detail/:id',
                element: <Detail />
            }
        ],
    },
]);

export { router }