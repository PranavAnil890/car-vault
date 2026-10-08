
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {

    return (

        <footer className="bg-[#020617] text-white border-t border-slate-800">

            <div className="footer footer-horizontal max-w-7xl mx-auto px-6 py-12">

                {/* CarVault */}
                <aside>

                    <div className="text-4xl mb-2">
                        🚗
                    </div>

                    <h2 className="text-2xl font-bold text-cyan-400">
                        CarVault
                    </h2>

                    <p className="max-w-xs text-slate-400 leading-relaxed">
                        Smart car ownership and service management
                        platform for a simple and convenient vehicle experience.
                    </p>

                </aside>


                {/* Quick Links */}
                <nav>

                    <h6 className="footer-title text-cyan-400">
                        Quick Links
                    </h6>

                    <Link
                        to="/"
                        className="link link-hover text-slate-300 hover:text-cyan-400"
                    >
                        Home
                    </Link>

                    <Link
                        to="/service"
                        className="link link-hover text-slate-300 hover:text-cyan-400"
                    >
                        Services
                    </Link>

                    <Link
                        to="/about"
                        className="link link-hover text-slate-300 hover:text-cyan-400"
                    >
                        About
                    </Link>

                    <Link
                        to="/login"
                        className="link link-hover text-slate-300 hover:text-cyan-400"
                    >
                        Login
                    </Link>

                    <Link
                        to="/register"
                        className="link link-hover text-slate-300 hover:text-cyan-400"
                    >
                        Register
                    </Link>

                </nav>


                {/* Features */}
                <nav>

                    <h6 className="footer-title text-cyan-400">
                        Features
                    </h6>

                    <Link
                        to="/service"
                        className="link link-hover text-slate-300 hover:text-cyan-400"
                    >
                        Vehicle Services
                    </Link>

                    <Link
                        to="/about"
                        className="link link-hover text-slate-300 hover:text-cyan-400"
                    >
                        About CarVault
                    </Link>

                    <Link
                        to="/register"
                        className="link link-hover text-slate-300 hover:text-cyan-400"
                    >
                        Get Started
                    </Link>

                </nav>


                {/* Contact */}
                <nav>

                    <h6 className="footer-title text-cyan-400">
                        Contact
                    </h6>

                    <p className="text-slate-400">
                        📧 support@carvault.com
                    </p>

                    <p className="text-slate-400">
                        📞 +91 98765 43210
                    </p>

                    <p className="text-slate-400">
                        📍 Kerala, India
                    </p>

                </nav>

            </div>


            {/* Bottom */}
            <div className="border-t border-slate-800">

                <div className="max-w-7xl mx-auto px-6 py-5 text-center">

                    <p className="text-sm text-slate-500">
                        © 2026 CarVault. All rights reserved.
                    </p>

                    <p className="text-xs text-slate-600 mt-1">
                        Smart Car Ownership & Service Platform
                    </p>

                </div>

            </div>

        </footer>
    );
};

export default Footer;

