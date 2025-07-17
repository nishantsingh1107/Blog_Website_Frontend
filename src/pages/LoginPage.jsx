import { useState } from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../axios/axiosInstance";
import { ErrorToast, SuccessToast } from "../utils/toastHelper";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async () => {
        try {
            if (!email || !password) {
                ErrorToast("Email & password are required!");
                return;
            }

            const dataObj = {
                email,
                password,
            };

            const result = await axiosInstance.post("/auth/login", dataObj);

            if (result.status === 200) {
                SuccessToast(result.data.message);
                window.open("/", "_self");
            } else {
                ErrorToast(result.data.message);
            }
        } catch (err) {
            ErrorToast(`Cannot signup: ${err.response?.data?.message || err.message}`);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white px-4">
            <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl border border-blue-100">
                <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">Login</h2>

                <div className="space-y-4">
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
                </div>

                <button
                    onClick={handleRegister}
                    className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200 text-lg font-medium shadow"
                >
                    Login
                </button>

                <p className="mt-6 text-center text-sm text-blue-600">
                    Don’t have an account?{" "}
                    <Link to="/signup" className="text-blue-700 font-medium hover:underline">
                        Signup here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export { LoginPage };
