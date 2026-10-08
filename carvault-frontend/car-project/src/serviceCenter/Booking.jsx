import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Booking = () => {

    const [bookings, setBookings] = useState([]);

    const user = JSON.parse(localStorage.getItem('user'));

    // Get bookings
    const getBookings = async () => {
        try {

            const response = await axios.get(
                'http://localhost:3000/booking'
            );

            const myBookings = response.data.filter(
                booking =>
                    booking.serviceCenterId === user.id ||
                    booking.serviceCenterId?._id === user.id
            );

            setBookings(myBookings);

        } catch (error) {
            console.log(error);
        }
    };


    useEffect(() => {
        getBookings();
    }, []);


    // Change status
    const changeStatus = async (id, status) => {

        try {

            await axios.put(
                `http://localhost:3000/booking/${id}`,
                {
                    status: status
                }
            );

            alert(`Booking ${status}`);

            getBookings();

        } catch (error) {

            console.log(error);
            alert('Failed to update booking');

        }
    };


    // Delete booking
    const deleteBooking = async (id) => {

        try {

            await axios.delete(
                `http://localhost:3000/booking/${id}`
            );

            alert('Booking deleted');

            getBookings();

        } catch (error) {

            console.log(error);
            alert('Failed to delete booking');

        }
    };


    return (

        <div className="ml-64 min-h-screen bg-[#020617] text-white p-8">

            <div className="max-w-5xl mx-auto">

                <div className="text-center mb-8">

                    <h1 className="text-3xl font-bold">
                        CUSTOMER BOOKINGS
                    </h1>

                    <p className="text-slate-400 mt-2">
                        Manage customer service bookings
                    </p>

                </div>


                {bookings.length === 0 ? (

                    <div className="bg-[#0f172a] p-8 rounded-xl text-center">

                        <p className="text-slate-400">
                            No customer bookings yet.
                        </p>

                    </div>

                ) : (

                    <div className="space-y-5">

                        {bookings.map((booking) => (

                            <div
                                key={booking._id}
                                className="bg-[#0f172a] border border-blue-900/30 rounded-xl p-6"
                            >

                                {/* Customer */}

                                <h2 className="text-xl font-bold">
                                    👤 {booking.userId?.name || 'Customer'}
                                </h2>

                                <p className="text-slate-400 mt-1">
                                    {booking.userId?.email || ''}
                                </p>

                                <p className="text-slate-400 mt-1">
                                    Phone: {booking.userId?.phone || 'Not available'}
                                </p>


                                {/* Vehicle */}

                                <p className="text-slate-300 mt-4">
                                    🚗 {booking.vehicleId?.brand || ''}
                                    {' '}
                                    {booking.vehicleId?.model || ''}
                                    {' | '}
                                    {booking.vehicleId?.registrationNumber || ''}
                                </p>


                                {/* Service */}

                                <p className="text-slate-300 mt-5">
                                    🔧 {booking.serviceId?.serviceName || 'Service'}
                                </p>


                                {/* Date and Time */}

                                <div className="flex gap-8 mt-3 text-slate-300">

                                    <p>
                                        📅 {new Date(
                                            booking.date
                                        ).toLocaleDateString()}
                                    </p>

                                    <p>
                                        🕐 {booking.time}
                                    </p>

                                </div>


                                {/* Status */}

                                <p className="mt-5">
                                    <b>Status:</b> {booking.status}
                                </p>


                                {/* Buttons */}

                                <div className="mt-6">

                                    {/* Pending */}

                                    {booking.status === 'Pending' && (

                                        <div className="flex gap-3">

                                            <button
                                                onClick={() =>
                                                    changeStatus(
                                                        booking._id,
                                                        'Confirmed'
                                                    )
                                                }
                                                className="btn btn-primary"
                                            >
                                                Confirm
                                            </button>

                                            <button
                                                onClick={() =>
                                                    changeStatus(
                                                        booking._id,
                                                        'Cancelled'
                                                    )
                                                }
                                                className="btn btn-error"
                                            >
                                                Reject
                                            </button>

                                        </div>
                                    )}


                                    {/* Confirmed */}

                                    {booking.status === 'Confirmed' && (

                                        <button
                                            onClick={() =>
                                                changeStatus(
                                                    booking._id,
                                                    'Vehicle Received'
                                                )
                                            }
                                            className="btn btn-primary"
                                        >
                                            Vehicle Received
                                        </button>

                                    )}


                                    {/* Vehicle Received */}

                                    {booking.status === 'Vehicle Received' && (

                                        <button
                                            onClick={() =>
                                                changeStatus(
                                                    booking._id,
                                                    'Service In Progress'
                                                )
                                            }
                                            className="btn btn-primary"
                                        >
                                            Start Service
                                        </button>

                                    )}


                                    {/* Service In Progress */}

                                    {booking.status === 'Service In Progress' && (

                                        <button
                                            onClick={() =>
                                                changeStatus(
                                                    booking._id,
                                                    'Completed'
                                                )
                                            }
                                            className="btn btn-success"
                                        >
                                            Complete Service
                                        </button>

                                    )}


                                    {/* Delete */}

                                    {(booking.status === 'Completed' ||
                                        booking.status === 'Cancelled') && (

                                        <button
                                            onClick={() =>
                                                deleteBooking(booking._id)
                                            }
                                            className="btn btn-error mt-4"
                                        >
                                            Delete
                                        </button>

                                    )}

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </div>
    );
};

export default Booking;