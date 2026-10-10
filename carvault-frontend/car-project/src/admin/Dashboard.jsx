
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
    const [centersList, setCentersList] = useState([]);

    // Get dashboard data
    const getData = async () => {
        try {
            const [
                customersResponse,
                centersResponse,
                servicesResponse,
                bookingsResponse,
                reviewsResponse,
                vehiclesResponse
            ] = await Promise.all([
                axios.get('http://localhost:3000/users'),
                axios.get('http://localhost:3000/service-centers'),
                axios.get('http://localhost:3000/services'),
                axios.get('http://localhost:3000/booking'),
                axios.get('http://localhost:3000/review'),
                axios.get('http://localhost:3000/vehicles')
            ]);

            const customerUsers = customersResponse.data.filter(
                user => user.role === 'customer'
            );

            const bookingData = bookingsResponse.data;

            // Save service centers
            setCentersList(centersResponse.data);

            // Dashboard statistics
            setCustomers(customerUsers.length);
            setCenters(centersResponse.data.length);
            setServices(servicesResponse.data.length);
            setBookings(bookingData.length);
            setReviews(reviewsResponse.data.length);
            setVehicles(vehiclesResponse.data.length);

            // Booking status counts
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

            // Get the latest five bookings
            const latestBookings = [...bookingData]
                .sort((a, b) => {
                    const dateA = new Date(
                        a.createdAt || a.date || 0
                    ).getTime();

                    const dateB = new Date(
                        b.createdAt || b.date || 0
                    ).getTime();

                    return dateB - dateA;
                })
                .slice(0, 5);

            setRecentBookings(latestBookings);

        } catch (error) {
            console.log('Dashboard data error:', error);
        }
    };

    useEffect(() => {
        getData();

        const interval = setInterval(getData, 5000);

        return () => clearInterval(interval);
    }, []);

    // Get service center name
    const getServiceCenterName = (booking) => {
        const centerId = booking.serviceCenterId?._id
            || booking.serviceCenterId;

        // If the booking API already returns the center name
        if (
            booking.serviceCenterId &&
            typeof booking.serviceCenterId === 'object' &&
            booking.serviceCenterId.name
        ) {
            return booking.serviceCenterId.name;
        }

        // Find the center using its actual document ID
        const center = centersList.find(
            item => String(item._id) === String(centerId)
        );

        return center?.name || booking.serviceCenterName || 'Service Center';
    };

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
                    {[
                        { title: 'Customers', count: customers },
                        { title: 'Service Centers', count: centers },
                        { title: 'Vehicles', count: vehicles },
                        { title: 'Services', count: services },
                        { title: 'Bookings', count: bookings },
                        { title: 'Reviews', count: reviews }
                    ].map(item => (
                        <div
                            key={item.title}
                            className="bg-[#0f172a] border border-blue-900/30 rounded-xl p-5"
                        >
                            <p className="text-slate-400">
                                {item.title}
                            </p>

                            <h2 className="text-3xl font-bold mt-3">
                                {item.count}
                            </h2>
                        </div>
                    ))}
                </div>

                {/* Booking Analytics */}
                <h2 className="text-2xl font-bold mb-5">
                    Booking Analytics
                </h2>

                <div className="grid md:grid-cols-4 gap-5 mb-10">
                    {[
                        {
                            title: 'Pending',
                            count: pending,
                            color: 'text-yellow-400',
                            border: 'border-yellow-900/30'
                        },
                        {
                            title: 'Confirmed',
                            count: confirmed,
                            color: 'text-blue-400',
                            border: 'border-blue-900/30'
                        },
                        {
                            title: 'Completed',
                            count: completed,
                            color: 'text-green-400',
                            border: 'border-green-900/30'
                        },
                        {
                            title: 'Cancelled',
                            count: cancelled,
                            color: 'text-red-400',
                            border: 'border-red-900/30'
                        }
                    ].map(item => (
                        <div
                            key={item.title}
                            className={`bg-[#0f172a] border ${item.border} rounded-xl p-6`}
                        >
                            <p className="text-slate-400">
                                {item.title}
                            </p>

                            <h2 className={`text-3xl font-bold mt-2 ${item.color}`}>
                                {item.count}
                            </h2>
                        </div>
                    ))}
                </div>

                {/* Service Transactions */}
                <h2 className="text-2xl font-bold mb-5">
                    Service Transactions
                </h2>

                <div className="bg-[#0f172a] border border-blue-900/30 rounded-xl overflow-x-auto mb-10">
                    <table className="w-full min-w-[800px]">
                        <thead className="bg-[#111c33]">
                            <tr>
                                <th className="text-left p-4">Customer</th>
                                <th className="text-left p-4">Service</th>
                                <th className="text-left p-4">Service Center</th>
                                <th className="text-left p-4">Date</th>
                                <th className="text-left p-4">Status</th>
                            </tr>
                        </thead>

                        <tbody>
                            {recentBookings.map(booking => (
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
                                        {getServiceCenterName(booking)}
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

                {/* Recent System Activities */}
                <h2 className="text-2xl font-bold mb-5">
                    Recent System Activities
                </h2>

                <div className="bg-[#0f172a] border border-blue-900/30 rounded-xl p-6 mb-10">
                    <div className="space-y-4">

                        <div className="flex items-center gap-4 border-b border-slate-800 pb-4">
                            <span className="text-green-400">●</span>
                            <p className="text-slate-300">
                                CarVault currently has{' '}
                                <span className="text-white font-semibold">
                                    {customers}
                                </span>{' '}
                                registered customers.
                            </p>
                        </div>

                        <div className="flex items-center gap-4 border-b border-slate-800 pb-4">
                            <span className="text-blue-400">●</span>
                            <p className="text-slate-300">
                                Total service bookings:{' '}
                                <span className="text-white font-semibold">
                                    {bookings}
                                </span>
                            </p>
                        </div>

                        <div className="flex items-center gap-4 border-b border-slate-800 pb-4">
                            <span className="text-yellow-400">●</span>
                            <p className="text-slate-300">
                                Available services:{' '}
                                <span className="text-white font-semibold">
                                    {services}
                                </span>
                            </p>
                        </div>

                        <div className="flex items-center gap-4">
                            <span className="text-purple-400">●</span>
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