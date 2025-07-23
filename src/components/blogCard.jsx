import React from "react";

const BlogCard = ({ blog, onClick, onEdit, onDelete, isDeleting }) => {
    const snippet = blog.content.replace(/<[^>]+>/g, '').slice(0, 100) + (blog.content.length > 100 ? '...' : '');
    return (
        <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl shadow p-4 border border-blue-200 cursor-pointer hover:shadow-xl hover:scale-105 transition-transform duration-200 relative flex flex-col h-full min-h-[100px]">
            <div className="flex-1" onClick={onClick}>
                <h2 className="text-lg font-bold text-blue-700 mb-1">{blog.title}</h2>
                <p className="text-gray-700 text-sm mb-2">{snippet}</p>
            </div>
            {blog.author && blog.author.name && (
                <p className="text-xs text-blue-700 font-semibold mb-1 text-left">{blog.author.name}</p>
            )}
            <div className="flex items-center justify-between mt-2 pt-2 border-t border-blue-100">
                <p className="text-xs text-gray-400">{new Date(blog.createdAt).toLocaleString()}</p>
                <div className="flex gap-2">
                    {onEdit && (
                        <button
                            className="px-3 py-1 text-xs rounded bg-blue-100 text-blue-700 font-semibold hover:bg-blue-200 transition"
                            onClick={e => { e.stopPropagation(); onEdit(blog); }}
                            disabled={isDeleting}
                        >Edit</button>
                    )}
                    {onDelete && (
                        <button
                            className={`px-3 py-1 text-xs rounded bg-red-100 text-red-700 font-semibold hover:bg-red-200 transition ${isDeleting ? 'animate-pulse opacity-70 cursor-not-allowed' : ''}`}
                            onClick={e => { e.stopPropagation(); onDelete(blog); }}
                            disabled={isDeleting}
                        >
                            {isDeleting ? "Deleting..." : "Delete"}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BlogCard;
