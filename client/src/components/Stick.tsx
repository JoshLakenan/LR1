import { Joystick, JoystickShape } from "react-joystick-component";
import { Box } from "@mui/material";
import { IJoystickUpdateEvent, MotorSpeed } from "../types/types";

interface StickProps {
  variant: "x" | "y";
  setMotorSpeed: React.Dispatch<React.SetStateAction<MotorSpeed>>;
}

const Stick = ({ variant, setMotorSpeed }: StickProps) => {
  const handleMove = (e: IJoystickUpdateEvent) => {
    if (variant === "x") {
      // set the motor speed, and assert that e.x is not null
      setMotorSpeed(e.x!);
    } else {
      setMotorSpeed(e.y!);
    }
  };

  const handleStop = (e: IJoystickUpdateEvent) => {
    console.log(`${variant} stopped :`, e);

    setMotorSpeed(0);
  };

  return (
    <Box>
      <Joystick
        size={110}
        throttle={50}
        controlPlaneShape={
          variant === "x" ? JoystickShape.AxisX : JoystickShape.AxisY
        }
        baseShape={JoystickShape.Square}
        baseColor={"red"}
        stickShape={JoystickShape.Square}
        move={handleMove}
        stop={handleStop}
      />
    </Box>
  );
};

export default Stick;
