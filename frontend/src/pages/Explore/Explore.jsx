import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import PostCard from "../../components/blog/PostCard";
import { PostCardSkeleton } from "../../components/common/Skeleton";
import { Search } from "lucide-react";

const Explore = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || "",
  );

  const category = searchParams.get("category");
  const tag = searchParams.get("tag");

  useEffect(() => {
    const fetchFilteredPosts = async () => {
      setLoading(true);
      try {
        let url = "http://127.0.0.1:8000/api/blog/posts/?";
        if (searchQuery) url += `search=${searchQuery}&`;
        if (category) url += `category=${category}&`;
        if (tag) url += `tag=${tag}&`;

        const res = await axios.get(url);
        setPosts(res.data.results || []);
      } catch (error) {
        console.error("Failed to fetch posts", error);
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(() => {
      fetchFilteredPosts();
    }, 500);

    return () => clearTimeout(debounce);
  }, [searchQuery, category, tag]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchParams({ search: searchQuery });
  };

  return (
    <div className="fade-in max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 sm:mb-10 gap-4 sm:gap-6">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Explore</h1>
          <p className="text-gray-500 mt-2">
            Discover stories, thinking, and expertise.
          </p>
        </div>

        <form onSubmit={handleSearch} className="relative w-full md:w-96">
          <input
            type="text"
            placeholder="Search posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-field pl-10 full-w"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </form>
      </div>

      <div className="flex gap-2 mb-8 flex-wrap">
        {category && (
          <span className="bg-black text-white px-3 py-1 rounded-full text-sm">
            Category: {category}
          </span>
        )}
        {tag && (
          <span className="bg-black text-white px-3 py-1 rounded-full text-sm">
            Tag: {tag}
          </span>
        )}
        {(category || tag) && (
          <button
            onClick={() => setSearchParams({})}
            className="text-sm underline hover:text-red-500 ml-2"
          >
            Clear Filters
          </button>
        )}
      </div>

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
            No posts found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
};

export default Explore;
