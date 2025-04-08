import React, { useState } from "react";
import Sidebar from "./SideBar.jsx";
import { Outlet } from "react-router";

const DashboardLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <div className="flex">
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            <div className="p-6 flex-1 overflow-auto h-screen">
                <Outlet />
            </div>
        </div>
    );
};

export default DashboardLayout;
