const knex = require("../configs/database.config");

exports.createFollow = async (data) => {
  const { id_user, id_user_mengikuti } = data;
  try {
    const result = await knex("follow").insert({ id_pengikut: id_user, id_diikuti: id_user_mengikuti, status: true });
    return { result, succes: true, statusCode: 200, message: "followed succes" };
  } catch (error) {
    return { success: false, statusCode: 401, message: "failed to follow", error };
  }
};

exports.unFollow = async (id_pengikut, id_diikuti) => {
  try {
    const result = await knex("follow").where({ id_pengikut, id_diikuti }).update({ status: false });
    return { result, succes: true, statusCode: 200, message: "unfollow succes" };
  } catch (error) {
    return { success: false, statusCode: 401, message: "failed to unfollow", error };
  }
};

exports.myfriends = async (id_diikuti, id_pengikut) => {
  try {
    const result = await knex("follow").select("*").where({ id_diikuti, id_pengikut, status: true });
    return { result, succes: true, statusCode: 200, message: "success get friends" };
  } catch (error) {
    return { success: false, statusCode: 401, message: "failed to get friends", error };
  }
};

exports.searchUser = async (data) => {
  const { username } = data;
  try {
    const result = await knex("account_user").select("*").where({ username });
    return { result, succes: true, statusCode: 200, message: "success search friends" };
  } catch (error) {
    return { success: false, statusCode: 401, message: "failed to search friends", error };
  }
};
