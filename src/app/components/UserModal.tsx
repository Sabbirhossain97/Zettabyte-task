import { motion, AnimatePresence } from 'framer-motion';
import {
    Mail,
    Building,
    Globe,
    Phone,
    X,
    MapPin
} from 'lucide-react';
import { modalVariants, overlayVariants } from '../constants/animationSettings';
import { User } from '../interfaces/interface';

interface UserModalProps {
    selectedUser: User | null,
    setSelectedUser: (user: User | null) => void
}

function UserModal({ selectedUser, setSelectedUser }: UserModalProps) {
    return (
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
                                className='cursor-pointer'
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
                                        <Mail className="w-5 h-5" />
                                        <div>
                                            <p className="text-sm text-muted-foreground">Email</p>
                                            <p className="text-foreground">{selectedUser.email}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-3">
                                        <Phone className="w-5 h-5" />
                                        <div>
                                            <p className="text-sm text-muted-foreground">Phone</p>
                                            <p className="text-foreground">{selectedUser.phone}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-3">
                                        <Globe className="w-5 h-5" />
                                        <div>
                                            <p className="text-sm text-muted-foreground">Website</p>
                                            <p className="text-foreground">{selectedUser.website}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-3">
                                        <MapPin className="w-5 h-5" />
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
                                        <Building className="w-5 h-5" />
                                        <span className="font-medium text-foreground">{selectedUser.company.name}</span>
                                    </div>
                                    <p className="text-muted-foreground italic">{`"${selectedUser.company.catchPhrase}"`}</p>
                                    <p className="text-sm text-muted-foreground">{selectedUser.company.bs}</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default UserModal