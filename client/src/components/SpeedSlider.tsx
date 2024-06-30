import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { Typography } from "@mui/material";

export default function SpeedSlider({
  title,
  value,
}: {
  title: string;
  value: number;
}) {
  function preventHorizontalKeyboardNavigation(event: React.KeyboardEvent) {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
    }
  }

  return (
    <Box sx={{ height: "200px" }}>
      <Typography color="white" id="vertical-slider" gutterBottom>
        {title}
      </Typography>
      <Slider
        sx={{
          '& input[type="range"]': {
            WebkitAppearance: "slider-vertical",
          },
          margin: "10px",
        }}
        orientation="vertical"
        defaultValue={value}
        aria-label="Temperature"
        valueLabelDisplay="auto"
        onKeyDown={preventHorizontalKeyboardNavigation}
      />
    </Box>
  );
}
