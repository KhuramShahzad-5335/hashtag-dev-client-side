import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  const [role, setRole] = useState(""); // Add state for user's role

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (token) {
      // Now, make an API request to fetch user information using the token
      fetch("http://localhost:5000/api/getCurrentUser", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((userData) => {
          // Now, you have access to the user's data, including the email and role
          setRole(userData.role); // Set the user's role in state
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    } else {
      setRole("Admin"); // Reset role if the token is not available
    }
  }, []); // Empty dependency array to run the effect only once

  return (
    <footer className="py-3 " id="footer__container">
      <Container>
        <div className="text-center">
          <h4 className="footer__heading">
            &copy; {new Date().getFullYear()} HASHTAG-WEB.DEV
          </h4>
          <p className="links__container">
            <Link className="footer__links" to="/dashboard">
              Dashboard
            </Link>{" "}
            |{" "}
            {role === "Super Admin" && ( // Conditionally render "Manage Users" link
              <Link className="footer__links" to="/UserManagementPage">
                Manage Users
              </Link>
            )}{" "}
            |{" "}
            <Link className="footer__links" to="/createblog">
              Create New Blog
            </Link>{" "}
            |{" "}
            <Link className="footer__links" to="/allblogs">
              View All Blogs
            </Link>{" "}
            |{" "}
            <Link className="footer__links" to="/register">
              Signup
            </Link>
          </p>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
