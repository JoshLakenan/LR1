import React from "react";
import { Box, Typography, Switch } from "@mui/material";

interface ConnectionProps {
  status: string;
  handleToggle: () => void;
  connectIsChecked: boolean;
}

const Connection = ({ status, handleToggle, connectIsChecked }) => {
  return (
    <Box
      id={"status-container"}
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
        Robot: {status}
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Switch
          size={"medium"}
          onChange={handleToggle}
          color="success"
          checked={connectIsChecked}
        />
      </Box>
    </Box>
  );
};

export default Connection;
