const routerContent = require("express").Router();
const { createContent, getAllContent, deleteContent } = require("../controllers/content");
const { successLogin, successCrateContent, errorCrateContent } = require("../helpers/response");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const logStream = fs.createWriteStream("contentLog.txt", { flags: "a" });
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = "./uploads/contentPost";
    try {
      fs.mkdirSync(uploadPath, { recursive: true });
      cb(null, uploadPath);
    } catch (err) {
      // Tangani kesalahan jika gagal membuat direktori
      cb(err, null);
    }
  },
  filename: (req, file, cb) => cb(null, Date.now() + "-" + path.extname(file.originalname)),
});

const fileFilter = (req, file, cb) => (file.mimetype == "image/jpeg" || file.mimetype == "image/png" || file.mimetype == "image/jpg" ? cb(null, true) : cb(new Error("unsupported files", false)));

const upload = multer({ storage, limits: { fileSize: 1024 * 1024 * 10 }, fileFilter });

routerContent.use((req, res, next) => logStream.write(`New query: ${req.method} ${req.originalUrl}\n`) && next());

routerContent.route("/create").post(upload.single("image"), async (req, res, next) => {
  const date = new Date();
  try {
    // Akses nama file dengan req.files.filename
    const result = await createContent(req.body, req.files, date);
    // Pindahkan console.log sebelum mengirim respons
    successCrateContent(result, "created content", res);
    next();
  } catch (e) {
    errorCrateContent(e, "failed to create content", res);
  }
});

routerContent.route(`/:id`).get(async (req, res) => {
  try {
    const result = await getAllContent(req.params.id);
    result.result.length > 0 ? successCrateContent(result, result.result.message, res) : errorCrateContent(result, result.message, res);
  } catch (error) {
    throw error;
  }
});

routerContent.route("/delete/:id").delete(async (req, res) => {
  try {
    const result = await deleteContent(req.params.id);
    result.length > 0 ? successLogin(result, "succes", res) : errorCrateContent(result, "failed to delete content", res);
  } catch (error) {
    throw error;
  }
});

module.exports = routerContent;
