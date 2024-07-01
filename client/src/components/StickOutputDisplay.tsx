import React from "react";
import { Box, Typography } from "@mui/material";

interface StickOutputDisplayProps {
  x: number | null;
  y: number | null;
}

const StickOutputDisplay = ({ x, y }: StickOutputDisplayProps) => {
  return (
    <Box
      id="stick-output"
      sx={{
        display: "flex",
        backgroundColor: "grey",
        justifyContent: "space-between",
        alignItems: "center",
        width: "80%",
        margin: "10px",
        padding: "10px",
        borderRadius: "10px",
      }}
    >
      <Typography variant="h5" color={"white"}>
        Stick Input:
      </Typography>
      <Typography variant="h5" color={"white"}>
        X: {x === null ? "0.00" : x.toFixed(2)} Y :{" "}
        {y === null ? "0.00" : y.toFixed(2)}
      </Typography>
    </Box>
  );
};

export default StickOutputDisplay;
