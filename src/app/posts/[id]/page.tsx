'use client'
import { motion } from 'framer-motion';
import { LoadingSpinner } from '@/app/components/LoadingSpinner';
import { ErrorMessage } from '@/app/components/ErrorMessage';
import { useFetch } from '@/app/hooks/useFetch';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Post } from '@/app/interfaces/interface';

interface PostDetailsPageProps {
    params: {
        id: string
    }
}

export function PostDetail({ params }: PostDetailsPageProps) {

    const { id } = params

    const { data: post, loading: postLoading, error: postError, refetch: refetchPost } = useFetch<Post>(
        `https://jsonplaceholder.typicode.com/posts/${id}`
    );

    if (postLoading) {
        return <LoadingSpinner />;
    }

    if (postError) {
        return (
            <ErrorMessage
                message={postError}
                onRetry={refetchPost}
            />
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-7xl mx-auto space-y-8 py-10"
        >
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
            >
                <Link href="/posts">
                    <button className="mb-4 flex items-center">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        <span>Back to Posts</span>
                    </button>
                </Link>
            </motion.div>

            {post && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                >
                    <div className="h-full flex flex-col max-w-full p-6 border rounded-lg shadow-sm bg-gray-800/50 border-gray-700">
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
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </motion.div>
    );
}

export default PostDetail;