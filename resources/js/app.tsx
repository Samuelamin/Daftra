import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './pages/AppRoutes'
import { AuthProvider } from './Context/AuthContext'

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <AuthProvider>
            <AppRoutes />
        </AuthProvider>
    </BrowserRouter>
)
