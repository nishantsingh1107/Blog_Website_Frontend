import React from "react";
import { Dialog } from "@headlessui/react";

const BlogModel = ({ blog, open, onClose }) => {
    return (
        <Dialog open={open} onClose={onClose} className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="fixed inset-0 bg-white/70 backdrop-blur-sm transition-opacity" aria-hidden="true" onClick={onClose} />
            <div className="relative z-10 max-h-[90vh] w-full max-w-2xl mx-auto flex items-center justify-center">
                <Dialog.Panel className="bg-white rounded-2xl shadow-2xl p-8 w-full overflow-y-auto max-h-[90vh] border border-blue-200">
                    <button
                        className="absolute top-3 right-4 text-gray-400 hover:text-blue-700 text-3xl font-bold focus:outline-none"
                        onClick={onClose}
                        aria-label="Close"
                    >
                        &times;
                    </button>
                    <Dialog.Title className="text-2xl font-bold text-blue-700 mb-2 text-center">
                        {blog?.title}
                    </Dialog.Title>
                    <div className="prose max-w-none whitespace-pre-wrap break-words mb-4 text-gray-800">
                        <div dangerouslySetInnerHTML={{ __html: blog?.content || '' }} />
                    </div>
                    <p className="text-xs text-gray-400 text-center">Created: {blog ? new Date(blog.createdAt).toLocaleString() : ''}</p>
                </Dialog.Panel>
            </div>
        </Dialog>
    );
};

export default BlogModel; 