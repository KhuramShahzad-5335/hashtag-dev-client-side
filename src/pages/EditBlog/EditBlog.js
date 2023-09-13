import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import EditBlogComponent from "../../components/EditBlogComponent/EditBlogComponent";

function EditBlog() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/blogs/${id}`);
        if (response.ok) {
          const data = await response.json();
          setTitle(data.title);
          setAuthor(data.author);
          setCategory(data.category);
          setContent(data.content);
        } else {
          console.error("Failed to fetch blog data");
          alert("Failed to fetch the blogs");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchBlogData();
  }, [id]);

  return (
    <div className="Wrapper">
      <div className="header__container">
        <Header />
      </div>
      <div className="blogeditor__container">
        <EditBlogComponent
          blogId={id}
          title={title}
          category={category}
          content={content}
          author={author}
        />
      </div>
      <div className="footer__container">
        <Footer />
      </div>
    </div>
  );
}

export default EditBlog;
