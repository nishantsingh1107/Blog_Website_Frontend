import { useEffect, useState } from "react";
import { Navbar } from "../components/navbar";
import { axiosInstance } from "../axios/axiosInstance";
import { ErrorToast, SuccessToast } from "../utils/toastHelper";
import BlogCard from "../components/blogCard";
import BlogModal from "../components/blogModel";

const MyBlogsPage = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedBlog, setSelectedBlog] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [deletingId, setDeletingId] = useState(null);

    useEffect(() => {
        const fetchMyBlogs = async () => {
            try {
                const resp = await axiosInstance.get("/blogs/my-blogs", { withCredentials: true });
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
        fetchMyBlogs();
    }, []);

    const openModal = (blog) => {
        setSelectedBlog(blog);
        setModalOpen(true);
    };
    const closeModal = () => {
        setModalOpen(false);
        setSelectedBlog(null);
    };

    const handleEdit = (blog) => {
        window.location.href = `/edit-blog/${blog._id}`;
    };

    const handleDelete = async (blog) => {
        if (!window.confirm("Are you sure you want to delete this blog?")) return;
        setDeletingId(blog._id);
        try {
            const resp = await axiosInstance.delete(`/blogs/${blog._id}`, { withCredentials: true });
            if (resp.data.isSuccess) {
                setBlogs(blogs.filter(b => b._id !== blog._id));
                SuccessToast(resp.data.message || "Blog deleted successfully!");
            } else {
                ErrorToast(resp.data.message || "Failed to delete blog");
            }
        } catch (err) {
            ErrorToast(err.response?.data?.message || err.message);
        } finally {
            setDeletingId(null);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 flex flex-col items-center">
            <Navbar />
            <div className="flex flex-col items-center justify-center text-center mt-16 px-4 pb-24 w-full">
                <p className="text-4xl font-extrabold text-blue-700 mb-4">My Blogs</p>
                {loading ? (
                    <p>Loading...</p>
                ) : blogs.length === 0 ? (
                    <p className="text-lg text-gray-500">You have not created any blogs yet.</p>
                ) : (
                    <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
                        {blogs.map((blog) => (
                            <BlogCard
                                key={blog._id}
                                blog={blog}
                                onClick={() => openModal(blog)}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                                isDeleting={deletingId === blog._id}
                            />
                        ))}
                    </div>
                )}
            </div>
            <BlogModal blog={selectedBlog} open={modalOpen} onClose={closeModal} />
        </div>
    );
};

export { MyBlogsPage };