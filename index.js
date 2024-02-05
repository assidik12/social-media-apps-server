const express = require("express");
const passport = require("passport");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const port = 3000;
const app = express();
const users = require("./routers/users");

// Define the CORS middleware
const corsOptions = {
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST", "PUT", "DELETE"],
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use("/users", users);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
