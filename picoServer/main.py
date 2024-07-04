from microdot import Microdot, Response
import uasyncio as asyncio
import json
from connect_wifi import connect_wifi
from microdot.websocket import with_websocket, WebSocketError
from pimoroni import REVERSED_DIR
from inventor import Inventor2040W, NUM_LEDS, MOTOR_A, MOTOR_B
from time import sleep

# Create a Microdot app instance
app = Microdot()

# Define an async route handler for the root path '/'
@app.route('/')
async def hello_world(request):
    # Create a simple JSON response object
    response_data = {"message": "Hello world!"}
    # Create a Response object and set the content type
    response = Response(body=json.dumps(response_data))
    response.headers['Content-Type'] = 'application/json'
    return response


BRIGHTNESS = 0.4
UPDATES = 50
SPEED = 50

def led_test():
    global offset, SPEED, BRIGHTNESS, NUM_LEDS
    offset = 0.0
    print(f'NUM_LEDS:{NUM_LEDS}')
    
#    while True:
    offset += SPEED / 1000.0
    for i in range(NUM_LEDS):
        hue = float(i) / NUM_LEDS
        board.leds.set_hsv(i, hue+offset, 1.0, BRIGHTNESS)
#         print(f'offset: {offset}')
    sleep(1.0 / UPDATES)

# Define the WebSocket handler function
@app.route('/ws')
@with_websocket
async def websocket_handler(request, ws):
    print(f"WebSocket client connected")

    try:
        while True:
            message = await ws.receive()
            if message is None:
                break
            print(f"Received message: {message}")

            # Parse the JSON message into a dictionary
            data = json.loads(message)
            
            # Access the values inside the dictionary
            x = data.get('x', 0)  # Default to 0 if 'x' is not present
            y = data.get('y', 0)  # Default to 0 if 'y' is not present

            print(f"Received: x: {x} y: {y}")
            
            # Create a response message by prepending "Server received: " to the received message.
            response = {
                "message": "Server received your data",
                "received": {"x": x, "y": y}
            }
            
            motor_drive(board.motors[MOTOR_A], x)
            
            motor_drive(board.motors[MOTOR_B], y)

            # Send the response message back to the client.
            await ws.send(json.dumps(response))
    except WebSocketError as e:
        print(f"WebSocket error: {e}")
    except Exception as e:
        print(f"Client disconnected: {e}")
    finally:
        await ws.close()
        print(f"WebSocket connection closed.")
        
        
        
# Create a new Inventor2040W
board = Inventor2040W()
board.motors[MOTOR_A].direction(REVERSED_DIR)

def motor_drive(motor, speed):
    motor.speed(speed)
    

def motor_test(duration):
    for m in board.motors:
        m.enable()
    sleep(0.1)

    for m in board.motors:
        m.full_negative()
    sleep(duration)

    for m in board.motors:
        m.stop()
    sleep(0.1)

        

# Define the main function to start the WebSocket server
async def main():
    if not connect_wifi():  # Connect to Wi-Fi with Static IP
        print("Failed to connect to Wi-Fi")
        return  # Exit if Wi-Fi connection failed
    
    led_test()
    
    print("Wi-Fi connected. Starting server...")
    
    try:
        await app.start_server('0.0.0.0', 3001, debug=True)
        print("WebSocket server started on ws://0.0.0.0:3001/")
    except Exception as e:
        print(f"Failed to start server: {e}")
    
    # Keep the server running
    while True:
        await asyncio.sleep(3600)

# Connect to Wi-Fi and run the main function
if __name__ == "__main__":
    try:
        print("Connecting to Wi-Fi...")
        asyncio.run(main())
    except KeyboardInterrupt:
        print("Server manually stopped")




