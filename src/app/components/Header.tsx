'use client'
import { useState } from 'react'
import { motion } from 'framer-motion';
import { menuItems } from '../constants/menu';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Auth from './Auth';

function Header() {
    const currentPathname = usePathname();
    const { data: session } = useSession();
    const [openDropDown, setOpenDropDown] = useState(false);

    let label = menuItems.find(item => item.path === currentPathname)?.label;
    if (currentPathname === "/profile") {
        label = session ? "Profile" : "Guest Profile"
    }

    return (
        <>
            <header className="bg-card/50 backdrop-blur-xl border-b border-gray-700 p-5 hidden lg:block">
                {openDropDown && <div onClick={() => setOpenDropDown(!openDropDown)} className="fixed inset-0 z-50 flex items-center justify-center p-4"></div>}
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <motion.h1
                            className="text-2xl font-bold text-foreground"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            {label || ""}
                        </motion.h1>
                    </div>
                    <Auth
                        openDropDown={openDropDown}
                        setOpenDropDown={setOpenDropDown}
                    />
                </div>
            </header>
        </>
    )
}

export default Header