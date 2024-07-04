# Import the asyncio library, which provides support for asynchronous programming.
import asyncio

# Import the websockets library to create WebSocket servers and clients.
import websockets

# Import the json library to parse JSON messages.
import json

# Import the signal library to handle termination signals.
import signal

# Import sys to handle command line arguments.
import sys

# Define an asynchronous function 'handler' that will handle incoming WebSocket connections.
async def handler(websocket, path):
    # Print a message indicating a client has connected, including the client's address.
    print(f"Client connected: {websocket.remote_address}")

    # Use a try block to handle potential disconnections gracefully.
    try:
        # Use an asynchronous for loop to process messages received from the WebSocket.
        async for message in websocket:
            # Print the received message.
            print(f"Received message: {message}")

            # Parse the JSON message into a dictionary
            data = json.loads(message)
            
            # Access the values inside the dictionary
            x = data.get('x', 0)  # Default to 0 if 'x' is not present
            y = data.get('y', 0)  # Default to 0 if 'y' is not present

            print(f"Recieved: x: {x} y: {y}")
            
            # Update motor state based on received values
            # update_motor_state(x, y)

            # Create a response message by prepending "Server received: " to the received message.
            response = f"Server received: {message}"

            # Send the response message back to the client.
            await websocket.send(response)

    # Handle the case where the WebSocket connection is closed.
    except websockets.ConnectionClosed as e:
        # Print a message indicating the client has disconnected.
        print(f"Client disconnected: {e}")

    finally:
        # This block is always executed after the try block, ensuring cleanup happens
        print(f"Connection to {websocket.remote_address} closed.")

# Define an asynchronous function 'main' that will start the WebSocket server.
async def main():
    # Create the WebSocket server
    server = await websockets.serve(handler, "localhost", 8765)
    print("WebSocket server started on ws://localhost:8765")

    # Run the server until a termination signal is received
    stop = asyncio.Future()
    for sig in (signal.SIGINT, signal.SIGTERM):
        asyncio.get_event_loop().add_signal_handler(sig, stop.set_result, None)
    await stop

    # Close the server
    server.close()
    await server.wait_closed()
    print("WebSocket server stopped")


# # Example usage
# x = 1  # Full right turn
# y = 1  # Full forward throttle
# motor_speeds = easy_tank_drive(x, y)
# print(motor_speeds)  # Output: {'left_motor_speed': 1, 'right_motor_speed': 0.5}

# x = 1  # Full right turn
# y = 0  # No forward throttle
# motor_speeds = easy_tank_drive(x, y)
# print(motor_speeds)  # Output: {'left_motor_speed': 1, 'right_motor_speed': -1}


# Check if this script is being run directly (as opposed to being imported as a module).
if __name__ == "__main__":
    try:
    # Run the 'main' function using asyncio's event loop.
        asyncio.run(main())
    except KeyboardInterrupt:
        print("WebSocket server manually stopped")