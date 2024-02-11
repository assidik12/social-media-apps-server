const express = require("express");
const routerFollow = express.Router();
const { successCrateContent, errorCrateContent } = require("../helpers/response");
const { createFollow, unFollow, searchUser, myfriends } = require("../controllers/follows");

routerFollow.route("/add").post(async (req, res) => {
  try {
    const result = await createFollow(req.body);
    result.length > 0 ? successCrateContent(result, "success follow", res) : errorCrateContent(result, "failed to add friends", res);
  } catch (error) {
    throw error;
  }
});

routerFollow.route("/unfollow").post(async (req, res) => {
  try {
    const result = await unFollow(req.body);
    result.length > 0 ? successCrateContent(result, "success unfollow", res) : errorCrateContent(result, "failed to delete friends", res);
  } catch (error) {
    throw error;
  }
});

routerFollow.route("/myfriends").post(async (req, res) => {
  let id_diikuti = req.body.id_diikuti;
  let id_pengikut = req.body.id_pengikut;
  try {
    const result = await myfriends(id_diikuti, id_pengikut);
    result.length > 0 ? successCrateContent(result, "success get friends", res) : errorCrateContent(result, "failed to get friends", res);
  } catch (error) {
    throw error;
  }
});

routerFollow.route("/search").post(async (req, res) => {
  try {
    const result = await searchUser(req.body);
    result.length > 0 ? successCrateContent(result, "user ditemukan", res) : errorCrateContent(result, "user tidak ada", res);
  } catch (error) {
    throw error;
  }
});
module.exports = routerFollow;
