import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TimeSlots = () => {

    const [slots, setSlots] = useState([]);
    const [showForm, setShowForm] = useState(false);

    const [formData, setFormData] = useState({
        date: '',
        time: ''
    });

    const user = JSON.parse(localStorage.getItem('user'));

    // Get slots
    const getSlots = async () => {

        try {

            const response = await axios.get(
                'http://localhost:3000/time-slots'
            );

            const mySlots = response.data.filter(
                slot =>
                    slot.serviceCenterId === user.id ||
                    slot.serviceCenterId?._id === user.id
            );

            setSlots(mySlots);

        } catch (error) {

            console.log(error);

        }

    };

    useEffect(() => {

        getSlots();

    }, []);


    // Handle input
    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };


    // Add slot
    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await axios.post(
                'http://localhost:3000/time-slots',
                {
                    date: formData.date,
                    time: formData.time,
                    serviceCenterId: user.id
                }
            );

            setFormData({
                date: '',
                time: ''
            });

            setShowForm(false);

            getSlots();

        } catch (error) {

            console.log(error);

        }

    };


    // Delete slot
    const deleteSlot = async (id) => {

        try {

            await axios.delete(
                `http://localhost:3000/time-slots/${id}`
            );

            getSlots();

        } catch (error) {

            console.log(error);

        }

    };


    return (

        <div className="ml-64 min-h-screen bg-[#020617] text-white p-8">

            <div className="max-w-6xl mx-auto">

                {/* Heading */}

                <div className="flex justify-between items-center mb-8">

                    <h1 className="text-3xl font-bold">
                        Time Slots
                    </h1>

                    <button
                        onClick={() => setShowForm(true)}
                        className="btn btn-primary"
                    >
                        + Add Slot
                    </button>

                </div>


                {/* Time Slots */}

                <div className="bg-[#0f172a] rounded-xl">

                    <div className="grid grid-cols-4 p-5 font-semibold">

                        <p>Date</p>

                        <p>Time</p>

                        <p>Status</p>

                        <p>Action</p>

                    </div>


                    {slots.map((slot) => (

                        <div
                            key={slot._id}
                            className="grid grid-cols-4 p-5 border-t border-slate-700"
                        >

                            <p>
                                {new Date(
                                    slot.date
                                ).toLocaleDateString()}
                            </p>


                            <p>
                                {slot.time}
                            </p>


                            <p>

                                {slot.isBooked
                                    ? 'Booked'
                                    : 'Available'}

                            </p>


                            {/* Delete */}

                            <div>

                                <button
                                    onClick={() =>
                                        deleteSlot(slot._id)
                                    }
                                    className="btn btn-sm btn-error"
                                >
                                    Delete
                                </button>

                            </div>

                        </div>

                    ))}


                    {slots.length === 0 && (

                        <p className="p-5 text-slate-400">
                            No slots added yet.
                        </p>

                    )}

                </div>

            </div>


            {/* Add Slot Form */}

            {showForm && (

                <div className="fixed inset-0 bg-black/60 flex items-center justify-center">

                    <div className="bg-[#0f172a] p-6 rounded-xl w-96">

                        <h2 className="text-xl font-bold mb-5">
                            Add Time Slot
                        </h2>


                        <form onSubmit={handleSubmit}>

                            <input
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                className="input input-bordered w-full mb-4"
                                required
                            />


                            <input
                                type="time"
                                name="time"
                                value={formData.time}
                                onChange={handleChange}
                                className="input input-bordered w-full mb-5"
                                required
                            />


                            <div className="flex justify-end gap-3">

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowForm(false)
                                    }
                                    className="btn btn-outline"
                                >
                                    Cancel
                                </button>


                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    Add
                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            )}

        </div>

    );
};

export default TimeSlots;