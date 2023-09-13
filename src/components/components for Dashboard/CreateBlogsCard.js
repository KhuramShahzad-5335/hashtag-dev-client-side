import * as React from "react";
import Card from "@mui/material/Card";
import { Link } from "react-router-dom";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function CreateBlogsCard() {
  return (
    <Card
      sx={{ maxWidth: 345 }}
      variant="dark"
      style={{
        backgroundColor: "#444",
        color: "white",
        margin: "10px 20px",
        padding: "20px 40px",
      }}>
      <CardContent>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          align="center"
          style={{ color: "#eee" }}>
          Create New Blog
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          align="left"
          style={{ color: "#eee" }}>
          In this section we can create new blogs by entering the info.
          <br />
          <br />
          Feel free to explore ...
        </Typography>
      </CardContent>
      <CardActions>
        <Link to="/createBlog">
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
