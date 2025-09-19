'use client'
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center">
            <h1 className="text-6xl font-bold text-red-500">404</h1>
            <p className="mt-4 text-lg text-gray-400">
                Oops! The page you’re looking for doesn’t exist.
            </p>
            <Link
                href="/"
                className="mt-6 px-6 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-800 transition"
            >
                Go Home
            </Link>
        </div>
    );
}