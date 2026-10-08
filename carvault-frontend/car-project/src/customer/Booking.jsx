import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const Booking = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem('user'));
    const vehicle = JSON.parse(localStorage.getItem('selectedVehicle'));

    const [slots, setSlots] = useState([]);
    const [bookings, setBookings] = useState([]);

    const params = new URLSearchParams(location.search);

    const serviceId = params.get('serviceId');
    const serviceCenterId = params.get('serviceCenterId');


    // Get bookings
    useEffect(() => {

        if (location.pathname === '/customer/bookings') {

            axios.get('http://localhost:3000/booking')
                .then(response => {

                    const data = response.data.filter(
                        booking =>
                            booking.userId === user.id ||
                            booking.userId?._id === user.id
                    );

                    setBookings(data);

                })
                .catch(error => console.log(error));

        }

    }, [location.pathname]);


    // Get available slots
    useEffect(() => {

        if (location.pathname === '/customer/bookings/new') {

            axios.get('http://localhost:3000/time-slots')
                .then(response => {

                    const data = response.data.filter(
                        slot =>
                            (
                                slot.serviceCenterId === serviceCenterId ||
                                slot.serviceCenterId?._id === serviceCenterId
                            ) &&
                            !slot.isBooked
                    );

                    setSlots(data);

                })
                .catch(error => console.log(error));

        }

    }, [serviceCenterId, location.pathname]);


    // Book
    const bookService = async (slot) => {

        if (!vehicle) {

            alert('Select a vehicle first');
            navigate('/customer/vehicles');

            return;
        }

        try {

            await axios.post(
                'http://localhost:3000/booking',
                {
                    userId: user.id,
                    vehicleId: vehicle._id,
                    serviceId: serviceId,
                    serviceCenterId: serviceCenterId,
                    timeSlotId: slot._id,
                    date: slot.date,
                    time: slot.time
                }
            );

            await axios.put(
                `http://localhost:3000/time-slots/${slot._id}`,
                {
                    isBooked: true
                }
            );

            alert('Booking successful');

            localStorage.removeItem('selectedVehicle');

            navigate('/customer/bookings');

        } catch (error) {

            console.log(error);
            alert('Booking failed');

        }

    };


    // My Bookings
    if (location.pathname === '/customer/bookings') {

        return (

            <div className="p-6 text-white">

                <h1 className="text-3xl font-bold mb-6">
                    MY BOOKINGS
                </h1>

                {bookings.length === 0 ? (

                    <p>No bookings found.</p>

                ) : (

                    bookings.map(booking => (

                        <div
                            key={booking._id}
                            className="bg-[#0f172a] p-5 rounded-xl mb-4"
                        >

                            <p>
                                📅 {new Date(booking.date)
                                    .toLocaleDateString()}
                            </p>

                            <p>
                                🕐 {booking.time}
                            </p>

                            <p>
                                🔧 {booking.serviceId?.serviceName}
                            </p>

                            <h3 className="font-bold mt-4">
                                Status: {booking.status}
                            </h3>

                        </div>

                    ))

                )}

            </div>

        );
    }


    // New Booking
    return (

        <div className="p-6 text-white">

            <h1 className="text-3xl font-bold">
                BOOK SERVICE
            </h1>

            {vehicle && (

                <div className="bg-[#0f172a] p-5 mt-5 rounded-xl">

                    <h2 className="font-bold">
                        Selected Vehicle
                    </h2>

                    <p>
                        🚗 {vehicle.brand} {vehicle.model}
                    </p>

                    <p>
                        {vehicle.registrationNumber}
                    </p>

                </div>

            )}

            <h2 className="text-2xl font-bold mt-8 mb-5">
                Available Time Slots
            </h2>

            {slots.length === 0 ? (

                <p>No available time slots.</p>

            ) : (

                slots.map(slot => (

                    <div
                        key={slot._id}
                        className="bg-[#0f172a] p-5 rounded-xl mb-4"
                    >

                        <p>
                            📅 {new Date(slot.date)
                                .toLocaleDateString()}
                        </p>

                        <p>
                            🕐 {slot.time}
                        </p>

                        <button
                            onClick={() => bookService(slot)}
                            className="btn btn-primary mt-3"
                        >
                            Book
                        </button>

                    </div>

                ))

            )}

        </div>

    );

};

export default Booking;