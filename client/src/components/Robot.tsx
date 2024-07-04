import React from "react";
import { useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Box, Line } from "@react-three/drei";
import { Box as Box2 } from "@mui/material";

interface RobotProps {
  position: [number, number, number];
  rotation: [number, number, number];
}

interface RobotSceneProps {
  leftMotorSpeed: number;
  rightMotorSpeed: number;
}

const Robot: React.FC<RobotProps> = ({ position, rotation }) => {
  return (
    <group position={position} rotation={rotation}>
      <Box args={[6, 4, 1]}>
        <meshStandardMaterial attach="material" color="red" />
      </Box>
      <Line
        points={[
          [3.5, -3, 0], // Start of the line (front right corner)
          [3.5, 3, 0], // End of the line (front left corner)
        ]}
        color="blue"
        lineWidth={3}
      />
    </group>
  );
};

interface BoundaryBoxProps {
  boundaries: { minX: number; maxX: number; minY: number; maxY: number };
}

const BoundaryBox: React.FC<BoundaryBoxProps> = ({ boundaries }) => {
  const { minX, maxX, minY, maxY } = boundaries;

  return (
    <Line
      points={[
        [minX, minY, 0],
        [maxX, minY, 0],
        [maxX, maxY, 0],
        [minX, maxY, 0],
        [minX, minY, 0],
      ]}
      color="black"
      lineWidth={2}
    />
  );
};

const calculatePositionFromMotorOutputs = (
  leftMotorSpeed: number,
  rightMotorSpeed: number,
  prevPosition: [number, number, number],
  prevRotation: [number, number, number],
  boundaries: { minX: number; maxX: number; minY: number; maxY: number }
): {
  newPosition: [number, number, number];
  newRotation: [number, number, number];
} => {
  const speed = (leftMotorSpeed + rightMotorSpeed) / 2;
  const angularVelocity = (rightMotorSpeed - leftMotorSpeed) / 2; // Simplified rotational speed
  const newRotationZ = prevRotation[2] + angularVelocity * 0.5; // Increased factor to control rotation speed

  let newX = prevPosition[0] + speed * Math.cos(newRotationZ);
  let newY = prevPosition[1] + speed * Math.sin(newRotationZ);

  // Check if the new position is within the boundaries
  if (
    newX < boundaries.minX ||
    newX > boundaries.maxX ||
    newY < boundaries.minY ||
    newY > boundaries.maxY
  ) {
    newX = prevPosition[0];
    newY = prevPosition[1];
  }

  return {
    newPosition: [newX, newY, prevPosition[2]],
    newRotation: [0, 0, newRotationZ],
  };
};

const FixedCamera: React.FC = () => {
  const { camera } = useThree();
  useEffect(() => {
    camera.position.set(0, 0, 100);
    camera.lookAt(0, 0, 0);
  }, [camera]);
  return null;
};

export const RobotScene: React.FC<RobotSceneProps> = ({
  leftMotorSpeed,
  rightMotorSpeed,
}) => {
  const [position, setPosition] = useState<[number, number, number]>([0, 0, 0]);
  const [rotation, setRotation] = useState<[number, number, number]>([0, 0, 0]);
  const boundaries = { minX: -39, maxX: 39, minY: -39, maxY: 39 }; // Define the boundaries of the canvas

  useEffect(() => {
    const interval = setInterval(() => {
      const { newPosition, newRotation } = calculatePositionFromMotorOutputs(
        leftMotorSpeed,
        rightMotorSpeed,
        position,
        rotation,
        boundaries
      );
      setPosition(newPosition);
      setRotation(newRotation);
    }, 1000 / 60);

    return () => clearInterval(interval);
  }, [position, rotation, leftMotorSpeed, rightMotorSpeed]);

  return (
    <Box2 sx={{ height: "420px", width: "100%", margin: "10px" }}>
      <Canvas
        style={{ background: "white", border: "5px solid black" }}
        orthographic
        camera={{ zoom: 5, position: [0, 0, 100] }}
      >
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <FixedCamera />
        <Robot position={position} rotation={rotation} />
        <BoundaryBox boundaries={boundaries} />
      </Canvas>
    </Box2>
  );
};
