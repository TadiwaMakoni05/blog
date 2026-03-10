import React, { useEffect, useState } from "react";
import axios from "axios";
import PostCard from "../components/blog/PostCard";
import { PostCardSkeleton } from "../components/common/Skeleton";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/blog/posts/");
        setPosts(res.data.results || []);
      } catch (error) {
        console.error("Failed to fetch posts", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="fade-in max-w-4xl mx-auto">
      <header className="mb-8 sm:mb-12 border-b border-gray-200 dark:border-gray-800 pb-6 sm:pb-8">
        <h1 className="text-3xl sm:text-5xl font-serif tracking-tight mb-3 sm:mb-4">
          Latest Insights
        </h1>
        <p className="text-base sm:text-xl text-gray-600 dark:text-gray-400">
          Discover cutting-edge articles, tutorials, and discussions.
        </p>
      </header>

      <div className="flex flex-col">
        {loading ? (
          <>
            <PostCardSkeleton />
            <PostCardSkeleton />
            <PostCardSkeleton />
            <PostCardSkeleton />
          </>
        ) : posts.length > 0 ? (
          posts.map((post) => <PostCard key={post.id} post={post} />)
        ) : (
          <div className="text-center py-20 text-gray-500">
            No posts published yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
