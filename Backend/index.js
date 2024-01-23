const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require('cors');

const port = 3000;
const mongodburl = "mongodb://127.0.0.1:27017";
var routers = require('./routes/routes');
const bodyParser = require("body-parser");
mongoose.connect(mongodburl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const connection = mongoose.connection;
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.listen(port, () => {
    console.log("Server is running : " + port);
});
connection.once("open", () => {
    console.log("Mongodb connected");
})
app.use(cors());
app.use(bodyParser.json());
app.use(routers);