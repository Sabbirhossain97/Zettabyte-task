'use client'
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
    Home,
    FileText,
    Users,
    Menu,
    X,
    BarChart3,
} from 'lucide-react';

const menuItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: FileText, label: 'Posts', path: '/posts' },
    { icon: Users, label: 'Users', path: '/users' },
];

export function Sidebar() {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <div className="flex min-h-screen bg-background">
            <motion.aside
                animate={{ width: sidebarOpen ? 280 : 80 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="border-r border-zinc-700 shadow-card relative z-10"
            >
                <div className="flex items-center justify-between p-6 border-b border-zinc-700">
                    <AnimatePresence mode="wait">
                        {sidebarOpen && (
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                className="flex items-center space-x-3"
                            >
                                <div className="w-8 h-8 rounded-lg flex items-center justify-center">
                                    <BarChart3 className="w-8 h-8" />
                                </div>
                                <span className="text-2xl bg-gradient-to-r from-sky-500 to-blue-500 bg-clip-text text-transparent font-bold">
                                    Dashboard
                                </span>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <motion.button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="p-2 rounded-lg hover:bg-sidebar-hover transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {sidebarOpen ? (
                            <X className="w-5 h-5 text-muted-foreground" />
                        ) : (
                            <Menu className="w-5 h-5 text-muted-foreground" />
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
                                    className='flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 hover:bg-slate-800 group'>
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
        </div>
    );
}