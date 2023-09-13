import React from "react";
import BlogForm from "./BlogForm";

function BlogEditor() {
  const handleSubmit = (formData) => {
    console.log("Form data:", formData);
  };

  return (
    <div className="editor__container">
      <BlogForm onSubmit={handleSubmit} />
    </div>
  );
}

export default BlogEditor;
