import React from "react";
import { Typography, Box } from "@mui/material";

const Header = ({ message }: { message: string }) => {
  return (
    <Box
      style={{
        backgroundColor: "lightgrey",
        width: "100%",
        padding: "10px",
        textAlign: "center",
      }}
    >
      <Typography variant="h4">{message}</Typography>
    </Box>
  );
};

export default Header;
