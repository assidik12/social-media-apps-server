const knex = require("../configs/database.config");

exports.getAllLike = async (id) => {
  try {
    const result = await knex("like").select("*").where({ id_postingan: id, status: true });
    return { success: true, statusCode: 200, message: "success get likes", result };
  } catch (error) {
    return { success: false, statusCode: 401, message: "failed to get likes", error };
  }
};

exports.createLikes = async (data) => {
  try {
    const { id_user, id_postingan } = data;
    const result = await knex("like").insert({ id_user, id_postingan, status: true });
    return { result, success: true, statusCode: 200, message: "success create likes" };
  } catch (error) {
    return { success: false, statusCode: 401, message: "failed to create likes", error };
  }
};

exports.unLike = async (id) => {
  try {
    const result = await knex("like").where({ id }).update({ status: false });
    return { result, success: true, statusCode: 200, message: "success delete likes" };
  } catch (error) {
    return { success: false, statusCode: 401, message: "failed to delete likes", error };
  }
};
