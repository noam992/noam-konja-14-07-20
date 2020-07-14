global.config = require(process.env.NODE_ENV === "production" ? "./config-prod" : "./config-dev");
const express = require("express");
const tasksController = require("./controllers/tasks-controller");
const path = require("path");

// Create the server
const server = express();

// Access-Control-Allow-Origin - proxy
server.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", 'http://localhost:3001');
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT,DELETE,PATCH');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Accept');
  
    next();
  });


// Enable parsing of JSON in the body
server.use(express.json());

// Server index.html
server.use(express.static(path.join(__dirname, "./_front-end")));

// Set Tasks controller to be relative to /api/tasks route
server.use("/api/tasks", tasksController);

server.use("*", (request, response) => {
    response.sendFile(path.join(__dirname, "./_front-end/index.html"));
});


const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`Listen on port ${port}`));