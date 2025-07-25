import { useEffect, useState, useRef } from "react";
import { Navbar } from "../components/navbar";
import { axiosInstance } from "../axios/axiosInstance";
import { ErrorToast, SuccessToast } from "../utils/toastHelper";
import { Camera } from "lucide-react";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editName, setEditName] = useState("");
  const [editGender, setEditGender] = useState("");
  const [photoUploading, setPhotoUploading] = useState(false);
  const fileInputRef = useRef();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const resp = await axiosInstance.get("/users/", {
          withCredentials: true,
        });
        if (resp.data.isSuccess && resp.data.data.user) {
          setUser(resp.data.data.user);
          setEditName(resp.data.data.user.name || "");
          setEditGender(resp.data.data.user.gender || "");
        } else {
          ErrorToast(resp.data.message || "Failed to fetch user info");
        }
      } catch (err) {
        ErrorToast(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoPreview(URL.createObjectURL(file));
      setPhotoUploading(true);
      const formData = new FormData();
      formData.append("photo", file);
      try {
        const resp = await axiosInstance.post(
          "/users/profile-photo",
          formData,
          {
            withCredentials: true,
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        if (resp.data.isSuccess) {
          setUser((prev) => ({ ...prev, imageUrl: resp.data.data.imageUrl }));
          SuccessToast(resp.data.message || "Profile photo updated");
        } else {
          ErrorToast(resp.data.message || "Failed to update profile photo");
        }
      } catch (err) {
        ErrorToast(err.response?.data?.message || err.message);
      } finally {
        setPhotoUploading(false);
      }
    }
  };

  const handleEditProfile = () => setEditMode(true);

  const handleCancelEdit = () => {
    setEditMode(false);
    setEditName(user?.name || "");
    setEditGender(user?.gender || "");
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    try {
      const resp = await axiosInstance.put(
        "/users/",
        { name: editName, gender: editGender },
        { withCredentials: true }
      );
      if (resp.data.isSuccess) {
        setUser((prev) => ({ ...prev, name: editName, gender: editGender }));
        SuccessToast(resp.data.message || "Profile updated");
        setEditMode(false);
      } else {
        ErrorToast(resp.data.message || "Failed to update profile");
      }
    } catch (err) {
      ErrorToast(err.response?.data?.message || err.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center mt-10 px-4 pb-16">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 border border-blue-100 flex flex-col items-center">
          <div className="relative mb-6">
            <img
              src={photoPreview || user?.imageUrl || "/default-profile.png"}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-blue-200 shadow"
            />
            {photoUploading && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/70 rounded-full">
                <svg
                  className="animate-spin h-8 w-8 text-blue-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  ></path>
                </svg>
              </div>
            )}
            <button
              className="absolute bottom-2 right-2 bg-blue-600 text-white rounded-full p-2 shadow hover:bg-blue-700 focus:outline-none disabled:opacity-50 cursor-pointer"
              onClick={() => fileInputRef.current.click()}
              title="Change photo"
              disabled={photoUploading}
            >
              <Camera className="w-5 h-5 text-white" strokeWidth={2} />
            </button>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handlePhotoChange}
              disabled={photoUploading}
            />
          </div>

          {editMode ? (
            <form className="w-full" onSubmit={handleSaveProfile}>
              <div className="mb-4">
                <label className="block text-blue-700 font-semibold mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-blue-700 font-semibold mb-2">
                  Gender
                </label>
                <select
                  value={editGender}
                  onChange={(e) => setEditGender(e.target.value)}
                  className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition text-lg font-semibold shadow"
                >
                  Save
                </button>
                <button
                  type="button"
                  className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition text-lg font-semibold shadow"
                  onClick={handleCancelEdit}
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-blue-700 mb-2">
                {user?.name || "No Name"}
              </h2>
              <p className="text-gray-600 mb-1">{user?.email}</p>
              <p className="text-gray-400 text-sm mb-4">
                {user?.gender
                  ? user.gender.charAt(0).toUpperCase() + user.gender.slice(1)
                  : ""}
              </p>
              <button
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition text-lg font-semibold shadow cursor-pointer"
                onClick={handleEditProfile}
              >
                Edit Profile
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export { ProfilePage };
