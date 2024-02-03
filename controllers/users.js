const valid = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const knex = require("../configs/database.config");
const passport = require("passport");
const fs = require("fs");

exports.login = async (req) => {
  try {
    let { email, sandi } = req;

    const [selectedRows] = await knex.select("*").from("account_user").where({ email });
    const fotoPath = `./uploads/${selectedRows.foto_profile}`;

    if (fs.existsSync(fotoPath)) {
      const fotoBase64 = Buffer.from(fs.readFileSync(fotoPath)).toString("base64");
      if (valid.isEmail(email)) {
        if (selectedRows) {
          const hashedPassword = selectedRows.password;
          const isPasswordMatch = await bcrypt.compare(sandi, hashedPassword);

          if (isPasswordMatch) {
            const token = jwt.sign({ username: selectedRows.username, email: selectedRows.email, alamat: selectedRows.alamat, no_telp: selectedRows.no_telp, biografi: selectedRows.biografi, foto_profile: fotoBase64 }, "secret_key");

            return { success: true, message: "Login success", token };
          } else {
            return { success: false, message: "Invalid password" };
          }
        } else {
          return false;
        }
      }
    } else {
      console.log("File does not exist.");
    }
  } catch (error) {
    console.log(error);
  }
};

exports.register = async (data) => {
  try {
    const { username, email, sandi, alamat, no_telp, biografi, foto } = data;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(sandi, salt);

    if (valid.isEmail(email) && valid.isStrongPassword(hashedPassword)) {
      const result = await knex("account_user").insert({
        username,
        email,
        password: hashedPassword,
        salt,
        alamat,
        no_telp,
        foto_profil: foto,
        biografi,
      });
      return result;
    } else {
      throw new Error("Please provide a valid email and password");
    }
  } catch (error) {
    console.log(error);
  }
};

exports.update = async (data, foto_profile) => {
  try {
    const { username, email, alamat, no_telp, biografi } = data;

    const update = await knex("account_user").where({ email: email }).update({ username, email, alamat, no_telp, biografi, foto_profile }, ["email"]);
    return (
      update,
      {
        message: "Data pengguna berhasil diperbarui",
      }
    );
  } catch (error) {
    console.log(error);
  }
};
