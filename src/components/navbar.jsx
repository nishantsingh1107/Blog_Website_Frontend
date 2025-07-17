import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/appContext";
import { axiosInstance } from "../axios/axiosInstance";
import { ErrorToast, SuccessToast } from "../utils/toastHelper";

const Navbar = () => {
    const { user = {} } = useAppContext();

    const { isAuthenticated } = user;

    const handleLogout = async () => {
        try {
            const result = await axiosInstance.get("/auth/logout");
            SuccessToast(result.data.message);
            window.location.reload();
        } catch (err) {
            ErrorToast(`Cannot signup: ${err.response?.data?.message || err.message}`);
        }
    };

    return (
        <div className="flex justify-center w-full mt-6">
            <nav className="bg-white border border-blue-100 shadow-lg rounded-4xl px-10 py-2 flex items-center justify-between w-full max-w-5xl min-h-[48px]">
                <Link to="/" className="text-2xl font-extrabold text-blue-600 tracking-wide">Blogify</Link>
                <div className="flex items-center gap-5">
                    <Link to="/" className="text-blue-600 hover:text-blue-800 transition text-sm font-semibold">Home</Link>
                    <Link to="/all-blogs" className="text-blue-600 hover:text-blue-800 transition text-sm font-semibold">All Blogs</Link>
                    <Link to="/create-blog" className="text-blue-600 hover:text-blue-800 transition text-sm font-semibold">Create Blog</Link>
                    <Link to="/about" className="text-blue-600 hover:text-blue-800 transition text-sm font-semibold">About</Link>
                    {!isAuthenticated ? (
                        <div className="flex gap-4 items-center">
                            <Link to="/login" className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition shadow text-sm font-semibold">
                                Sign in
                            </Link>
                        </div>
                    ) : (
                        <>
                            <Link to="/profile" className="ml-2">
                                <div className="w-9 h-9 rounded-full bg-blue-200 flex items-center justify-center overflow-hidden border-2 border-blue-400 hover:border-blue-600 transition">
                                    {user?.profileImage ? (
                                        <img src={user.profileImage} alt="Profile" className="w-full h-full object-cover" />
                                    ) : (
                                        <span className="text-blue-700 font-bold text-lg">{user?.email ? user.email[0].toUpperCase() : "U"}</span>
                                    )}
                                </div>
                            </Link>
                            <button
                                className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition shadow text-sm font-semibold"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </>
                    )}
                </div>
            </nav>
        </div>
    );
};

export { Navbar };
