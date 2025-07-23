import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Navbar } from "../components/navbar";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { ErrorToast, SuccessToast } from "../utils/toastHelper";
import { axiosInstance } from "../axios/axiosInstance";

const EditBlogPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const resp = await axiosInstance.get(`/blogs/${id}`, { withCredentials: true });
                if (resp.data.isSuccess && resp.data.data.blog) {
                    setTitle(resp.data.data.blog.title);
                    setContent(resp.data.data.blog.content);
                } else {
                    ErrorToast(resp.data.message || "Failed to fetch blog");
                }
            } catch (err) {
                ErrorToast(err.response?.data?.message || err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchBlog();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            if (!title || !content) {
                ErrorToast("Title and content are required!");
                return;
            }
            const blogData = { title, content };
            const resp = await axiosInstance.put(`/blogs/${id}`, blogData, { withCredentials: true });
            if (resp.data.isSuccess) {
                SuccessToast(resp.data.message || "Blog updated successfully!");
                navigate("/my-blogs");
            } else {
                ErrorToast(resp.data.message || "Failed to update blog.");
            }
        } catch (err) {
            ErrorToast(err.response?.data?.message || err.message);
        } finally {
            setIsLoading(false);
        }
    };

    if (loading) {
        return <div className="flex justify-center items-center min-h-screen"><p>Loading...</p></div>;
    }

    return (
        <div>
            <Navbar />
            <div className="flex flex-col items-center justify-center mt-10 px-4 pb-16">
                <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8 border border-blue-100">
                    <h2 className="text-3xl font-extrabold text-blue-700 mb-6 text-center">Edit Blog</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-blue-700 font-semibold mb-2">Title</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                placeholder="Enter blog title"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-blue-700 font-semibold mb-2">Content</label>
                            <ReactQuill
                                theme="snow"
                                value={content}
                                onChange={setContent}
                                className="bg-white rounded-lg [&_.ql-container]:min-h-[200px]"
                                placeholder="Edit your blog content here..."
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition text-lg font-semibold shadow ${isLoading ? 'animate-pulse opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {isLoading ? "Updating..." : "Update Blog"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export { EditBlogPage };