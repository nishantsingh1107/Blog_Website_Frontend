import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../axios/axiosInstance";
import { ErrorToast, SuccessToast } from "../utils/toastHelper";

const SignupPage = () => {
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [otp, setOtp] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async () => {
        if (isOtpSent) {
            setIsLoading(true);
            try {
                if (!email || !password || !otp) {
                    ErrorToast("Email, password & otp are required!");
                    return;
                }

                const dataObj = {
                    email,
                    password,
                    otp,
                };

                const result = await axiosInstance.post("/auth/signup", dataObj);

                if (result.status === 201) {
                    SuccessToast(result.data.message);
                    navigate("/login");
                } else {
                    ErrorToast(result.data.message);
                }
            } catch (err) {
                ErrorToast(`Cannot signup: ${err.response?.data?.message || err.message}`);
            } finally {
                setIsLoading(false);
            }
        } else {
            ErrorToast(`Cannot signup before sending otp`);
        }
    };

    const handleSendOtp = async () => {
        setIsLoading(true);
        try {
            const resp = await axiosInstance.post("/auth/send-otp", {
                email,
            });
            if (resp.data.isSuccess) {
                SuccessToast(resp.data.message);
                setIsOtpSent(true);
            } else {
                SuccessToast(resp.data.message);
            }
        } catch (err) {
            console.log(err);
            ErrorToast(`Cannot send otp: ${err.response?.data?.message || err.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white px-4">
            <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl border border-blue-100">
                <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">Signup</h2>

                <div className="space-y-5">
                    <div>
                        <label htmlFor="user-email" className="block text-blue-700 font-medium mb-1">
                            Email
                        </label>
                        <input
                            id="user-email"
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter your email address"
                            required
                        />
                    </div>

                    {isOtpSent && (
                        <>
                            <div>
                                <label htmlFor="user-otp" className="block text-blue-700 font-medium mb-1">
                                    OTP
                                </label>
                                <input
                                    id="user-otp"
                                    type="text"
                                    name="otp"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    placeholder="Enter your OTP"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="user-password" className="block text-blue-700 font-medium mb-1">
                                    Password
                                </label>
                                <input
                                    id="user-password"
                                    type="password"
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    placeholder="Enter your password"
                                    required
                                />
                            </div>
                        </>
                    )}
                </div>

                <button
                    onClick={isOtpSent ? handleRegister : handleSendOtp}
                    disabled={isLoading}
                    className={`mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200 text-lg font-medium shadow ${isLoading ? 'animate-pulse opacity-70 cursor-not-allowed' : ''}`}
                >
                    {isLoading ? "Signing up..." : isOtpSent ? "Register" : "Send OTP"}
                </button>

                <p className="mt-6 text-center text-sm text-blue-600">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-700 font-medium hover:underline">
                        Login here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export { SignupPage };
