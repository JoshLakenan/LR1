import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { Typography } from "@mui/material";

interface SettingSliderProps {
  title: string;
  defaultValue: number;
  value: number;
  sliderColor: string;
  setValue: React.Dispatch<React.SetStateAction<number>>;
  minValue?: number;
  maxValue?: number;
}

const SettingSlider = ({
  title,
  value,
  sliderColor,
  setValue,
  minValue = 0,
  maxValue = 100,
}: SettingSliderProps) => {
  function preventHorizontalKeyboardNavigation(event: React.KeyboardEvent) {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
    }
  }

  const handleSliderChange = (_, newValue: number | number[]) => {
    setValue(newValue as number);
  };

  return (
    <Box sx={{ width: "100px" }}>
      <Typography color="white" id="vertical-slider" gutterBottom>
        {title}
      </Typography>
      <Slider
        sx={{
          color: sliderColor, // Add this line to make the slider orange
        }}
        onChange={handleSliderChange}
        orientation="horizontal"
        defaultValue={value}
        value={value}
        aria-label="Temperature"
        valueLabelDisplay="auto"
        onKeyDown={preventHorizontalKeyboardNavigation}
        min={minValue}
        max={maxValue}
        step={0.5}
      />
    </Box>
  );
};

export default SettingSlider;
