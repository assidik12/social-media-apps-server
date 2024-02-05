const knex = require("../configs/database.config");

exports.createFollow = async (data) => {
  const { id_user, id_user_mengikuti, status } = data;
  try {
    const result = await knex("follow_friend").insert({ id_user: id_user, id_user_mengikuti, status });
    return result;
  } catch (error) {
    throw error;
  }
};

exports.unFollow = async (id) => {
  try {
    const result = await knex("follow_friend").where({ id }).update({ status: "false" });
    return result;
  } catch (error) {
    throw error;
  }
};
