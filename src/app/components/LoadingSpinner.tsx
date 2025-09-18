import { motion } from 'framer-motion';

export function LoadingSpinner() {
    return (
        <div className="flex items-center justify-center p-8 w-full">
            <motion.div
                className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
        </div>
    );
}

export function LoadingGrid() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
                <motion.div
                    key={i}
                    className="h-48 bg-gradient-card rounded-xl animate-pulse"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                />
            ))}
        </div>
    );
}