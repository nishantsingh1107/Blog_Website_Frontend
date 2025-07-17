import { useState } from "react";
import { Navbar } from "../components/navbar";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { ErrorToast, SuccessToast } from "../utils/toastHelper";
import { axiosInstance } from "../axios/axiosInstance";

const CreateBlogPage = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleSubmit = async (elem) => {
        elem.preventDefault();
        try{
            if(!title || !content){
                ErrorToast("Title and content are required!");
                return;
            }
            const blogData = {
                title,
                content,
            };
            const result = await axiosInstance.post("/blogs/create", blogData, {
                withCredentials: true,
            });
            if (result.status === 201 || result.status === 200) {
                SuccessToast(result.data.message || "Blog submitted successfully!");
                setTitle("");
                setContent("");
            }
            else {
                ErrorToast(result.data.message || "Failed to submit blog.");
            }
        }catch(err){
            ErrorToast(`Cannot submit blog: ${err.response?.data?.message || err.message}`);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="flex flex-col items-center justify-center mt-10 px-4 pb-16">
                <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8 border border-blue-100">
                    <h2 className="text-3xl font-extrabold text-blue-700 mb-6 text-center">Create a New Blog</h2>
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
                                placeholder="Write your blog content here..."
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition text-lg font-semibold shadow"
                        >
                            Publish Blog
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export { CreateBlogPage };