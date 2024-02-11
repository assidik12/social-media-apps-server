const valid = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const knex = require("../configs/database.config");
const fs = require("fs");

exports.login = async (req) => {
  let { email, sandi } = req;
  try {
    const [selectedRows] = await knex.transaction(async (trx) => {
      try {
        await trx("account_user").update({ status: true }).where({ email });
        const selectedRows = await trx("account_user").select("*").from("account_user").where({ email });
        return selectedRows;
      } catch (error) {
        throw error;
      }
    });
    let photo;

    if (selectedRows.foto_profile) {
      const fotoPath = `./uploads/profile/${selectedRows.foto_profile}`;
      photo = Buffer.from(fs.readFileSync(fotoPath)).toString("base64");
    } else {
      photo = null;
    }

    if (selectedRows && valid.isEmail(email)) {
      const hashedPassword = selectedRows.password;
      const isPasswordMatch = await bcrypt.compare(sandi, hashedPassword);

      if (isPasswordMatch) {
        const token = jwt.sign(
          {
            id: selectedRows.id,
            username: selectedRows.username,
            email: selectedRows.email,
            alamat: selectedRows.alamat,
            no_telp: selectedRows.no_telp,
            biografi: selectedRows.biografi,
            status: selectedRows.status,
            foto_profile: photo,
          },
          "secret_key"
        );

        return { success: true, statusCode: 200, message: "Login success", token };
      }
    }
  } catch (error) {
    return { success: false, statusCode: 401, message: "Invalid password" };
  }
};

exports.register = async (data) => {
  try {
    const { username, email, sandi, alamat, no_telp, biografi, foto } = data;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(sandi, salt);

    if (valid.isEmail(email) && valid.isStrongPassword(hashedPassword)) {
      await knex("account_user").insert({
        username,
        email,
        password: hashedPassword,
        salt,
        alamat,
        no_telp,
        foto_profil: foto,
        biografi,
      });
      return {
        success: true,
        statusCode: 200,
        message: "Register success",
      };
    } else {
      return {
        success: false,
        statusCode: 400,
        message: "Invalid email or password",
      };
    }
  } catch (error) {
    return { success: false, statusCode: 500, message: "server error", error };
  }
};

exports.update = async (data, foto_profile) => {
  try {
    const { username, email, alamat, no_telp, biografi } = data;

    const update = await knex("account_user").where({ email: email }).update({ username, email, alamat, no_telp, biografi, foto_profile }, ["email"]);
    if (update) {
      return {
        success: true,
        statusCode: 200,
        message: "data berhasil di update",
        update,
      };
    }
  } catch (error) {
    return { success: false, statusCode: 500, message: "server error", error };
  }
};

exports.logout = async (data) => {
  const { email } = data;
  try {
    const logout = await knex("account_user").where({ email }).update({ status: false });
    if (logout) {
      return {
        success: true,
        statusCode: 200,
        message: "Logout success",
        logout,
      };
    }
  } catch (error) {
    return { success: false, statusCode: 500, message: "server error", error };
  }
};
