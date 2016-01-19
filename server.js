
var express = require('express');
var app = express();
var path = require("path");
var port = 3100;

app.use(express.static(__dirname));

app.listen(port, function () {
  console.log('Example app listening on port '+port+'!');
});
