import { Joystick, JoystickShape } from "react-joystick-component";
import { Box } from "@mui/material";

const handleStart = (e: IJoystickUpdateEvent) => {
  console.log("Throttle Started", e);
};

const handleMove = (e: IJoystickUpdateEvent) => {
  console.log("Throttle Move", e);
};

const handleStop = (e: IJoystickUpdateEvent) => {
  console.log("Throttle Stopped", e);
};

const ThrottleStick = () => {
  return (
    <Box>
      <Joystick
        throttle={100}
        controlPlaneShape={JoystickShape.AxisY}
        baseShape={JoystickShape.Square}
        baseColor={"red"}
        stickShape={JoystickShape.Square}
        start={handleStart}
        move={handleMove}
        stop={handleStop}
      />
    </Box>
  );
};

export default ThrottleStick;
