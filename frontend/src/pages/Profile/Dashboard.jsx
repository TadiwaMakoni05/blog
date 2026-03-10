import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext.js";
import toast from "react-hot-toast";

const Dashboard = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [categories, setCategories] = useState([]);
  const { token } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(
          "http://127.0.0.1:8000/api/blog/categories/",
        );
        setCategories(res.data);
      } catch (err) {
        console.error("Failed to fetch categories", err);
      }
    };
    fetchCategories();
  }, []);

  // Watch for changes on the file input to generate a preview
  const featuredImageFile = watch("featured_image");

  React.useEffect(() => {
    if (featuredImageFile && featuredImageFile.length > 0) {
      const file = featuredImageFile[0];
      const objectUrl = URL.createObjectURL(file);
      setImagePreview(objectUrl);

      // Cleanup
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setImagePreview(null);
    }
  }, [featuredImageFile]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("content", data.content);
      formData.append("excerpt", data.excerpt);
      formData.append("status", data.status);

      // Explicitly append the category ID from the form
      if (data.category_id) {
        formData.append("category_id", data.category_id);
      }

      if (data.featured_image && data.featured_image[0]) {
        formData.append("featured_image", data.featured_image[0]);
      }

      const res = await axios.post(
        "http://127.0.0.1:8000/api/blog/posts/",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );

      toast.success("Post successfully created!");
      navigate(`/posts/${res.data.slug}`);
    } catch (error) {
      toast.error("Failed to create post.", error.response?.data);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-4 sm:mt-8 fade-in pb-20">
      <h1 className="text-2xl sm:text-4xl font-bold mb-6 sm:mb-8">Author Dashboard</h1>

      <div className="card p-4 sm:p-8">
        <h2 className="text-2xl font-bold mb-6">Create New Post</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 flex flex-col"
        >
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              {...register("title", { required: true })}
              className="input-field"
              placeholder="Enter post title"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">Title is required</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Excerpt</label>
            <textarea
              {...register("excerpt")}
              className="input-field h-24"
              placeholder="Brief summary of the post..."
            />
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">
                Featured Image
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-700 border-dashed rounded-md bg-white dark:bg-black relative overflow-hidden group h-48 sm:h-64">
                {/* Single file input spanning the entire container */}
                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-50"
                  {...register("featured_image")}
                  title={imagePreview ? "Change Image" : "Upload Image"}
                />

                {imagePreview ? (
                  <>
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="absolute inset-0 w-full h-full object-cover rounded-md pointer-events-none"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-200 pointer-events-none z-40">
                      <span className="text-white font-medium text-sm">
                        Click to Change Image
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="space-y-1 text-center flex flex-col items-center justify-center pointer-events-none">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4h-12m12-12l-10-10a4 4 0 00-5.656 0L10 32m14-14h.01M24 12h.01m4 4h.01M32 8h.01M36 12h.01"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-600 dark:text-gray-400">
                      <span className="font-medium text-blue-600">
                        Upload a file
                      </span>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-500">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="lg:w-1/3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Category
                </label>
                <select
                  {...register("category_id", { required: true })}
                  className="input-field"
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                {errors.category_id && (
                  <p className="text-red-500 text-sm mt-1">
                    Category is required
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Status</label>
                <select {...register("status")} className="input-field">
                  <option value="Draft">Draft</option>
                  <option value="Published">Publish</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Content</label>
            <textarea
              {...register("content", { required: true })}
              className="input-field h-64 font-serif leading-relaxed"
              placeholder="Write your post content using Markdown or HTML..."
            />
            {errors.content && (
              <p className="text-red-500 text-sm mt-1">Content is required</p>
            )}
          </div>

          <div className="pt-4 border-t border-gray-200 dark:border-gray-800 flex justify-end">
            <button type="submit" disabled={isLoading} className="btn-primary">
              {isLoading ? "Publishing..." : "Publish Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Dashboard;
