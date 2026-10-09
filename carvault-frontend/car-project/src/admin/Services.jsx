
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Services = () => {
    const [services, setServices] = useState([]);
    const [serviceCenters, setServiceCenters] = useState([]);
    const [editId, setEditId] = useState(null);

    const [formData, setFormData] = useState({
        name: '',
        price: ''
    });

    // Get services and service centers
    const getData = async () => {
        try {
            const serviceResponse = await axios.get(
                'http://localhost:3000/services'
            );

            const centerResponse = await axios.get(
                'http://localhost:3000/service-centers'
            );

            setServices(serviceResponse.data);
            setServiceCenters(centerResponse.data);
        } catch (error) {
            console.log(
                error.response?.data || error.message
            );

            alert('Failed to load services or service centers');
        }
    };

    useEffect(() => {
        getData();
    }, []);

    // Find service center name
    const getCenterName = (serviceCenterId) => {
        const id =
            typeof serviceCenterId === 'object'
                ? serviceCenterId?._id
                : serviceCenterId;

        const center = serviceCenters.find(
            (item) =>
                item.userId === id ||
                item.userId?._id === id ||
                item._id === id
        );

        return center?.name || center?.centerName || 'Service Center';
    };

    // Handle input changes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Edit service
    const handleEdit = (service) => {
        setEditId(service._id);

        setFormData({
            name: service.serviceName || '',
            price: service.price ?? ''
        });
    };

    // Update service
    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.put(
                `http://localhost:3000/services/${editId}`,
                {
                    serviceName: formData.name,
                    price: Number(formData.price)
                }
            );

            alert(
                response.data.message ||
                'Service updated successfully'
            );

            setEditId(null);

            setFormData({
                name: '',
                price: ''
            });

            await getData();
        } catch (error) {
            console.log(
                error.response?.data || error.message
            );

            alert(
                error.response?.data?.message ||
                'Failed to update service'
            );
        }
    };

    // Delete service
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            'Are you sure you want to delete this service?'
        );

        if (!confirmDelete) {
            return;
        }

        try {
            const response = await axios.delete(
                `http://localhost:3000/services/${id}`
            );

            // Remove service immediately from the page
            setServices((previous) =>
                previous.filter(
                    (service) => service._id !== id
                )
            );

            // Close edit form if this service was being edited
            if (editId === id) {
                setEditId(null);

                setFormData({
                    name: '',
                    price: ''
                });
            }

            alert(
                response.data.message ||
                'Service deleted successfully'
            );

            // Reload data from backend
            await getData();
        } catch (error) {
            console.log(
                'Delete error:',
                error.response?.data || error.message
            );

            alert(
                error.response?.data?.message ||
                'Failed to delete service'
            );
        }
    };

    return (
        <div className="ml-64 min-h-screen bg-[#020617] text-white p-8">
            <div className="max-w-7xl mx-auto">

                {/* Page heading */}
                <h1 className="text-3xl font-bold mb-2">
                    All Services
                </h1>

                <p className="text-slate-400 mb-8">
                    View and manage services provided by service centers
                </p>

                {/* Edit Form */}
                {editId && (
                    <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-6 mb-8">

                        <h2 className="text-xl font-bold mb-5">
                            Edit Service
                        </h2>

                        <form
                            onSubmit={handleUpdate}
                            className="grid grid-cols-1 md:grid-cols-2 gap-5"
                        >
                            {/* Service name */}
                            <div>
                                <label className="block text-slate-300 mb-2">
                                    Service Name
                                </label>

                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-[#020617] border border-slate-700 rounded-lg px-4 py-3"
                                />
                            </div>

                            {/* Price */}
                            <div>
                                <label className="block text-slate-300 mb-2">
                                    Price
                                </label>

                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    min="0"
                                    required
                                    className="w-full bg-[#020617] border border-slate-700 rounded-lg px-4 py-3"
                                />
                            </div>

                            {/* Buttons */}
                            <div className="md:col-span-2 flex gap-3">
                                <button
                                    type="submit"
                                    className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg"
                                >
                                    Update Service
                                </button>

                                <button
                                    type="button"
                                    onClick={() => {
                                        setEditId(null);

                                        setFormData({
                                            name: '',
                                            price: ''
                                        });
                                    }}
                                    className="bg-slate-700 hover:bg-slate-600 px-5 py-2 rounded-lg"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Services Table */}
                <div className="bg-[#0f172a] border border-slate-800 rounded-xl overflow-x-auto">

                    <table className="w-full min-w-[800px]">
                        <thead className="bg-[#111c33]">
                            <tr>
                                <th className="text-left p-4">
                                    Service
                                </th>

                                <th className="text-left p-4">
                                    Service Center
                                </th>

                                <th className="text-left p-4">
                                    Price
                                </th>

                                <th className="text-left p-4">
                                    Status
                                </th>

                                <th className="text-left p-4">
                                    Actions
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {services.map((service) => (
                                <tr
                                    key={service._id}
                                    className="border-t border-slate-800"
                                >
                                    {/* Service name */}
                                    <td className="p-4 font-medium">
                                        {service.serviceName}
                                    </td>

                                    {/* Service center */}
                                    <td className="p-4 text-slate-300">
                                        {getCenterName(
                                            service.serviceCenterId
                                        )}
                                    </td>

                                    {/* Price */}
                                    <td className="p-4">
                                        ₹{service.price}
                                    </td>

                                    {/* Status */}
                                    <td className="p-4">
                                        <span
                                            className={
                                                service.status === 'inactive'
                                                    ? 'px-3 py-1 rounded-full text-sm bg-red-500/20 text-red-400'
                                                    : 'px-3 py-1 rounded-full text-sm bg-green-500/20 text-green-400'
                                            }
                                        >
                                            {service.status || 'Active'}
                                        </span>
                                    </td>

                                    {/* Actions */}
                                    <td className="p-4">
                                        <div className="flex gap-2">

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleEdit(service)
                                                }
                                                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm"
                                            >
                                                Edit
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleDelete(service._id)
                                                }
                                                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-sm"
                                            >
                                                Delete
                                            </button>

                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Empty list */}
                    {services.length === 0 && (
                        <div className="text-center py-10 text-slate-400">
                            No services found
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Services;

