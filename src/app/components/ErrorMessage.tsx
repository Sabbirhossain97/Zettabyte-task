import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { ErrorMessageProps } from '../interfaces/interface';

export function ErrorMessage({ pathname }: ErrorMessageProps) {

    function message() {
        const pathArray = pathname.split("/")
        if (pathArray.includes('users')) {
            return `Users`
        } else if (pathArray.length === 3 && typeof Number(pathArray[2]) === 'number') {
            return 'Post Details'
        } else {
            return "Posts"
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex h-full flex-col items-center justify-center p-8 text-center w-full"
        >
            <motion.div
                animate={{
                    rotate: [0, -5, 5, -5, 0],
                    scale: [1, 1.05, 1]
                }}
                transition={{ duration: 0.5, repeat: 1 }}
                className="mb-4"
            >
                <AlertTriangle className="w-12 h-12 text-destructive" />
            </motion.div>

            <h3 className="text-xl font-semibold text-foreground mb-2">Oops! Something went wrong</h3>

            <p className="text-muted-foreground mb-6 max-w-md">
                Failed to load {message()}
            </p>
            <Link
                href="/"
                className="mt-2 px-6 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-800 transition"
            >
                Go Home
            </Link>
        </motion.div>
    );
}