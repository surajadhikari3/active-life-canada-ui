import { Link } from "react-router";
import {BookText, ChevronDown, Home, Menu, ShoppingBag, Users} from "lucide-react";
import React, { useState } from "react";
import {toggleDrawer} from "@/redux/cartSlice.jsx";
import {useDispatch} from "react-redux";

const Sidebar = ({ isOpen, toggleSidebar }) => {
    const [showFamilyDropdown, setShowFamilyDropdown] = useState(false);
    const cart = useState(state => state?.cart);
    const dispatch = useDispatch();

    const setDrawer = () => {
        dispatch(toggleDrawer(!cart?.isDrawerOpen));
    };

    return (
        <div
            className={`h-screen bg-gray-800 text-gray-200 transition-all duration-300 mt-[-18px] ml-[-25px] 
            ${isOpen ? "w-64 shadow-lg" : "w-20"} rounded-r-2xl`}
            style={{ boxShadow: isOpen ? "4px 0 15px rgba(0, 0, 0, 0.1)" : "none" }}
        >
            {/* Hamburger Menu */}
            <div className="p-4 flex items-center justify-between">
                {isOpen && <h3 className="text-lg font-semibold text-white">Dashboard</h3>}
                <button onClick={toggleSidebar} className="focus:outline-none">
                    <Menu size={24} className="text-white hover:text-gray-400" />
                </button>
            </div>

            {/* Navigation */}
            <nav className="mt-6 space-y-4">
                <Link to="/dashboard/home"
                      className="flex items-center gap-4 p-3 text-white rounded-md hover:bg-blue-600 hover:text-white transition duration-300 no-underline"
                      style={{ textDecoration: "none" }}
                >
                    <Home size={20} /> {isOpen && <span className="text-sm">Home</span>}
                </Link>

                {/* Family Dropdown */}
                <div className="relative">
                    <div
                        className="flex items-center gap-4 p-3 text-white rounded-md cursor-pointer hover:bg-blue-600 hover:text-white transition duration-300 no-underline"
                        onClick={() => setShowFamilyDropdown(!showFamilyDropdown)}
                    >
                        <Users size={20} /> {isOpen && <span className="text-sm">Family</span>}
                        {isOpen && <ChevronDown size={18} className={`transition-transform ${showFamilyDropdown ? "rotate-180" : "rotate-0"}`} />}
                    </div>

                    {/* Dropdown menu */}
                    {showFamilyDropdown && isOpen && (
                        <div className="pl-8 space-y-2">
                            <Link
                                to="/dashboard/family"
                                className="block text-white hover:bg-blue-600 hover:text-white p-3 rounded-md text-sm no-underline"
                                style={{ textDecoration: "none" }}
                            >
                                Family Members
                            </Link>
                        </div>
                    )}
                </div>


                <Link to="/dashboard/course-registration"
                      className="flex items-center gap-4 p-3 text-white rounded-md hover:bg-blue-600 hover:text-white transition duration-300 no-underline"
                      style={{ textDecoration: "none" }}
                >
                    <BookText size={20} strokeWidth={2.75} absoluteStrokeWidth /> {isOpen && <span className="text-sm">Registered Course</span>}
                </Link>

                <Link to="/dashboard/home" onClick={setDrawer}  className="flex items-center gap-4 p-3 text-white rounded-md hover:bg-blue-600 hover:text-white transition duration-300 no-underline"
                      style={{ textDecoration: "none" }}
                >
                    <ShoppingBag size={20} /> {isOpen && <span className="text-sm">Cart</span>}
                </Link>
            </nav>
        </div>
    );
};

export default Sidebar;
