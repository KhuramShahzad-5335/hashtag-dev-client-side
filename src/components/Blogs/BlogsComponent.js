/* eslint-disable no-unused-vars */
import "./BlogsComponent.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function BlogsComponent() {
  const [blogs, setBlogs] = useState([]);
  const [userRole, setUserRole] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/blogs");
        if (response.ok) {
          const data = await response.json();
          setBlogs(data);
        } else {
          console.error("Failed to fetch blogs");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchBlogs();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDataResponse = await fetch(
          "http://localhost:5000/api/getCurrentUser",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );

        if (userDataResponse.ok) {
          const userData = await userDataResponse.json();
          setUserRole(userData.role);
          setCurrentUser(userData.username);
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/blogs/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== id));
        alert("Deleted Successfully");
      } else {
        console.error("Failed to delete blog");
        alert("Failed to delete the blog");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const filteredBlogs =
    userRole === "Admin"
      ? blogs.filter((blog) => blog.author === currentUser)
      : blogs;

  return (
    <div className="blog-list">
      {filteredBlogs.map((blog) => (
        <div key={blog._id} className="blog-card">
          <img
            src={`http://localhost:5000/uploads/${blog.image}`}
            alt={blog.title}
          />
          <p className="card-heading">{blog.title}</p>
          <p className="para-style">Author : {blog.author}</p>
          <p className="para-style2">
            Created At: {new Date(blog.createdAt).toLocaleDateString()}
          </p>
          <div className="blog-buttons">
            <Link to={`/edit/${blog._id}`} className="edit-link">
              Edit
            </Link>
            <button
              className="delete-button"
              onClick={() => handleDelete(blog._id)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default BlogsComponent;
