import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ServiceCenter = () => {

    const [centers, setCenters] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editId, setEditId] = useState(null);
    const [viewCenter, setViewCenter] = useState(null);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        pincode: ''
    });

    // Get centers
    const getCenters = async () => {
        try {
            const response = await axios.get(
                'http://localhost:3000/service-centers'
            );

            setCenters(response.data);

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getCenters();
    }, []);

    // Input change
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Add
    const addCenter = () => {

        setEditId(null);

        setFormData({
            name: '',
            email: '',
            password: '',
            phone: '',
            address: '',
            city: '',
            state: '',
            pincode: ''
        });

        setShowForm(true);
    };

    // Edit
    const editCenter = (center) => {

        setEditId(center._id);

        setFormData({
            name: center.name,
            email: center.email,
            password: '',
            phone: center.phone,
            address: center.address,
            city: center.city,
            state: center.state,
            pincode: center.pincode
        });

        setShowForm(true);
    };

    // Save
    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            if (editId) {

                await axios.put(
                    `http://localhost:3000/service-centers/${editId}`,
                    formData
                );

                alert('Service center updated');

            } else {

                const user = await axios.post(
                    'http://localhost:3000/users/service-center/register',
                    {
                        name: formData.name,
                        email: formData.email,
                        password: formData.password
                    }
                );

                await axios.post(
                    'http://localhost:3000/service-centers',
                    {
                        name: formData.name,
                        email: formData.email,
                        phone: formData.phone,
                        address: formData.address,
                        city: formData.city,
                        state: formData.state,
                        pincode: formData.pincode,
                        rating: 0,
                        userId: user.data.user.id
                    }
                );

                alert('Service center created');
            }

            setShowForm(false);
            setEditId(null);
            getCenters();

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message ||
                'Operation failed'
            );
        }
    };

    // Delete
    const deleteCenter = async (id) => {

        if (!window.confirm('Delete this service center?')) {
            return;
        }

        try {

            await axios.delete(
                `http://localhost:3000/service-centers/${id}`
            );

            alert('Service center deleted');
            getCenters();

        } catch (error) {

            console.log(error);
            alert('Delete failed');
        }
    };

    return (

        <div className="ml-64 min-h-screen bg-[#020617] text-white p-8">

            <div className="max-w-6xl mx-auto">

                {/* Heading */}

                <div className="flex justify-between mb-8">

                    <div>

                        <h1 className="text-3xl font-bold">
                            Service Centers
                        </h1>

                        <p className="text-slate-400 mt-2">
                            Manage registered service centers
                        </p>

                    </div>

                    <button
                        onClick={addCenter}
                        className="btn btn-primary"
                    >
                        + Add Center
                    </button>

                </div>


                {/* Centers */}

                {centers.length === 0 ? (

                    <div className="bg-[#0f172a] p-8 rounded-xl text-center">
                        No service centers found.
                    </div>

                ) : (

                    <div className="grid md:grid-cols-2 gap-6">

                        {centers.map((center) => (

                            <div
                                key={center._id}
                                className="bg-[#0f172a] p-6 rounded-xl"
                            >

                                <h2 className="text-xl font-bold">
                                    {center.name}
                                </h2>

                                <p className="text-slate-400 mt-2">
                                    {center.city}
                                </p>

                                <p className="text-yellow-400 mt-2">
                                    ⭐ {center.rating || '0.0'}
                                </p>


                                {/* Profile Updated */}

                                {center.profileUpdatedAt && (

                                    <p className="text-yellow-400 mt-3">
                                        ⚠️ Profile Updated
                                        <br />

                                        <span className="text-slate-400 text-sm">
                                            {new Date(
                                                center.profileUpdatedAt
                                            ).toLocaleString()}
                                        </span>
                                    </p>

                                )}


                                {/* Buttons */}

                                <div className="flex gap-3 mt-5">

                                    <button
                                        onClick={() =>
                                            setViewCenter(center)
                                        }
                                        className="btn btn-sm btn-outline"
                                    >
                                        View
                                    </button>

                                    <button
                                        onClick={() =>
                                            editCenter(center)
                                        }
                                        className="btn btn-sm btn-primary"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() =>
                                            deleteCenter(center._id)
                                        }
                                        className="btn btn-sm btn-error"
                                    >
                                        Delete
                                    </button>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>


            {/* View Popup */}

            {viewCenter && (

                <div className="fixed inset-0 bg-black/60 flex items-center justify-center">

                    <div className="bg-[#0f172a] p-6 rounded-xl w-full max-w-lg">

                        <h2 className="text-2xl font-bold mb-5">
                            Service Center Details
                        </h2>

                        <p>Name: {viewCenter.name}</p>
                        <p>Email: {viewCenter.email}</p>
                        <p>Phone: {viewCenter.phone}</p>
                        <p>Address: {viewCenter.address}</p>
                        <p>City: {viewCenter.city}</p>
                        <p>State: {viewCenter.state}</p>
                        <p>Pincode: {viewCenter.pincode}</p>
                        <p>
                            Rating: ⭐ {viewCenter.rating || '0.0'}
                        </p>

                        <button
                            onClick={() => setViewCenter(null)}
                            className="btn btn-primary w-full mt-6"
                        >
                            Close
                        </button>

                    </div>

                </div>

            )}


            {/* Add / Edit Popup */}

            {showForm && (

                <div className="fixed inset-0 bg-black/60 flex items-center justify-center">

                    <div className="bg-[#0f172a] p-6 rounded-xl w-full max-w-lg">

                        <h2 className="text-2xl font-bold mb-5">
                            {editId
                                ? 'Edit Service Center'
                                : 'Add Service Center'}
                        </h2>

                        <form onSubmit={handleSubmit}>

                            <input
                                name="name"
                                placeholder="Name"
                                value={formData.name}
                                onChange={handleChange}
                                className="input input-bordered w-full mb-3 bg-[#020617]"
                                required
                            />

                            <input
                                name="email"
                                type="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                className="input input-bordered w-full mb-3 bg-[#020617]"
                                required
                            />

                            {!editId && (

                                <input
                                    name="password"
                                    type="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="input input-bordered w-full mb-3 bg-[#020617]"
                                    required
                                />

                            )}

                            <input
                                name="phone"
                                placeholder="Phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="input input-bordered w-full mb-3 bg-[#020617]"
                                required
                            />

                            <input
                                name="address"
                                placeholder="Address"
                                value={formData.address}
                                onChange={handleChange}
                                className="input input-bordered w-full mb-3 bg-[#020617]"
                                required
                            />

                            <input
                                name="city"
                                placeholder="City"
                                value={formData.city}
                                onChange={handleChange}
                                className="input input-bordered w-full mb-3 bg-[#020617]"
                                required
                            />

                            <input
                                name="state"
                                placeholder="State"
                                value={formData.state}
                                onChange={handleChange}
                                className="input input-bordered w-full mb-3 bg-[#020617]"
                                required
                            />

                            <input
                                name="pincode"
                                placeholder="Pincode"
                                value={formData.pincode}
                                onChange={handleChange}
                                className="input input-bordered w-full mb-5 bg-[#020617]"
                                required
                            />

                            <div className="flex justify-end gap-3">

                                <button
                                    type="button"
                                    onClick={() => setShowForm(false)}
                                    className="btn btn-outline"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    {editId ? 'Update' : 'Create'}
                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            )}

        </div>
    );
};

export default ServiceCenter;