"use client";

import { useState } from "react";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function CreatePost({ onPostCreated }) {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.content) {
      alert("Title and content are required");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axios.post(`${API_URL}/posts`, formData);
      onPostCreated(response.data);
      setFormData({ title: "", content: "", author: "" });
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Failed to create post");
    }
    setIsSubmitting(false);
  };

  return (
    <form className="create-form" onSubmit={handleSubmit}>
      <h3>Create New Post</h3>

      <input
        type="text"
        name="title"
        placeholder="Post title"
        value={formData.title}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="author"
        placeholder="Your name (optional)"
        value={formData.author}
        onChange={handleChange}
      />

      <textarea
        name="content"
        placeholder="Write your post content here..."
        value={formData.content}
        onChange={handleChange}
        rows="5"
        required
      />

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Creating..." : "Create Post"}
      </button>
    </form>
  );
}
