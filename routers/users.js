const routerUser = require("express").Router();
const { register, login, update, logout } = require("../controllers/users");
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
  file.mimetype == "image/jpeg" || file.mimetype == "image/png" || file.mimetype == "image/jpg" ? cb(null, true) : cb(new Error("unsupported files", false));
};

const middleware = multer({ storage, limits: { fileSize: 1024 * 1024 * 10 }, fileFilter });

routerUser.use((req, res, next) => logStream.write(`New query: ${req.method} ${req.originalUrl} : ${req.body.statusCode}\n`) && next());

routerUser.route("/auth/login").post(async (req, res) => {
  try {
    let result = await login(req.body);
    response.successLogin(result, result.message, res);
  } catch (e) {
    response.errorLogin(e, req.originalUrl, 400, res);
  }
});

routerUser.route("/register").post(async (req, res) => {
  try {
    const result = await register(req.body);
    response.successLogin(result, result.message, res);
  } catch (e) {
    response.errorLogin(e, req.originalUrl, 400, res);
  }
});

routerUser.route("/update").post(middleware.single("foto"), async (req, res) => {
  try {
    const result = await update(req.body, req.file.filename);
    response.successLogin(result, result.message, res);
  } catch (e) {
    response.errorLogin(e, req.originalUrl, 400, res);
  }
});

routerUser.route("/logout").post(async (req, res) => {
  try {
    const result = await logout(req.body);
    response.successLogin(result, result.message, res);
  } catch (e) {
    response.errorLogin(e, req.originalUrl, 400, res);
  }
});

module.exports = routerUser;
