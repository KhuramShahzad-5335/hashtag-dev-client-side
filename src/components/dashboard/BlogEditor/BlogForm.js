import "./BlogForm.css";
import React, { useState, useEffect } from "react";
import JoditEditor from "jodit-react";

function BlogForm({ onSubmit }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleContentChange = (newContent) => {
    setContent(newContent);
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("author", currentUser.username); // Use the fetched user's username as the author
    formData.append("category", category);
    formData.append("content", content);
    formData.append("image", image);

    try {
      const response = await fetch("http://localhost:5000/api/addblogs", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      if (response.ok) {
        console.log("Blog post created successfully");
        setTitle("");
        setCategory("");
        setContent("");
        setImage(null);
        onSubmit();
      } else {
        alert("Failed to create the blog.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    // Fetch the current user
    const token = localStorage.getItem("authToken");
    if (token) {
      fetch("http://localhost:5000/api/getCurrentUser", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((userData) => {
          setCurrentUser(userData);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, []);
  return (
    <div className="blogform__container">
      <form onSubmit={handleSubmit} className="blog__form">
        <div className="items">
          <label htmlFor="title" className="blogformlabels">
            Title
          </label>
          <input
            type="text"
            placeholder="Enter Title of the blog ..."
            id="title"
            name="title"
            value={title}
            onChange={handleTitleChange}
            required
          />
        </div>
        <div className="items"></div>
        <div className="items">
          <label className="blogformlabels">Body</label>
          <JoditEditor
            value={content}
            tabIndex={1}
            onBlur={handleContentChange}
            onChange={handleContentChange}
          />
        </div>
        <div className="items">
          <label htmlFor="category" className="blogformlabels">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={category}
            onChange={handleCategoryChange}
            required>
            <option value="">Select a category</option>
            <option value="Tech">Tech</option>
            <option value="Business">Business</option>
            <option value="Research">Research</option>
          </select>
        </div>
        <div className="items">
          <label htmlFor="image" className="blogformlabels">
            Image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
        </div>
        <div className="items">
          <button type="submit">Save Blog</button>
        </div>
      </form>
    </div>
  );
}

export default BlogForm;
