
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Services = () => {

    const [services, setServices] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editId, setEditId] = useState(null);

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        duration: ''
    });

    const user = JSON.parse(localStorage.getItem('user'));

    // Get services
    const getServices = async () => {
        try {
            const response = await axios.get(
                'http://localhost:3000/services'
            );

            const myServices = response.data.filter((service) => {
                const centerId =
                    service.serviceCenterId?._id ||
                    service.serviceCenterId;

                return String(centerId) === String(user?.id || user?._id);
            });

            setServices(myServices);

        } catch (error) {
            console.log('Get services error:', error);
        }
    };

    useEffect(() => {
        getServices();
    }, []);

    // Handle input changes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Open add form
    const addService = () => {
        setEditId(null);

        setFormData({
            name: '',
            description: '',
            price: '',
            duration: ''
        });

        setShowForm(true);
    };

    // Open edit form
    const editService = (service) => {
        setEditId(service._id);

        setFormData({
            name: service.serviceName,
            description: service.description,
            price: service.price,
            duration: service.duration
        });

        setShowForm(true);
    };

    // Add or update service
    const handleSubmit = async (e) => {
        e.preventDefault();

        const centerId = user?.id || user?._id;

        if (!centerId) {
            alert('Please log in again.');
            return;
        }

        const data = {
            serviceName: formData.name,
            description: formData.description,
            price: Number(formData.price),
            duration: formData.duration,
            serviceCenterId: centerId,
            status: 'active'
        };

        try {
            if (editId) {
                await axios.put(
                    `http://localhost:3000/services/${editId}`,
                    data
                );

                alert('Service updated successfully');

            } else {
                await axios.post(
                    'http://localhost:3000/services',
                    data
                );

                alert('Service added successfully');
            }

            setShowForm(false);
            setEditId(null);
            getServices();

        } catch (error) {
            console.log('Save error:', error.response?.data || error.message);
            alert('Failed to save service');
        }
    };

    // Delete service
    const deleteService = async (id) => {
        const confirmDelete = window.confirm(
            'Are you sure you want to delete this service?'
        );

        if (!confirmDelete) {
            return;
        }

        try {
            await axios.delete(
                `http://localhost:3000/services/${id}`
            );

            // Remove service from the page immediately
            setServices((previousServices) =>
                previousServices.filter(
                    (service) => service._id !== id
                )
            );

            alert('Service deleted successfully');

        } catch (error) {
            console.log(
                'Delete error:',
                error.response?.data || error.message
            );

            alert(
                error.response?.data?.message ||
                'Failed to delete service. Check the backend route.'
            );
        }
    };

    return (
        <div className="ml-64 min-h-screen bg-[#020617] text-white p-8">

            <div className="max-w-6xl mx-auto">

                {/* Heading */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold">
                            My Services
                        </h1>

                        <p className="text-slate-400 mt-2">
                            Manage your service details
                        </p>
                    </div>

                    <button
                        onClick={addService}
                        className="btn btn-primary"
                    >
                        + Add Service
                    </button>
                </div>

                {/* Service list */}
                {services.length === 0 ? (
                    <div className="bg-[#0f172a] rounded-xl p-8 text-center">
                        <p className="text-slate-400">
                            No services available.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {services.map((service) => (
                            <div
                                key={service._id}
                                className="bg-[#0f172a] border border-slate-700 rounded-xl p-6"
                            >
                                <div className="flex justify-between items-start">
                                    <h2 className="text-xl font-bold">
                                        {service.serviceName}
                                    </h2>

                                    <span className="text-green-400">
                                        {service.status}
                                    </span>
                                </div>

                                <p className="text-slate-400 mt-3">
                                    {service.description}
                                </p>

                                <p className="mt-4">
                                    <span className="text-slate-400">
                                        Price:
                                    </span>{' '}
                                    ₹{service.price}
                                </p>

                                <p className="mt-2">
                                    <span className="text-slate-400">
                                        Duration:
                                    </span>{' '}
                                    {service.duration}
                                </p>

                                <div className="flex justify-end gap-3 mt-6">
                                    <button
                                        onClick={() => editService(service)}
                                        className="btn btn-sm btn-primary"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() => deleteService(service._id)}
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

            {/* Add/Edit form */}
            {showForm && (
                <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
                    <div className="bg-[#0f172a] border border-slate-700 p-6 rounded-xl w-full max-w-md">

                        <h2 className="text-2xl font-bold mb-5">
                            {editId ? 'Edit Service' : 'Add Service'}
                        </h2>

                        <form onSubmit={handleSubmit}>

                            <input
                                type="text"
                                name="name"
                                placeholder="Service Name"
                                value={formData.name}
                                onChange={handleChange}
                                className="input input-bordered w-full mb-3"
                                required
                            />

                            <textarea
                                name="description"
                                placeholder="Description"
                                value={formData.description}
                                onChange={handleChange}
                                className="textarea textarea-bordered w-full mb-3"
                                required
                            />

                            <input
                                type="number"
                                name="price"
                                placeholder="Price"
                                min="0"
                                value={formData.price}
                                onChange={handleChange}
                                className="input input-bordered w-full mb-3"
                                required
                            />

                            <select
                                name="duration"
                                value={formData.duration}
                                onChange={handleChange}
                                className="select select-bordered w-full mb-5"
                                required
                            >
                                <option value="">Select Duration</option>
                                <option value="1 hour">1 hour</option>
                                <option value="2 hour">2 hours</option>
                                <option value="3 hour">3 hours</option>
                                <option value="4 hour">4 hours</option>
                                <option value="5 hour">5 hours</option>
                                <option value="6 hour">6 hours</option>
                                <option value="7 hour">7 hours</option>
                                <option value="8 hour">8 hours</option>
                            </select>

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
                                    {editId ? 'Update' : 'Add Service'}
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            )}

        </div>
    );
};

export default Services;