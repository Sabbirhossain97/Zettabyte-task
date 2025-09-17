'use client'
import { motion } from 'framer-motion';
import { FileText, ExternalLink } from 'lucide-react';
import { useFetch } from '../hooks/useFetch';
import { LoadingGrid } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';
import Link from 'next/link';

interface Post {
    id: number;
    title: string;
    body: string;
    userId: number;
}

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
};

export function Posts() {
    const { data: posts, loading, error, refetch, fetchWithError } = useFetch<Post[]>(
        'https://jsonplaceholder.typicode.com/posts'
    );

    if (loading) {
        return <LoadingGrid />;
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
        <div className="space-y-6 flex-1 p-10">
            <div className="flex items-center justify-between">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
                        <FileText className="h-8 w-8 text-primary" />
                        All Posts
                    </h1>
                    <p className="text-muted-foreground mt-2">
                        Browse through all available posts and explore their content
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <button onClick={fetchWithError} >
                        Test Error
                    </button>
                </motion.div>
            </div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
                {posts?.map((post) => (
                    <motion.div
                        key={post.id}
                        variants={itemVariants}
                        whileHover={{ y: -5 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="h-full flex flex-col max-w-sm p-6 border rounded-lg shadow-sm bg-gray-800/50 border-gray-700">
                            <div>
                                <h1>
                                    <p className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{post.title}</p>
                                </h1>
                            </div>
                            <div className='flex flex-col flex-1 justify-between'>
                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{post.body}</p>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">
                                        User {post.userId}
                                    </span>

                                    <Link href={`/posts/${post.id}`}>
                                        <button className='flex items-center'>
                                            <span>Read More</span>
                                            <ExternalLink className="w-3 h-3 ml-1" />
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {posts && posts.length > 0 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-center py-8"
                >
                    <button onClick={refetch}>
                        Refresh Posts
                    </button>
                </motion.div>
            )}
        </div>
    );
}

export default Posts;