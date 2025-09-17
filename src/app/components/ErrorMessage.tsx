import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorMessageProps {
    message: string;
    onRetry?: () => void;
    onTestError?: () => void;
}

export function ErrorMessage({ message, onRetry, onTestError }: ErrorMessageProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center p-8 text-center"
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
                {message}
            </p>

            <div className="flex gap-3">
                {onRetry && (
                    <button onClick={onRetry} >
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Try Again
                    </button>
                )}

                {onTestError && (
                    <button onClick={onTestError} >
                        Test Error Handling
                    </button>
                )}
            </div>
        </motion.div>
    );
}