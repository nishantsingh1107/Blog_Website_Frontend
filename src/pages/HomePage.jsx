import { useEffect, useState } from "react";
import { Navbar } from "../components/navbar";
import { axiosInstance } from "../axios/axiosInstance";
import { ErrorToast } from "../utils/toastHelper";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllBlogs = async () => {
      try {
        const resp = await axiosInstance.get("/all-blogs", {
          withCredentials: true,
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
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 flex flex-col items-center">
      <Navbar />
      <div className="flex flex-col items-center justify-center text-center mt-10 px-2 sm:px-4 pb-24 w-full">
        <p className="text-4xl font-extrabold text-blue-700 mb-4">All Blogs</p>
        {loading ? (
          <p>Loading...</p>
        ) : blogs.length === 0 ? (
          <p className="text-lg text-gray-500">
            No blogs have been posted yet.
          </p>
        ) : (
          <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
            {blogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-gradient rounded-xl shadow p-4 border border-blue-200 cursor-pointer hover:shadow-xl hover:scale-105 transition-transform duration-200 relative flex flex-col h-full min-h-[100px]"
                onClick={() => navigate(`/blog/${blog._id}`)}
              >
                <div className="flex-1">
                  <h2 className="text-lg font-bold text-blue-700 mb-1">
                    {blog.title}
                  </h2>
                  <p className="text-gray-700 text-sm mb-2">
                    {blog.content.replace(/<[^>]+>/g, "").slice(0, 100) +
                      (blog.content.length > 100 ? "..." : "")}
                  </p>
                </div>
                {blog.author && blog.author.name && (
                  <p className="text-xs text-blue-700 font-semibold mb-1 text-left">
                    {blog.author.name}
                  </p>
                )}
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-blue-100">
                  <p className="text-xs text-gray-400">
                    {new Date(blog.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export { HomePage };
