"use client";

import { useState } from "react";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function PostCard({ post, onPostDeleted }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    setIsDeleting(true);
    try {
      await axios.delete(`${API_URL}/posts/${post._id}`);
      onPostDeleted(post._id);
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Failed to delete post");
    }
    setIsDeleting(false);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="post-card">
      <div className="post-header">
        <h2>{post.title}</h2>
        <button
          className="delete-btn"
          onClick={handleDelete}
          disabled={isDeleting}
        >
          {isDeleting ? "..." : "×"}
        </button>
      </div>

      <div className="post-meta">
        <span>By {post.author}</span>
        <span>{formatDate(post.createdAt)}</span>
      </div>

      <div className="post-content">
        <p>{post.content}</p>
      </div>
    </div>
  );
}
