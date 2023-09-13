/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function UserTable() {
  const [editedUserData, setEditedUserData] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/getCurrentUser")
      .then((response) => {
        setCurrentUser(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching current user:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (loading) return;

    if (currentUser.role === "Super Admin") {
      axios
        .get("/api/users")
        .then((response) => {
          setUsers(response.data);
        })
        .catch((error) => {
          console.error("Error fetching users:", error);
        });
    }
  }, [loading, currentUser.role]);

  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setDeleteConfirmationOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!userToDelete) return;

    axios
      .delete(`http://localhost:5000/api/users/${userToDelete.id}`)
      .then((response) => {
        console.log("User deleted successfully.");
        setUsers((prevUsers) =>
          prevUsers.filter((user) => user.id !== userToDelete.id)
        );
        setDeleteConfirmationOpen(false);
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  };

  const handleCancelDelete = () => {
    setUserToDelete(null);
    setDeleteConfirmationOpen(false);
  };

  const handleEditClick = (user) => {
    const editedUserCopy = { ...user, id: user._id };
    setEditUser(editedUserCopy);
    setSelectedRole(user.role);
    setEditedUserData(editedUserCopy);
    setNewPassword(""); // Clear newPassword state when editing
    setEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setEditUser(null);
    setEditDialogOpen(false);
  };

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  const handleSaveClick = () => {
    if (!editedUserData) return;

    // Create a new object with the updated password
    const updatedUserData = {
      ...editedUserData,
      password: newPassword,
    };

    console.log("Edited User ID:", currentUser.id);

    axios
      .put(
        `http://localhost:5000/api/users/${editedUserData.id}`,
        updatedUserData
      )
      .then((response) => {
        console.log("User data updated successfully.");
        handleCloseEditDialog();
      })
      .catch((error) => {
        console.error("Error updating user data:", error);
      });
  };

  return (
    <TableContainer
      component={Paper}
      style={{ margin: "50px 50px", width: "90%", height: "100%" }}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Actions</StyledTableCell>
            <StyledTableCell align="left">Name</StyledTableCell>
            <StyledTableCell align="left">Email</StyledTableCell>
            <StyledTableCell align="left">Password</StyledTableCell>
            <StyledTableCell align="left">Role</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={5}>Loading...</TableCell>
            </TableRow>
          ) : (
            users.map((user) => (
              <StyledTableRow key={user.username}>
                <StyledTableCell component="th" scope="row">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleEditClick(user)}>
                    Edit
                  </Button>
                </StyledTableCell>
                <StyledTableCell align="left">{user.username}</StyledTableCell>
                <StyledTableCell align="left">{user.email}</StyledTableCell>
                <StyledTableCell align="left">{user.password}</StyledTableCell>
                <StyledTableCell align="left">{user.role}</StyledTableCell>
              </StyledTableRow>
            ))
          )}
        </TableBody>
      </Table>
      <Dialog
        open={editDialogOpen}
        onClose={handleCloseEditDialog}
        aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit User</DialogTitle>
        <DialogContent>
          {editedUserData && (
            <div>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Name"
                type="text"
                fullWidth
                variant="standard"
                defaultValue={editedUserData.username}
                onChange={(e) =>
                  setEditedUserData({
                    ...editedUserData,
                    username: e.target.value,
                  })
                }
              />
              <TextField
                margin="dense"
                id="email"
                label="Email Address"
                type="email"
                fullWidth
                variant="standard"
                defaultValue={editedUserData.email}
                onChange={(e) =>
                  setEditedUserData({
                    ...editedUserData,
                    email: e.target.value,
                  })
                }
              />
              <TextField
                margin="dense"
                id="password"
                label="Password"
                type="password"
                fullWidth
                variant="standard"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)} // Update newPassword
              />
              <Select
                label="Role"
                value={editedUserData.role}
                onChange={(e) =>
                  setEditedUserData({
                    ...editedUserData,
                    role: e.target.value,
                  })
                }
                margin="dense"
                fullWidth>
                <MenuItem value="Admin">Admin</MenuItem>
                <MenuItem value="Super Admin">Super Admin</MenuItem>
              </Select>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog}>Cancel</Button>
          <Button onClick={handleSaveClick}>Save</Button>
        </DialogActions>
      </Dialog>
    </TableContainer>
  );
}
