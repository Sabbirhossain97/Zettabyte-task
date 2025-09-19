import React, { useState, SetStateAction } from 'react'
import { motion } from 'framer-motion';
import { useSession, signIn, signOut } from 'next-auth/react';
import { LogIn } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface AuthProps {
    openDropDown: boolean;
    setOpenDropDown: React.Dispatch<SetStateAction<boolean>>
}

function Auth({ openDropDown, setOpenDropDown }: AuthProps) {
    const { data: session } = useSession();
    const [isSigningOut, setIsSigningOut] = useState(false)

    const handleSignOut = async () => {
        setIsSigningOut(true)
        try {
            await signOut({ redirect: false })
        } finally {
            setIsSigningOut(false)
            setOpenDropDown(!openDropDown)
        }
    }

    return (
        <div className='relative' onClick={(e) => e.stopPropagation()}>
            {!session && <motion.button onClick={() => setOpenDropDown(!openDropDown)} className="flex cursor-pointer transition duration-300 items-center gap-2 bg-gray-700 px-4 py-2 rounded-lg hover:bg-gray-800" type="button">
                <LogIn className='h-4 w-4' />
                <span>Sign in</span>
            </motion.button>}
            {session &&
                <Image
                    src={session?.user?.image ?? 'avatar'}
                    onClick={() => setOpenDropDown(!openDropDown)}
                    className='h-10 w-10 rounded-full cursor-pointer'
                    width={40}
                    height={40}
                    alt='avatar'
                />
            }
            {openDropDown && <div className="z-10 bg-slate-800 right-0 mt-2 px-2 absolute  rounded-lg shadow-sm min-w-52">
                <motion.ul
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="py-2 text-sm space-y-2 text-white">
                    <li>
                        {!session && <button onClick={() => signIn("google")} className="cursor-pointer px-2 whitespace-nowrap w-full flex justify-center transition duration-300 text-center items-center gap-2 rounded-md bg-slate-700 hover:bg-slate-600 py-2 text-smlg font-semibold" >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24px" height="24px"><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" /><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" /><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" /><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" /></svg>
                            Sign in with google
                        </button>}
                    </li>
                    {session && <li>
                        <Link href="/profile" className="cursor-pointer px-2 whitespace-nowrap w-full flex justify-center transition duration-300 text-center items-center gap-2 rounded-md bg-slate-700 hover:bg-slate-600 py-2 text-smlg font-semibold" >
                            Profile
                        </Link>
                    </li>}
                    {session && <li>
                        <button onClick={handleSignOut} className="cursor-pointer px-2 whitespace-nowrap w-full flex justify-center transition duration-300 text-center items-center gap-2 rounded-md bg-slate-700 hover:bg-slate-600 py-2 text-smlg font-semibold" >
                            {isSigningOut ? <div className='flex items-center gap-2'><motion.div
                                className="w-5 h-5 border-2 rounded-full"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            /> Signing out...</div> : 'Sign out'}
                        </button>
                    </li>}
                </motion.ul>
            </div>}
        </div>
    )
}

export default Auth