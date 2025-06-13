import React from 'react'
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Calculator, TrendingUp, User, Heart } from 'lucide-react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import NavButton from './NavButton';


const Navbar = () => {

    return (
        <Disclosure as="nav" className="bg-primary-blue">
            <div className="mx-auto max-w-7xl py-2 px-4 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">

                <div className="absolute inset-y-0 right-0 flex items-center md:hidden">
                    {/* Mobile menu button*/}
                    <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-1 text-white hover:bg-white hover:text-primary-blue focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset ">
                        <span className="absolute -inset-0.5" />
                        <Bars3Icon aria-hidden="true" className="block size-8 group-data-open:hidden" />
                        <XMarkIcon aria-hidden="true" className="hidden size-8 group-data-open:block" />
                    </DisclosureButton>
                </div>

                <div className='flex flex-1 items-center'>
                    <div className="flex items-center">
                        <span className="text-3xl md:text-4xl font-bold font-lexend text-white ">Weightly</span>
                    </div>
                </div>

                <div className="flex flex-1 items-center justify-end">
                    <div className="hidden sm:ml-6 md:block font-poppins justify-end">
                        <div className="flex space-x-4">
                            <NavButton to="/home" icon={Heart}>Home</NavButton>
                            <NavButton to="/calculator" icon={Calculator}>Calculator</NavButton>
                            <NavButton to="/tracker" icon={TrendingUp}>Tracker</NavButton>
                            <NavButton to="/profile" icon={User}>Profile</NavButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            
            {/* hamburger menu  */}
            <DisclosurePanel className="md:hidden">
                <div className="space-y-1 px-2 pt-2 pb-3">
                    <NavButton to="/home" icon={Heart}>Home</NavButton>
                    <NavButton to="/calculator" icon={Calculator}>Calculator</NavButton>
                    <NavButton to="/tracker" icon={TrendingUp}>Tracker</NavButton>
                    <NavButton to="/profile" icon={User}>Profile</NavButton>
                </div>
            </DisclosurePanel>
        </Disclosure>
    )

}

export default Navbar;