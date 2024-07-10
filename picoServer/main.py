from microdot import Microdot, Response, send_file
import uasyncio as asyncio
import json
from connect_wifi import connect_wifi
from microdot.websocket import with_websocket, WebSocketError
from pimoroni import REVERSED_DIR
from inventor import Inventor2040W, NUM_LEDS, MOTOR_A, MOTOR_B
from time import sleep
from songs import happy_birthday, connected, beep, disconnected
from play_song import play_song

# Create a Microdot app instance
app = Microdot()

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


def led_blink():
    global offset, SPEED, BRIGHTNESS, NUM_LEDS
    offset = 0.0
    print(f'NUM_LEDS:{NUM_LEDS}')

    # Turn on the LEDs
    offset += SPEED / 1000.0
    for i in range(NUM_LEDS):
        hue = float(i) / NUM_LEDS
        board.leds.set_hsv(i, hue + offset, 1.0, BRIGHTNESS)

    # Keep the LEDs on for 1 second
    sleep(1)

    # Turn off the LEDs
    for i in range(NUM_LEDS):
        board.leds.set_hsv(i, 0, 0, 0)

    print("LEDs turned off after 1 second")

@app.route('/play-song')
async def play_song_route(request):
    await play_song(board, happy_birthday, 0.5, 1)
    return Response(body="Playing song", status_code=200)


# Define the WebSocket handler function
@app.route('/ws')
@with_websocket
async def websocket_handler(request, ws):
    print(f"WebSocket client connected")
    await play_song(board, connected, .3, .25)

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

            motor_drive(board.motors[MOTOR_A], y)

            motor_drive(board.motors[MOTOR_B], x)

            # Send the response message back to the client.
            await ws.send(json.dumps(response))
    except WebSocketError as e:
        print(f"WebSocket error: {e}")
    except Exception as e:
        print(f"Client disconnected: {e}")
    finally:
        await ws.close()
        print(f"WebSocket connection closed.")
        await play_song(board, disconnected, .3, .25)



# Create a new Inventor2040W
board = Inventor2040W()
board.motors[MOTOR_B].direction(REVERSED_DIR)

def motor_drive(motor, speed):
    motor.speed(speed)


# Define the main function to start the WebSocket server
async def main():
    led_blink()

    if not connect_wifi():  # Connect to Wi-Fi with Static IP
        print("Failed to connect to Wi-Fi")
        return  # Exit if Wi-Fi connection failed

    led_test()

    print("Wi-Fi connected. Starting server...")

    try:
        await app.start_server('0.0.0.0', 3001, debug=True)
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





