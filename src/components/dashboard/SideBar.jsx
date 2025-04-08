import { Link } from "react-router";
import { ChevronDown, Home, Menu, Settings, Users } from "lucide-react";
import React, { useState } from "react";

const Sidebar = ({ isOpen, toggleSidebar }) => {
    const [showFamilyDropdown, setShowFamilyDropdown] = useState(false);

    return (
        <div className={`h-screen bg-gray-800 text-gray-200 transition-all duration-300 mt-[-18px] ml-[-25px] ${isOpen ? "w-56" : "w-16"}`}>
            {/* Hamburger Menu */}
            <div className="p-4 flex items-center justify-between">
                {isOpen && <h3 className="text-lg font-semibold">Dashboard</h3>}
                <button onClick={toggleSidebar} className="focus:outline-none">
                    <Menu size={24} />
                </button>
            </div>

            {/* Navigation */}
            <nav className="mt-4 space-y-2">
                <Link to="/dashboard/home" className="p-2 flex items-center gap-3 cursor-pointer hover:bg-blue-300 rounded">
                    <Home size={24} /> {isOpen && <span className="text-sm">Home</span>}
                </Link>

                {/* Family Dropdown */}
                <div>
                    <div className="p-2 flex items-center gap-3 cursor-pointer hover:bg-blue-300 rounded"
                         onClick={() => setShowFamilyDropdown(!showFamilyDropdown)}>
                        <Users size={24} /> {isOpen && <span className="text-sm">Family</span>}
                        {isOpen && <ChevronDown size={18}
                                                className={`transition-transform ${showFamilyDropdown ? "rotate-180" : "rotate-0"}`} />}
                    </div>
                    {showFamilyDropdown && isOpen && (
                        <div className="pl-8 space-y-1">
                            <Link to="/dashboard/family" className="p-2 block cursor-pointer hover:bg-blue-300 rounded text-sm">
                                Family Members
                            </Link>
                        </div>
                    )}
                </div>

                <Link to="/settings" className="p-2 flex items-center gap-3 cursor-pointer hover:bg-blue-300 rounded">
                    <Settings size={24} /> {isOpen && <span className="text-sm">Settings</span>}
                </Link>
            </nav>
        </div>
    );
};

export default Sidebar;
