import { Box } from "@mui/material";
import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

const HomePage: React.FC = () => {
  return (
    <Card>
      <CardContent>
        <h1>Welcome to the Home Page</h1>
        <p>This is the main content of the home page.</p>
        <p>Feel free to explore!</p>
      </CardContent>
    </Card>
  );
};

export default HomePage;
