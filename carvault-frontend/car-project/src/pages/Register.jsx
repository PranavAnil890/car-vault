import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import loginBg from '../assets/login-bg.png';

const Register = () => {

    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleRegister = async (e) => {

        e.preventDefault();

        try {

            await axios.post(
                'http://localhost:3000/users/register',
                {
                    name,
                    email,
                    phone,
                    password
                }
            );

            alert('Registration successful');
            navigate('/login');

        } catch (error) {

            alert(
                error.response?.data?.message ||
                'Registration failed'
            );

        }
    };

    return (

        <div
            className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center px-4 relative"
            style={{
                backgroundImage: `url(${loginBg})`
            }}
        >

            <div className="absolute inset-0 bg-black/45"></div>


            <div className="relative z-10 w-full max-w-md bg-[#020617]/70 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-2xl">

                <h2 className="text-3xl font-bold text-white text-center mb-6">
                    Create Account
                </h2>


                <form
                    onSubmit={handleRegister}
                    className="space-y-4"
                >

                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="input input-bordered w-full bg-[#020617]/70 text-white border-white/10"
                        required
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="input input-bordered w-full bg-[#020617]/70 text-white border-white/10"
                        required
                    />

                    <input
                        type="tel"
                        placeholder="Phone Number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="input input-bordered w-full bg-[#020617]/70 text-white border-white/10"
                        required
                    />

                    <div className="relative">

                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="input input-bordered w-full bg-[#020617]/70 text-white border-white/10 pr-12"
                            required
                        />

                        <button
                            type="button"
                            onClick={() =>
                                setShowPassword(!showPassword)
                            }
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-400"
                        >

                            {showPassword ? (

                                /* Eye open */

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

                                /* Eye closed */

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


                    <button
                        type="submit"
                        className="btn btn-primary w-full"
                    >
                        Register
                    </button>

                </form>

                <p className="text-center text-slate-300 mt-5">

                    Already have an account?{' '}

                    <Link
                        to="/login"
                        className="text-blue-400 hover:text-blue-300"
                    >
                        Login
                    </Link>

                </p>

            </div>

        </div>
    );
};

export default Register;