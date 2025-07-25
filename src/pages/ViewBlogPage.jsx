import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Navbar } from "../components/navbar";
import { axiosInstance } from "../axios/axiosInstance";
import { ErrorToast } from "../utils/toastHelper";

const ViewBlogPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const resp = await axiosInstance.get(`/blogs/${id}`);
        if (resp.data.isSuccess && resp.data.data.blog) {
          setBlog(resp.data.data.blog);
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

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center mt-10 px-4 pb-16 relative">
        <button
          className="absolute -top-6 left-1 sm:left-4 bg-transparent hover:bg-blue-100 text-blue-700 rounded-full p-2 transition shadow-none border-none outline-none"
          style={{ zIndex: 10 }}
          onClick={() => navigate(-1)}
          aria-label="Back"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-7 h-7"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </button>
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8 border border-blue-100 mt-6 relative">
          {loading ? (
            <div className="text-center text-blue-600">Loading...</div>
          ) : blog ? (
            <>
              <h1 className="text-3xl font-extrabold text-blue-700 mb-4 text-center break-words">
                {blog.title}
              </h1>
              <div className="prose max-w-none whitespace-pre-wrap break-words mb-6 text-gray-800">
                <div dangerouslySetInnerHTML={{ __html: blog.content }} />
              </div>
              <div className="flex flex-col items-start mt-6">
                {blog.author && blog.author.name && (
                  <span className="text-blue-700 font-semibold text-sm mb-1">
                    By {blog.author.name}
                  </span>
                )}
                <span className="text-xs text-gray-400">
                  {new Date(blog.createdAt).toLocaleString()}
                </span>
              </div>
            </>
          ) : (
            <div className="text-center text-red-500">Blog not found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export { ViewBlogPage };
