import { Disclosure, DisclosureButton } from '@headlessui/react';
import { Bars3Icon, XMarkIcon, BellIcon } from '@heroicons/react/24/outline';
import { FaSignInAlt, FaUserPlus, FaHome, FaBookOpen } from 'react-icons/fa';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function Navbar() {
    const navigation = [
        { name: 'Dashboard', href: '/dashboard', icon: <FaHome className="mr-2" />, current: true },
        { name: 'Courses', href: '/course', icon: <FaBookOpen className="mr-2" />, current: false },
    ];

    return (
        <div className="w-full fixed top-0 bg-white shadow-md">
            <Disclosure as="nav" className="bg-gray-800">
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                    <div className="relative flex h-16 items-center justify-between">
                        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                            <DisclosureButton
                                className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-none focus:ring-inset">
                                <span className="sr-only">Open main menu</span>
                                <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
                                <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
                            </DisclosureButton>
                        </div>
                        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                            <div className="flex shrink-0 items-center">
                                <img alt="Active Life Canada" src="/logo.jpg" className="h-8 w-auto" />
                            </div>
                            <a href="/" className="text-white ml-4 text-lg font-semibold no-underline">Active Life Canada</a>

                            <div className="hidden sm:ml-6 sm:block">
                                <div className="flex space-x-4">
                                    {navigation.map((item) => (
                                        <a
                                            key={item.name}
                                            href={item.href}
                                            aria-current={item.current ? 'page' : undefined}
                                            className={classNames(
                                                item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                'rounded-md px-3 py-2 text-sm font-medium flex items-center no-underline'
                                            )}
                                        >
                                            {item.icon} {item.name}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <a href="/login" className="flex items-center bg-gray-700 text-white px-3 py-2 rounded-lg hover:bg-gray-600">
                                <FaSignInAlt className="mr-2" /> Login
                            </a>
                            <a href="/signup" className="flex items-center bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-500">
                                <FaUserPlus className="mr-2" /> SignUp
                            </a>
                        </div>
                    </div>
                </div>
            </Disclosure>
        </div>
    );
}
