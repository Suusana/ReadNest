import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { Provider } from 'react-redux'
import store from './store'
import { Suspense } from 'react'
import Loading from './components/Loading'

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <Suspense fallback={<Loading />}>
            <RouterProvider router={router} />
        </Suspense>
    </Provider>
)
