const express = require('express')
const fs = require ('fs')
const path  = require('path')
const md5 = require('md5')
const app = express()

let update_dir
let errorMsg
let infoMsg

app.get('/update',(req,res)=>{
    console.log("UPDATE REQUEST RECIEVED");
    // EXTRACT DEV ADDRESS
    let devAddr = req.params.devAddr

    // GET REQUEST HEADERS
    let userAgent = req.get('User-Agent')
    let freeSketchSpace = req.get('x-ESP8266-free-space')
    let updateMode = req.get('x-ESP8266-mode')
    let chipID = req.get('x-ESP8266-Chip-ID')
    let sdkVersion = req.get('x-ESP8266-sdk-version')
    let sketchSize = req.get('x-ESP8266-sketch-size')
    let chipSize = req.get('x-ESP8266-chip-size')
    let chipSTAMAC = req.get('x-ESP8266-STA-MAC')
    let chipAPMAC= req.get('x-ESP8266-AP-MAC')

    // READ FILE
    let binFile = './bin/firmware.bin';
    let bin_data = fs.readFileSync(binFile,{ encoding: "binary", flag:"r"})
    let binDataMD5 = fs.readFileSync(binFile);
    let filestat = fs.statSync(binFile);
    let filesize = filestat["size"];
    let fileMD5 = md5(binDataMD5);

    console.log("MD5: ",fileMD5);

    // PROCESS UPDATE REQUEST
    if(userAgent != 'ESP8266-http-Update'){
        res.status(304).send("Invalid User Agent Requesting Update")
        return
    }

    if (freeSketchSpace <= filesize) {
        res.status(304).send("Inadequate Free Sketch Space")
        return
    }

    // SET RESPONSE HEADERS
    res.set({
        'Content-Type': 'application/octet-stream',
        'Content-Length': filesize,
        'Content-Disposition': 'attachment; filename=' + path.basename(binFile),
        'x-MD5':fileMD5
    });

    res.status(200).end(bin_data,"binary");
    
})

app.listen(5000,console.log("App Started"));