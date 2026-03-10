import React from "react";
import { Link } from "react-router-dom";
import { Clock, Bookmark, Heart } from "lucide-react";
import { useAuth } from "../../context/AuthContext.js";
import toast from "react-hot-toast";
import axios from "axios";

const PostCard = ({ post, onEngagementUpdate }) => {
  const { user, token } = useAuth();

  const handleEngagement = async (type) => {
    if (!user) return toast.error(`Please login to ${type === 'like' ? 'like' : 'save'} posts.`);
    
    try {
      const endpoint = type === 'like' 
        ? `http://127.0.0.1:8000/api/engagement/posts/${post.slug}/like/`
        : `http://127.0.0.1:8000/api/engagement/posts/${post.slug}/bookmark/`;
        
      await axios.post(endpoint, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (onEngagementUpdate) onEngagementUpdate();
      toast.success(`${type === 'like' ? 'Like' : 'Bookmark'} updated`);
    } catch {
      toast.error(`Failed to update ${type}`);
    }
  };
  return (
    <div className="flex flex-col sm:flex-row gap-6 py-8 border-b border-gray-100 dark:border-gray-800 group">
      <div className="flex-1 flex flex-col justify-center">
        <div className="flex items-center space-x-2 text-sm mb-3">
          <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center overflow-hidden">
            {post.author?.profile?.avatar ? (
              <img
                src={post.author.profile.avatar}
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-xs font-medium text-gray-500">
                {post.author?.username?.[0]?.toUpperCase()}
              </span>
            )}
          </div>
          <span className="font-medium text-gray-900 dark:text-gray-100">
            {post.author?.username}
          </span>
          <span className="text-gray-500 text-xs">•</span>
          <span className="text-gray-500 text-xs">
            {new Date(post.created_at).toLocaleDateString(undefined, {
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>

        <Link to={`/posts/${post.slug}`} className="block group">
          <h2 className="text-xl sm:text-2xl font-bold leading-tight text-gray-900 dark:text-gray-100 group-hover:underline decoration-2 mb-2 line-clamp-2">
            {post.title}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 line-clamp-2 sm:line-clamp-3 text-base leading-snug font-serif pr-0 sm:pr-4">
            {post.excerpt ||
              post.content.replace(/<[^>]+>/g, "").substring(0, 150) + "..."}
          </p>
        </Link>

        <div className="flex items-center justify-between mt-auto pt-4">
          <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
            {post.category && (
              <Link
                to={`/explore?category=${post.category.slug || post.category.name}`}
                className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition px-3 py-1 rounded-full font-medium"
              >
                {post.category.name}
              </Link>
            )}
            <div className="flex items-center space-x-1">
              <Clock className="w-3.5 h-3.5" />
              <span>
                {Math.max(1, Math.ceil(post.content?.length / 1000))} min read
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button 
              onClick={(e) => {
                e.preventDefault();
                handleEngagement('like');
              }}
              className={`transition p-1 flex items-center space-x-1 ${post.is_liked ? "text-red-500 hover:text-red-600" : "text-gray-400 hover:text-red-500 dark:text-gray-500"}`}
            >
              <Heart className={`w-5 h-5 ${post.is_liked ? "fill-current" : ""}`} />
            </button>
            <button 
              onClick={(e) => {
                e.preventDefault();
                handleEngagement('bookmark');
              }}
              className={`transition p-1 ${post.is_bookmarked ? "text-blue-500 hover:text-blue-600" : "text-gray-400 hover:text-blue-500 dark:text-gray-500"}`}
            >
              <Bookmark className={`w-5 h-5 ${post.is_bookmarked ? "fill-current" : ""}`} />
            </button>
          </div>
        </div>
      </div>

      {post.featured_image && (
        <div className="w-full sm:w-[200px] h-40 sm:h-[134px] order-first sm:order-last mb-4 sm:mb-0">
          <Link to={`/posts/${post.slug}`}>
            <img
              src={post.featured_image}
              alt={post.title}
              className="w-full h-full object-cover rounded-md group-hover:opacity-95 transition"
            />
          </Link>
        </div>
      )}
    </div>
  );
};

export default PostCard;
