/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import BlogEditor from "../../components/dashboard/BlogEditor/BlogEditor";

function CreateBlog() {
  return (
    <div className="Wrapper">
      <div className="header__container">
        <Header />
      </div>
      <div className="blogeditor__container">
        <BlogEditor />
      </div>
      <div className="footer__container">
        <Footer />
      </div>
    </div>
  );
}

export default CreateBlog;
