const knex = require("../configs/database.config");

exports.getAllLike = async (id) => {
  try {
    const result = await knex("like").select("*").where({ id_postingan: id });
    return result;
  } catch (error) {
    throw error;
  }
};

exports.createLikes = async (data) => {
  try {
    const { id_user, id_postingan, status } = data;
    const result = await knex("like").insert({ id_user, id_postingan, status });
    return result;
  } catch (error) {
    throw error;
  }
};

exports.unLike = async (id) => {
  try {
    const result = await knex("like").where({ id }).del();
    return result;
  } catch (error) {
    throw error;
  }
};
