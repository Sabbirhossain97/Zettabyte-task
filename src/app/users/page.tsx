'use client'
import { useState } from 'react';
import { motion } from 'framer-motion';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';
import { useFetch } from '../hooks/useFetch';
import { Users as UsersIcon, } from 'lucide-react';
import { User } from '../interfaces/interface';
import UsersTableData from '../components/UsersTableData';
import UserModal from '../components/UserModal';
import { usePathname } from 'next/navigation';

export function Users() {
    const currentPathname = usePathname();

    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const { data: users, loading, error, fetchWithError } = useFetch<User[]>(
        'https://jsonplaceholder.typicode.com/users'
    );

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return (
            <ErrorMessage pathname={currentPathname} />
        );
    }

    return (
        <>
            <div className="space-y-6 flex-1 p-4 sm:p-6 lg:p-10">
                <div className="flex items-center justify-between">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
                            <UsersIcon className="h-8 w-8 text-blue-500" />
                            Users
                        </h1>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <button onClick={fetchWithError} className="cursor-pointer px-3 whitespace-nowrap w-full flex justify-center transition duration-300 text-center items-center gap-2 rounded-md bg-slate-700 hover:bg-slate-600 py-2 text-smlg font-semibold">
                            Test Error
                        </button>
                    </motion.div>
                </div>

                <UsersTableData
                    users={users ?? []}
                    setSelectedUser={setSelectedUser}
                />
            </div>

            <UserModal
                selectedUser={selectedUser}
                setSelectedUser={setSelectedUser}
            />
        </>
    );
}

export default Users;