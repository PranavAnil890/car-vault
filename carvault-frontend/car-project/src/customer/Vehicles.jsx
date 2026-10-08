import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Vehicles = () => {

    const navigate = useNavigate();

    const [vehicles, setVehicles] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editId, setEditId] = useState(null);

    const [formData, setFormData] = useState({
        registrationNumber: '',
        brand: '',
        model: '',
        registrationDate: '',
        fuelType: 'petrol',
        mileage: ''
    });

    const user = JSON.parse(localStorage.getItem('user'));


    // GET VEHICLES

    const getVehicles = async () => {

        try {

            const response = await axios.get(
                'http://localhost:3000/vehicles'
            );

            const myVehicles = response.data.filter(
                (vehicle) =>
                    vehicle.userId === user.id ||
                    vehicle.userId?._id === user.id
            );

            setVehicles(myVehicles);

        } catch (error) {

            console.log(error);

        }
    };


    useEffect(() => {
        getVehicles();
    }, []);


    // INPUT CHANGE

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };


    // ADD VEHICLE

    const addVehicle = () => {

        setEditId(null);

        setFormData({
            registrationNumber: '',
            brand: '',
            model: '',
            registrationDate: '',
            fuelType: 'petrol',
            mileage: ''
        });

        setShowForm(true);

    };


    // EDIT VEHICLE

    const editVehicle = (vehicle) => {

        setEditId(vehicle._id);

        setFormData({
            registrationNumber: vehicle.registrationNumber,
            brand: vehicle.brand,
            model: vehicle.model,
            registrationDate: `${vehicle.year}-01-01`,
            fuelType: vehicle.fuelType,
            mileage: vehicle.mileage
        });

        setShowForm(true);

    };


    // SELECT VEHICLE

    const selectVehicle = (vehicle) => {

        localStorage.setItem(
            'selectedVehicle',
            JSON.stringify(vehicle)
        );

        navigate('/customer/service-centers');

    };


    // ADD / UPDATE

    const handleSubmit = async (e) => {

        e.preventDefault();

        const vehicleData = {
            registrationNumber: formData.registrationNumber,
            brand: formData.brand,
            model: formData.model,
            year: new Date(formData.registrationDate).getFullYear(),
            fuelType: formData.fuelType,
            mileage: Number(formData.mileage),
            userId: user.id
        };

        try {

            if (editId) {

                await axios.put(
                    `http://localhost:3000/vehicles/${editId}`,
                    vehicleData
                );

                alert('Vehicle updated successfully');

            } else {

                await axios.post(
                    'http://localhost:3000/vehicles',
                    vehicleData
                );

                alert('Vehicle added successfully');

            }

            setShowForm(false);
            getVehicles();

        } catch (error) {

            alert(
                error.response?.data?.message ||
                'Something went wrong'
            );

        }

    };


    // DELETE

    const deleteVehicle = async (id) => {

        if (!window.confirm('Delete this vehicle?')) {
            return;
        }

        try {

            await axios.delete(
                `http://localhost:3000/vehicles/${id}`
            );

            alert('Vehicle deleted successfully');

            getVehicles();

        } catch (error) {

            alert('Failed to delete vehicle');

        }

    };


    return (

        <div className="min-h-screen bg-[#020617] px-6 py-8">

            {/* HEADER */}

            <div className="flex justify-between items-center mb-8">

                <div>

                    <h1 className="text-3xl font-bold text-white">
                        My Garage
                    </h1>

                    <p className="text-slate-400">
                        Manage all your vehicles
                    </p>

                </div>

                <button
                    onClick={addVehicle}
                    className="btn btn-primary"
                >
                    + Add Car
                </button>

            </div>


            {/* VEHICLES */}

            {vehicles.length === 0 ? (

                <div className="text-center text-white py-20">

                    <div className="text-5xl">
                        🚗
                    </div>

                    <h2 className="text-xl mt-4">
                        No vehicles added
                    </h2>

                    <button
                        onClick={addVehicle}
                        className="btn btn-primary mt-4"
                    >
                        + Add Vehicle
                    </button>

                </div>

            ) : (

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">

                    {vehicles.map((vehicle) => (

                        <div
                            key={vehicle._id}
                            className="card bg-[#0f172a] border border-blue-900/30"
                        >

                            <div className="card-body">

                                <h2 className="card-title text-white">
                                    🚗 {vehicle.brand} {vehicle.model}
                                </h2>

                                <p className="text-slate-300">
                                    Registration: {vehicle.registrationNumber}
                                </p>

                                <p className="text-slate-300">
                                    Year: {vehicle.year}
                                </p>

                                <p className="text-slate-300 capitalize">
                                    Fuel: {vehicle.fuelType}
                                </p>

                                <p className="text-slate-300">
                                    Mileage: {vehicle.mileage} km
                                </p>


                                {/* BUTTONS */}

                                <div className="flex gap-2 mt-4">

                                    <button
                                        onClick={() =>
                                            selectVehicle(vehicle)
                                        }
                                        className="btn btn-sm btn-primary"
                                    >
                                        Select
                                    </button>

                                    <button
                                        onClick={() =>
                                            editVehicle(vehicle)
                                        }
                                        className="btn btn-sm btn-warning"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() =>
                                            deleteVehicle(vehicle._id)
                                        }
                                        className="btn btn-sm btn-error"
                                    >
                                        Delete
                                    </button>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

            )}


            {/* FORM */}

            {showForm && (

                <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">

                    <div className="bg-[#0f172a] rounded-xl p-6 w-full max-w-md">

                        <div className="flex justify-between mb-5">

                            <h2 className="text-2xl font-bold text-white">
                                {editId ? 'Edit Vehicle' : 'Add Vehicle'}
                            </h2>

                            <button
                                onClick={() => setShowForm(false)}
                                className="text-slate-400"
                            >
                                ✕
                            </button>

                        </div>


                        <form
                            onSubmit={handleSubmit}
                            className="space-y-4"
                        >

                            <input
                                type="text"
                                name="registrationNumber"
                                placeholder="Registration Number"
                                value={formData.registrationNumber}
                                onChange={handleChange}
                                className="input input-bordered w-full bg-[#020617]"
                                required
                            />

                            <div className="grid grid-cols-2 gap-3">

                                <input
                                    type="text"
                                    name="brand"
                                    placeholder="Brand"
                                    value={formData.brand}
                                    onChange={handleChange}
                                    className="input input-bordered w-full bg-[#020617]"
                                    required
                                />

                                <input
                                    type="text"
                                    name="model"
                                    placeholder="Model"
                                    value={formData.model}
                                    onChange={handleChange}
                                    className="input input-bordered w-full bg-[#020617]"
                                    required
                                />

                            </div>

                            <div className="grid grid-cols-2 gap-3">

                                <input
                                    type="date"
                                    name="registrationDate"
                                    value={formData.registrationDate}
                                    onChange={handleChange}
                                    className="input input-bordered w-full bg-[#020617]"
                                    required
                                />

                                <select
                                    name="fuelType"
                                    value={formData.fuelType}
                                    onChange={handleChange}
                                    className="select select-bordered w-full bg-[#020617]"
                                >

                                    <option value="petrol">Petrol</option>
                                    <option value="diesel">Diesel</option>
                                    <option value="electric">Electric</option>
                                    <option value="hybrid">Hybrid</option>
                                    <option value="cng">CNG</option>

                                </select>

                            </div>

                            <input
                                type="number"
                                name="mileage"
                                placeholder="Current Mileage"
                                value={formData.mileage}
                                onChange={handleChange}
                                className="input input-bordered w-full bg-[#020617]"
                                min="0"
                                required
                            />

                            <div className="flex justify-end gap-2">

                                <button
                                    type="button"
                                    onClick={() => setShowForm(false)}
                                    className="btn btn-ghost"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    {editId ? 'Update' : 'Add Vehicle'}
                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            )}

        </div>

    );

};

export default Vehicles;