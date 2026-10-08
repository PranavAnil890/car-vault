import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Reviews = () => {

    const [reviews, setReviews] = useState([]);
    const [users, setUsers] = useState([]);
    const [services, setServices] = useState([]);
    const [serviceCenters, setServiceCenters] = useState([]);


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

            const centerResponse = await axios.get(
                'http://localhost:3000/service-centers'
            );


            setReviews(reviewResponse.data);
            setUsers(userResponse.data);
            setServices(serviceResponse.data);
            setServiceCenters(centerResponse.data);

        } catch (error) {

            console.log(error);

        }

    };


    useEffect(() => {

        getReviews();

    }, []);


    const deleteReview = async (id) => {

        try {

            await axios.delete(
                `http://localhost:3000/review/${id}`
            );

            alert('Review deleted');

            getReviews();

        } catch (error) {

            console.log(error);

        }

    };


    return (

        <div className="ml-64 min-h-screen bg-[#020617] text-white p-8">

            <h1 className="text-3xl font-bold">
                ALL REVIEWS
            </h1>

            <p className="text-gray-400 mt-2">
                View customer reviews
            </p>


            {reviews.length === 0 ? (

                <p className="text-gray-400 mt-8">
                    No reviews found
                </p>

            ) : (

                <div className="mt-8">

                    {reviews.map((review) => {

                        const customer = users.find(
                            user => user._id === review.userId
                        );

                        const service = services.find(
                            service => service._id === review.serviceId
                        );

                        const center = serviceCenters.find(
                            center => center._id === review.serviceCenterId
                        );


                        return (

                            <div
                                key={review._id}
                                className="bg-[#0f172a] p-5 rounded-xl mb-4"
                            >

                                <p>
                                    Customer: {customer?.name}
                                </p>

                                <p className="mt-2">
                                    Service Center: {center?.name}
                                </p>

                                <p className="mt-2">
                                    Service: {service?.serviceName}
                                </p>

                                <p className="text-yellow-400 text-xl mt-3">
                                    {'⭐'.repeat(review.rating)}
                                </p>

                                <p className="mt-3">
                                    {review.comment}
                                </p>

                                <button
                                    onClick={() =>
                                        deleteReview(review._id)
                                    }
                                    className="bg-red-600 px-4 py-2 rounded-lg mt-4"
                                >
                                    Delete
                                </button>

                            </div>

                        );

                    })}

                </div>

            )}

        </div>

    );

};

export default Reviews;