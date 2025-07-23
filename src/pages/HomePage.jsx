import { useEffect, useState } from "react";
import { Navbar } from "../components/navbar";
import { axiosInstance } from "../axios/axiosInstance";
import { ErrorToast } from "../utils/toastHelper";
import BlogCard from "../components/blogCard";
import BlogModal from "../components/blogModel";

const HomePage = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedBlog, setSelectedBlog] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        const fetchAllBlogs = async () => {
            try {
                const resp = await axiosInstance.get("/all-blogs", {
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

    const openModal = (blog) => {
        setSelectedBlog(blog);
        setModalOpen(true);
    };
    const closeModal = () => {
        setModalOpen(false);
        setSelectedBlog(null);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 flex flex-col items-center">
            <Navbar />
            <div className="flex flex-col items-center justify-center text-center mt-16 px-2 sm:px-4 pb-24 w-full">
                <p className="text-4xl font-extrabold text-blue-700 mb-4">All Blogs</p>
                {loading ? (
                    <p>Loading...</p>
                ) : blogs.length === 0 ? (
                    <p className="text-lg text-gray-500">No blogs have been posted yet.</p>
                ) : (
                    <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
                        {blogs.map((blog) => (
                            <BlogCard
                                key={blog._id}
                                blog={blog}
                                onClick={() => openModal(blog)}
                            />
                        ))}
                    </div>
                )}
            </div>
            <BlogModal blog={selectedBlog} open={modalOpen} onClose={closeModal} />
        </div>
    );
};

export { HomePage };
