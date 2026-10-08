import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Reviews = () => {

    const [services, setServices] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [reviews, setReviews] = useState([]);

    const [selectedService, setSelectedService] = useState('');
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


    // Get reviews
    const getReviews = async () => {

        try {

            const response = await axios.get(
                'http://localhost:3000/review'
            );

            const myReviews = response.data.filter(
                review =>
                    review.userId === user.id ||
                    review.userId?._id === user.id
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

        if (rating === 0) {
            alert('Select a rating');
            return;
        }

        if (!comment) {
            alert('Write a comment');
            return;
        }


        try {

            const booking = bookings.find(
                booking =>
                    (
                        booking.userId === user.id ||
                        booking.userId?._id === user.id
                    ) &&
                    (
                        booking.serviceId === selectedService ||
                        booking.serviceId?._id === selectedService
                    )
            );


            if (!booking) {

                alert('Booking not found');

                return;

            }


            await axios.post(
                'http://localhost:3000/review',
                {
                    userId: user.id,
                    bookingId: booking._id,
                    serviceCenterId: booking.serviceCenterId,
                    serviceId: selectedService,
                    rating: rating,
                    comment: comment
                }
            );


            alert('Review submitted successfully');

            setSelectedService('');
            setRating(0);
            setComment('');

            getReviews();

        } catch (error) {

            console.log(error.response?.data);

            alert('Failed to submit review');

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

                <div className="bg-[#0f172a] p-6 rounded-xl mt-8">

                    <h2 className="text-xl font-bold">
                        Write a Review
                    </h2>


                    {/* Service */}

                    <select
                        value={selectedService}
                        onChange={(e) =>
                            setSelectedService(e.target.value)
                        }
                        className="select select-bordered w-full mt-5 bg-[#020617]"
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
                                className="text-3xl"
                            >
                                {star <= rating ? '★' : '☆'}
                            </button>

                        ))}

                    </div>


                    {/* Comment */}

                    <textarea
                        value={comment}
                        onChange={(e) =>
                            setComment(e.target.value)
                        }
                        placeholder="Write your review..."
                        className="textarea textarea-bordered w-full mt-5 bg-[#020617]"
                    />


                    <button
                        onClick={submitReview}
                        className="btn btn-primary mt-5"
                    >
                        Submit Review
                    </button>

                </div>


                {/* My Reviews */}

                <h2 className="text-2xl font-bold mt-10 mb-5">
                    MY REVIEWS
                </h2>

                {reviews.map((review) => (

                    <div
                        key={review._id}
                        className="bg-[#0f172a] p-5 rounded-xl mb-4"
                    >

                        <p className="text-yellow-400 text-xl">
                            {'★'.repeat(review.rating)}
                        </p>

                        <p className="mt-2">
                            {review.comment}
                        </p>

                    </div>

                ))}

            </div>

        </div>

    );

};

export default Reviews;