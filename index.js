const express = require("express");
require("dotenv").config();
const app = express();

//ensure database is connected
require("./configs/db.configs");

//Use body parser. To be able parse post request information
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

//Register routes
const todoRoutes = require("./routes/index.routes");
app.use("/api", todoRoutes);

//Start the server to begin listening on a port
// make sure you don't run it on port 3000 because
// your react app uses port 3000.
app.listen(5000, "127.0.0.1", () => {
  console.log("Server is running");
});

module.exports = app;
