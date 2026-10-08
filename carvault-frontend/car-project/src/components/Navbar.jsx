import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const user = JSON.parse(localStorage.getItem('user'));

    const logout = () => {

        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('selectedVehicle');

        navigate('/login');
    };


    // Hide navbar on login, register and forgot password pages

    if (
        location.pathname === '/login' ||
        location.pathname === '/register' ||
        location.pathname === '/forgot-password'
    ) {
        return null;
    }


    // PUBLIC NAVBAR

    if (!user) {

        return (
            <div className="navbar bg-[#0f172a] text-white px-6">

                <div className="flex-1">

                    <Link
                        to="/"
                        className="text-2xl font-bold"
                    >
                        CARVAULT
                    </Link>

                </div>

                <div className="flex gap-5">

                    <Link to="/">
                        Home
                    </Link>

                    <Link to="/service">
                        Services
                    </Link>

                    <Link to="/about">
                        About
                    </Link>

                    <Link to="/login">
                        Login
                    </Link>

                    <Link to="/register">
                        Register
                    </Link>

                </div>

            </div>
        );
    }


    // CUSTOMER NAVBAR

    if (user.role === 'customer') {

        return (
            <div className="navbar bg-[#0f172a] text-white px-6">

                <div className="flex-1">

                    <Link
                        to="/customer/vehicles"
                        className="text-2xl font-bold"
                    >
                        CARVAULT
                    </Link>

                </div>

                <div className="flex gap-5 items-center">

                    <Link to="/customer/vehicles">
                        My Vehicles
                    </Link>

                    <Link to="/customer/service-centers">
                        Service Centers
                    </Link>

                    <Link to="/customer/bookings">
                        My Bookings
                    </Link>

                    <Link to="/customer/service-history">
                        History
                    </Link>

                    <Link to="/customer/reviews">
                        Reviews
                    </Link>

                    <button
                        onClick={logout}
                        className="btn btn-sm btn-error"
                    >
                        Logout
                    </button>

                </div>

            </div>
        );
    }


    // SERVICE CENTER SIDEBAR

    if (user.role === 'serviceCenter') {

        return (
            <div className="fixed left-0 top-0 h-screen w-64 bg-[#0f172a] text-white p-6">

                <div className="mb-10">

                    <Link
                        to="/service-center/dashboard"
                        className="text-2xl font-bold"
                    >
                        CARVAULT
                    </Link>

                    <p className="text-slate-400 text-sm mt-2">
                        Service Center
                    </p>

                </div>


                <div className="flex flex-col gap-3">

                    <Link
                        to="/service-center/dashboard"
                        className="p-3 rounded-lg hover:bg-blue-600"
                    >
                        Dashboard
                    </Link>

                    <Link
                        to="/service-center/services"
                        className="p-3 rounded-lg hover:bg-blue-600"
                    >
                        Services
                    </Link>

                    <Link
                        to="/service-center/time-slots"
                        className="p-3 rounded-lg hover:bg-blue-600"
                    >
                        Time Slots
                    </Link>

                    <Link
                        to="/service-center/bookings"
                        className="p-3 rounded-lg hover:bg-blue-600"
                    >
                        Bookings
                    </Link>

                    <Link
                        to="/service-center/reviews"
                        className="p-3 rounded-lg hover:bg-blue-600"
                    >
                        Reviews
                    </Link>

                    <Link
                        to="/service-center/profile"
                        className="p-3 rounded-lg hover:bg-blue-600"
                    >
                        Profile
                    </Link>

                </div>


                <button
                    onClick={logout}
                    className="btn btn-error w-full mt-10"
                >
                    Logout
                </button>

            </div>
        );
    }


    // ADMIN SIDEBAR

    if (user.role === 'admin') {

        return (
            <div className="fixed left-0 top-0 h-screen w-64 bg-[#0f172a] text-white p-6">

                <div className="mb-10">

                    <Link
                        to="/admin/dashboard"
                        className="text-2xl font-bold"
                    >
                        CARVAULT
                    </Link>

                    <p className="text-slate-400 text-sm mt-2">
                        Admin Panel
                    </p>

                </div>


                <div className="flex flex-col gap-3">

                    <Link
                        to="/admin/dashboard"
                        className="p-3 rounded-lg hover:bg-blue-600"
                    >
                        Dashboard
                    </Link>

                    <Link
                        to="/admin/customers"
                        className="p-3 rounded-lg hover:bg-blue-600"
                    >
                        Customers
                    </Link>

                    <Link
                        to="/admin/service-centers"
                        className="p-3 rounded-lg hover:bg-blue-600"
                    >
                        Service Centers
                    </Link>

                    <Link
                        to="/admin/services"
                        className="p-3 rounded-lg hover:bg-blue-600"
                    >
                        Services
                    </Link>

                    <Link
                        to="/admin/bookings"
                        className="p-3 rounded-lg hover:bg-blue-600"
                    >
                        Bookings
                    </Link>

                    <Link
                        to="/admin/reviews"
                        className="p-3 rounded-lg hover:bg-blue-600"
                    >
                        Reviews
                    </Link>

                </div>


                <button
                    onClick={logout}
                    className="btn btn-error w-full mt-10"
                >
                    Logout
                </button>

            </div>
        );
    }


    return null;
};

export default Navbar;