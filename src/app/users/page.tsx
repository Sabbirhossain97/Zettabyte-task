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