
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Reviews = () => {
    const [services, setServices] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [reviews, setReviews] = useState([]);

    const [selectedService, setSelectedService] = useState('');
    const [serviceCenterName, setServiceCenterName] = useState('');
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const user = JSON.parse(localStorage.getItem('user'));

    // Get services
    const getServices = async () => {
        try {
            const response = await axios.get(
                'http://localhost:3000/services'
            );
            setServices(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    // Get bookings
    const getBookings = async () => {
        try {
            const response = await axios.get(
                'http://localhost:3000/booking'
            );
            setBookings(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    // Get my reviews
    const getReviews = async () => {
        try {
            const response = await axios.get(
                'http://localhost:3000/review'
            );

            const myReviews = response.data.filter(
                (review) =>
                    review.userId === user?.id ||
                    review.userId?._id === user?.id ||
                    review.userId === user?._id ||
                    review.userId?._id === user?._id
            );

            setReviews(myReviews);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getServices();
        getBookings();
        getReviews();
    }, []);

    // Submit review
    const submitReview = async (e) => {
        e.preventDefault();

        if (!selectedService) {
            alert('Select a service');
            return;
        }

        if (!serviceCenterName.trim()) {
            alert('Enter the service center name');
            return;
        }

        if (rating === 0) {
            alert('Select a rating');
            return;
        }

        if (!comment.trim()) {
            alert('Write a comment');
            return;
        }

        try {
            const userId = user?.id || user?._id;

            const booking = bookings.find((booking) => {
                const bookingUserId =
                    typeof booking.userId === 'object'
                        ? booking.userId?._id
                        : booking.userId;

                const bookingServiceId =
                    typeof booking.serviceId === 'object'
                        ? booking.serviceId?._id
                        : booking.serviceId;

                return (
                    bookingUserId === userId &&
                    bookingServiceId === selectedService
                );
            });

            if (!booking) {
                alert('Booking not found for this service');
                return;
            }

            const bookingCenter =
                typeof booking.serviceCenterId === 'object'
                    ? booking.serviceCenterId?._id
                    : booking.serviceCenterId;

            await axios.post(
                'http://localhost:3000/review',
                {
                    userId: userId,
                    bookingId: booking._id,
                    serviceCenterId: bookingCenter,
                    serviceCenterName: serviceCenterName.trim(),
                    serviceId: selectedService,
                    rating: rating,
                    comment: comment.trim()
                }
            );

            alert('Review submitted successfully');

            setSelectedService('');
            setServiceCenterName('');
            setRating(0);
            setComment('');

            await getReviews();
        } catch (error) {
            console.log(
                error.response?.data || error.message
            );

            alert(
                error.response?.data?.message ||
                'Failed to submit review'
            );
        }
    };

    return (
        <div className="min-h-screen bg-[#020617] text-white p-6">
            <div className="max-w-5xl mx-auto">

                <h1 className="text-3xl font-bold">
                    REVIEWS
                </h1>

                <p className="text-slate-400 mt-2">
                    Share your service experience
                </p>

                {/* Review Form */}
                <form
                    onSubmit={submitReview}
                    className="bg-[#0f172a] p-6 rounded-xl mt-8"
                >
                    <h2 className="text-xl font-bold">
                        Write a Review
                    </h2>

                    {/* Select Service */}
                    <label className="block mt-5 mb-2">
                        Service
                    </label>

                    <select
                        value={selectedService}
                        onChange={(e) =>
                            setSelectedService(e.target.value)
                        }
                        required
                        className="select select-bordered w-full bg-[#020617]"
                    >
                        <option value="">
                            Select Service
                        </option>

                        {services.map((service) => (
                            <option
                                key={service._id}
                                value={service._id}
                            >
                                {service.serviceName}
                            </option>
                        ))}
                    </select>

                    {/* Service Center Name */}
                    <label className="block mt-5 mb-2">
                        Service Center Name
                    </label>

                    <input
                        type="text"
                        value={serviceCenterName}
                        onChange={(e) =>
                            setServiceCenterName(e.target.value)
                        }
                        placeholder="Enter the service center name"
                        required
                        className="input input-bordered w-full bg-[#020617]"
                    />

                    {/* Rating */}
                    <p className="mt-5">
                        Rating
                    </p>

                    <div className="flex gap-2 mt-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                type="button"
                                onClick={() => setRating(star)}
                                className="text-3xl text-yellow-400"
                            >
                                {star <= rating ? '★' : '☆'}
                            </button>
                        ))}
                    </div>

                    {/* Comment */}
                    <label className="block mt-5 mb-2">
                        Comment
                    </label>

                    <textarea
                        value={comment}
                        onChange={(e) =>
                            setComment(e.target.value)
                        }
                        placeholder="Write your review..."
                        required
                        className="textarea textarea-bordered w-full bg-[#020617]"
                    />

                    <button
                        type="submit"
                        className="btn btn-primary mt-5"
                    >
                        Submit Review
                    </button>
                </form>

                {/* My Reviews */}
                <h2 className="text-2xl font-bold mt-10 mb-5">
                    MY REVIEWS
                </h2>

                {reviews.length === 0 ? (
                    <p className="text-slate-400">
                        You have not submitted any reviews yet.
                    </p>
                ) : (
                    reviews.map((review) => (
                        <div
                            key={review._id}
                            className="bg-[#0f172a] p-5 rounded-xl mb-4"
                        >
                            <p className="font-semibold">
                                Service Center:{' '}
                                {review.serviceCenterName ||
                                    'Name not available'}
                            </p>

                            <p className="text-slate-300 mt-2">
                                Service:{' '}
                                {review.serviceId?.serviceName ||
                                    services.find(
                                        (service) =>
                                            service._id ===
                                            (typeof review.serviceId === 'object'
                                                ? review.serviceId?._id
                                                : review.serviceId)
                                    )?.serviceName ||
                                    'Service'}
                            </p>

                            <p className="text-yellow-400 text-xl mt-2">
                                {'★'.repeat(review.rating)}
                                {'☆'.repeat(5 - review.rating)}
                            </p>

                            <p className="mt-2">
                                {review.comment}
                            </p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Reviews;

