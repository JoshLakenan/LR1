import React, { useEffect, useState, useRef } from "react";
import SettingSlider from "../components/SettingSlider";
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
import { MotorSpeed } from "../types/types";
import Header from "../components/Header";

const ControllerPage = () => {
  const [x, setX] = useState<MotorSpeed>(0);
  const [y, setY] = useState<MotorSpeed>(0);
  const [volume, setVolume] = useState<number>(10);
  const [speed, setSpeed] = useState<number>(50);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [connectIsChecked, setConnectIsChecked] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("disconnected");
  const [error, setError] = useState<string | null>(null);

  // Create a WebSocket reference
  const ws = useRef<WebSocket | null>(null);

  const connectWebSocket = () => {
    // Create a new WebSocket connection
    ws.current = new WebSocket("ws://localhost:8765");

    // Set up WebSocket event listeners
    ws.current.onopen = () => {
      console.log("WebSocket connection established");
      setIsConnected(true);
      setStatus("connected");
      setConnectIsChecked(true);
    };

    ws.current.onmessage = (event) => {
      console.log(`Received message: ${event.data}`);
    };

    ws.current.onclose = () => {
      console.log("WebSocket connection closed");
      setIsConnected(false);
      setStatus("disconnected");
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

  const handleToggle = (_, checked: boolean) => {
    if (checked) {
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
    // Send WebSocket message whenever x or y changes
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      const message = JSON.stringify({ x, y });
      ws.current.send(message);
      console.log(`Sent message: ${message}`);
    } else {
      console.log("WebSocket connection not established");
    }
  }, [x, y]);

  return (
    <Box
      id={"page-container"}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        height: "100%",
        width: "100%",
        // border: "1px solid black",
      }}
    >
      <Header message={"LR1 Controller"} />
      <Connection
        handleToggle={handleToggle}
        status={status}
        connectIsChecked={connectIsChecked}
      />
      <StickOutputDisplay x={x} y={y} />
      <Box
        id={"settings-container"}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          width: "75%",
          height: "150px",
        }}
      >
        <SettingSlider title={"Volume"} value={10} sliderColor="orange" />
        <SettingSlider title={"Speed"} value={50} sliderColor="green" />
      </Box>

      <Box
        id={"sticks-container"}
        sx={{
          display: "flex",
          width: "75%",
          justifyContent: "space-between",
          AlignItems: "center",
          marginTop: "75px",
          marginLeft: "40px",
          marginRight: "40px",
          marginBottom: "75px",
        }}
      >
        <Stick variant={"y"} setMotorSpeed={setY} />
        <Stick variant={"x"} setMotorSpeed={setX} />
      </Box>
    </Box>
  );
};

export default ControllerPage;
