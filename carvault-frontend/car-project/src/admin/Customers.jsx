
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Customers = () => {
    const [customers, setCustomers] = useState([]);
    const [search, setSearch] = useState('');
    const [selectedCustomer, setSelectedCustomer] = useState(null);

    // Get all customers
    const getCustomers = async () => {
        try {
            const response = await axios.get(
                'http://localhost:3000/users'
            );

            const customerUsers = response.data.filter(
                (user) => user.role === 'customer'
            );

            setCustomers(customerUsers);

            // Refresh selected customer details
            setSelectedCustomer((previous) => {
                if (!previous) return null;

                return customerUsers.find(
                    (customer) => customer._id === previous._id
                ) || null;
            });
        } catch (error) {
            console.log(
                error.response?.data || error.message
            );

            alert('Failed to load customers');
        }
    };

    useEffect(() => {
        getCustomers();
    }, []);

    // Deactivate customer
    const deactivateCustomer = async (id) => {
        const confirmDeactivate = window.confirm(
            'Are you sure you want to deactivate this customer?'
        );

        if (!confirmDeactivate) {
            return;
        }

        try {
            const response = await axios.put(
                `http://localhost:3000/users/${id}/deactivate`
            );

            alert(response.data.message);

            // Reload customers from database
            await getCustomers();
        } catch (error) {
            console.log(
                error.response?.data || error.message
            );

            alert(
                error.response?.data?.message ||
                'Failed to deactivate customer'
            );
        }
    };

    // Activate customer
    const activateCustomer = async (id) => {
        try {
            const response = await axios.put(
                `http://localhost:3000/users/${id}/activate`
            );

            alert(response.data.message);

            // Reload customers from database
            await getCustomers();
        } catch (error) {
            console.log(
                error.response?.data || error.message
            );

            alert(
                error.response?.data?.message ||
                'Failed to activate customer'
            );
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
            const response = await axios.delete(
                `http://localhost:3000/users/${id}`
            );

            // Remove deleted customer from the page
            setCustomers((previous) =>
                previous.filter(
                    (customer) => customer._id !== id
                )
            );

            // Close details if the deleted customer was selected
            setSelectedCustomer((previous) =>
                previous?._id === id ? null : previous
            );

            alert(
                response.data.message ||
                'Customer deleted successfully'
            );
        } catch (error) {
            console.log(
                error.response?.data || error.message
            );

            alert(
                error.response?.data?.message ||
                'Failed to delete customer'
            );
        }
    };

    // Search customers by name or email
    const filteredCustomers = customers.filter((customer) =>
        `${customer.name || ''} ${customer.email || ''}`
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    return (
        <div className="ml-64 min-h-screen bg-[#020617] text-white p-8">
            <div className="max-w-7xl mx-auto">

                {/* Page heading */}
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

                {/* Selected customer details */}
                {selectedCustomer && (
                    <div className="bg-[#0f172a] border border-blue-900/50 rounded-xl p-6 mb-8">

                        <div className="flex justify-between items-center mb-5">
                            <h2 className="text-xl font-bold">
                                Customer Details
                            </h2>

                            <button
                                onClick={() =>
                                    setSelectedCustomer(null)
                                }
                                className="text-slate-400 hover:text-white text-xl"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <p>
                                Name: {selectedCustomer.name || '-'}
                            </p>

                            <p>
                                Email: {selectedCustomer.email || '-'}
                            </p>

                            <p>
                                Role: {selectedCustomer.role || '-'}
                            </p>

                            <p>
                                Phone: {selectedCustomer.phone || '-'}
                            </p>

                            <p>
                                Status:{' '}
                                {selectedCustomer.status === 'inactive'
                                    ? 'Deactivated'
                                    : 'Active'}
                            </p>

                            <p className="break-all">
                                Customer ID: {selectedCustomer._id}
                            </p>
                        </div>
                    </div>
                )}

                {/* Customer table */}
                <div className="bg-[#0f172a] rounded-xl border border-blue-900/30 overflow-x-auto">

                    {/* Table headings */}
                    <div className="min-w-[1000px] grid grid-cols-5 p-5 border-b border-slate-700 font-semibold">
                        <p>Name</p>
                        <p>Email</p>
                        <p>Role</p>
                        <p>Status</p>
                        <p>Actions</p>
                    </div>

                    {/* Customer list */}
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
                                            customer.status === 'inactive'
                                                ? 'px-3 py-1 rounded-full text-sm bg-red-500/20 text-red-400'
                                                : 'px-3 py-1 rounded-full text-sm bg-green-500/20 text-green-400'
                                        }
                                    >
                                        {customer.status === 'inactive'
                                            ? 'Deactivated'
                                            : 'Active'}
                                    </span>
                                </p>

                                {/* Action buttons */}
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

                                    {/* Activate or Deactivate */}
                                    {customer.status === 'inactive' ? (
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

