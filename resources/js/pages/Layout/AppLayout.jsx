import React from 'react'
import HeaderLayout from './HeaderLayout'
import { Outlet } from 'react-router'
import AnnouncementBar from './AnnouncementBar';

const AppLayout = () => {
    return (
        <div>
            <AnnouncementBar   />
            <HeaderLayout />
            <div className="main" >
                <Outlet />
            </div>
        </div>
    )
}

export default AppLayout