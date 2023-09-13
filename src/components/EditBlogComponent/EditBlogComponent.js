import React, { useState, useEffect } from "react";
import JoditEditor from "jodit-react";
import { useParams } from "react-router-dom";

function EditBlogComponent() {
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [currentUser, setCurrentUser] = useState(null); // Add currentUser state

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/blogs/${id}`);
        if (response.ok) {
          const data = await response.json();
          console.log("Fetched Blog Data:", data); // Log fetched data
          setTitle(data.title);
          setCategory(data.category);
          setContent(data.content);
        } else {
          console.error("Failed to fetch blog data");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchBlogData();
  }, [id]);

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
    formData.append("author", currentUser.username);
    formData.append("category", category);
    formData.append("content", content);

    if (image) {
      formData.append("image", image);
    }

    console.log("Form Data:", formData);

    try {
      const response = await fetch(`http://localhost:5000/${id}`, {
        method: "PUT",
        body: formData,
      });
      if (response.ok) {
        console.log("Blog updated successfully");
      } else {
        console.error("Failed to update blog");
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
            <option value="Category1">Tech</option>
            <option value="Category2">Business</option>
            <option value="Category3">Research</option>
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
          />
        </div>
        <div className="items">
          <button type="submit">Update Blog</button>
        </div>
      </form>
    </div>
  );
}

export default EditBlogComponent;
