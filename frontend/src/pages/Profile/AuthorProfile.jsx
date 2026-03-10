import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext.js";
import axios from "axios";
import PostCard from "../../components/blog/PostCard";
import { PostCardSkeleton } from "../../components/common/Skeleton";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { Trash, Edit } from "lucide-react";

const AuthorProfile = () => {
  const { user, token } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("my-posts");

  const fetchPosts = React.useCallback(async () => {
    setLoading(true);
    try {
      let url = "";
      let config = {};
      
      if (activeTab === "my-posts") {
        url = `http://127.0.0.1:8000/api/blog/posts/?author=${user.username}`;
      } else if (activeTab === "likes") {
        url = `http://127.0.0.1:8000/api/engagement/likes/`;
        config = { headers: { Authorization: `Bearer ${token}` } };
      } else if (activeTab === "bookmarks") {
        url = `http://127.0.0.1:8000/api/engagement/bookmarked-posts/`;
        config = { headers: { Authorization: `Bearer ${token}` } };
      }
      
      const res = await axios.get(url, config);
      setPosts(activeTab === "my-posts" ? res.data.results : res.data);
    } catch {
      toast.error(`Failed to load ${activeTab.replace("-", " ")}.`);
    } finally {
      setLoading(false);
    }
  }, [activeTab, token, user]);

  useEffect(() => {
    if (user) fetchPosts();
  }, [user, fetchPosts]);

  if (!user) return null;

  const handleDelete = async (slug) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      await axios.delete(`http://127.0.0.1:8000/api/blog/posts/${slug}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts(posts.filter((p) => p.slug !== slug));
      toast.success("Post deleted.");
    } catch {
      toast.error("Failed to delete post.");
    }
  };

  const tabs = [
    { id: "my-posts", label: "My Posts" },
    { id: "likes", label: "Likes" },
    { id: "bookmarks", label: "Bookmarks" },
  ];

  return (
    <div className="max-w-4xl mx-auto mt-4 sm:mt-8 fade-in pb-20">
      <h1 className="text-3xl sm:text-4xl font-bold mb-4">My Profile</h1>
      <div className="card p-5 sm:p-8 mb-8 sm:mb-12">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 text-center sm:text-left">
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center text-3xl sm:text-4xl font-bold uppercase overflow-hidden flex-shrink-0">
            {user.profile?.avatar ? (
              <img
                src={user.profile.avatar}
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              user.username[0]
            )}
          </div>
          <div className="flex-1 min-w-0 w-full">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
              <h2 className="text-xl sm:text-2xl font-bold truncate">{user.username}</h2>
              <Link to="/settings" className="text-sm font-medium text-blue-600 hover:text-blue-500 shrink-0">Edit Profile</Link>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base mb-3">{user.email}</p>
            <p className="text-sm max-w-lg leading-relaxed text-gray-700 dark:text-gray-300">
              {user.profile?.bio || "No bio available."}
            </p>
          </div>
        </div>
      </div>

      <div className="border-b border-gray-200 dark:border-gray-800 mb-8 overflow-x-auto no-scrollbar">
        <div className="flex space-x-6 sm:space-x-8 min-w-max">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-4 text-sm font-bold transition-colors relative ${
                activeTab === tab.id
                  ? "text-black dark:text-white"
                  : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-black dark:bg-white" />
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col space-y-8">
        {activeTab === "my-posts" && (
          <div className="flex items-center justify-between mb-4 px-1">
            <h3 className="text-xl font-bold">Manage Content</h3>
            <Link to="/dashboard" className="btn-primary text-sm py-1.5 px-3">
              Write New
            </Link>
          </div>
        )}

        <div className="flex flex-col space-y-4">
          {loading ? (
            <>
              <PostCardSkeleton />
              <PostCardSkeleton />
            </>
          ) : posts.length > 0 ? (
            posts.map((post) => (
              <div key={post.id} className="relative group">
                <PostCard post={post} onEngagementUpdate={fetchPosts} />
                {activeTab === "my-posts" && (
                  <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white dark:bg-black p-2 rounded-md shadow-sm border border-gray-200 dark:border-gray-800">
                    <button
                      onClick={() =>
                        toast("Edit functionality coming soon!")
                      }
                      className="p-1.5 text-gray-500 hover:text-blue-600 transition"
                      title="Edit Post"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(post.slug)}
                      className="p-1.5 text-gray-500 hover:text-red-600 transition"
                      title="Delete Post"
                    >
                      <Trash className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center py-20 border-2 border-dashed border-gray-100 dark:border-gray-900 rounded-xl">
              {activeTab === "my-posts" 
                ? "You haven't published any posts yet." 
                : activeTab === "likes" 
                  ? "You haven't liked any posts yet." 
                  : "You haven't bookmarked any posts yet."}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthorProfile;
