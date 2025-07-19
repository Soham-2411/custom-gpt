import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect, useRef, useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { supabase } from '../services/supabase';
import { useAuth } from '../contexts/AuthContext';

export default function AuthDialog() {
    const { user } = useAuth();
    const [isOpen, setIsOpen] = useState(false)
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);


    const handleGoogleLogin = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
                queryParams: {
                    access_type: 'offline',
                    prompt: 'consent',

                }
            }
        })
        if (error) console.error("GOOGLE AUTH ERROR: ", error);
        else {
            setIsOpen(false)
        }
    }
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowDropdown(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error("Logout error: ", error);
        }
        setShowDropdown(false);
    }

    if (user) {
        return (
            <div className="absolute top-4 right-4">
                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setShowDropdown(!showDropdown)}
                        className="flex items-center gap-2 focus:outline-none"
                    >
                        <div className="relative w-10 h-10 rounded-full  border-none hover:border-blue-400 overflow-hidden">
                            <img
                                src={user.user_metadata.avatar_url}
                                alt="User profile"
                                className="absolute inset-0 w-full h-full object-cover"
                                onError={(e) => {
                                    e.currentTarget.src = `https://ui-avatars.com/api/?name=${user.email}&background=random`
                                }}
                            />
                        </div>
                    </button>

                    {showDropdown && (
                        <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 z-50 border border-gray-700">
                            <div className="px-4 py-2 text-sm text-gray-300">
                                <p className="font-medium">{user.email}</p>
                                <p className="text-xs text-gray-400">
                                    {user.user_metadata.full_name || 'User'}
                                </p>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 transition-colors"
                            >
                                Sign out
                            </button>
                        </div>
                    )}
                </div>
            </div>
        )

    } else {

        return (
            <>
                <button
                    onClick={() => setIsOpen(true)}
                    className='bg-transparent text-white border border-gray-500 px-4 py-2 rounded-3xl shadow hover:bg-gray-300 transition-all duration-200 ease-in hover:bg-opacity-10'
                >
                    Sign In
                </button>

                <Transition appear show={isOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-50" onClose={() => setIsOpen(false)}>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-black bg-opacity-50" />
                        </Transition.Child>

                        <div className="fixed inset-0 overflow-y-auto">
                            <div className="flex min-h-full items-center justify-center p-4">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    <Dialog.Panel className="w-full max-w-sm transform overflow-hidden rounded-2xl bg-gray-900 border border-gray-700 p-8 text-left align-middle shadow-xl transition-all">
                                        <div className="text-center mb-8">
                                            <Dialog.Title
                                                as="h2"
                                                className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
                                            >
                                                Welcome to CustomGPT
                                            </Dialog.Title>
                                            <p className="mt-2 text-gray-400">Sign in below</p>
                                        </div>

                                        {/* Auth Providers */}
                                        <div className="space-y-4">
                                            <button
                                                className="w-full flex items-center justify-center gap-3 bg-gray-800 hover:bg-gray-700 hover:bg-opacity-25 text-white py-3 px-4 rounded-lg border border-gray-700 transition-all"
                                                onClick={handleGoogleLogin}
                                            >
                                                <FcGoogle className="w-5 h-5" />
                                                <span>Continue with Google</span>
                                            </button>

                                        </div>

                                        {/* Legal Disclaimer */}
                                        <p className="mt-6 text-xs text-gray-500 text-center">
                                            By continuing, you agree to our <a href="#" className="text-blue-400 hover:underline">Terms of Service</a> and <a href="#" className="text-blue-400 hover:underline">Privacy Policy</a>
                                        </p>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
            </>
        )
    }
}