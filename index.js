// const qrService =  require('qrcode');
const express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var fs = require("fs");
var QRCode = require('qrcode');

var app = express();
app.set('view engine', 'html');
app.use(bodyParser.json({limit: '50mb'}));
// parse requests of content-type - application/json
//app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true ,keepExtensions: true}));
// parse requests of content-type - application/json
app.use(bodyParser.json())

app.use(function(req, res, next) { //allow cross origin requests
    res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
    });

const logger = function (req, res, next) {
        //console.log(req)
        next()
      }
      
      app.use(logger)

      app.get('/', (req, res) => {
        QRCode.toDataURL(JSON.stringify('Shemeem Buddhu hai'), function (err, url) {
            templatePath = path.join(__dirname + '/code.html');
            fs.readFile(templatePath, {encoding: 'utf-8'}, function(err,data){
                data = data.replace(/##qUrl/g, url);
                res.send(data)
            })
          })
    })
    var PORT = 3000;
app.listen(PORT, () => console.log('shaz QR Code generation on the port: ' + PORT))
