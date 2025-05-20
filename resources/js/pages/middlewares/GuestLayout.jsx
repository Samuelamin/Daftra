import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import useAuthContext from '../../Context/AuthContext'
import { Loading } from '../Layout/Loading'

const GuestLayout = () => {
    const {user} = useAuthContext()
    return user !== 0 ?
    !user ?   <Loading />  :  <Navigate to='/'/>
    : <Outlet/>




}

export default GuestLayout
