const express = require("express");
const routerFollow = express.Router();
const { successCrateContent, errorCrateContent } = require("../helpers/response");
const { createFollow, unFollow } = require("../controllers/follows");

routerFollow.route("/follow").post(async (req, res) => {
  try {
    const result = await createFollow(req.body);
    result.length > 0 ? successCrateContent(result, "success follow", res) : errorCrateContent(result, "failed to create follow", res);
  } catch (error) {
    throw error;
  }
});

routerFollow.route("/unfollow").update(async (req, res) => {
  try {
    const result = await unFollow(req.body);
    result.length > 0 ? successCrateContent(result, "success unfollow", res) : errorCrateContent(result, "failed to delete follow", res);
  } catch (error) {
    throw error;
  }
});
