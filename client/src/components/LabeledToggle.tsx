import React from "react";
import { Switch, Box, Typography } from "@mui/material";

interface LabeledToggleProps {
  label: string;
  checked: boolean;
  handleToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

const LabeledToggle = ({ label, checked, handleToggle }) => {
  return (
    <Box>
      <Typography color="white" gutterBottom>
        {label}
      </Typography>
      <Switch
        size={"medium"}
        onChange={handleToggle}
        color="success"
        checked={checked}
      />
    </Box>
  );
};

export default LabeledToggle;
