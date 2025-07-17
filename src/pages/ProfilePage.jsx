import { Navbar } from "../components/navbar";

const ProfilePage = () => {
    return (
        <div>
            <Navbar />
            <div className="flex flex-col items-center justify-center text-center mt-16 px-4">
                <p className="text-4xl font-extrabold text-blue-700 mb-4">Profile Page</p>
            </div>
        </div>
    );
};

export { ProfilePage };