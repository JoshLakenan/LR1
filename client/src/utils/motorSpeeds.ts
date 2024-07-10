type MotorSpeedOutput = {
  left: number;
  right: number;
};

export const normalDrive = (x: number, y: number): MotorSpeedOutput => {
  const turnSpeed = 1.5;

  const motorSpeeds = {
    left: 0,
    right: 0,
  };

  // turn Speed of 2 is the default

  // If there is no y axis movement, then the robot should turn in place
  if (y === 0) {
    motorSpeeds.left = x;
    motorSpeeds.right = -x;
  } else {
    motorSpeeds.left = y;
    motorSpeeds.right = y;

    // If there is x axis movement, then the robot should move in an arc
    if (x > 0) {
      // Slow down the right motor so the robot turns left
      motorSpeeds.right = y * (1 - x / turnSpeed);
    } else if (x < 0) {
      // Slow down the left motor so the robot turns right
      motorSpeeds.left = y * (1 + x / turnSpeed);
    }
  }

  return motorSpeeds;
};

export const tankDrive = (left: number, right: number): MotorSpeedOutput => {
  return {
    left,
    right,
  };
};
