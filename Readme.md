Raspform
========

This tiny application is build to allow Raspberry Pi users interactions, such as chat service or TODO list sharing. The aim is to use the raspberry as a server but also as an interactice tool.

At this state of the development, the soft provide :
- An online chat service,
- An online toto list.

And it can be installed on every UNIX system.

## Installation

```bash
$ git clone https://github.com/clemPal/Raspform
$ cd Raspform
$ npm install
```

## Run the server

```bash
$ node app.js
```

## Run the service (client side)

To run the service, open your web browser and go on the web page :
http://<server_IP>:8080
(the server listen the port 8080)

If you don't know the IP address of your server on your local network, I suggest you to use 'nmap' to find it.
