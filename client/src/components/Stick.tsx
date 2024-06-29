import { Joystick, JoystickShape } from "react-joystick-component";
import { Box } from "@mui/material";
import { IJoystickUpdateEvent } from "../types/types";

interface StickProps {
  variant: "x" | "y";
  setMotorSpeed: (speed: number) => void;
}

const Stick = ({ variant, setMotorSpeed }: StickProps) => {
  const handleStart = (e: IJoystickUpdateEvent) => {
    console.log(`${variant} started :`, e);
  };

  const handleMove = (e: IJoystickUpdateEvent) => {
    console.log(`${variant} moved :`, e);
  };

  const handleStop = (e: IJoystickUpdateEvent) => {
    console.log(`${variant} stopped :`, e);
  };

  return (
    <Box>
      <Joystick
        throttle={100}
        controlPlaneShape={
          variant === "x" ? JoystickShape.AxisX : JoystickShape.AxisY
        }
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

export default Stick;
