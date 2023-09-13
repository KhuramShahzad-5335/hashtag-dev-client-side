import "./Dashboard.css";
import React, { useState, useEffect } from "react";

import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

import ViewBlogsCard from "../../components/components for Dashboard/ViewBlogsCard";
import CreateBlogsCard from "../../components/components for Dashboard/CreateBlogsCard";
import EditBlogsCard from "../../components/components for Dashboard/EditBlogsCard";
import UserManagerCard from "../../components/components for Dashboard/UserManagerCard";

function Dashboard() {
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
          // Now, you have access to the user's data, including the role
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
    <div className="dashboard__wrapper">
      <div className="header__container">
        <Header />
      </div>
      <div className="d__body__container">
        <div className="cards__container">
          <ViewBlogsCard />
          <CreateBlogsCard />
          <EditBlogsCard />
        </div>
        {role === "Super Admin" && <UserManagerCard />}{" "}
        {/* Conditionally render UserManagerCard */}
      </div>
      <div className="footer__body">
        <Footer />
      </div>
    </div>
  );
}

export default Dashboard;
