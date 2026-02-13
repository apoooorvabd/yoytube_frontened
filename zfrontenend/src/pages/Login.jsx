import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { login } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const onSubmit = async (data) => {
        try {
            setError('');
            await login(data);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="flex min-h-[80vh] items-center justify-center">
            <div className="w-full max-w-md bg-gray-900/50 p-8 rounded-2xl border border-gray-800 backdrop-blur-sm shadow-xl">
                <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Welcome Back</h2>

                {error && <div className="bg-red-500/10 text-red-500 p-3 rounded-lg mb-4 text-sm text-center border border-red-500/20">{error}</div>}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Email or Username</label>
                        <input
                            {...register("username", { required: "Username or Email is required" })}
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder-gray-500"
                            placeholder="Enter your email or username"
                        />
                        {errors.username && <span className="text-red-500 text-xs mt-1">{errors.username.message}</span>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Password</label>
                        <input
                            type="password"
                            {...register("password", { required: "Password is required" })}
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder-gray-500"
                            placeholder="••••••••"
                        />
                        {errors.password && <span className="text-red-500 text-xs mt-1">{errors.password.message}</span>}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all transform active:scale-[0.98] shadow-lg shadow-blue-500/25"
                    >
                        Sign In
                    </button>
                </form>

                <p className="mt-6 text-center text-gray-400 text-sm">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-blue-400 hover:text-blue-300 font-medium">
                        Create account
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
