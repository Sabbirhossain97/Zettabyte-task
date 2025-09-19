'use client'
import { motion } from 'framer-motion';
import { ExternalLink, FileText } from 'lucide-react';
import { useFetch } from '../hooks/useFetch';
import { LoadingGrid } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';
import { Post } from '../interfaces/interface';
import { containerVariants, itemVariants } from '../constants/animationSettings';
import Link from 'next/link';
import Card from '../components/Card';
import { usePathname } from 'next/navigation';

export function Posts() {
    const currentPathname = usePathname();

    const { data: posts, loading, error, refetch, fetchWithError } = useFetch<Post[]>(
        'https://jsonplaceholder.typicode.com/posts'
    );

    if (loading) {
        return <LoadingGrid />;
    }

    if (error) {
        return (
            <ErrorMessage pathname={currentPathname} />
        );
    }

    return (
        <div className="space-y-6 flex-1 p-4 sm:p-6 lg:p-10">
            <div className="flex items-center justify-between">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
                        <FileText className="h-8 w-8 text-blue-500" />
                        All Posts
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

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6"
            >
                {posts?.map((post) => (
                    <motion.div
                        key={post.id}
                        variants={itemVariants}
                        whileHover={{ y: -5 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Card
                            {...post}
                            footer={<Link href={`/posts/${post.id}`}>
                                <button className='flex items-center text-sm px-3 py-2 rounded-md bg-slate-700 hover:bg-slate-700/50 transition duration-300 cursor-pointer'>
                                    <span>Read More</span>
                                    <ExternalLink className="w-3 h-3 ml-1" />
                                </button>
                            </Link>}
                        />
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