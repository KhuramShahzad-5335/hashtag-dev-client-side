/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import EditNoteIcon from "@mui/icons-material/EditNote";
import ViewListIcon from "@mui/icons-material/ViewList";
import Settings from "@mui/icons-material/Settings";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";

function SideBar({ isOpen, closeSidebar }) {
  const navigate = useNavigate(); // Initialize useNavigate
  const [name, setName] = useState("");
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
          setName(userData.username);
          setRole(userData.role); // Set the user's role in state
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    } else {
      setName("John Doe"); // Reset email if the token is not available
      setRole("Admin"); // Reset role if the token is not available
    }
  }, []); // Empty dependency array to run the effect only once

  async function handleLogout() {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/logout"
      );
      if (response.status === 200) {
        console.log(response.data.message);
        localStorage.clear();
        localStorage.removeItem("authToken");
        setName("");
        setRole("");
        sessionStorage.clear();
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  }

  const list = (anchor) => (
    <Box
      sx={{
        width: anchor === "left" ? 250 : 0,
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
      role="presentation"
      onClick={closeSidebar}
      onKeyDown={closeSidebar}>
      <List>
        <ListItem sx={{ background: "#f0f0f0" }}>
          <Avatar
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjoYGax7X8aLgPL_CKZ2Pg_YZzq8NgexIcJO7rA6as&s"
            alt="User Avatar"
            sx={{ width: 50, height: 50, margin: "0 auto" }}
          />
        </ListItem>
        <ListItem
          sx={{
            background: "#f0f0f0",
            padding: "20px",
            textAlign: "center",
            marginTop: "0",
          }}>
          <ListItemText primary={name || "John Doe"} />
          <br />
          <ListItemText primary={role || "Admin"} />
        </ListItem>
      </List>
      <Divider />

      <List>
        <ListItemButton onClick={() => navigate("/dashboard")}>
          <ListItemIcon>
            <SpaceDashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
      </List>
      <Divider />

      <List>
        <ListItemButton onClick={() => navigate("/createblog")}>
          <ListItemIcon>
            <EditNoteIcon />
          </ListItemIcon>
          <ListItemText primary="Add Blog" />
        </ListItemButton>
      </List>
      <Divider />

      <List>
        <ListItemButton onClick={() => navigate("/allblogs")}>
          <ListItemIcon>
            <ViewListIcon />
          </ListItemIcon>
          <ListItemText primary="View Blogs" />
        </ListItemButton>
      </List>
      <Divider />

      {role === "Super Admin" && (
        <List>
          <ListItemButton onClick={() => navigate("/UserManagementPage")}>
            <ListItemIcon>
              <ManageAccountsIcon />
            </ListItemIcon>
            <ListItemText primary="Manage Users" />
          </ListItemButton>
        </List>
      )}
      <Divider />

      <List style={{ marginTop: "auto" }}>
        <ListItem onClick={() => handleLogout()}>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
      <Divider />
    </Box>
  );

  return (
    <Drawer anchor="left" open={isOpen} onClose={closeSidebar}>
      {list("left")}
    </Drawer>
  );
}

export default SideBar;
