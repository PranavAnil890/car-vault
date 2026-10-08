import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DashBoard = () => {

    const [services, setServices] = useState([]);
    const [bookings, setBookings] = useState([]);

    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {

        // Get services
        axios.get('http://localhost:3000/services')
            .then((response) => {

                const myServices = response.data.filter(
                    (service) =>
                        service.serviceCenterId === user.id ||
                        service.serviceCenterId?._id === user.id
                );

                setServices(myServices);

            })
            .catch((error) => {
                console.log(error);
            });


        // Get bookings
        axios.get('http://localhost:3000/booking')
            .then((response) => {

                const myBookings = response.data.filter(
                    (booking) =>
                        booking.serviceCenterId === user.id ||
                        booking.serviceCenterId?._id === user.id
                );

                setBookings(myBookings);

            })
            .catch((error) => {
                console.log(error);
            });

    }, []);


    // Pending bookings
    const pendingBookings = bookings.filter(
        (booking) => booking.status === 'Pending'
    );


    return (

        <div className="ml-64 min-h-screen bg-[#020617] text-white p-8">

            <div className="max-w-6xl mx-auto">

                <h1 className="text-3xl font-bold">
                    Welcome, {user?.name || 'Service Center'} 👋
                </h1>

                <p className="text-slate-400 mt-2 mb-8">
                    Service Center Dashboard
                </p>


                {/* Dashboard Cards */}

                <div className="grid grid-cols-3 gap-6">

                    {/* Total Services */}

                    <div className="bg-[#0f172a] p-6 rounded-xl">

                        <p className="text-slate-400">
                            Total Services
                        </p>

                        <h2 className="text-4xl font-bold mt-3">
                            {services.length}
                        </h2>

                    </div>


                    {/* Today's Bookings */}

                    <div className="bg-[#0f172a] p-6 rounded-xl">

                        <p className="text-slate-400">
                            Today's Bookings
                        </p>

                        <h2 className="text-4xl font-bold mt-3">
                            {bookings.length}
                        </h2>

                    </div>


                    {/* Pending Bookings */}

                    <div className="bg-[#0f172a] p-6 rounded-xl">

                        <p className="text-slate-400">
                            Pending Bookings
                        </p>

                        <h2 className="text-4xl font-bold mt-3">
                            {pendingBookings.length}
                        </h2>

                    </div>

                </div>


                {/* Bookings */}

                <div className="bg-[#0f172a] rounded-xl mt-8">

                    <h2 className="text-xl font-bold p-6 border-b border-slate-700">
                        Bookings
                    </h2>


                    {bookings.length === 0 ? (

                        <p className="p-6 text-slate-400">
                            No bookings yet.
                        </p>

                    ) : (

                        bookings.map((booking) => (

                            <div
                                key={booking._id}
                                className="p-5 border-b border-slate-700 flex justify-between"
                            >

                                <div>

                                    <p className="font-semibold">
                                        👤 {booking.userId?.name || 'Customer'}
                                    </p>

                                    <p className="text-slate-400">
                                        🚗 {booking.vehicleId?.brand}{' '}
                                        {booking.vehicleId?.model}
                                    </p>

                                    <p className="text-slate-400">
                                        🔧 {booking.serviceId?.serviceName || 'Service'}
                                    </p>

                                </div>


                                <div className="flex gap-6 items-center">

                                    <p>
                                        📅 {new Date(
                                            booking.date
                                        ).toLocaleDateString()}
                                    </p>

                                    <p>
                                        🕐 {booking.time}
                                    </p>

                                    <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400">
                                        {booking.status}
                                    </span>

                                </div>

                            </div>

                        ))

                    )}

                </div>

            </div>

        </div>
    );
};

export default DashBoard;