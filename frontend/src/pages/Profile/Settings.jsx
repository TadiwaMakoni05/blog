import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext.js";
import { useTheme } from "../../context/ThemeContext.js";
import axios from "axios";
import toast from "react-hot-toast";

const Settings = () => {
  const { user, setUser, token } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();

  const [bio, setBio] = useState(user?.profile?.bio || "");
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(
    user?.profile?.avatar || "",
  );
  const [isSaving, setIsSaving] = useState(false);

  if (!user) return null;

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    const formData = new FormData();
    formData.append("bio", bio);
    if (avatarFile) {
      formData.append("avatar", avatarFile);
    }

    try {
      const res = await axios.put(
        "http://127.0.0.1:8000/api/users/profile/me/",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );
      setUser(res.data);
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile", error.response?.data);
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-4 sm:mt-8 fade-in">
      <h1 className="text-2xl sm:text-4xl font-bold mb-4 sm:mb-6">Settings</h1>

      <div className="card p-4 sm:p-6 space-y-8 mb-8">
        <div>
          <h3 className="text-lg font-bold border-b pb-2 mb-4 dark:border-gray-800">
            Appearance
          </h3>
          <div className="flex items-center justify-between">
            <span>Dark Mode</span>
            <button
              onClick={toggleTheme}
              className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 ${isDarkMode ? "bg-white" : "bg-black"}`}
            >
              <div
                className={`w-4 h-4 rounded-full transition-transform duration-200 transform ${isDarkMode ? "translate-x-6 bg-black" : "bg-white"}`}
              />
            </button>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold border-b pb-2 mb-4 dark:border-gray-800">
            Account Details (Read-only)
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Username</label>
              <input
                disabled
                value={user.username}
                className="input-field opacity-60 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                disabled
                value={user.email}
                className="input-field opacity-60 cursor-not-allowed"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="card p-4 sm:p-6">
        <h3 className="text-lg font-bold border-b pb-2 mb-4 dark:border-gray-800">
          Public Profile
        </h3>
        <form onSubmit={handleSaveProfile} className="space-y-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
            <div className="w-20 h-20 rounded-full bg-gray-200 dark:bg-gray-800 overflow-hidden flex-shrink-0 relative group border">
              {avatarPreview ? (
                <img
                  src={avatarPreview}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="w-full h-full flex items-center justify-center font-bold text-xl uppercase">
                  {user.username[0]}
                </span>
              )}
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition cursor-pointer text-white text-xs font-semibold">
                Upload
                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={handleAvatarChange}
                />
              </div>
            </div>
            <div className="text-sm text-gray-500">
              <p>Recommended size: 256x256px.</p>
              <p>JPG, PNG, or GIF format.</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Bio</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="input-field h-24"
              placeholder="Tell the world about yourself..."
              maxLength={500}
            />
          </div>

          <div className="flex justify-end">
            <button type="submit" disabled={isSaving} className="btn-primary">
              {isSaving ? "Saving..." : "Save Profile"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;
