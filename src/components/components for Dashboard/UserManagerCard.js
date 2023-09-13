import * as React from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import userManagementImage from "./user_management.png";

export default function UserManagerCard() {
  return (
    <Card
      sx={{
        display: "flex",
        width: "1080px",
        backgroundColor: "#444",
        color: "white",
        marginTop: "10px",
      }}>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image={userManagementImage}
        alt="User Management"
        style={{ filter: "0.1" }}
      />
      <CardContent sx={{ flex: "1 0 auto" }}>
        <Typography component="div" variant="h5">
          User Management
        </Typography>
        <Typography
          variant="subtitle2"
          color="text.secondary"
          component="div"
          style={{ color: "#eee" }}>
          Manage your users efficiently and effectively.
        </Typography>
      </CardContent>
      <CardActions>
        <Link to="/UserManagementPage" style={{ marginRight: "30px" }}>
          <Button
            size="small"
            style={{
              padding: "5px 20px",
              color: "white",
              backgroundColor: "#567",
              width: "100%",
            }}>
            Get Started
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}
