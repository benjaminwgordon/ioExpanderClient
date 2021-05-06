import React, {useState, useEffect, useContext} from 'react'
import {Link, useLocation} from 'react-router-dom'

import { Disclosure} from '@headlessui/react'
import { BellIcon, MenuIcon, UserAddIcon, UserIcon, XIcon } from '@heroicons/react/outline'

import ioExpanderLogo from '../ioExpanderLogo.svg'
import ioExpanderLogoWithText from '../ioExpanderLogoWithText.svg'

import Notifications from '../Components/Notifications'
import authenticationContext from '../authenticationContext'

const Navbar = () => {

    const location = useLocation()
    const authContext = useContext(authenticationContext)
    const [showNotifications, setShowNotifications] = useState(false)

    const logout = () => {
        authContext.updateUser({
            username:null,
            user_id:null,
            token:null}
        )
    }

    useEffect(() => {
        setNavigation([
            {name: 'home', to:"/home", current:location.pathname.indexOf("/home") !== -1},
            {name: 'users', to:"/users", current:location.pathname.indexOf("/users") !== -1},
            {name: 'projects', to:"/projects", current:location.pathname.indexOf("/projects") !== -1}
        ])
    }, [location])

    const [navigation, setNavigation] = useState([
        {name: 'home', to:"/home", current:false},
        {name: 'users', to:"/users", current:false},
        {name: 'projects', to:"/projects", current:false},
    ])

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    const toggleNotifications = () => {
        setShowNotifications(!showNotifications)
    }

    return (
        authContext.user.token &&
        <Disclosure as="nav" className="bg-gray-800 sticky top-0 z-20">
        {({ open }) => (
            <>
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                <div className="relative flex items-center justify-between h-16">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        {/* Mobile menu button*/}
                        <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                        <span className="sr-only">Open main menu</span>
                        {open ? (
                            <XIcon className="block h-6 w-6" aria-hidden="true" />
                        ) : (
                            <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                        )}
                        </Disclosure.Button>
                    </div>
                    <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex-shrink-0 flex items-center">
                            <img
                                className="block lg:hidden h-10 w-10"
                                src={ioExpanderLogo}
                                alt="ioExpander"
                            />
                            <img
                                className="hidden lg:block h-10 w-50"
                                src={ioExpanderLogoWithText}
                                alt="ioExpander"
                            />
                        </div>
                        <div className="hidden sm:block sm:ml-6">
                            <div className="flex space-x-4">
                                {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.to}
                                    className={classNames(
                                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                    'px-3 py-2 rounded-md text-sm font-medium'
                                    )}
                                    aria-current={item.current ? 'page' : undefined}
                                >
                                    {item.name}
                                </Link>
                                ))}
                            </div>
                        </div>
                        <div className="absolute right-0 flex flex-row justify-between w-20">
                            <Link to={`/users/${authContext.user.user_id}`}>
                                <UserIcon className="w-8 h-8 text-white"/>
                            </Link>
                            <button onClick={(e) => {e.stopPropagation();toggleNotifications()}}>
                                <BellIcon className="w-8 h-8 text-white"/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {
                showNotifications &&
                <div className="absolute min-h-screen w-screen top-0 left-0" onClick={(e) => {setShowNotifications(false)}}>
                    <div className="absolute top-10 right-4">
                        <Notifications />
                    </div>
                </div> 
                
            }

            <Disclosure.Panel className="sm:hidden">
                <div className="px-2 pt-2 pb-3 space-y-1">
                {navigation.map((item) => (
                    <Link
                    key={item.name}
                    to={item.to}
                    className={classNames(
                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'block px-3 py-2 rounded-md text-base font-medium'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                    >
                    {item.name}
                    </Link>
                ))}
                </div>
            </Disclosure.Panel>
            </>
        )}
        </Disclosure>
    )
}

export default Navbar
