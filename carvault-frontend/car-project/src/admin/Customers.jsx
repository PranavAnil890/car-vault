
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Customers = () => {

    const [customers, setCustomers] = useState([]);
    const [search, setSearch] = useState('');
    const [selectedCustomer, setSelectedCustomer] = useState(null);


    // Get customers
    const getCustomers = async () => {

        try {

            const response = await axios.get(
                'http://localhost:3000/users'
            );

            // Show only customers
            const customerUsers = response.data.filter(
                (user) => user.role === 'customer'
            );

            setCustomers(customerUsers);

        } catch (error) {

            console.log(error);

        }

    };


    useEffect(() => {

        getCustomers();

    }, []);


    // Search customers
    const filteredCustomers = customers.filter((customer) => {

        return (
            customer.name
                ?.toLowerCase()
                .includes(search.toLowerCase()) ||

            customer.email
                ?.toLowerCase()
                .includes(search.toLowerCase())
        );

    });


    // Deactivate customer
    const deactivateCustomer = async (id) => {

        const confirmDeactivate = window.confirm(
            'Are you sure you want to deactivate this customer?'
        );

        if (!confirmDeactivate) {
            return;
        }

        try {

            await axios.put(
                `http://localhost:3000/users/${id}/deactivate`
            );

            alert('Customer deactivated successfully');

            getCustomers();

        } catch (error) {

            console.log(error);

            alert('Failed to deactivate customer');

        }

    };


    // Activate customer
    const activateCustomer = async (id) => {

        try {

            await axios.put(
                `http://localhost:3000/users/${id}/activate`
            );

            alert('Customer activated successfully');

            getCustomers();

        } catch (error) {

            console.log(error);

            alert('Failed to activate customer');

        }

    };


    // Delete customer
    const deleteCustomer = async (id) => {

        const confirmDelete = window.confirm(
            'Are you sure you want to permanently delete this customer?'
        );

        if (!confirmDelete) {
            return;
        }

        try {

            await axios.delete(
                `http://localhost:3000/users/${id}`
            );

            alert('Customer deleted successfully');

            // Close details if deleted customer was selected
            setSelectedCustomer(null);

            getCustomers();

        } catch (error) {

            console.log(error);

            alert('Failed to delete customer');

        }

    };


    return (

        <div className="ml-64 min-h-screen bg-[#020617] text-white p-8">

            <div className="max-w-7xl mx-auto">


                {/* Heading */}

                <h1 className="text-3xl font-bold">
                    Customers
                </h1>

                <p className="text-slate-400 mt-2 mb-6">
                    View, search and manage registered customers
                </p>


                {/* Search */}

                <input
                    type="text"
                    placeholder="Search by name or email..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="input input-bordered w-full max-w-xl bg-[#0f172a] text-white mb-8"
                />


                {/* Customer Details */}

                {selectedCustomer && (

                    <div className="bg-[#0f172a] border border-blue-900/50 rounded-xl p-6 mb-8">

                        <div className="flex justify-between items-center mb-5">

                            <h2 className="text-xl font-bold">
                                Customer Details
                            </h2>

                            <button
                                onClick={() => setSelectedCustomer(null)}
                                className="text-slate-400 hover:text-white text-xl"
                            >
                                ✕
                            </button>

                        </div>


                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">


                            {/* Name */}

                            <div>

                                <p className="text-slate-400 text-sm">
                                    Name
                                </p>

                                <p className="font-semibold mt-1">
                                    {selectedCustomer.name || '-'}
                                </p>

                            </div>


                            {/* Email */}

                            <div>

                                <p className="text-slate-400 text-sm">
                                    Email
                                </p>

                                <p className="font-semibold mt-1">
                                    {selectedCustomer.email || '-'}
                                </p>

                            </div>


                            {/* Role */}

                            <div>

                                <p className="text-slate-400 text-sm">
                                    Role
                                </p>

                                <p className="text-blue-400 font-semibold mt-1">
                                    {selectedCustomer.role || 'customer'}
                                </p>

                            </div>


                            {/* Status */}

                            <div>

                                <p className="text-slate-400 text-sm">
                                    Status
                                </p>

                                <p
                                    className={
                                        selectedCustomer.isActive === false
                                            ? 'text-red-400 font-semibold mt-1'
                                            : 'text-green-400 font-semibold mt-1'
                                    }
                                >
                                    {selectedCustomer.isActive === false
                                        ? 'Deactivated'
                                        : 'Active'}
                                </p>

                            </div>


                            {/* Customer ID */}

                            <div className="md:col-span-2">

                                <p className="text-slate-400 text-sm">
                                    Customer ID
                                </p>

                                <p className="text-slate-300 mt-1 break-all">
                                    {selectedCustomer._id}
                                </p>

                            </div>

                        </div>

                    </div>

                )}


                {/* Customer Table */}

                <div className="bg-[#0f172a] rounded-xl border border-blue-900/30 overflow-x-auto">


                    {/* Table Header */}

                    <div className="min-w-[1000px] grid grid-cols-5 p-5 border-b border-slate-700 font-semibold">

                        <p>Name</p>

                        <p>Email</p>

                        <p>Role</p>

                        <p>Status</p>

                        <p>Actions</p>

                    </div>


                    {/* Customers */}

                    {filteredCustomers.length === 0 ? (

                        <p className="p-6 text-slate-400">
                            No customers found.
                        </p>

                    ) : (

                        filteredCustomers.map((customer) => (

                            <div
                                key={customer._id}
                                className="min-w-[1000px] grid grid-cols-5 items-center p-5 border-b border-slate-700"
                            >


                                {/* Name */}

                                <p>
                                    {customer.name}
                                </p>


                                {/* Email */}

                                <p className="text-slate-300">
                                    {customer.email}
                                </p>


                                {/* Role */}

                                <p className="text-blue-400">
                                    {customer.role}
                                </p>


                                {/* Status */}

                                <p>

                                    <span
                                        className={
                                            customer.isActive === false
                                                ? 'px-3 py-1 rounded-full text-sm bg-red-500/20 text-red-400'
                                                : 'px-3 py-1 rounded-full text-sm bg-green-500/20 text-green-400'
                                        }
                                    >
                                        {customer.isActive === false
                                            ? 'Deactivated'
                                            : 'Active'}
                                    </span>

                                </p>


                                {/* Actions */}

                                <div className="flex gap-2 flex-wrap">


                                    {/* View */}

                                    <button
                                        onClick={() =>
                                            setSelectedCustomer(customer)
                                        }
                                        className="bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-lg text-sm"
                                    >
                                        View
                                    </button>


                                    {/* Activate / Deactivate */}

                                    {customer.isActive === false ? (

                                        <button
                                            onClick={() =>
                                                activateCustomer(customer._id)
                                            }
                                            className="bg-green-600 hover:bg-green-700 px-3 py-2 rounded-lg text-sm"
                                        >
                                            Activate
                                        </button>

                                    ) : (

                                        <button
                                            onClick={() =>
                                                deactivateCustomer(customer._id)
                                            }
                                            className="bg-yellow-600 hover:bg-yellow-700 px-3 py-2 rounded-lg text-sm"
                                        >
                                            Deactivate
                                        </button>

                                    )}


                                    {/* Delete */}

                                    <button
                                        onClick={() =>
                                            deleteCustomer(customer._id)
                                        }
                                        className="bg-red-600 hover:bg-red-700 px-3 py-2 rounded-lg text-sm"
                                    >
                                        Delete
                                    </button>

                                </div>

                            </div>

                        ))

                    )}

                </div>

            </div>

        </div>
    );
};

export default Customers;

