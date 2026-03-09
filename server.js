var express = require("express");
var path = require("path");
var http = require("http");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");


const index = require("./src/server/routes/app");
const messageRoutes = require("./src/server/routes/messages");
const contactRoutes = require("./src/server/routes/contacts");
const documentRoutes = require("./src/server/routes/documents");

var app = express(); 

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(cookieParser());

app.use(logger("dev")); 


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});


app.use(express.static(path.join(__dirname, "dist/cms")));


app.use("/", index);
app.use("/messages", messageRoutes);
app.use("/contacts", contactRoutes);
app.use("/documents", documentRoutes);


app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'dist/cms/index.html'));
});

mongoose.connect(
  process.env.MONGO_URL,
  {
    useNewUrlParser: true,
  },
  (err, res) => {
    if (err) console.error("CONNECTION FAILED: " + err);
    else console.log("Connected to database!");
  }
);


const port = process.env.PORT || "3000";
app.set("port", port);


const server = http.createServer(app);


server.listen(port, function () {
  console.log("API running on localhost: " + port);
});