var express = require('express');
var app = express();
var fs = require("fs");

var id = 2;

var user = {
   "user4" : {
      "name" : "mohit",
      "password" : "password4",
      "profession" : "teacher",
      "id": 4
   }
}

const PORT = 8080;
const HOST = '0.0.0.0';

app.use('/', express.static(__dirname));

app.get('/', function (req, res) {
   res.sendFile( __dirname + "/" + "main.html" );
})

app.get('/getSpotify', function(req, res) {
   const request = require('request');
   const url = require('url');
   const queryObject = url.parse(req.url,true).query;
   console.log(queryObject);
   const tokenoption = {
      url: 'https://accounts.spotify.com/api/token',
      headers: {
         'Authorization': "Basic NzQ3NTQ4NWNkMjhjNGJmMmI2MmQ4YTRlMzBhZTUyODM6NThlMzYxYTNkM2FlNGYzNThkYjdkMWFkZjJlNjI4YjI="
      },
      form: {
         'grant_type': 'client_credentials'
      },
      json: true
   };
   request.post(tokenoption, (err, response, body) => {
      if (err) { 
         console.log("got error from spotify api");
         return console.log(err); }
      console.log(body.access_token);
      const options = {
         url: 'https://api.spotify.com/v1/recommendations',
         headers: {
            'Authorization': 'Bearer ' + body.access_token
         },
         json: true,
         qs: queryObject
       };
      console.log("starting to call spotify api");
      request(options, (err, response, body) => {
         if (err) { 
            console.log("got error from spotify api");
            return console.log(err); }
         /*console.log(response);
         console.log(body.url);
         console.log(body.explanation);*/
         res.header("Access-Control-Allow-Origin", "*");
         res.end(JSON.stringify(body));
      });
   });
})

app.delete('/deleteUser', function (req, res) {
   // First read existing users.
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
      data = JSON.parse( data );
      delete data["user" + 2];
       
      console.log( data );
      res.end( JSON.stringify(data));
   });
})

app.get('/listUsers', function (req, res) {
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
      console.log( data );
      res.end( data );
   });
})

app.post('/addUser', function (req, res) {
   // First read existing users.
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
      data = JSON.parse( data );
      data["user4"] = user["user4"];
      console.log( data );
      res.end( JSON.stringify(data));
   });
})

app.get('/:id', function (req, res) {
   // First read existing users.
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
      var users = JSON.parse( data );
      var user = users["user" + req.params.id] 
      console.log( user );
      res.end( JSON.stringify(user));
   });
})

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

//app.listen(8081, function () {
//   var host = server.address().address
//   var port = server.address().port
//   console.log("Example app listening at http://%s:%s", host, port)
//})