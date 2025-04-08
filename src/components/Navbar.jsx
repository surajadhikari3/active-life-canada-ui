import {Disclosure, DisclosureButton} from '@headlessui/react';
import {Bars3Icon, XMarkIcon, BellIcon} from '@heroicons/react/24/outline';
import {FaSignInAlt, FaUserPlus, FaHome, FaBookOpen} from 'react-icons/fa';
import {useSelector, useDispatch} from "react-redux";
import {resetAuthenticationStatus} from "../redux/authenticationSlice.jsx";
import {Link} from 'react-router'
import {useState} from "react";
import CartDrawer from "@/components/cart/CartDrawer.jsx";
import CartIcon from "@/components/cart/CartIcon.jsx";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function Navbar() {

    const [activeNavigation, setActiveNavigation] = useState("");
    const authenticationStatus = useSelector(state => state.authentication);
    const dispatch = useDispatch();


    const navigation = [
        {name: 'Dashboard', navigateTo: '/dashboard', icon: <FaHome className="mr-2"/>},
        {name: 'Courses', navigateTo: '/course', icon: <FaBookOpen className="mr-2"/>},
    ];

    const logOut = () => {
        console.log("reset")
        dispatch(resetAuthenticationStatus());
    }

    const handleNavigationOnClick = (name) => {
        setActiveNavigation(name);
    }

    return (
        <div className="w-full fixed top-0 bg-white shadow-md">
            <Disclosure as="nav" className="bg-gray-800">
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                    <div className="relative flex h-16 items-center justify-between">
                        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                            <DisclosureButton
                                className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-none focus:ring-inset">
                                <span className="sr-only">Open main menu</span>
                                <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden"/>
                                <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block"/>
                            </DisclosureButton>
                        </div>

                        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                            <div className="flex shrink-0 items-center">
                                <img alt="Active Life Canada" src="/logo.jpg" className="h-8 w-auto"/>
                            </div>
                            <Link to="/" className="text-white ml-4 text-lg font-semibold no-underline">Active Life
                                Canada</Link>
                            {authenticationStatus.isActive ?
                                <div className="hidden sm:ml-6 sm:block">
                                    <div className="flex space-x-4">
                                        {navigation.map((item) => (
                                            <Link
                                                onClick={() => handleNavigationOnClick(item.name)}
                                                key={item.name}
                                                to={item.navigateTo}
                                                aria-current={activeNavigation === item.name ? 'page' : undefined}
                                                className={classNames(
                                                    activeNavigation === item.name ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                    'rounded-md px-3 py-2 text-sm font-medium flex items-center no-underline'
                                                )}
                                            >
                                                {item.icon} {item.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                                : <></>
                            }

                        </div>
                        <div className="flex items-center space-x-4">
                            {!authenticationStatus.isActive ?
                                <>
                                    <Link to="/login"
                                          className="flex items-center bg-gray-700 text-white px-3 py-2 rounded-lg hover:bg-gray-600">
                                        <FaSignInAlt className="mr-2"/> Login
                                    </Link>
                                    <Link to="/signup"
                                          className="flex items-center bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-500">
                                        <FaUserPlus className="mr-2"/> SignUp
                                    </Link>
                                </> : <>
                                    <Link to="/" onClick={() => logOut()}
                                          className="flex items-center bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-500">
                                        <FaUserPlus className="mr-2"/> Logout
                                    </Link>

                                </>
                            }
                            <CartIcon/>

                        </div>
                    </div>
                </div>
            </Disclosure>
        </div>
    );
}
