Raspform
========

This tiny application is build to allow Raspberry Pi users interactions, such as chat service or TODO list sharing. The aim is to use the raspberry as a server but also as an interactice tool.

## Notes

The raspberry branch of this project is for the Raspberry or Beaglebone only. Don't use it on other devices. 

At this state of the development, the soft provide :
- An online chat service,
- An online toto list.
- A blincking led at connection if it is pluged on GPIO17
- A blincking led at disconnection if it is pluged on GPIO18

## Components needed

1 – Breadboard
2 – 68 Ohms resistor
2 – LED
X - wires (depending of your wires)

## Installation

```bash
$ git clone https://github.com/clemPal/Raspform
$ cd Raspform
$ npm install
```

## Configuration

It is necessary to spécify the IP adress of your server in the client views.
'''bash
$ nano views/chat.html
then replace the line 40 with "var socket = io.connect('http://yourServerIP:8080');"
then save and close the file
'''

## Electrical installation

Plug 1 led on the GPIO 17 and an other on the GPIO 18 with series resistor. 
If you are using a raspberry you can find help here : http://www.raspberrypi.org/documentation/usage/gpio/

## Run the server

```bash
$ node app.js
```

## Run the service (client side)

To run the service, open your web browser and go on the web page :
http://yourServerIP:8080
(the server listen the port 8080)

If you don't know the IP address of your server on your local network, I suggest you to use 'nmap' to find it.
