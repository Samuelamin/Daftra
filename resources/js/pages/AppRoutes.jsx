// src/Pages/AppRoutes.jsx
import React from 'react'
import { useLocation, Routes, Route, Navigate } from 'react-router-dom'
import Home from './Components/Home/Home'
import AppLayout from './Layout/AppLayout'
import CartPage from './Components/Cart/CartPage'
import SignIn from './AuthPages/SignIn'
import SignUpPage from './AuthPages/SignUpPage'
import GuestLayout from './middlewares/GuestLayout'
import OrdersPage from './Components/Orders/OrdersPage'
import OrderDetailsPage from './Components/Orders/OrderDetailsPage'
import AuthLayout from './middlewares/AuthLayout'

const AppRoutes = () => {
    const location = useLocation()

    return (
        <Routes location={location} key={location.pathname} >
            <Route element={<AppLayout />}>

                <Route path='*' element={<Navigate to='/' />} />

                <Route path="/" element={<Home />} />
                <Route path="/Cart" element={<CartPage />} />

                <Route element={<AuthLayout/>}>
                    <Route path="/orders" element={<OrdersPage />} />
                    <Route path="/orders/:orderId" element={<OrderDetailsPage />} />
                </Route>

                <Route element={<GuestLayout />}>
                    <Route path="/sign-in" element={<SignIn />} />
                    <Route path="/sign-up" element={<SignUpPage />} />
                </Route>
            </Route>
        </Routes>
    )
}

export default AppRoutes
