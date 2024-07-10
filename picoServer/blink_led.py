from time import sleep

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