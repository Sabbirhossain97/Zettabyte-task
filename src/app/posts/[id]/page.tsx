'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { LoadingSpinner } from '@/app/components/LoadingSpinner';
import { ErrorMessage } from '@/app/components/ErrorMessage';
import { useFetch } from '@/app/hooks/useFetch';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Post } from '@/app/interfaces/interface';
import Card from '@/app/components/Card';

interface PostDetailsPageProps {
    params: Promise<{ id: string }>
}

export function PostDetail({ params }: PostDetailsPageProps) {

    const { id } = React.use(params)

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
            className="w-full mx-auto space-y-8 py-10 px-10"
        >
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
            >
                <Link href="/posts">
                    <button className="mb-4 flex items-center transition duration-300 hover:text-blue-500 cursor-pointer">
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
                    <Card {...post} />
                </motion.div>
            )}
        </motion.div>
    );
}

export default PostDetail;