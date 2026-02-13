import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { IoCloudUploadOutline, IoLogOutOutline, IoPersonCircleOutline } from "react-icons/io5";

const Header = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <header className="fixed top-0 left-0 right-0 h-16 bg-gray-900 border-b border-gray-800 flex items-center justify-between px-6 z-50">
            <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                VidStream
            </Link>

            <div className="flex items-center gap-4">
                {user ? (
                    <>
                        <Link to="/upload" className="flex items-center gap-2 hover:text-blue-400 transition-colors">
                            <IoCloudUploadOutline className="text-xl" />
                            <span className="hidden sm:inline">Upload</span>
                        </Link>
                        <div className="flex items-center gap-3 border-l border-gray-700 pl-4">
                            <img
                                src={user.avatar}
                                alt={user.username}
                                className="w-8 h-8 rounded-full object-cover border border-gray-700"
                            />
                            <span className="hidden md:inline text-sm font-medium">{user.username}</span>
                            <button onClick={handleLogout} className="text-gray-400 hover:text-red-400 transition-colors p-1">
                                <IoLogOutOutline className="text-xl" />
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="flex items-center gap-3">
                        <Link to="/login" className="px-4 py-2 rounded-lg text-sm font-medium text-gray-300 hover:bg-gray-800 transition-all">
                            Login
                        </Link>
                        <Link to="/register" className="px-4 py-2 rounded-lg text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white transition-all shadow-lg shadow-blue-900/20">
                            Sign Up
                        </Link>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
