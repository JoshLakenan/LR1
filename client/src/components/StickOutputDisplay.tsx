import React from "react";
import { Box, Typography } from "@mui/material";

interface StickOutputDisplayProps {
  title: string;
  values: { [key: string]: number | null };
}

const StickOutputDisplay = ({ title, values }: StickOutputDisplayProps) => {
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
        {title}:
      </Typography>
      {Object.keys(values).map((key) => {
        return (
          <Typography variant="h5" color={"white"}>
            {key}: {values[key] === null ? "0.00" : values[key].toFixed(2)}
          </Typography>
        );
      })}
    </Box>
  );
};

export default StickOutputDisplay;
