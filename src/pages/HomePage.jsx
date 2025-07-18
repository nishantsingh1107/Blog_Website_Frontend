import { useEffect, useState } from "react";
import { Navbar } from "../components/navbar";
import { axiosInstance } from "../axios/axiosInstance";
import { ErrorToast } from "../utils/toastHelper";

const HomePage = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAllBlogs = async () => {
            try {
                const resp = await axiosInstance.get("/all-blogs",{
                    withCredentials: true
                });
                if (resp.data.isSuccess) {
                    setBlogs(resp.data.data.blogs || []);
                } else {
                    ErrorToast(resp.data.message || "Failed to fetch blogs");
                }
            } catch (err) {
                ErrorToast(err.response?.data?.message || err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchAllBlogs();
    }, []);

    return (
        <div className="min-h-screen bg-white flex flex-col items-center">
            <Navbar />
            <div className="flex flex-col items-center justify-center text-center mt-16 px-4 pb-24 w-full">
                <p className="text-4xl font-extrabold text-blue-700 mb-4">All Blogs</p>
                {loading ? (
                    <p>Loading...</p>
                ) : blogs.length === 0 ? (
                    <p className="text-lg text-gray-500">No blogs have been posted yet.</p>
                ) : (
                    <div className="w-full max-w-3xl space-y-8 mt-8">
                        {blogs.map((blog) => (
                            <div key={blog._id} className="bg-white rounded-xl shadow p-6 border border-blue-100 text-left">
                                <h2 className="text-2xl font-bold text-blue-700 mb-2">{blog.title}</h2>
                                <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: blog.content }} />
                                {blog.author && (
                                    <p className="text-sm text-gray-600 mt-2">By: {blog.author.email || "Unknown"}</p>
                                )}
                                <p className="text-xs text-gray-400 mt-1">Created: {new Date(blog.createdAt).toLocaleString()}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export { HomePage };
