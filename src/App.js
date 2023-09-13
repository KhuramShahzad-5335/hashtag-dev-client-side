import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/DashboardPage/Dashboard";
import CreateBlog from "./pages/CreateBlogPage/CreateBlog";
import AllBlogs from "./pages/AllBlogsPage/AllBlogs";
import EditBlog from "./pages/EditBlog/EditBlog";
import UserManagementPage from "./pages/UserManagementPage/UserManagementPage";
import axios from "axios";

function App() {
  axios.defaults.baseURL = "http://localhost:5000";
  const token = localStorage.getItem("authToken");
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    // Check for the presence of the JWT token in cookies or local storage
    const token = localStorage.getItem("authToken"); // You can use cookies or local storage
    if (token) {
      // Token is present, indicating the user is authenticated
      console.log("Token found. Authenticated.");
      setAuthenticated(true);
    } else {
      console.log("Token not found. Not authenticated.");
      setAuthenticated(false); // Token is not present
    }
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={authenticated ? <Navigate to="/dashboard" /> : <Login />}
          />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={authenticated ? <Dashboard /> : <Navigate to="/" />}
          />
          <Route
            path="/createBlog"
            element={authenticated ? <CreateBlog /> : <Navigate to="/" />}
          />
          <Route
            path="/allblogs"
            element={authenticated ? <AllBlogs /> : <Navigate to="/" />}
          />
          <Route
            path="/edit/:id"
            element={authenticated ? <EditBlog /> : <Navigate to="/" />}
          />
          <Route
            path="/UserManagementPage"
            element={
              authenticated ? <UserManagementPage /> : <Navigate to="/" />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
