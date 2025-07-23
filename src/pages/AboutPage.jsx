import { Navbar } from "../components/navbar";

const AboutPage = () => {
    return (
        <div>
            <Navbar />
            <div className="flex flex-col items-center justify-center mt-10 px-4 pb-16">
                <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl p-10 border border-blue-200 flex flex-col items-center">
                    <h1 className="text-4xl font-extrabold text-blue-700 mb-2 text-center">Welcome to Blogify</h1>
                    <h2 className="text-xl font-semibold text-blue-500 mb-6 text-center">Where Ideas Find Their Voice.</h2>
                    <p className="text-lg text-gray-700 mb-6 text-center">
                        At <span className="font-bold text-blue-600">Blogify</span>, we believe that every story deserves a stage. Whether you’re an established writer, an aspiring blogger, or someone who simply wants to share their knowledge and experiences with the world, Blogify is crafted to be your trusted companion on this journey.
                    </p>
                    <div className="w-full mb-8">
                        <h3 className="text-2xl font-bold text-blue-700 mb-2 flex items-center gap-2">
                            <span className="inline-block">🎯</span> Our Mission
                        </h3>
                        <p className="text-gray-700 mb-4 pl-7">
                            To empower creators by providing a beautiful, intuitive, and powerful platform to express, connect, and inspire.
                        </p>
                    </div>
                    <div className="w-full mb-8">
                        <h3 className="text-2xl font-bold text-blue-700 mb-2 flex items-center gap-2">
                            <span className="inline-block">✨</span> Why Blogify?
                        </h3>
                        <ul className="space-y-3 pl-7">
                            <li className="flex items-start gap-2">
                                <span className="text-2xl">✍️</span>
                                <span><span className="font-semibold text-blue-600">An Elegant, Distraction-Free Editor:</span> Focus purely on your words with our minimalist, easy-to-use writing interface.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-2xl">🔒</span>
                                <span><span className="font-semibold text-blue-600">Robust Security & Privacy:</span> We prioritise your data and account security with secure authentication and modern best practices.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-2xl">📱</span>
                                <span><span className="font-semibold text-blue-600">Responsive Design:</span> Your blog looks stunning on all devices, from desktops to tablets and mobiles.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-2xl">🌐</span>
                                <span><span className="font-semibold text-blue-600">Rich Media Support:</span> Embed images, code snippets, links, and more to bring your posts to life effortlessly.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-2xl">🤝</span>
                                <span><span className="font-semibold text-blue-600">A Growing Community:</span> Connect with fellow writers, discover inspiring blogs, and grow your audience organically.</span>
                            </li>
                        </ul>
                    </div>
                    <div className="w-full mb-8">
                        <h3 className="text-2xl font-bold text-blue-700 mb-2 flex items-center gap-2">
                            <span className="inline-block">💡</span> Our Values
                        </h3>
                        <ul className="space-y-2 pl-7">
                            <li><span className="font-semibold text-blue-600">Simplicity.</span> Because sharing your ideas should never be complicated.</li>
                            <li><span className="font-semibold text-blue-600">Creativity.</span> Your unique voice deserves a platform that enhances, not limits, your expression.</li>
                            <li><span className="font-semibold text-blue-600">Trust.</span> We respect your privacy and are committed to keeping your data safe.</li>
                            <li><span className="font-semibold text-blue-600">Innovation.</span> We continuously refine our platform based on your needs and feedback.</li>
                        </ul>
                    </div>
                    <div className="w-full mb-8">
                        <h3 className="text-2xl font-bold text-blue-700 mb-2 flex items-center gap-2">
                            <span className="inline-block">👥</span> Our Team
                        </h3>
                        <p className="text-gray-700 pl-7">
                            Blogify is built by a passionate team of developers, designers, and writers who deeply care about crafting a platform that empowers creators globally. Every feature is designed with attention to detail and a commitment to user experience.
                        </p>
                    </div>
                    <div className="w-full">
                        <h3 className="text-2xl font-bold text-blue-700 mb-2 flex items-center gap-2">
                            <span className="inline-block">🚀</span> Join Us
                        </h3>
                        <p className="text-gray-700 pl-7 mb-2">
                            Whether you’re writing your first blog or managing a growing publication, Blogify is here to amplify your voice and connect you with readers worldwide.
                        </p>
                        <p className="text-blue-600 font-semibold text-center mt-4 text-lg">
                            We’re excited to be part of your creative journey.<br />
                            <span className="text-blue-800">Start writing today – your words can change the world.</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export { AboutPage };
