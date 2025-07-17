import { Navbar } from "../components/navbar";

const HomePage = () => {
    return (
        <div className="min-h-screen bg-white flex flex-col items-center">
            <Navbar />
            <div className="flex flex-col items-center justify-center text-center mt-16 px-4">
                <p className="text-4xl font-extrabold text-blue-700 mb-4">HomePage</p>
            </div>
        </div>
    );
};

export { HomePage };
