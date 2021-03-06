var express = require("express");
var app = express();

var bodyParser = require("body-parser");
app.use(bodyParser.json());

app.use(express.static(__dirname+"/public/dist/public"));

require("./server/routes")(app);

app.listen(8000);