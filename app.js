const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

// const http = require('http');
// const server = http.createServer(app);
// const { Server } = require("socket.io");
// const io = new Server(server);

// custom middleware
const authenticateToken = require("./middleware/auth");
const error = require("./middleware/errors");
const { getListenPort, getOriginList } = require("./app_class/bundledConfig");
const contact = require("./db_class/contact");

app.use(bodyParser.urlencoded({ extended: false }));
// this middleware help to access the post request body parts
app.use(bodyParser.json());

let coreOption = {
  origin: getOriginList(),
  optionsSuccessStatus: 200,
};

// app.use( cors(coreOption));
app.use(cors(coreOption));

app.use(authenticateToken);

app.use("/contact", contact);
app.use(error);

app.get("/", (req, res) => {
  res.send("you are in our api");
});

// get port number from env or config
// const PORT = getListenPort();
// server.listen( PORT, () => console.log(`Listening on port ${PORT}`));

// const PORT = getListenPort();
// const server = require('http').createServer(app).listen(PORT, () => console.log(`Listening on port ${PORT}`))
// const io = require('socket.io')(server);

const PORT = getListenPort();

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
