const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const port = 3000;
const app = express();
const users = require("./routers/users");
const contents = require("./routers/content");
const comments = require("./routers/comment");

// Define the CORS middleware
const corsOptions = {
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST", "PUT", "DELETE"],
};

// untuk membatasi domain yang bisa mengakses API
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'"],
      },
    },
  })
);
app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use("/comments", comments);
app.use("/users", users);
app.use("/contents", contents);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
