import "./AllBlogs.css";
import React from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import BlogsComponent from "../../components/Blogs/BlogsComponent";

function AllBlogs() {
  return (
    <div className="blogs__container">
      <div className="header__container">
        <Header />
      </div>
      <div className="body__container">
        <BlogsComponent />
      </div>
      <div className="footer__container">
        <Footer />
      </div>
    </div>
  );
}

export default AllBlogs;
