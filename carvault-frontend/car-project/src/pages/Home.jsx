import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {

    return (

        <div className="bg-[#020617] text-white min-h-screen">


            <section className="min-h-[calc(100vh-80px)] flex items-center">

                <div className="max-w-7xl mx-auto px-6 py-16 w-full">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                        <div>

                            <p className="text-blue-400 font-semibold mb-4">
                                SMART CAR OWNERSHIP & SERVICE PLATFORM
                            </p>

                            <h1 className="text-5xl md:text-6xl font-bold leading-tight">

                                Manage your car.
                                <br />

                                <span className="text-blue-500">
                                    Maintain it.
                                </span>

                                <br />

                                Service it.
                                <br />

                                Track it.

                            </h1>

                            <p className="mt-6 text-slate-400 text-lg max-w-xl">

                                Keep your vehicle information, service history,
                                maintenance expenses and appointments in one place.

                            </p>

                            <div className="flex flex-wrap gap-4 mt-8">

                                <Link
                                    to="/register"
                                    className="btn btn-primary"
                                >
                                    Get Started
                                </Link>

                                <Link
                                    to="/service"
                                    className="btn btn-outline btn-info"
                                >
                                    Explore Services
                                </Link>

                            </div>

                        </div>


                        <div className="flex justify-center">

                            <div className="w-full max-w-lg">

                                <img
                                    src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1000&q=80"
                                    alt="Car"
                                    className="rounded-2xl shadow-2xl w-full h-[350px] object-cover"
                                />

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            <section className="py-20 bg-[#0f172a]">

                <div className="max-w-7xl mx-auto px-6">

                    <div className="text-center mb-12">

                        <h2 className="text-3xl md:text-4xl font-bold">
                            Why CarVault?
                        </h2>

                        <p className="text-slate-400 mt-3">
                            Everything you need to manage your car
                        </p>

                    </div>


                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">


                        {/* My Garage */}

                        <div className="card bg-[#020617] border border-blue-900/30 overflow-hidden">

                            <figure>

                                <img
                                    src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80"
                                    alt="My Garage"
                                    className="w-full h-40 object-cover"
                                />

                            </figure>

                            <div className="card-body">

                                <h3 className="card-title text-white">
                                    My Garage
                                </h3>

                                <p className="text-slate-400">
                                    Manage your cars
                                </p>

                            </div>

                        </div>



                        {/* Services */}

                        <div className="card bg-[#020617] border border-blue-900/30 overflow-hidden">

                            <figure>

                                <img
                                    src="https://images.unsplash.com/photo-1486006920555-c77dcf18193c?auto=format&fit=crop&w=800&q=80"
                                    alt="Car Service"
                                    className="w-full h-40 object-cover"
                                />

                            </figure>

                            <div className="card-body">

                                <h3 className="card-title text-white">
                                    Services
                                </h3>

                                <p className="text-slate-400">
                                    Find services
                                </p>

                            </div>

                        </div>



                        {/* Booking */}

                        <div className="card bg-[#020617] border border-blue-900/30 overflow-hidden">

                            <figure>

                                <img
                                    src="https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=800&q=80"
                                    alt="Booking Calendar"
                                    className="w-full h-40 object-cover"
                                />

                            </figure>

                            <div className="card-body">

                                <h3 className="card-title text-white">
                                    Booking
                                </h3>

                                <p className="text-slate-400">
                                    Book slots
                                </p>

                            </div>

                        </div>



                        {/* History */}

                        <div className="card bg-[#020617] border border-blue-900/30 overflow-hidden">

                            <figure>

                                <img
                                    src="https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80"
                                    alt="Service History"
                                    className="w-full h-40 object-cover"
                                />

                            </figure>

                            <div className="card-body">

                                <h3 className="card-title text-white">
                                    History
                                </h3>

                                <p className="text-slate-400">
                                    Track service
                                </p>

                            </div>

                        </div>



                        {/* Reviews */}

                        <div className="card bg-[#020617] border border-blue-900/30 overflow-hidden">

                            <figure>

                                <img
                                    src="https://images.unsplash.com/photo-1551830820-330a71b99659?auto=format&fit=crop&w=800&q=80"
                                    alt="Customer Reviews"
                                    className="w-full h-40 object-cover"
                                />

                            </figure>

                            <div className="card-body">

                                <h3 className="card-title text-white">
                                    Reviews
                                </h3>

                                <p className="text-slate-400">
                                    Rate service
                                </p>

                            </div>

                        </div>


                    </div>

                </div>

            </section>


            <section className="py-20">

                <div className="max-w-7xl mx-auto px-6">

                    <div className="text-center mb-12">

                        <h2 className="text-3xl md:text-4xl font-bold">
                            How It Works
                        </h2>

                    </div>


                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

                        <div className="text-center">

                            <div className="text-blue-500 text-4xl font-bold">
                                01
                            </div>

                            <h3 className="text-xl font-semibold mt-4">
                                Add Vehicle
                            </h3>

                            <p className="text-slate-400 mt-2">
                                Add your car details to your garage.
                            </p>

                        </div>


                        <div className="text-center">

                            <div className="text-blue-500 text-4xl font-bold">
                                02
                            </div>

                            <h3 className="text-xl font-semibold mt-4">
                                Find Service
                            </h3>

                            <p className="text-slate-400 mt-2">
                                Find suitable services and service centers.
                            </p>

                        </div>


                        <div className="text-center">

                            <div className="text-blue-500 text-4xl font-bold">
                                03
                            </div>

                            <h3 className="text-xl font-semibold mt-4">
                                Book
                            </h3>

                            <p className="text-slate-400 mt-2">
                                Choose a convenient time slot.
                            </p>

                        </div>


                        <div className="text-center">

                            <div className="text-blue-500 text-4xl font-bold">
                                04
                            </div>

                            <h3 className="text-xl font-semibold mt-4">
                                Service
                            </h3>

                            <p className="text-slate-400 mt-2">
                                Get your vehicle serviced and track the history.
                            </p>

                        </div>


                    </div>

                </div>

            </section>


        </div>

    );

};

export default Home;