'use client'
import { useSession } from 'next-auth/react'
import Link from "next/link";
import Image from 'next/image';

function Profile() {
  const { data: session } = useSession();
  if (session) {
    return (
      <div className='p-6'>
        <div className='flex flex-col items-center sm:justify-start sm:flex-row gap-10 border rounded-md p-10 border-gray-700 mt-6'>
          <div>
            <Image
              className="h-44 w-44 rounded-full"
              src={session?.user?.image ?? "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"} 
              alt="avatar"
              width={176} 
              height={176}
            />
          </div>
          <div className='flex flex-col gap-4 justify-center items-start'>
            <h1 className='text-4xl font-bold'>{session?.user?.name}</h1>
            <h3 className='text-gray-400'>{session?.user?.email}</h3>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
        <h1 className="text-4xl font-bold text-red-500">Access Denied</h1>
        <p className="mt-2 text-gray-400">
          You need to be logged in to view your profile.
        </p>
        <Link
          href="/"
          className="mt-6 px-6 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-800 transition"
        >
          Go Home
        </Link>
      </div>
    )
  }
}

export default Profile