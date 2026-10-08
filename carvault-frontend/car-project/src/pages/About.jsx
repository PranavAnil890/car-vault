
import React from 'react';

const About = () => {

    return (

        <div className="min-h-screen bg-[#020b1d] text-white">


            {/* ABOUT HEADING */}

            <section className="pt-14 pb-8">

                <div className="max-w-7xl mx-auto px-6 text-center">

                    <h1 className="text-5xl md:text-6xl font-bold">
                        ABOUT <span className="text-blue-500">CARVAULT</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-blue-300 font-semibold mt-5">
                        One platform for your complete car journey
                    </p>

                </div>

            </section>



            {/* WHAT IS CARVAULT */}

            <section className="pb-10">

                <div className="max-w-7xl mx-auto px-6">

                    <div className="border border-blue-600 rounded-xl overflow-hidden bg-[#041631]">

                        <div className="grid grid-cols-1 lg:grid-cols-2">


                            {/* CONTENT */}

                            <div className="p-8 md:p-10 flex flex-col justify-center">

                                <div className="flex items-center gap-5 mb-6">

                                    <div className="text-4xl">
                                        🛡️
                                    </div>

                                    <h2 className="text-3xl md:text-4xl font-bold">
                                        What is CarVault?
                                    </h2>

                                </div>


                                <p className="text-blue-200 text-lg md:text-xl leading-9 max-w-xl">

                                    CarVault helps car owners manage their vehicles,
                                    find service centres, book services and track
                                    maintenance history.

                                </p>

                            </div>


                            {/* CAR IMAGE */}

                            <div className="h-[280px] lg:h-[300px]">

                                <img
                                    src="https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=1200&q=80"
                                    alt="CarVault vehicle"
                                    className="w-full h-full object-cover"
                                />

                            </div>

                        </div>

                    </div>

                </div>

            </section>



            {/* MAIN FEATURES */}

            <section className="py-8">

                <div className="max-w-7xl mx-auto px-6">


                    <h2 className="text-4xl md:text-5xl font-bold text-center mb-10">
                        OUR MAIN FEATURES
                    </h2>


                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">


                        {/* VEHICLES */}

                        <div className="h-52 border border-blue-600 rounded-xl bg-[#041631] flex flex-col items-center justify-center">

                            <div className="w-24 h-24 rounded-full border-2 border-blue-500 bg-blue-500/10 flex items-center justify-center text-5xl">
                                🚗
                            </div>

                            <h3 className="text-2xl font-bold mt-5">
                                Vehicles
                            </h3>

                        </div>


                        {/* SERVICES */}

                        <div className="h-52 border border-blue-600 rounded-xl bg-[#041631] flex flex-col items-center justify-center">

                            <div className="w-24 h-24 rounded-full border-2 border-cyan-400 bg-cyan-400/10 flex items-center justify-center text-5xl">
                                🔧
                            </div>

                            <h3 className="text-2xl font-bold mt-5">
                                Services
                            </h3>

                        </div>


                        {/* BOOKING */}

                        <div className="h-52 border border-blue-600 rounded-xl bg-[#041631] flex flex-col items-center justify-center">

                            <div className="w-24 h-24 rounded-full border-2 border-purple-500 bg-purple-500/10 flex items-center justify-center text-5xl">
                                📅
                            </div>

                            <h3 className="text-2xl font-bold mt-5">
                                Booking
                            </h3>

                        </div>


                        {/* HISTORY */}

                        <div className="h-52 border border-blue-600 rounded-xl bg-[#041631] flex flex-col items-center justify-center">

                            <div className="w-24 h-24 rounded-full border-2 border-orange-500 bg-orange-500/10 flex items-center justify-center text-5xl">
                                📋
                            </div>

                            <h3 className="text-2xl font-bold mt-5">
                                History
                            </h3>

                        </div>


                    </div>

                </div>

            </section>



            {/* HOW CARVAULT WORKS */}

            <section className="py-12">

                <div className="max-w-7xl mx-auto px-6">


                    <h2 className="text-4xl md:text-5xl font-bold text-center mb-14">
                        HOW CARVAULT WORKS
                    </h2>


                    <div className="grid grid-cols-1 md:grid-cols-4 gap-10">


                        {/* OWN */}

                        <div className="flex flex-col items-center">

                            <div className="relative">

                                <div className="w-36 h-36 rounded-full border-2 border-blue-500 bg-blue-500/10 flex flex-col items-center justify-center">

                                    <span className="text-blue-400 text-xl font-bold">
                                        01
                                    </span>

                                    <span className="text-4xl mt-2">
                                        🚗
                                    </span>

                                </div>

                            </div>

                            <h3 className="text-2xl font-bold mt-5">
                                Own
                            </h3>

                        </div>



                        {/* MAINTAIN */}

                        <div className="flex flex-col items-center">

                            <div className="w-36 h-36 rounded-full border-2 border-cyan-400 bg-cyan-400/10 flex flex-col items-center justify-center">

                                <span className="text-cyan-400 text-xl font-bold">
                                    02
                                </span>

                                <span className="text-4xl mt-2">
                                    🔧
                                </span>

                            </div>

                            <h3 className="text-2xl font-bold mt-5">
                                Maintain
                            </h3>

                        </div>



                        {/* SERVICE */}

                        <div className="flex flex-col items-center">

                            <div className="w-36 h-36 rounded-full border-2 border-purple-500 bg-purple-500/10 flex flex-col items-center justify-center">

                                <span className="text-purple-400 text-xl font-bold">
                                    03
                                </span>

                                <span className="text-4xl mt-2">
                                    📅
                                </span>

                            </div>

                            <h3 className="text-2xl font-bold mt-5">
                                Service
                            </h3>

                        </div>



                        {/* TRACK */}

                        <div className="flex flex-col items-center">

                            <div className="w-36 h-36 rounded-full border-2 border-orange-500 bg-orange-500/10 flex flex-col items-center justify-center">

                                <span className="text-orange-400 text-xl font-bold">
                                    04
                                </span>

                                <span className="text-4xl mt-2">
                                    📋
                                </span>

                            </div>

                            <h3 className="text-2xl font-bold mt-5">
                                Track
                            </h3>

                        </div>


                    </div>


                    {/* ARROWS */}

                    <div className="hidden md:flex justify-between max-w-5xl mx-auto -mt-28 px-20 pointer-events-none">

                        <span className="text-blue-500 text-4xl">
                            →
                        </span>

                        <span className="text-blue-500 text-4xl">
                            →
                        </span>

                        <span className="text-blue-500 text-4xl">
                            →
                        </span>

                    </div>


                </div>

            </section>



            {/* FOOTER */}

            <footer className="border-t border-blue-900/50 bg-[#030d20] mt-8">

                <div className="max-w-7xl mx-auto px-6 py-6">

                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">


                        {/* Logo */}

                        <div className="text-2xl font-bold">

                            🚗 Car<span className="text-blue-500">
                                Vault
                            </span>

                        </div>


                        {/* Description */}

                        <p className="text-slate-400">
                            Smart car ownership & service platform
                        </p>


                        {/* Copyright */}

                        <p className="text-slate-500 text-sm">
                            © 2026 CarVault
                        </p>


                    </div>

                </div>

            </footer>


        </div>

    );

};

export default About;


