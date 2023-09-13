import React, { useState, useEffect } from "react";
import "./Header.css";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import SideBar from "../sideBar/SideBar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useLocation } from "react-router-dom";

function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);

  const location = useLocation();

  // Function to open the sidebar
  const openSidebar = () => {
    setIsSidebarOpen(true);
  };

  // Function to close the sidebar
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  useEffect(() => {
    // Check if a user is authenticated and retrieve user data from your authentication system
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
          // Now, you have access to the user's data, including the username
          setUser(userData);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    } else {
      setUser(null);
    }
  }, [location]);

  return (
    <>
      <div className="header__wrapper">
        <Navbar className="bg-body-tertiary">
          <Container>
            <IconButton
              style={{ margin: "20px", color: "#eee" }}
              type="primary"
              aria-label="open sidebar"
              onClick={openSidebar}>
              <MenuIcon />
            </IconButton>

            <Navbar.Brand href="/dashboard">HASHTAG-WEB.DEV</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              {user ? (
                <Navbar.Text>Signed in as: {user.username}</Navbar.Text>
              ) : (
                <Navbar.Text>Not signed in </Navbar.Text>
              )}
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>

      {/* Pass openSidebar function as a prop to SideBar */}
      <SideBar isOpen={isSidebarOpen} closeSidebar={closeSidebar} />
    </>
  );
}

export default Header;
