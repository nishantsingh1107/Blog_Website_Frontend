import { Navbar } from "../components/navbar";

const MyBlogsPage = () => {
    return (
        <div>
            <Navbar />
            <div className="flex flex-col items-center justify-center text-center mt-16 px-4">
                <p className="text-4xl font-extrabold text-blue-700 mb-4">My Blogs Page</p>
            </div>
        </div>
    );
};

export { MyBlogsPage };