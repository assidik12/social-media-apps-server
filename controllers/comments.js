const knex = require("../configs/database.config");

exports.createComment = async (req, date) => {
  const { id_user, id_postingan, isi_komentar } = req;
  try {
    const result = await knex("komentar").insert({
      id_user,
      id_postingan,
      isi_komentar,
      foto: req.file,
      tanggal: date,
    });
    return result;
  } catch (error) {
    throw error;
  }
};

exports.getAllComment = async (id) => {
  try {
    const result = await knex("komentar").select("*").where({ id_postingan: id });
    return result;
  } catch (error) {
    throw error;
  }
};

exports.deleteComment = async (id) => {
  try {
    const result = await knex("komentar").where({ id }).del();
    return result;
  } catch (error) {
    throw error;
  }
};