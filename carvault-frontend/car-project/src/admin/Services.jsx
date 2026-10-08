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

            console.log(error);

        }
    };


    useEffect(() => {

        getData();

    }, []);


    // Find service center name
    const getCenterName = (serviceCenterId) => {

        const center = serviceCenters.find(
            (center) =>
                center.userId === serviceCenterId ||
                center.userId?._id === serviceCenterId
        );

        return center ? center.name : 'Service Center';

    };


    // Handle input
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
            name: service.serviceName,
            price: service.price
        });

    };


    // Update service
    const handleUpdate = async (e) => {

        e.preventDefault();

        try {

            await axios.put(
                `http://localhost:3000/services/${editId}`,
                {
                    serviceName: formData.name,
                    price: Number(formData.price)
                }
            );

            alert('Service updated successfully');

            setEditId(null);

            setFormData({
                name: '',
                price: ''
            });

            getData();

        } catch (error) {

            console.log(error);

            alert('Failed to update service');

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

            await axios.delete(
                `http://localhost:3000/services/${id}`
            );

            alert('Service deleted successfully');

            getData();

        } catch (error) {

            console.log(error);

            alert('Failed to delete service');

        }

    };


    return (

        <div className="ml-64 min-h-screen bg-[#020617] text-white p-8">

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


                        <div>

                            <label className="block text-slate-300 mb-2">
                                Price
                            </label>

                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                required
                                className="w-full bg-[#020617] border border-slate-700 rounded-lg px-4 py-3"
                            />

                        </div>


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

            <div className="bg-[#0f172a] border border-slate-800 rounded-xl overflow-hidden">

                <table className="w-full">

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

                                {/* Service Name */}

                                <td className="p-4 font-medium">

                                    {service.serviceName}

                                </td>


                                {/* Service Center */}

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

                                    <span className="px-3 py-1 rounded-full text-sm bg-green-500/20 text-green-400">

                                        {service.status}

                                    </span>

                                </td>


                                {/* Actions */}

                                <td className="p-4">

                                    <div className="flex gap-2">

                                        <button
                                            onClick={() =>
                                                handleEdit(service)
                                            }
                                            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm"
                                        >
                                            Edit
                                        </button>

                                        <button
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


                {services.length === 0 && (

                    <div className="text-center py-10 text-slate-400">
                        No services found
                    </div>

                )}

            </div>

        </div>
    );
};

export default Services;