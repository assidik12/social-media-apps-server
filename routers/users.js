const express = require("express");
const routerUser = express.Router();
const { register, login, update } = require("../controllers/users");
const response = require("../helpers/response");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const logStream = fs.createWriteStream("log.txt", { flags: "a" });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = "./uploads/profile";
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + +" - profile - " + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype == "image/jpeg" || file.mimetype == "image/png" || file.mimetype == "image/jpg") {
    cb(null, true);
  } else {
    cb(new Error("unsupported files", false));
  }
};

const middleware = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 10,
  },
  fileFilter: fileFilter,
});

routerUser.use((req, res, next) => {
  logStream.write(`New query: ${req.method} ${req.originalUrl}\n`);
  next();
});

routerUser.route("/auth/login").post(async (req, res) => {
  try {
    let result = await login(req.body);
    if (result.success === true) {
      response.successLogin(result, "succes", res);
    } else {
      response.errorLogin(result, res);
    }
  } catch (e) {
    throw e;
  }
});

routerUser.route("/register").post(async (req, res) => {
  try {
    const result = await register(req.body);
    response.successLogin(result, "succes", res);
  } catch (e) {
    response.errorLogin(e, res);
  }
});

routerUser.route("/update").post(middleware.single("foto"), async (req, res) => {
  try {
    const result = await update(req.body, req.file.filename);
    response.successLogin(result, "succes", res);
  } catch (e) {
    response.errorLogin(e, res);
  }
});

module.exports = routerUser;
