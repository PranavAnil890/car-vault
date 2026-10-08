import React, { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {

    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [password, setPassword] = useState('');

    const [step, setStep] = useState(1);
    const [message, setMessage] = useState('');

    // Send OTP
    const sendOTP = async () => {
        try {
            const response = await axios.post(
                'http://localhost:3000/users/forgot-password',
                { email }
            );

            setMessage(response.data.message);
            setStep(2);

        } catch (error) {
            setMessage(
                error.response?.data?.message || 'Something went wrong'
            );
        }
    };

    // Verify OTP
    const verifyOTP = async () => {
        try {
            const response = await axios.post(
                'http://localhost:3000/users/verify-otp',
                { email, otp }
            );

            setMessage(response.data.message);
            setStep(3);

        } catch (error) {
            setMessage(
                error.response?.data?.message || 'Invalid OTP'
            );
        }
    };

    // Reset Password
    const resetPassword = async () => {
        try {
            const response = await axios.post(
                'http://localhost:3000/users/reset-password',
                {
                    email,
                    otp,
                    newPassword: password
                }
            );

            setMessage(response.data.message);

        } catch (error) {
            setMessage(
                error.response?.data?.message || 'Password reset failed'
            );
        }
    };

    return (
        <div className="min-h-screen bg-[#020617] flex items-center justify-center">

            <div className="w-full max-w-md bg-[#0f172a] p-6 rounded-lg">

                <h2 className="text-2xl font-bold text-white text-center mb-5">
                    Forgot Password
                </h2>

                {/* Step 1 */}
                {step === 1 && (
                    <>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="input input-bordered w-full bg-[#020617] text-white"
                        />

                        <button
                            onClick={sendOTP}
                            className="btn btn-primary w-full mt-4"
                        >
                            Send OTP
                        </button>
                    </>
                )}

                {/* Step 2 */}
                {step === 2 && (
                    <>
                        <input
                            type="text"
                            placeholder="Enter OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            className="input input-bordered w-full bg-[#020617] text-white"
                        />

                        <button
                            onClick={verifyOTP}
                            className="btn btn-primary w-full mt-4"
                        >
                            Verify OTP
                        </button>
                    </>
                )}

                {/* Step 3 */}
                {step === 3 && (
                    <>
                        <input
                            type="password"
                            placeholder="Enter new password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="input input-bordered w-full bg-[#020617] text-white"
                        />

                        <button
                            onClick={resetPassword}
                            className="btn btn-primary w-full mt-4"
                        >
                            Reset Password
                        </button>
                    </>
                )}

                <p className="text-center text-blue-400 mt-4">
                    {message}
                </p>

            </div>
        </div>
    );
};

export default ForgotPassword;