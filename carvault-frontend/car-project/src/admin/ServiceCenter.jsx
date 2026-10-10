
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ServiceCenter = () => {
    const [centers, setCenters] = useState([]);
    const [reviews, setReviews] = useState([]);
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

    // Get service centers and reviews
    const getCenters = async () => {
        try {
            const centerRes = await axios.get(
                'http://localhost:3000/service-centers'
            );

            const reviewRes = await axios.get(
                'http://localhost:3000/review'
            );

            setCenters(centerRes.data);
            setReviews(reviewRes.data);
        } catch (error) {
            console.error('Error loading service centers:', error);
        }
    };

    useEffect(() => {
        getCenters();
    }, []);

    // Calculate average customer rating
    const getRating = (centerId) => {
        const centerReviews = reviews.filter((review) => {
            const reviewCenterId =
                typeof review.serviceCenterId === 'object'
                    ? review.serviceCenterId?._id
                    : review.serviceCenterId;

            return String(reviewCenterId) === String(centerId);
        });

        if (centerReviews.length === 0) {
            return '0.0';
        }

        const total = centerReviews.reduce(
            (sum, review) => sum + Number(review.rating || 0),
            0
        );

        return (total / centerReviews.length).toFixed(1);
    };

    // Handle input changes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Reset form
    const resetForm = () => {
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

        setEditId(null);
        setShowForm(false);
    };

    // Open add form
    const addCenter = () => {
        resetForm();
        setShowForm(true);
    };

    // Open edit form
    const editCenter = (center) => {
        setEditId(center._id);

        setFormData({
            name: center.name || '',
            email: center.email || '',
            password: '',
            phone: center.phone || '',
            address: center.address || '',
            city: center.city || '',
            state: center.state || '',
            pincode: center.pincode || ''
        });

        setShowForm(true);
    };

    // Create or update service center
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (editId) {
                // Update service center
                await axios.put(
                    `http://localhost:3000/service-centers/${editId}`,
                    {
                        name: formData.name.trim(),
                        email: formData.email.trim(),
                        phone: formData.phone.trim(),
                        address: formData.address.trim(),
                        city: formData.city.trim(),
                        state: formData.state.trim(),
                        pincode: formData.pincode.trim()
                    }
                );

                alert('Service center updated successfully');
            } else {
                // Check phone number
                if (!formData.phone.trim()) {
                    alert('Please enter the phone number');
                    return;
                }

                // Create login account
                const userRes = await axios.post(
                    'http://localhost:3000/users/service-center/register',
                    {
                        name: formData.name.trim(),
                        email: formData.email.trim(),
                        password: formData.password,
                        phone: formData.phone.trim()
                    }
                );

                const userId =
                    userRes.data.user?.id ||
                    userRes.data.user?._id;

                if (!userId) {
                    throw new Error(
                        'User ID was not returned by the registration API'
                    );
                }

                // Create service center profile
                await axios.post(
                    'http://localhost:3000/service-centers',
                    {
                        name: formData.name.trim(),
                        email: formData.email.trim(),
                        phone: formData.phone.trim(),
                        address: formData.address.trim(),
                        city: formData.city.trim(),
                        state: formData.state.trim(),
                        pincode: formData.pincode.trim(),
                        rating: 0,
                        userId
                    }
                );

                alert('Service center created successfully');
            }

            resetForm();
            await getCenters();
        } catch (error) {
            console.error(
                'Service center error:',
                error.response?.data || error
            );

            alert(
                error.response?.data?.message ||
                error.message ||
                'Operation failed'
            );
        }
    };

    // Delete service center
    const deleteCenter = async (id) => {
        if (!window.confirm(
            'Are you sure you want to delete this service center?'
        )) {
            return;
        }

        try {
            await axios.delete(
                `http://localhost:3000/service-centers/${id}`
            );

            setCenters((previousCenters) =>
                previousCenters.filter(
                    (center) => center._id !== id
                )
            );

            if (viewCenter?._id === id) {
                setViewCenter(null);
            }

            alert('Service center deleted successfully');
        } catch (error) {
            console.error(
                'Delete error:',
                error.response?.data || error
            );

            alert(
                error.response?.data?.message ||
                'Failed to delete service center'
            );
        }
    };

    // Admin confirms profile update
    const confirmProfileUpdate = async () => {
        if (!viewCenter) return;

        try {
            await axios.put(
                `http://localhost:3000/service-centers/${viewCenter._id}/confirm-update`
            );

            alert('Profile update confirmed');

            setViewCenter(null);
            await getCenters();
        } catch (error) {
            console.error(
                'Confirmation error:',
                error.response?.data || error
            );

            alert(
                error.response?.data?.message ||
                'Failed to confirm profile update'
            );
        }
    };

    return (
        <div className="ml-64 min-h-screen bg-[#020617] text-white p-8">
            <div className="max-w-6xl mx-auto">

                {/* Header */}
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

                {/* Service center cards */}
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
                                {/* Name and update warning symbol */}
                                <h2 className="text-xl font-bold flex items-center gap-2">
                                    {center.name}

                                    {center.profileUpdatedAt && (
                                        <span
                                            className="text-yellow-400"
                                            title="Profile updated — click View to check"
                                            aria-label="Profile updated"
                                        >
                                            ⚠️
                                        </span>
                                    )}
                                </h2>

                                <p className="text-slate-400 mt-2">
                                    {center.city}
                                </p>

                                <p className="text-yellow-400 mt-2">
                                    ⭐ {getRating(center._id)}
                                </p>

                                <div className="flex gap-3 mt-5">
                                    <button
                                        onClick={() => setViewCenter(center)}
                                        className="btn btn-sm btn-outline"
                                    >
                                        View
                                    </button>

                                    <button
                                        onClick={() => editCenter(center)}
                                        className="btn btn-sm btn-primary"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() => deleteCenter(center._id)}
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

            {/* View popup */}
            {viewCenter && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
                    <div className="bg-[#0f172a] p-6 rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
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

                        <p className="text-yellow-400 mt-3">
                            Rating: ⭐ {getRating(viewCenter._id)}
                        </p>

                        {/* Update warning inside View popup */}
                        {viewCenter.profileUpdatedAt && (
                            <div className="mt-4 p-4 rounded-lg bg-yellow-500/10">
                                <p className="text-yellow-400 font-semibold">
                                    ⚠️ Profile Updated
                                </p>

                                <p className="text-slate-400 text-sm mt-2">
                                    Updated at:{' '}
                                    {new Date(
                                        viewCenter.profileUpdatedAt
                                    ).toLocaleString()}
                                </p>

                                <button
                                    onClick={confirmProfileUpdate}
                                    className="btn btn-success btn-sm mt-4"
                                >
                                    Confirm Update
                                </button>
                            </div>
                        )}

                        <button
                            onClick={() => setViewCenter(null)}
                            className="btn btn-primary w-full mt-6"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            {/* Add / Edit popup */}
            {showForm && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
                    <div className="bg-[#0f172a] p-6 rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
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
                                type="tel"
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
                                    onClick={resetForm}
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

