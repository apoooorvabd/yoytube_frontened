import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { IoCloudUploadOutline } from "react-icons/io5";

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { register: registerUser } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [uploading, setUploading] = useState(false);

    const onSubmit = async (data) => {
        try {
            setUploading(true);
            setError('');

            const formData = new FormData();
            formData.append('fullName', data.fullName);
            formData.append('email', data.email);
            formData.append('username', data.username);
            formData.append('password', data.password);
            formData.append('avatar', data.avatar[0]);
            if (data.coverImage[0]) {
                formData.append('coverImage', data.coverImage[0]);
            }

            await registerUser(formData);
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="flex min-h-[80vh] items-center justify-center py-10">
            <div className="w-full max-w-lg bg-gray-900/50 p-8 rounded-2xl border border-gray-800 backdrop-blur-sm shadow-xl">
                <h2 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Create Account</h2>
                <p className="text-center text-gray-400 mb-6 text-sm">Join the community and start streaming</p>

                {error && <div className="bg-red-500/10 text-red-500 p-3 rounded-lg mb-4 text-sm text-center border border-red-500/20">{error}</div>}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Full Name</label>
                            <input
                                {...register("fullName", { required: "Full Name is required" })}
                                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all placeholder-gray-500"
                                placeholder="John Doe"
                            />
                            {errors.fullName && <span className="text-red-500 text-xs mt-1">{errors.fullName.message}</span>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Username</label>
                            <input
                                {...register("username", { required: "Username is required" })}
                                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all placeholder-gray-500"
                                placeholder="johndoe"
                            />
                            {errors.username && <span className="text-red-500 text-xs mt-1">{errors.username.message}</span>}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                        <input
                            type="email"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Invalid email address"
                                }
                            })}
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all placeholder-gray-500"
                            placeholder="john@example.com"
                        />
                        {errors.email && <span className="text-red-500 text-xs mt-1">{errors.email.message}</span>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Password</label>
                        <input
                            type="password"
                            {...register("password", { required: "Password is required", minLength: { value: 6, message: "Min 6 characters" } })}
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all placeholder-gray-500"
                            placeholder="••••••••"
                        />
                        {errors.password && <span className="text-red-500 text-xs mt-1">{errors.password.message}</span>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="relative">
                            <label className="block text-sm font-medium text-gray-400 mb-1">Avatar</label>
                            <div className="flex items-center justify-center w-full">
                                <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-gray-700 border-dashed rounded-lg cursor-pointer bg-gray-800 hover:bg-gray-700 transition-colors">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <IoCloudUploadOutline className="text-2xl text-gray-400 mb-1" />
                                        <p className="text-xs text-gray-500">Items</p>
                                    </div>
                                    <input
                                        type="file"
                                        className="hidden"
                                        {...register("avatar", { required: "Avatar is required" })}
                                        accept="image/*"
                                    />
                                </label>
                            </div>
                            {errors.avatar && <span className="text-red-500 text-xs mt-1">{errors.avatar.message}</span>}
                        </div>

                        <div className="relative">
                            <label className="block text-sm font-medium text-gray-400 mb-1">Cover Image</label>
                            <div className="flex items-center justify-center w-full">
                                <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-gray-700 border-dashed rounded-lg cursor-pointer bg-gray-800 hover:bg-gray-700 transition-colors">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <IoCloudUploadOutline className="text-2xl text-gray-400 mb-1" />
                                        <p className="text-xs text-gray-500">Optional</p>
                                    </div>
                                    <input
                                        type="file"
                                        className="hidden"
                                        {...register("coverImage")}
                                        accept="image/*"
                                    />
                                </label>
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={uploading}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all transform active:scale-[0.98] shadow-lg shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {uploading ? 'Creating Account...' : 'Sign Up'}
                    </button>
                </form>

                <p className="mt-6 text-center text-gray-400 text-sm">
                    Already have an account?{' '}
                    <Link to="/login" className="text-blue-400 hover:text-blue-300 font-medium">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
