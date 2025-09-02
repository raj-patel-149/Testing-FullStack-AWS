"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import PostCard from "./components/PostCard";
import CreatePost from "./components/CreatePost";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`${API_URL}/posts`);
      setPosts(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setLoading(false);
    }
  };

  const handlePostCreated = (newPost) => {
    setPosts([newPost, ...posts]);
    setShowCreateForm(false);
  };

  const handlePostDeleted = (deletedId) => {
    setPosts(posts.filter((post) => post._id !== deletedId));
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="container">
      <header className="header">
        <h1>Simple Blog</h1>
        <button
          className="create-btn"
          onClick={() => setShowCreateForm(!showCreateForm)}
        >
          {showCreateForm ? "Cancel" : "Create Post"}
        </button>
      </header>

      <main className="main">
        {showCreateForm && <CreatePost onPostCreated={handlePostCreated} />}

        <div className="posts-grid">
          {posts.length === 0 ? (
            <p>No posts yet. Create your first post!</p>
          ) : (
            posts.map((post) => (
              <PostCard
                key={post._id}
                post={post}
                onPostDeleted={handlePostDeleted}
              />
            ))
          )}
        </div>
      </main>
    </div>
  );
}
