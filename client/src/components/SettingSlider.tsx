import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { Typography } from "@mui/material";

const SettingSlider = ({
  title,
  value,
  sliderColor,
}: {
  title: string;
  value: number;
  sliderColor: string;
}) => {
  function preventHorizontalKeyboardNavigation(event: React.KeyboardEvent) {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
    }
  }

  return (
    <Box sx={{ height: "200px", width: "100px" }}>
      <Typography color="white" id="vertical-slider" gutterBottom>
        {title}
      </Typography>
      <Slider
        sx={{
          color: sliderColor, // Add this line to make the slider orange
        }}
        orientation="horizontal"
        defaultValue={value}
        aria-label="Temperature"
        valueLabelDisplay="auto"
        onKeyDown={preventHorizontalKeyboardNavigation}
      />
    </Box>
  );
};

export default SettingSlider;
