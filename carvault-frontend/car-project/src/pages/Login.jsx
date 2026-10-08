import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

import loginBg from '../assets/login-bg.png';

const Login = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async (e) => {

        e.preventDefault();

        try {

            const response = await axios.post(
                'http://localhost:3000/users/login',
                {
                    email,
                    password
                }
            );

            const user = response.data.user;

            localStorage.setItem(
                'user',
                JSON.stringify(user)
            );

            localStorage.setItem(
                'token',
                response.data.token
            );

            if (user.role === 'customer') {
                navigate('/customer/vehicles');
            }

            else if (user.role === 'serviceCenter') {
                navigate('/service-center/dashboard');
            }

            else if (user.role === 'admin') {
                navigate('/admin/dashboard');
            }

            else {
                alert('Unknown user role');
            }

        } catch (error) {

            alert(
                error.response?.data?.message ||
                'Login failed'
            );

        }
    };

    return (

        <div
            className="min-h-[calc(100vh-80px)] bg-cover bg-center bg-no-repeat flex items-center justify-end px-6 md:px-16 lg:px-24 relative"
            style={{
                backgroundImage: `url(${loginBg})`
            }}
        >

            {/* Dark Overlay */}

            <div className="absolute inset-0 bg-black/35"></div>


            {/* Login Content */}

            <div className="relative z-10 w-full max-w-md">

                {/* Heading */}

                <div className="text-center mb-7">

                    <h1 className="text-4xl font-bold text-white">
                        LOGIN TO CARVAULT
                    </h1>

                    <p className="mt-3 text-slate-300">
                        Access your car ownership dashboard
                    </p>

                </div>


                {/* Blurred Glass Login Box */}

                <div className="w-full bg-[#020617]/35 backdrop-blur-xl shadow-2xl rounded-2xl border border-white/20">

                    <div className="p-6">

                        <form
                            onSubmit={handleLogin}
                            className="space-y-4"
                        >

                            {/* Email */}

                            <div>

                                <label className="block mb-2">

                                    <span className="text-slate-200">
                                        Email
                                    </span>

                                </label>

                                <input
                                    type="email"
                                    placeholder="your@email.com"
                                    value={email}
                                    onChange={(e) =>
                                        setEmail(e.target.value)
                                    }
                                    className="w-full h-12 px-4 rounded-lg bg-black/30 backdrop-blur-sm text-white border border-white/20 outline-none focus:border-blue-400 placeholder:text-slate-300"
                                    required
                                />

                            </div>


                            {/* Password */}

                            <div>

                                <label className="block mb-2">

                                    <span className="text-slate-200">
                                        Password
                                    </span>

                                </label>

                                <div className="relative">

                                    <input
                                        type={
                                            showPassword
                                                ? "text"
                                                : "password"
                                        }
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        className="w-full h-12 px-4 pr-12 rounded-lg bg-black/30 backdrop-blur-sm text-white border border-white/20 outline-none focus:border-blue-400 placeholder:text-slate-300"
                                        required
                                    />


                                    {/* Password Visibility Button */}

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 hover:text-blue-400"
                                    >

                                        {showPassword ? (

                                            /* Eye Open */

                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="1.5"
                                                stroke="currentColor"
                                                className="w-5 h-5"
                                            >

                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M2.036 12.322a1.012 1.012 0 010-.644C3.423 7.51 7.36 5 12 5c4.64 0 8.577 2.51 9.964 6.678.071.213.071.433 0 .644C20.577 16.49 16.64 19 12 19c-4.64 0-8.577-2.51-9.964-6.678z"
                                                />

                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                />

                                            </svg>

                                        ) : (

                                            /* Eye Closed */

                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="1.5"
                                                stroke="currentColor"
                                                className="w-5 h-5"
                                            >

                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.443 7.244 19.5 12 19.5c.993 0 1.953-.138 2.852-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.774 3.057 10.066 7.5a10.52 10.52 0 00-4.293 5.293M6.228 6.228L3 3m3.228 3.228l3.64 3.64m4.264 4.264l3.64 3.64M14.5 14.5a3 3 0 01-4.243-4.243"
                                                />

                                            </svg>

                                        )}

                                    </button>

                                </div>

                            </div>


                            {/* Forgot Password */}

                            <div className="text-right">

                                <Link
                                    to="/forgot-password"
                                    className="text-sm text-blue-400 hover:text-blue-300"
                                >
                                    Forgot Password?
                                </Link>

                            </div>


                            {/* Login Button */}

                            <button
                                type="submit"
                                className="w-full h-12 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold transition"
                            >
                                Login
                            </button>

                        </form>


                        {/* Register Link */}

                        <p className="text-center text-sm text-slate-300 mt-6">

                            Don't have an account?{" "}

                            <Link
                                to="/register"
                                className="text-blue-400 hover:text-blue-300 font-medium"
                            >
                                Register
                            </Link>

                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default Login;