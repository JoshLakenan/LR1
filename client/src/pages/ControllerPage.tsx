import React, { useEffect, useState, useRef } from "react";
import SettingSlider from "../components/SettingSlider";
import LabeledToggle from "../components/LabeledToggle";
import Connection from "../components/Connection";
import Stick from "../components/Stick";
import StickOutputDisplay from "../components/StickOutputDisplay";
import {
  Container,
  Grid,
  Box,
  Typography,
  BoxProps,
  Switch,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import { normalDrive, tankDrive } from "../utils/motorSpeeds";
import { RobotScene } from "../components/Robot";

const ControllerPage = () => {
  const [leftStick, setLeftStick] = useState<number>(0);
  const [rightStick, setRightStick] = useState<number>(0);

  const [leftMotor, setLeftMotor] = useState<number>(0);
  const [rightMotor, setRightMotor] = useState<number>(0);

  const [volume, setVolume] = useState<number>(10);
  const [speed, setSpeed] = useState<number>(50);

  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [connectIsChecked, setConnectIsChecked] = useState<boolean>(false);
  const [showRobot, setShowRobot] = useState<boolean>(false);
  const [tankMode, setTankMode] = useState<boolean>(false);
  const [wsAddress, setWSAddress] = useState<string>("192.168.12.155:3001/ws");

  // Create a WebSocket reference
  const ws = useRef<WebSocket | null>(null);

  const connectWebSocket = () => {
    // Create a new WebSocket connection
    ws.current = new WebSocket(`ws://${wsAddress}`);

    // Set up WebSocket event listeners
    ws.current.onopen = () => {
      console.log("WebSocket connection established");
      setConnectIsChecked(true);
      setIsConnected(true);
    };

    ws.current.onmessage = (event) => {
      console.log(`Received message: ${event.data}`);
    };

    ws.current.onclose = () => {
      console.log("WebSocket connection closed");
      setIsConnected(false);
      setConnectIsChecked(false);
    };
  };

  const disconnectWebSocket = () => {
    if (ws.current) {
      console.log("Closing WebSocket connection");
      ws.current.close();
      ws.current = null;
    }
  };

  const handleConnectionToggle = (_, checked: boolean) => {
    if (checked) {
      console.log("Connecting to WebSocket");
      setConnectIsChecked(true);
      connectWebSocket();
    } else {
      setConnectIsChecked(false);
      disconnectWebSocket();
    }
  };

  useEffect(() => {
    // Clean up WebSocket connection when component unmounts
    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  useEffect(() => {
    // Adjust motor speeds based on the speed value as a percentage
    const adjustedRight = rightStick! * (speed / 100);
    const adjustedLeft = leftStick! * (speed / 100);

    const motorSpeeds = tankMode
      ? tankDrive(adjustedLeft!, adjustedRight!)
      : normalDrive(adjustedRight!, adjustedLeft!);

    setRightMotor(motorSpeeds.right);
    setLeftMotor(motorSpeeds.left);

    // Send WebSocket message whenever x or y changes
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      const message = JSON.stringify({
        x: motorSpeeds.left,
        y: motorSpeeds.right,
      });
      ws.current.send(message);
      console.log(`Sent message: ${message}`);
    } else {
      console.log("WebSocket connection not established");
    }
  }, [rightStick, leftStick]);

  return (
    <Box
      id={"page-container"}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#2b2a2a",
        width: "100%",
      }}
    >
      <Box
        id={"toggle-container"}
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
        <LabeledToggle
          checked={connectIsChecked}
          handleToggle={handleConnectionToggle}
          label={isConnected ? "Connected" : "Disconnected"}
        />
        <LabeledToggle
          checked={showRobot}
          handleToggle={() => setShowRobot(!showRobot)}
          label={showRobot ? "Hide Robot" : "Show Robot"}
        />
        <LabeledToggle
          checked={tankMode}
          handleToggle={() => setTankMode(!tankMode)}
          label={tankMode ? "Tank Drive On" : "Tank Drive Off"}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          backgroundColor: "grey",
          justifyContent: "center",
          alignItems: "center",
          width: "80%",
          margin: "10px",
          padding: "10px",
          borderRadius: "10px",
        }}
      >
        <input
          value={wsAddress}
          onChange={(e) => setWSAddress(e.target.value)}
        ></input>
      </Box>
      {showRobot ? (
        <RobotScene rightMotorSpeed={rightMotor} leftMotorSpeed={leftMotor} />
      ) : (
        <Box
          id={"output-container"}
          sx={{
            marginTop: "20px",
            height: "420px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <StickOutputDisplay
            title={"Stick Inputs"}
            values={{ leftStick, rightStick }}
          />
          <StickOutputDisplay
            title={"Motor Speeds"}
            values={{ leftMotor, rightMotor }}
          />
        </Box>
      )}
      <Box
        id={"settings-container"}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "75%",
          height: "100px",
        }}
      >
        <SettingSlider
          title={"Volume"}
          value={volume}
          defaultValue={10}
          sliderColor="orange"
          setValue={setVolume}
        />
        <SettingSlider
          title={"Speed"}
          defaultValue={50}
          value={speed}
          sliderColor="green"
          setValue={setSpeed}
        />
      </Box>

      <Box
        id={"sticks-container"}
        sx={{
          display: "flex",
          width: "75%",
          justifyContent: "space-between",
          AlignItems: "center",
          marginTop: "60px",
          marginLeft: "40px",
          marginRight: "40px",
          marginBottom: "75px",
        }}
      >
        <Stick variant={"y"} setStickState={setLeftStick} />
        <Stick variant={tankMode ? "y" : "x"} setStickState={setRightStick} />
      </Box>
    </Box>
  );
};

export default ControllerPage;
