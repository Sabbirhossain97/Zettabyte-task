'use client'
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Menu, X, BarChart3 } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { menuItems } from '../constants/menu';
import { useSession } from 'next-auth/react';
import Auth from './Auth';

export function Sidebar() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const currentPathname = usePathname();
    const [openDropDown, setOpenDropDown] = useState(false);
    const { data: session } = useSession();

    let label = menuItems.find(item => item.path === currentPathname)?.label;
    if (currentPathname === "/profile") {
        label = session ? "Profile" : ""
    }

    return (
        <div className="flex bg-background">
            <AnimatePresence >
                <motion.aside
                    animate={{ width: sidebarOpen ? 280 : 80 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="border-r border-gray-700 relative z-10 hidden lg:block"
                >
                    <div className="flex items-center justify-between p-6 border-b border-gray-700">
                        {sidebarOpen && (
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                className="flex items-center space-x-3"
                            >
                                <div className="w-8 h-8 bg-gradient-to-r from-sky-500 to-blue-500 p-1 rounded-lg flex items-center justify-center">
                                    <BarChart3 className="w-8 h-8" />
                                </div>
                                <span className="text-2xl bg-gradient-to-r from-sky-500 to-blue-500 bg-clip-text text-transparent font-bold">
                                    Dashboard
                                </span>
                            </motion.div>
                        )}

                        <motion.button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="p-2 rounded-lg hover:bg-sidebar-hover"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {sidebarOpen ? (
                                <X className="w-5 h-5 text-muted-foreground cursor-pointer" />
                            ) : (
                                <Menu className="w-5 h-5 text-muted-foreground cursor-pointer" />
                            )}
                        </motion.button>
                    </div>
                    <nav className="p-4 space-y-2">
                        {menuItems.map((item, index) => {
                            return (
                                <motion.div
                                    key={item.path}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Link
                                        href={item.path}
                                        className={`${item.path === currentPathname ? "bg-slate-800" : ""} flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 hover:bg-slate-800 group`}>
                                        <item.icon
                                            className='w-5 h-5 transition-colors text-white text-muted-foreground group-hover:text-foreground' />
                                        <AnimatePresence mode="wait">
                                            {sidebarOpen && (
                                                <motion.span
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: -10 }}
                                                    className='font-medium transition-colors text-white text-muted-foreground group-hover:text-foreground'>
                                                    {item.label}
                                                </motion.span>
                                            )}
                                        </AnimatePresence>
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </nav>
                </motion.aside>
            </AnimatePresence>
            {/* for mobile and tablet screen */}
            <div className="h-16 z-10 px-4 flex justify-between items-center border-b relative border-gray-700 w-full lg:hidden">
                <div className='flex'>
                    <motion.button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="p-2 rounded-lg hover:bg-sidebar-hover"

                    >
                        <Menu className="w-5 h-5 cursor-pointer" />
                    </motion.button>
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="flex justify-start ml-2 space-x-3"
                    >
                        <motion.h1
                            className="text-2xl font-bold"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            {label || ""}
                        </motion.h1>
                    </motion.div>
                </div>
                <Auth
                    openDropDown={openDropDown}
                    setOpenDropDown={setOpenDropDown}
                />
            </div>
            <aside
                className={`${sidebarOpen ? "translate-x-0" : "-translate-x-full"} w-[280px] transition duration-300 border-r z-20 h-full fixed top-0 left-0 border-gray-700 bg-slate-900 block lg:hidden`}
            >
                <nav className="p-0 space-y-2 relative">
                    <div className="flex items-center justify-between p-4 border-b border-gray-700">
                        {sidebarOpen && (
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                className="flex items-center space-x-3"
                            >
                                <div className="w-8 h-8 bg-gradient-to-r from-sky-500 to-blue-500 p-1 rounded-lg flex items-center justify-center">
                                    <BarChart3 className="w-8 h-8" />
                                </div>
                                <span className="text-2xl bg-gradient-to-r from-sky-500 to-blue-500 bg-clip-text text-transparent font-bold">
                                    Dashboard
                                </span>
                            </motion.div>
                        )}
                        <motion.button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="p-2 rounded-lg hover:bg-sidebar-hover"

                        >
                            <X className="w-5 h-5 cursor-pointer" />
                        </motion.button>
                    </div>
                    {menuItems.map((item) => (
                        <div key={item.path} className='px-2'>
                            <Link
                                href={item.path}
                                className={`${item.path === currentPathname ? "bg-slate-800" : ""} flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 hover:bg-slate-800 group`}
                            >
                                <item.icon className="w-5 h-5 transition-colors text-white group-hover:text-foreground" />
                                <AnimatePresence mode="wait">
                                    <motion.span
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -10 }}
                                        className="font-medium text-white group-hover:text-foreground"
                                    >
                                        {item.label}
                                    </motion.span>
                                </AnimatePresence>
                            </Link>
                        </div>
                    ))}
                </nav>
            </aside>
        </div>
    );
}