'use client'
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';
import { useFetch } from '../hooks/useFetch';
import {
    Users as UsersIcon,
    Mail,
    Building,
    Globe,
    Phone,
    X,
    MapPin
} from 'lucide-react';

interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
    website: string;
    company: {
        name: string;
        catchPhrase: string;
        bs: string;
    };
    address: {
        street: string;
        suite: string;
        city: string;
        zipcode: string;
    };
}

const modalVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { type: "spring" as const, damping: 25, stiffness: 500 }
    },
    exit: {
        opacity: 0,
        scale: 0.8,
        y: 50,
        transition: { duration: 0.2 }
    }
};

const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
};

export function Users() {
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const { data: users, loading, error, refetch, fetchWithError } = useFetch<User[]>(
        'https://jsonplaceholder.typicode.com/users'
    );

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return (
            <ErrorMessage
                message={error}
                onRetry={refetch}
                onTestError={fetchWithError}
            />
        );
    }

    return (
        <>
            <div className="space-y-6 flex-1 p-10">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
                            <UsersIcon className="h-8 w-8 text-primary" />
                            Users
                        </h1>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <button onClick={fetchWithError}>
                            Test Error
                        </button>
                    </motion.div>
                </div>

                {/* Users Table */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div className="overflow-hidden rounded-lg border border-zinc-700 bg-gray-800/50 text-card-foreground shadow-sm">
                        <div className='flex flex-col space-y-1.5 p-6'>
                            <div className='text-2xl font-semibold leading-none tracking-tight'>All Users ({users?.length || 0})</div>
                        </div>

                        <div className="p-6 pt-0">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-zinc-700">
                                            <th className="text-left p-4 text-sm font-medium text-muted-foreground">Name</th>
                                            <th className="text-left p-4 text-sm font-medium text-muted-foreground">Email</th>
                                            <th className="text-left p-4 text-sm font-medium text-muted-foreground">Company</th>
                                            <th className="text-left p-4 text-sm font-medium text-muted-foreground">Phone</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users?.map((user, index) => (
                                            <motion.tr
                                                key={user.id}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.05 }}
                                                onClick={() => setSelectedUser(user)}
                                                className="border-b border-zinc-700 hover:bg-slate-800 cursor-pointer transition-colors duration-200"
                                            >
                                                <td className="p-4">
                                                    <div>
                                                        <div className="font-medium text-foreground">{user.name}</div>
                                                        <div className="text-sm text-muted-foreground">@{user.username}</div>
                                                    </div>
                                                </td>
                                                <td className="p-4">
                                                    <div className="flex items-center text-muted-foreground">
                                                        <Mail className="w-4 h-4 mr-2" />
                                                        {user.email}
                                                    </div>
                                                </td>
                                                <td className="p-4">
                                                    <div className="flex items-center text-muted-foreground">
                                                        <Building className="w-4 h-4 mr-2" />
                                                        {user.company.name}
                                                    </div>
                                                </td>
                                                <td className="p-4">
                                                    <div className="flex items-center text-muted-foreground">
                                                        <Phone className="w-4 h-4 mr-2" />
                                                        {user.phone}
                                                    </div>
                                                </td>
                                            </motion.tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            <AnimatePresence>
                {selectedUser && (
                    <motion.div
                        variants={overlayVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={() => setSelectedUser(null)}
                    >
                        <motion.div
                            variants={modalVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            onClick={(e) => e.stopPropagation()}
                            className="bg-slate-800 border border-zinc-700 rounded-xl shadow-hover max-w-2xl w-full max-h-[80vh] overflow-y-auto"
                        >
                            <div className="flex items-center justify-between p-6 border-b border-zinc-700">
                                <div>
                                    <h2 className="text-2xl font-bold text-foreground">{selectedUser.name}</h2>
                                    <p className="text-muted-foreground">@{selectedUser.username}</p>
                                </div>
                                <button
                                    onClick={() => setSelectedUser(null)}
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="p-6 space-y-6">
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold text-foreground">Contact Information</h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="flex items-center space-x-3">
                                            <Mail className="w-5 h-5 text-primary" />
                                            <div>
                                                <p className="text-sm text-muted-foreground">Email</p>
                                                <p className="text-foreground">{selectedUser.email}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-3">
                                            <Phone className="w-5 h-5 text-primary" />
                                            <div>
                                                <p className="text-sm text-muted-foreground">Phone</p>
                                                <p className="text-foreground">{selectedUser.phone}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-3">
                                            <Globe className="w-5 h-5 text-primary" />
                                            <div>
                                                <p className="text-sm text-muted-foreground">Website</p>
                                                <p className="text-foreground">{selectedUser.website}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-3">
                                            <MapPin className="w-5 h-5 text-primary" />
                                            <div>
                                                <p className="text-sm text-muted-foreground">Address</p>
                                                <p className="text-foreground">
                                                    {selectedUser.address.street}, {selectedUser.address.city}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold text-foreground">Company</h3>

                                    <div className="bg-gradient-glass rounded-lg p-0 space-y-2">
                                        <div className="flex items-center space-x-2">
                                            <Building className="w-5 h-5 text-primary" />
                                            <span className="font-medium text-foreground">{selectedUser.company.name}</span>
                                        </div>
                                        <p className="text-muted-foreground italic">"{selectedUser.company.catchPhrase}"</p>
                                        <p className="text-sm text-muted-foreground">{selectedUser.company.bs}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

export default Users;