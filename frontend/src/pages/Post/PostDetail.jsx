import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import { User, Clock, Eye, Heart, Bookmark } from "lucide-react";
import { useAuth } from "../../context/AuthContext.js";
import toast from "react-hot-toast";
import CommentTree from "../../components/blog/CommentTree";
import { PostDetailSkeleton } from "../../components/common/Skeleton";

const PostDetail = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user, token } = useAuth();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const config = token
          ? { headers: { Authorization: `Bearer ${token}` } }
          : {};
        const res = await axios.get(
          `http://127.0.0.1:8000/api/blog/posts/${slug}/`,
          config,
        );
        setPost(res.data);
      } catch (error) {
        console.error("Failed to fetch post", error);
        toast.error("Post not found.");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug, token]);

  if (loading) return <PostDetailSkeleton />;
  if (!post)
    return <div className="text-center py-20">Article could not be found.</div>;

  const handleLike = async () => {
    if (!user) return toast.error("Please login to like posts.");
    try {
      await axios.post(
        `http://127.0.0.1:8000/api/engagement/posts/${slug}/like/`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setPost(prev => ({ ...prev, is_liked: !prev.is_liked }));
      toast.success("Like updated");
    } catch (error) {
      toast.error("Failed to update like", error.response.data);
    }
  };

  const handleBookmark = async () => {
    if (!user) return toast.error("Please login to save posts.");
    try {
      await axios.post(
        `http://127.0.0.1:8000/api/engagement/posts/${slug}/bookmark/`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setPost(prev => ({ ...prev, is_bookmarked: !prev.is_bookmarked }));
      toast.success("Bookmark updated");
    } catch (error) {
      toast.error("Failed to update bookmark", error.response.data);
    }
  };

  return (
    <article className="max-w-3xl mx-auto fade-in">
      <Helmet>
        <title>{post.title} - TheBlog</title>
        <meta name="description" content={post.excerpt} />
      </Helmet>

      <header className="mb-6 sm:mb-10 text-center">
        {post.category && (
          <span className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-4 block">
            {post.category.name}
          </span>
        )}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-6">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center justify-center gap-6 text-gray-600 dark:text-gray-400 text-sm font-medium">
          <div className="flex items-center space-x-2">
            <User className="w-4 h-4" />
            <Link
              to={`/profile/${post.author?.username}`}
              className="hover:text-black dark:hover:text-white"
            >
              {post.author?.username}
            </Link>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4" />
            <span>{new Date(post.created_at).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Eye className="w-4 h-4" />
            <span>{post.view_count} views</span>
          </div>
        </div>
      </header>

      {post.featured_image && (
        <div className="w-full h-48 sm:h-64 md:h-96 rounded-xl overflow-hidden mb-8 sm:mb-12 shadow-md">
          <img
            src={post.featured_image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="prose prose-lg dark:prose-invert max-w-none mb-16">
        {/* Normally we use dangerouslySetInnerHTML if content is rich text */}
        <div
          dangerouslySetInnerHTML={{
            __html: post.content.replace(/\n/g, "<br />"),
          }}
        />
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-b border-gray-200 dark:border-gray-800 py-4 sm:py-6 mb-8 sm:mb-12">
        <div className="flex items-center space-x-4">
          <button
            onClick={handleLike}
            className={`flex items-center space-x-2 p-2 rounded-full transition ${post.is_liked ? "text-red-500 bg-red-50 dark:bg-red-900/20" : "hover:bg-gray-100 dark:hover:bg-gray-800"}`}
          >
            <Heart className={`w-6 h-6 ${post.is_liked ? "fill-current" : ""}`} />
            <span className="font-medium">Like</span>
          </button>
          <button
            onClick={handleBookmark}
            className={`flex items-center space-x-2 p-2 rounded-full transition ${post.is_bookmarked ? "text-blue-500 bg-blue-50 dark:bg-blue-900/20" : "hover:bg-gray-100 dark:hover:bg-gray-800"}`}
          >
            <Bookmark className={`w-6 h-6 ${post.is_bookmarked ? "fill-current" : ""}`} />
            <span className="font-medium">Save</span>
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {post.tags?.map((tag) => (
            <span
              key={tag.id}
              className="text-xs bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full font-medium"
            >
              #{tag.name}
            </span>
          ))}
        </div>
      </div>

      {/* Comments */}
      <section id="comments" className="mt-12">
        <CommentTree slug={slug} />
      </section>
    </article>
  );
};

export default PostDetail;
