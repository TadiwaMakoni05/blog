import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext.js";
import { User } from "lucide-react";
import toast from "react-hot-toast";
import { CommentSkeleton } from "../../components/common/Skeleton";

const CommentItem = ({ comment, depth = 0 }) => {
  return (
    <div
      className={`mt-4 ${depth > 0 ? "ml-4 sm:ml-8 border-l-2 border-gray-200 dark:border-gray-800 pl-3 sm:pl-4" : "border-b border-gray-100 dark:border-gray-800 pb-4"}`}
    >
      <div className="flex items-center space-x-2 mb-2">
        <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center overflow-hidden">
          {comment.author?.profile?.avatar ? (
            <img
              src={comment.author.profile.avatar}
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          ) : (
            <User className="w-4 h-4 text-gray-500" />
          )}
        </div>
        <span className="font-bold text-sm">{comment.author?.username}</span>
        <span className="text-xs text-gray-500">
          {new Date(comment.created_at).toLocaleDateString()}
        </span>
      </div>
      <p className="text-sm mt-1">{comment.content}</p>
      {/* Note: In a full app, a "Reply" button would go here */}
      {comment.replies &&
        comment.replies.map((reply) => (
          <CommentItem key={reply.id} comment={reply} depth={depth + 1} />
        ))}
    </div>
  );
};

const CommentTree = ({ slug }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const { user, token } = useAuth();
  const [loading, setLoading] = useState(true);

  const fetchComments = async () => {
    try {
      const res = await axios.get(
        `http://127.0.0.1:8000/api/engagement/posts/${slug}/comments/`,
      );
      setComments(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [slug]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      await axios.post(
        `http://127.0.0.1:8000/api/engagement/posts/${slug}/comments/`,
        { content: newComment },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setNewComment("");
      fetchComments();
      toast.success("Comment posted!");
    } catch (error) {
      toast.error("Failed to post comment.", error.response.data);
    }
  };

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-bold mb-6">
        Discussion ({comments.length})
      </h3>

      {user ? (
        <form onSubmit={handleSubmit} className="mb-8">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Share your thoughts..."
            className="input-field h-24 mb-2"
            required
          />
          <div className="flex justify-end">
            <button type="submit" className="btn-primary">
              Post Comment
            </button>
          </div>
        </form>
      ) : (
        <div className="bg-gray-50 dark:bg-[#111] p-4 rounded-md mb-8 text-center text-sm">
          Please log in to leave a comment.
        </div>
      )}

      <div className="space-y-4">
        {loading ? (
          <div>
            <CommentSkeleton />
            <CommentSkeleton />
            <CommentSkeleton />
          </div>
        ) : comments.length > 0 ? (
          comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))
        ) : (
          <div className="text-center text-gray-500 py-8">
            No comments yet. Be the first to start the discussion!
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentTree;
