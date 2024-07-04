import secret
import network


# Wi-Fi Configuration
STATIC_IP = '192.168.12.155'  # Replace with your desired static IP address
SUBNET_MASK = '255.255.255.0'
GATEWAY = '192.168.12.1' # Aka Router on mac os
DNS_SERVER = '8.8.8.8'

# Connect to Wi-Fi with Static IP
def connect_wifi():
    wlan = network.WLAN(network.STA_IF)
    wlan.active(True)
    wlan.ifconfig((STATIC_IP, SUBNET_MASK, GATEWAY, DNS_SERVER))
    wlan.connect(secret.SSID, secret.PASSWORD)
    
    # Wait for the connection to establish
    max_wait = 20
    while max_wait > 0:
        if wlan.isconnected():
            print('Connected to Wi-Fi')
            print('IP:', wlan.ifconfig()[0])
            return wlan.ifconfig()[0]
        print('Connecting to Wi-Fi...')
        time.sleep(1)
        max_wait -= 1
    
    print('Failed to connect to Wi-Fi')
    return False
