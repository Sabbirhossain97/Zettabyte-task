import { motion } from 'framer-motion';
import { Mail, Building, Phone } from 'lucide-react';
import { User } from '../interfaces/interface';

interface TableDataProps {
    users: User[],
    setSelectedUser: (user: User) => void
}

function UsersTableData({ users, setSelectedUser }: TableDataProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            <div className="overflow-hidden rounded-lg border border-gray-700 bg-gray-800/50 text-card-foreground shadow-sm">
                <div className='flex flex-col space-y-1.5 p-6'>
                    <div className='text-2xl font-semibold leading-none tracking-tight'>All Users ({users?.length || 0})</div>
                </div>

                <div className="p-6 pt-0">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-700">
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
                                        className="border-b border-gray-700 hover:bg-slate-800 cursor-pointer transition-colors duration-200"
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
    )
}

export default UsersTableData