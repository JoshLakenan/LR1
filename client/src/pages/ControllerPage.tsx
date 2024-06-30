import React, { useEffect, useState, useRef } from "react";
import SpeedSlider from "../components/SpeedSlider";
import Stick from "../components/Stick";
import { Container, Grid, Box, Typography, BoxProps } from "@mui/material";
import { MotorSpeed } from "../types/types";
import Header from "../components/Header";

const ControllerPage = () => {
  const [x, setX] = useState<MotorSpeed>(null);
  const [y, setY] = useState<MotorSpeed>(null);
  const [volume, setVolume] = useState<number>(10);
  const [speed, setSpeed] = useState<number>(50);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  // Create a WebSocket reference
  const ws = useRef<WebSocket | null>(null);

  const connectWebSocket = () => {
    // Create a new WebSocket connection
    ws.current = new WebSocket("ws://localhost:8765");

    // Set up WebSocket event listeners
    ws.current.onopen = () => {
      console.log("WebSocket connection established");
      setIsConnected(true);
    };

    ws.current.onmessage = (event) => {
      console.log(`Received message: ${event.data}`);
    };

    ws.current.onclose = () => {
      console.log("WebSocket connection closed");
      setIsConnected(false);
    };
  };

  const disconnectWebSocket = () => {
    if (ws.current) {
      ws.current.close();
      ws.current = null;
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
        height: "90%",
        width: "90%",
        // border: "1px solid black",
      }}
    >
      <Header message={"Controller"} />
      <Box
        id={"status-container"}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "80%",
        }}
      >
        <Typography variant="h4" color={"white"}>
          Status: {isConnected ? "Connected" : "Disconnected"}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <button
            onClick={connectWebSocket}
            style={{
              backgroundColor: "lightgreen",
              color: "black",
              padding: "10px",
              margin: "10px",
              border: "none",
              borderRadius: "5px",
            }}
          >
            Connect
          </button>
          <button
            onClick={disconnectWebSocket}
            style={{
              backgroundColor: "red",
              color: "black",
              padding: "10px",
              margin: "10px",
              border: "none",
              borderRadius: "5px",
            }}
          >
            Disconnect
          </button>
        </Box>
      </Box>
      <Box>
        <Typography variant="h4" color={"white"}>
          X : {x === null ? "0.00" : x.toFixed(2)} Y :{" "}
          {y === null ? "0.00" : y.toFixed(2)}
        </Typography>
      </Box>
      <Box
        id={"settings-container"}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "80%",
        }}
      >
        <SpeedSlider title={"Volume"} value={10} />
        <SpeedSlider title={"Speed"} value={50} />
      </Box>

      <Box
        id={"sticks-container"}
        sx={{
          display: "flex",
          // border: "1px solid black",
          width: "80%",
          justifyContent: "space-between",
          AlignItems: "center",
          marginBottom: "40px",
        }}
      >
        <Stick variant={"y"} setMotorSpeed={setY} />
        <Stick variant={"x"} setMotorSpeed={setX} />
      </Box>
    </Box>
  );
};

export default ControllerPage;
