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

    const getServices = async () => {
        try {
            const response = await axios.get(
                'http://localhost:3000/services'
            );

            const myServices = response.data.filter(
                service =>
                    service.serviceCenterId === user.id ||
                    service.serviceCenterId?._id === user.id
            );

            setServices(myServices);

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getServices();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            serviceName: formData.name,
            description: formData.description,
            price: Number(formData.price),
            duration: formData.duration,
            serviceCenterId: user.id,
            status: 'active'
        };

        try {

            if (editId) {
                await axios.put(
                    `http://localhost:3000/services/${editId}`,
                    data
                );
            } else {
                await axios.post(
                    'http://localhost:3000/services',
                    data
                );
            }

            setShowForm(false);
            getServices();

        } catch (error) {
            console.log(error.response?.data);
        }
    };

    const deleteService = async (id) => {

        try {
            await axios.delete(
                `http://localhost:3000/services/${id}`
            );

            getServices();

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="ml-64 min-h-screen bg-[#020617] text-white p-8">

            <div className="max-w-6xl mx-auto">

                <div className="flex justify-between mb-8">

                    <div>
                        <h1 className="text-3xl font-bold">
                            My Services
                        </h1>

                        <p className="text-slate-400">
                            Manage your services
                        </p>
                    </div>

                    <button
                        onClick={addService}
                        className="btn btn-primary"
                    >
                        + Add Service
                    </button>

                </div>

                {services.length === 0 ? (

                    <p className="text-slate-400">
                        No services added yet.
                    </p>

                ) : (

                    services.map(service => (

                        <div
                            key={service._id}
                            className="bg-[#0f172a] p-6 rounded-xl mb-5"
                        >

                            <div className="flex justify-between">

                                <h2 className="text-xl font-bold">
                                    {service.serviceName}
                                </h2>

                                <span className="text-green-400">
                                    {service.status}
                                </span>

                            </div>

                            <p className="text-slate-400 mt-2">
                                {service.description}
                            </p>

                            <p className="mt-3">
                                ₹{service.price}
                            </p>

                            <p className="text-slate-400">
                                {service.duration}
                            </p>

                            <div className="flex justify-end gap-3 mt-4">

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

                    ))
                )}

            </div>

            {showForm && (

                <div className="fixed inset-0 bg-black/60 flex items-center justify-center">

                    <div className="bg-[#0f172a] p-6 rounded-xl w-96">

                        <h2 className="text-2xl font-bold mb-5">
                            {editId ? 'Edit Service' : 'Add Service'}
                        </h2>

                        <form onSubmit={handleSubmit}>

                            <input
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
                                <option value="">
                                    Select Duration
                                </option>
                                <option value="1 hour">1 hour</option>
                                <option value="2 hour">2 hour</option>
                                <option value="3 hour">3 hour</option>
                                <option value="4 hour">4 hour</option>
                                <option value="5 hour">5 hour</option>
                                <option value="6 hour">6 hour</option>
                                <option value="7 hour">7 hour</option>
                                <option value="8 hour">8 hour</option>
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
                                    {editId ? 'Update' : 'Add'}
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