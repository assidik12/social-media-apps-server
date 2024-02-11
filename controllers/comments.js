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
    return { result, success: true, statusCode: 200, message: "komentar ditambahkan" };
  } catch (error) {
    return { success: false, statusCode: 401, message: "terjadi kesalahan", error };
  }
};

exports.getAllComment = async (id) => {
  try {
    const result = await knex("komentar").select("*").where({ id_postingan: id });
    if (result.length > 0) {
      return { success: true, statusCode: 200, message: "komentar ditemukan", result };
    } else {
      return { success: false, statusCode: 401, message: "komentar tidak ditemukan", result };
    }
  } catch (error) {
    return { success: false, statusCode: 401, message: "komentar tidak ditemukan", error };
  }
};

exports.deleteComment = async (id) => {
  try {
    const result = await knex("komentar").where({ id }).del();
    return { success: true, statusCode: 200, message: "komentar dihapus", result };
  } catch (error) {
    return { success: false, statusCode: 401, message: "komentar tidak ditemukan", error };
  }
};
