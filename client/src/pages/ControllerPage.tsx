import React from "react";
import { useState } from "react";
import SpeedSlider from "../components/SpeedSlider";
import Stick from "../components/Stick";
import { Container, Grid, Box, Typography } from "@mui/material";
import { MotorSpeed } from "../types/types";
const ControllerPage = () => {
  const [x, setX] = useState<MotorSpeed>(null);
  const [y, setY] = useState<MotorSpeed>(null);

  return (
    <Container>
      <Typography variant="h2">Controller Page</Typography>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          padding: "25px",
        }}
      >
        <Stick variant={"x"} setMotorSpeed={setX} />
        <Stick variant={"y"} setMotorSpeed={setY} />
        <SpeedSlider />
      </div>
    </Container>
  );
};

export default ControllerPage;
