import { useEffect, useState } from "react";
import { Navbar } from "../components/navbar";
import { axiosInstance } from "../axios/axiosInstance";
import { ErrorToast } from "../utils/toastHelper";
import { useNavigate } from "react-router-dom";

const MyBlogsPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyBlogs = async () => {
      try {
        const resp = await axiosInstance.get("/blogs/my-blogs", {
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
    fetchMyBlogs();
  }, []);

  const handleEdit = (blog) => {
    window.location.href = `/edit-blog/${blog._id}`;
  };

  const handleDelete = async (blog) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    setDeletingId(blog._id);
    try {
      const resp = await axiosInstance.delete(`/blogs/${blog._id}`, {
        withCredentials: true,
      });
      if (resp.data.isSuccess) {
        setBlogs(blogs.filter((b) => b._id !== blog._id));
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
      <div className="flex flex-col items-center justify-center text-center mt-10 px-4 pb-24 w-full">
        <p className="text-4xl font-extrabold text-blue-700 mb-4">My Blogs</p>
        {loading ? (
          <p>Loading...</p>
        ) : blogs.length === 0 ? (
          <p className="text-lg text-gray-500">
            You have not created any blogs yet.
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
                  <div className="flex gap-2">
                    <button
                      className="px-3 py-1 text-xs rounded bg-blue-100 text-blue-700 font-semibold hover:bg-blue-200 transition"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(blog);
                      }}
                      disabled={deletingId === blog._id}
                    >
                      Edit
                    </button>
                    <button
                      className={`px-3 py-1 text-xs rounded bg-red-100 text-red-700 font-semibold hover:bg-red-200 transition ${
                        deletingId === blog._id
                          ? "animate-pulse opacity-70 cursor-not-allowed"
                          : ""
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(blog);
                      }}
                      disabled={deletingId === blog._id}
                    >
                      {deletingId === blog._id ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export { MyBlogsPage };
