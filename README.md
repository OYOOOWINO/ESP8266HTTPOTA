### Purpose
The intention of the project is to create a boiler plate that enables Updating of the ESP8266 firmware from a remote server

#### Tools & Softwares
* `PlatformIO`
* `NodeJS`
* `Wemos D1 mini` 
#### How to use
1. *`Clone the  project`*

2. *`Open the Project Using Platform IO`* 
 
3. *`In the server directory  run npm install command to in stall server dependencies and node server.js to start the server`*

4. *`In the src folder and set your server IP & port in config.h or a domain name`*
5. *`Upload the file system image to the Wemos D1 mini`*

6. *`compile and upload the main.cpp file to the device`*

##### Expected Operation
When the ESP8266 turns on the it will attempt to connect to any know wi-Fi. If no known wi-Fi is found it goes in to access-point mode. Connect to this AP `(CONFIG PORTAL @ 192.168.4.1)` and on the browser open 192.168.4.1. You should get an interface like one shown below to provide WiFi credentials for your network which will enable the device connect to the network.This will be saved in the device for automatic reconnection

![Wi-Fi UI](/img/UI.png)

Once conneted the AP is closed and a webserver run on the IP assigned to the devices at `port 80`.

Currently to start an update, the ESP8266 devices sends an update request trigger to the server. Which responds with the required binary life for update

To trigger an update request, connect to the IP of the device and make a http get request  to the URL `/update`

#### Compatibility
This was only tested using Wemos D1 mini. Compatibility for other devices is not know currently