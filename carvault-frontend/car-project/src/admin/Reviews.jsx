
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Reviews = () => {
    const [reviews, setReviews] = useState([]);
    const [users, setUsers] = useState([]);
    const [services, setServices] = useState([]);
    const [serviceCenters, setServiceCenters] = useState([]);

    // Get all data
    const getReviews = async () => {
        try {
            const reviewRes = await axios.get('http://localhost:3000/review');
            const userRes = await axios.get('http://localhost:3000/users');
            const serviceRes = await axios.get('http://localhost:3000/services');
            const centerRes = await axios.get('http://localhost:3000/service-centers');

            setReviews(reviewRes.data);
            setUsers(userRes.data);
            setServices(serviceRes.data);
            setServiceCenters(centerRes.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getReviews();
    }, []);

    // Get ID from string or object
    const getId = (value) => {
        return typeof value === 'object' ? value?._id : value;
    };

    // Delete review
    const deleteReview = async (id) => {
        if (!window.confirm('Delete this review?')) return;

        try {
            await axios.delete(`http://localhost:3000/review/${id}`);
            alert('Review deleted');
            getReviews();
        } catch (error) {
            console.log(error);
            alert('Failed to delete review');
        }
    };

    return (
        <div className="ml-64 min-h-screen bg-[#020617] text-white p-8">

            <h1 className="text-3xl font-bold">ALL REVIEWS</h1>
            <p className="text-gray-400 mt-2">View customer reviews</p>

            {reviews.length === 0 ? (
                <p className="mt-8 text-gray-400">No reviews found</p>
            ) : (
                reviews.map((review) => {
                    const customer = users.find(
                        (u) => u._id === getId(review.userId)
                    );

                    const service = services.find(
                        (s) => s._id === getId(review.serviceId)
                    );

                    const center = serviceCenters.find(
                        (c) =>
                            c._id === getId(review.serviceCenterId) ||
                            getId(c.userId) === getId(review.serviceCenterId)
                    );

                    return (
                        <div
                            key={review._id}
                            className="bg-[#0f172a] p-5 rounded-xl mt-5"
                        >
                            <h2 className="text-xl font-bold">
                                Customer Review
                            </h2>

                            <p className="mt-3">
                                Customer: {customer?.name || 'Not available'}
                            </p>

                            <p className="mt-2">
                                Service Center: {
                                    review.serviceCenterName ||
                                    center?.name ||
                                    center?.centerName ||
                                    'Not available'
                                }
                            </p>

                            <p className="mt-2">
                                Service: {
                                    service?.serviceName ||
                                    'Not available'
                                }
                            </p>

                            <p className="text-yellow-400 text-xl mt-3">
                                {'⭐'.repeat(Number(review.rating) || 0)}
                            </p>

                            <p className="mt-3">
                                Comment: {review.comment}
                            </p>

                            <button
                                onClick={() => deleteReview(review._id)}
                                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg mt-4"
                            >
                                Delete
                            </button>
                        </div>
                    );
                })
            )}
        </div>
    );
};

export default Reviews;

