import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Bookings = () => {

    const [bookings, setBookings] = useState([]);
    const [serviceCenters, setServiceCenters] = useState([]);

    const getData = async () => {

        try {

            const bookingsResponse = await axios.get(
                'http://localhost:3000/booking'
            );

            const centersResponse = await axios.get(
                'http://localhost:3000/service-centers'
            );

            setBookings(bookingsResponse.data);
            setServiceCenters(centersResponse.data);

        } catch (error) {

            console.log(error);

        }

    };


    useEffect(() => {
        getData();
    }, []);


    // Get service center name
    const getCenterName = (id) => {

        const center = serviceCenters.find(
            (center) => center.userId === id
        );

        return center ? center.name : '-';

    };


    return (

        <div className="ml-64 min-h-screen bg-[#020617] text-white p-8">

            <h1 className="text-3xl font-bold mb-2">
                All Bookings
            </h1>

            <p className="text-slate-400 mb-8">
                View all customer bookings
            </p>


            <div className="bg-[#0f172a] rounded-xl overflow-hidden">

                <table className="w-full">

                    <thead className="bg-[#111c33]">

                        <tr>

                            <th className="text-left p-4">
                                Customer
                            </th>

                            <th className="text-left p-4">
                                Vehicle
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

                        {bookings.map((booking) => (

                            <tr
                                key={booking._id}
                                className="border-t border-slate-800"
                            >

                                {/* Customer */}

                                <td className="p-4">
                                    {booking.userId?.name || '-'}
                                </td>


                                {/* Vehicle */}

                                <td className="p-4">

                                    {booking.vehicleId?.brand || ''}
                                    {' '}
                                    {booking.vehicleId?.model || ''}

                                </td>


                                {/* Service */}

                                <td className="p-4">

                                    {booking.serviceId?.serviceName || '-'}

                                </td>


                                {/* Service Center */}

                                <td className="p-4">

                                    {getCenterName(
                                        booking.serviceCenterId
                                    )}

                                </td>


                                {/* Date */}

                                <td className="p-4">

                                    {booking.date
                                        ? new Date(
                                            booking.date
                                        ).toLocaleDateString()
                                        : '-'}

                                </td>


                                {/* Status */}

                                <td className="p-4">

                                    {booking.status}

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>


                {bookings.length === 0 && (

                    <p className="text-center text-slate-400 p-8">
                        No bookings found
                    </p>

                )}

            </div>

        </div>
    );
};

export default Bookings;