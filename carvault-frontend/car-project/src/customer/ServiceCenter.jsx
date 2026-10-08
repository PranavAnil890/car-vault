import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ServiceCenters = () => {

    const navigate = useNavigate();

    const [serviceCenters, setServiceCenters] = useState([]);
    const [services, setServices] = useState([]);
    const [reviews, setReviews] = useState([]);

    const [selectedCenter, setSelectedCenter] = useState(null);
    const [search, setSearch] = useState('');


    // Get service centers

    const getServiceCenters = async () => {

        try {

            const response = await axios.get(
                'http://localhost:3000/service-centers'
            );

            setServiceCenters(response.data);

        } catch (error) {

            console.log(error);

        }

    };


    // Get reviews

    const getReviews = async () => {

        try {

            const response = await axios.get(
                'http://localhost:3000/review'
            );

            setReviews(response.data);

        } catch (error) {

            console.log(error);

        }

    };


    useEffect(() => {

        getServiceCenters();
        getReviews();

    }, []);


    // Select center

    const selectCenter = async (center) => {

        setSelectedCenter(center);

        try {

            const response = await axios.get(
                'http://localhost:3000/services'
            );

            const centerServices = response.data.filter(
                service =>
                    service.serviceCenterId === center.userId ||
                    service.serviceCenterId?._id === center.userId
            );

            setServices(centerServices);

        } catch (error) {

            console.log(error);

        }

    };


    // Back

    const backToCenters = () => {

        setSelectedCenter(null);
        setServices([]);

    };


    // Book service

    const bookService = (service) => {

        navigate(
            `/customer/bookings/new?serviceId=${service._id}&serviceCenterId=${selectedCenter.userId}`
        );

    };


    // Search

    const filteredCenters = serviceCenters.filter(
        center =>
            center.name?.toLowerCase().includes(search.toLowerCase()) ||
            center.city?.toLowerCase().includes(search.toLowerCase())
    );


    return (

        <div className="min-h-screen bg-[#020617] text-white p-6">

            <div className="max-w-6xl mx-auto">

                {!selectedCenter && (

                    <>

                        <h1 className="text-3xl font-bold mb-2">
                            FIND A SERVICE CENTER
                        </h1>

                        <p className="text-slate-400 mb-6">
                            Find a suitable service center for your vehicle
                        </p>


                        <input
                            type="text"
                            placeholder="Search by city or name..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="input input-bordered w-full max-w-xl bg-[#0f172a] text-white mb-8"
                        />


                        {filteredCenters.length === 0 ? (

                            <p className="text-slate-400">
                                No service centers found.
                            </p>

                        ) : (

                            <div className="grid md:grid-cols-2 gap-6">

                                {filteredCenters.map((center) => {

                                    const centerReviews = reviews.filter(
                                        review =>
                                            review.serviceCenterId === center.userId ||
                                            review.serviceCenterId?._id === center.userId
                                    );

                                    const rating = centerReviews.length
                                        ? centerReviews.reduce(
                                            (total, review) =>
                                                total + Number(review.rating),
                                            0
                                        ) / centerReviews.length
                                        : 0;


                                    return (

                                        <div
                                            key={center._id}
                                            className="bg-[#0f172a] p-6 rounded-xl border border-blue-900/30"
                                        >

                                            <h2 className="text-xl font-bold">
                                                {center.name}
                                            </h2>

                                            <p className="text-yellow-400 mt-2">
                                                ⭐ {rating.toFixed(1)}
                                            </p>

                                            <p className="text-slate-300 mt-4">
                                                {center.address}
                                            </p>

                                            <p className="text-slate-400">
                                                {center.city}, {center.state}
                                            </p>

                                            <button
                                                onClick={() =>
                                                    selectCenter(center)
                                                }
                                                className="btn btn-primary mt-5"
                                            >
                                                View Services
                                            </button>

                                        </div>

                                    );

                                })}

                            </div>

                        )}

                    </>

                )}


                {selectedCenter && (

                    <>

                        <button
                            onClick={backToCenters}
                            className="btn btn-outline mb-6"
                        >
                            ← Back
                        </button>


                        <h1 className="text-3xl font-bold">
                            {selectedCenter.name}
                        </h1>

                        <p className="text-slate-400 mt-2">
                            {selectedCenter.address}
                        </p>

                        <p className="text-slate-400">
                            {selectedCenter.city}, {selectedCenter.state}
                        </p>


                        <h2 className="text-2xl font-bold mt-8 mb-5">
                            Available Services
                        </h2>


                        {services.length === 0 ? (

                            <p className="text-slate-400">
                                No services available.
                            </p>

                        ) : (

                            <div className="grid md:grid-cols-2 gap-6">

                                {services.map((service) => (

                                    <div
                                        key={service._id}
                                        className="bg-[#0f172a] p-6 rounded-xl border border-blue-900/30"
                                    >

                                        <h3 className="text-xl font-bold">
                                            🔧 {service.serviceName}
                                        </h3>

                                        <p className="text-slate-400 mt-2">
                                            {service.description}
                                        </p>

                                        <p className="text-blue-400 text-xl font-bold mt-4">
                                            ₹{service.price}
                                        </p>

                                        <p className="text-slate-400 mt-2">
                                            Duration: {service.duration}
                                        </p>

                                        <button
                                            onClick={() =>
                                                bookService(service)
                                            }
                                            className="btn btn-primary mt-5"
                                        >
                                            Book Now
                                        </button>

                                    </div>

                                ))}

                            </div>

                        )}

                    </>

                )}

            </div>

        </div>

    );

};

export default ServiceCenters;