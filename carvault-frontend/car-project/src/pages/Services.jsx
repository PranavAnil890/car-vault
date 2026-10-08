
import React from 'react';
import { Link } from 'react-router-dom';

const Services = () => {

    const services = [
        {
            icon: "🔧",
            name: "General Service",
            price: "₹4,200",
            duration: "2 hours"
        },
        {
            icon: "🛞",
            name: "Brake Service",
            price: "₹1,800",
            duration: "2 hours"
        },
        {
            icon: "🛢️",
            name: "Oil Change",
            price: "₹2,500",
            duration: "1 hour"
        },
        {
            icon: "❄️",
            name: "AC Repair",
            price: "₹2,000",
            duration: "2 hours"
        },
        {
            icon: "🔋",
            name: "Battery Replacement",
            price: "₹5,000",
            duration: "1 hour"
        },
        {
            icon: "⚙️",
            name: "Wheel Alignment",
            price: "₹800",
            duration: "1 hour"
        },
        {
            icon: "🛞",
            name: "Tyre Service",
            price: "₹1,500",
            duration: "1 hour"
        },
        {
            icon: "🚿",
            name: "Car Washing",
            price: "₹600",
            duration: "1 hour"
        },
        {
            icon: "🔩",
            name: "Engine Service",
            price: "₹6,000",
            duration: "3 hours"
        }
    ];


    return (

        <div className="min-h-screen bg-[#020617] text-white">

            <section className="py-16">

                <div className="max-w-6xl mx-auto px-6">

                    <div className="text-center mb-12">

                        <h1 className="text-4xl md:text-5xl font-bold">
                            OUR CAR SERVICES
                        </h1>

                        <p className="mt-4 text-slate-400 text-lg">
                            Professional services for your vehicle
                        </p>

                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                        {services.map((service, index) => (

                            <div
                                key={index}
                                className="card bg-[#0f172a] border border-blue-900/30 shadow-xl"
                            >

                                <div className="card-body">


                                    <div className="text-5xl mb-4">
                                        {service.icon}
                                    </div>


                                    <h2 className="text-2xl font-bold text-white">
                                        {service.name}
                                    </h2>


                                    <p className="text-3xl font-bold text-blue-400 mt-6">
                                        {service.price}
                                    </p>

                                    <p className="text-slate-400 mt-2">
                                        {service.duration}
                                    </p>

                                    <div className="card-actions mt-6">

                                        <Link
                                            to="/login"
                                            className="btn btn-primary w-full"
                                        >
                                            Login to Book
                                        </Link>

                                    </div>


                                </div>

                            </div>

                        ))}

                    </div>

                </div>

            </section>

        </div>

    );

};

export default Services;



