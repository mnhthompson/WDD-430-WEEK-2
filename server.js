require('dotenv').config();
const express = require("express");
const path = require("path");
const http = require("http");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");

const index = require("./src/server/routes/app");
const messageRoutes = require("./src/server/routes/messages");
const contactRoutes = require("./src/server/routes/contacts");
const documentRoutes = require("./src/server/routes/documents");

const app = express();

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
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


const mongoURI = process.env.MONGO_URL;

mongoose.connect(mongoURI)
  .then(() => {
    console.log("MongoDB connected successfully!");

    const port = process.env.PORT || 3000;
    app.set("port", port);

    const server = http.createServer(app);
    server.listen(port, () => {
      console.log("API running on localhost:" + port);
    });
  })
  .catch(err => {
    console.error("MongoDB CONNECTION FAILED:", err);
  });