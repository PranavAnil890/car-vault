import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Reviews = () => {

    const [reviews, setReviews] = useState([]);
    const [users, setUsers] = useState([]);
    const [services, setServices] = useState([]);

    const user = JSON.parse(localStorage.getItem('user'));


    // Get reviews

    const getReviews = async () => {

        try {

            const reviewResponse = await axios.get(
                'http://localhost:3000/review'
            );

            const userResponse = await axios.get(
                'http://localhost:3000/users'
            );

            const serviceResponse = await axios.get(
                'http://localhost:3000/services'
            );


            const myReviews = reviewResponse.data.filter(
                review =>
                    review.serviceCenterId === user.id ||
                    review.serviceCenterId?._id === user.id
            );


            setReviews(myReviews);
            setUsers(userResponse.data);
            setServices(serviceResponse.data);

        } catch (error) {

            console.log(error);

        }

    };


    useEffect(() => {

        getReviews();

    }, []);


    // Average rating

    const averageRating =
        reviews.length > 0
            ? (
                reviews.reduce(
                    (total, review) =>
                        total + Number(review.rating),
                    0
                ) / reviews.length
            ).toFixed(1)
            : '0.0';


    return (

        <div className="ml-64 min-h-screen bg-[#020617] text-white p-8">

            <div className="max-w-5xl mx-auto">

                <h1 className="text-3xl font-bold">
                    CUSTOMER REVIEWS
                </h1>

                <p className="text-slate-400 mt-2">
                    See what customers say about your service
                </p>


                {/* Overall Rating */}

                <div className="bg-[#0f172a] p-6 rounded-xl mt-8 text-center">

                    <p className="text-slate-400">
                        Overall Rating
                    </p>

                    <h2 className="text-4xl font-bold mt-2">
                        ⭐ {averageRating}
                    </h2>

                    <p className="text-slate-400 mt-2">
                        {reviews.length} customer reviews
                    </p>

                </div>


                {/* Reviews */}

                <div className="mt-8">

                    {reviews.length === 0 ? (

                        <div className="bg-[#0f172a] p-8 rounded-xl text-center">

                            <p className="text-slate-400">
                                No customer reviews yet.
                            </p>

                        </div>

                    ) : (

                        reviews.map((review) => {

                            const customer = users.find(
                                item =>
                                    item._id === review.userId
                            );

                            const service = services.find(
                                item =>
                                    item._id === review.serviceId
                            );


                            return (

                                <div
                                    key={review._id}
                                    className="bg-[#0f172a] p-6 rounded-xl mb-5"
                                >

                                    <h2 className="text-xl font-bold">
                                        {customer?.name || 'Customer'}
                                    </h2>


                                    <p className="text-yellow-400 text-xl mt-2">
                                        {'⭐'.repeat(review.rating)}
                                    </p>


                                    <p className="text-slate-300 mt-4">
                                        {review.comment}
                                    </p>


                                    <p className="text-slate-400 mt-4">
                                        Service: {service?.serviceName || 'Service'}
                                    </p>

                                </div>

                            );

                        })

                    )}

                </div>

            </div>

        </div>

    );

};

export default Reviews;