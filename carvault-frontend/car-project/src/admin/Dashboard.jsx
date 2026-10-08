import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {

    const [customers, setCustomers] = useState(0);
    const [centers, setCenters] = useState(0);
    const [services, setServices] = useState(0);
    const [bookings, setBookings] = useState(0);
    const [reviews, setReviews] = useState(0);
    const [vehicles, setVehicles] = useState(0);

    const [pending, setPending] = useState(0);
    const [confirmed, setConfirmed] = useState(0);
    const [completed, setCompleted] = useState(0);
    const [cancelled, setCancelled] = useState(0);

    const [recentBookings, setRecentBookings] = useState([]);

    const getData = async () => {

        try {

            const customersResponse = await axios.get(
                'http://localhost:3000/users'
            );

            const centersResponse = await axios.get(
                'http://localhost:3000/service-centers'
            );

            const servicesResponse = await axios.get(
                'http://localhost:3000/services'
            );

            const bookingsResponse = await axios.get(
                'http://localhost:3000/booking'
            );

            const reviewsResponse = await axios.get(
                'http://localhost:3000/review'
            );

            const vehiclesResponse = await axios.get(
                'http://localhost:3000/vehicles'
            );

            // Customers
            const customerUsers = customersResponse.data.filter(
                user => user.role === 'customer'
            );

            setCustomers(customerUsers.length);

            // Other counts
            setCenters(centersResponse.data.length);
            setServices(servicesResponse.data.length);
            setBookings(bookingsResponse.data.length);
            setReviews(reviewsResponse.data.length);

            // Vehicle count
            setVehicles(vehiclesResponse.data.length);

            // Booking data
            const bookingData = bookingsResponse.data;

            setPending(
                bookingData.filter(
                    booking => booking.status === 'Pending'
                ).length
            );

            setConfirmed(
                bookingData.filter(
                    booking => booking.status === 'Confirmed'
                ).length
            );

            setCompleted(
                bookingData.filter(
                    booking => booking.status === 'Completed'
                ).length
            );

            setCancelled(
                bookingData.filter(
                    booking => booking.status === 'Cancelled'
                ).length
            );

            // Latest 5 bookings
            setRecentBookings(
                bookingData.slice(-5).reverse()
            );

        } catch (error) {

            console.log(error);

        }

    };

    useEffect(() => {

        getData();

        // Refresh dashboard every 5 seconds
        const interval = setInterval(() => {
            getData();
        }, 5000);

        return () => clearInterval(interval);

    }, []);

    return (

        <div className="ml-64 min-h-screen bg-[#020617] text-white p-8">

            <div className="max-w-7xl mx-auto">

                {/* Heading */}

                <div className="text-center mb-10">

                    <h1 className="text-3xl font-bold">
                        ADMIN DASHBOARD
                    </h1>

                    <p className="text-slate-400 mt-2">
                        Overview of CarVault
                    </p>

                </div>


                {/* Statistics */}

                <h2 className="text-2xl font-bold mb-5">
                    CarVault Statistics
                </h2>

                <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">

                    {/* Customers */}

                    <div className="bg-[#0f172a] border border-blue-900/30 rounded-xl p-5">

                        <p className="text-slate-400">
                            Customers
                        </p>

                        <h2 className="text-3xl font-bold mt-3">
                            {customers}
                        </h2>

                    </div>


                    {/* Service Centers */}

                    <div className="bg-[#0f172a] border border-blue-900/30 rounded-xl p-5">

                        <p className="text-slate-400">
                            Service Centers
                        </p>

                        <h2 className="text-3xl font-bold mt-3">
                            {centers}
                        </h2>

                    </div>


                    {/* Vehicles */}

                    <div className="bg-[#0f172a] border border-blue-900/30 rounded-xl p-5">

                        <p className="text-slate-400">
                            Vehicles
                        </p>

                        <h2 className="text-3xl font-bold mt-3">
                            {vehicles}
                        </h2>

                    </div>


                    {/* Services */}

                    <div className="bg-[#0f172a] border border-blue-900/30 rounded-xl p-5">

                        <p className="text-slate-400">
                            Services
                        </p>

                        <h2 className="text-3xl font-bold mt-3">
                            {services}
                        </h2>

                    </div>


                    {/* Bookings */}

                    <div className="bg-[#0f172a] border border-blue-900/30 rounded-xl p-5">

                        <p className="text-slate-400">
                            Bookings
                        </p>

                        <h2 className="text-3xl font-bold mt-3">
                            {bookings}
                        </h2>

                    </div>


                    {/* Reviews */}

                    <div className="bg-[#0f172a] border border-blue-900/30 rounded-xl p-5">

                        <p className="text-slate-400">
                            Reviews
                        </p>

                        <h2 className="text-3xl font-bold mt-3">
                            {reviews}
                        </h2>

                    </div>

                </div>


                {/* Booking Analytics */}

                <h2 className="text-2xl font-bold mb-5">
                    Booking Analytics
                </h2>

                <div className="grid md:grid-cols-4 gap-5 mb-10">

                    <div className="bg-[#0f172a] border border-yellow-900/30 rounded-xl p-6">

                        <p className="text-slate-400">
                            Pending
                        </p>

                        <h2 className="text-3xl font-bold mt-2 text-yellow-400">
                            {pending}
                        </h2>

                    </div>


                    <div className="bg-[#0f172a] border border-blue-900/30 rounded-xl p-6">

                        <p className="text-slate-400">
                            Confirmed
                        </p>

                        <h2 className="text-3xl font-bold mt-2 text-blue-400">
                            {confirmed}
                        </h2>

                    </div>


                    <div className="bg-[#0f172a] border border-green-900/30 rounded-xl p-6">

                        <p className="text-slate-400">
                            Completed
                        </p>

                        <h2 className="text-3xl font-bold mt-2 text-green-400">
                            {completed}
                        </h2>

                    </div>


                    <div className="bg-[#0f172a] border border-red-900/30 rounded-xl p-6">

                        <p className="text-slate-400">
                            Cancelled
                        </p>

                        <h2 className="text-3xl font-bold mt-2 text-red-400">
                            {cancelled}
                        </h2>

                    </div>

                </div>


                {/* Service Transactions */}

                <h2 className="text-2xl font-bold mb-5">
                    Service Transactions
                </h2>

                <div className="bg-[#0f172a] border border-blue-900/30 rounded-xl overflow-x-auto mb-10">

                    <table className="w-full min-w-[800px]">

                        <thead className="bg-[#111c33]">

                            <tr>

                                <th className="text-left p-4">
                                    Customer
                                </th>

                                <th className="text-left p-4">
                                    Service
                                </th>

                                <th className="text-left p-4">
                                    Service Center
                                </th>

                                <th className="text-left p-4">
                                    Date
                                </th>

                                <th className="text-left p-4">
                                    Status
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            {recentBookings.map((booking) => (

                                <tr
                                    key={booking._id}
                                    className="border-t border-slate-800"
                                >

                                    <td className="p-4">
                                        {booking.userId?.name ||
                                            booking.customerName ||
                                            'Customer'}
                                    </td>

                                    <td className="p-4">
                                        {booking.serviceId?.serviceName ||
                                            booking.serviceName ||
                                            'Service'}
                                    </td>

                                    <td className="p-4">
                                        {booking.serviceCenterId?.name ||
                                            booking.serviceCenterName ||
                                            'Service Center'}
                                    </td>

                                    <td className="p-4">

                                        {booking.date
                                            ? new Date(
                                                booking.date
                                            ).toLocaleDateString()
                                            : '-'}

                                    </td>

                                    <td className="p-4">

                                        <span className="text-blue-400">
                                            {booking.status || 'Pending'}
                                        </span>

                                    </td>

                                </tr>

                            ))}


                            {recentBookings.length === 0 && (

                                <tr>

                                    <td
                                        colSpan="5"
                                        className="p-6 text-center text-slate-400"
                                    >
                                        No transactions found
                                    </td>

                                </tr>

                            )}

                        </tbody>

                    </table>

                </div>


                {/* System Activities */}

                <h2 className="text-2xl font-bold mb-5">
                    Recent System Activities
                </h2>

                <div className="bg-[#0f172a] border border-blue-900/30 rounded-xl p-6 mb-10">

                    <div className="space-y-4">

                        <div className="flex items-center gap-4 border-b border-slate-800 pb-4">

                            <span className="text-green-400">
                                ●
                            </span>

                            <p className="text-slate-300">

                                CarVault currently has{' '}

                                <span className="text-white font-semibold">
                                    {customers}
                                </span>{' '}

                                registered customers.

                            </p>

                        </div>


                        <div className="flex items-center gap-4 border-b border-slate-800 pb-4">

                            <span className="text-blue-400">
                                ●
                            </span>

                            <p className="text-slate-300">

                                Total service bookings:{' '}

                                <span className="text-white font-semibold">
                                    {bookings}
                                </span>

                            </p>

                        </div>


                        <div className="flex items-center gap-4 border-b border-slate-800 pb-4">

                            <span className="text-yellow-400">
                                ●
                            </span>

                            <p className="text-slate-300">

                                Available services:{' '}

                                <span className="text-white font-semibold">
                                    {services}
                                </span>

                            </p>

                        </div>


                        <div className="flex items-center gap-4">

                            <span className="text-purple-400">
                                ●
                            </span>

                            <p className="text-slate-300">

                                Customer reviews submitted:{' '}

                                <span className="text-white font-semibold">
                                    {reviews}
                                </span>

                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );
};

export default Dashboard;