const knex = require("../configs/database.config");
const fs = require("fs");

exports.getAllContent = async (id) => {
  try {
    const result = await knex("postingan").select("*").where({ id_user: id });
    return result;
  } catch (error) {
    return error;
  }
};

exports.createContent = async (data, file, tanggal_posting) => {
  try {
    const { id_user, isi_postingan } = data;

    const result = await knex("postingan").insert({
      id_user,
      isi_postingan,
      file_foto: file,
      tanggal_posting,
    });
    return result;
  } catch (error) {
    return error;
  }
};

exports.deleteContent = async (id, tanggal_posting) => {
  try {
    const result = await knex("postingan").where({ id_user: id, tanggal_posting }).del();
    return result;
  } catch (error) {
    return error;
  }
};
