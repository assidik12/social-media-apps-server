const knex = require("../configs/database.config");
const fs = require("fs");

exports.getAllContent = async (id) => {
  try {
    const result = await knex("postingan").select("*").where({ id_user: id });
    return {
      success: true,
      statusCode: 200,
      message: "success get content",
      result,
    };
  } catch (error) {
    return {
      success: false,
      statusCode: 401,
      message: "failed to get content",
      error,
    };
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
    if (result.length > 0) {
      return {
        success: true,
        statusCode: 200,
        message: "success create content",
        result,
      };
    } else {
      return {
        success: false,
        statusCode: 401,
        message: "failed to create content",
        result,
      };
    }
  } catch (error) {
    return {
      success: false,
      statusCode: 401,
      message: "failed to create content",
      error,
    };
  }
};

exports.deleteContent = async (id, tanggal_posting) => {
  try {
    const result = await knex("postingan").where({ id_user: id, tanggal_posting }).del();
    return {
      success: true,
      statusCode: 200,
      message: "success delete content",
      result,
    };
  } catch (error) {
    return {
      success: false,
      statusCode: 401,
      message: "failed to delete content",
      error,
    };
  }
};
