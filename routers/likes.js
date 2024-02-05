const express = require("express");
const routerLikes = express.Router();
const { successCrateContent, errorCrateContent } = require("../helpers/response");
const { createLikes, getAllLike, unLike } = require("../controllers/likes");

routerLikes.post("/createLikes", async (req, res) => {
  const date = new Date();
  try {
    const result = await createLikes(req.body, date);
    result.length > 0 ? successCrateContent(result, "success create likes", res) : errorCrateContent(result, "failed to create likes", res);
  } catch (error) {
    throw error;
  }
});

routerLikes.get("/:id", async (req, res) => {
  try {
    const result = await getAllLike(req.params.id);
    result.length > 0 ? successCrateContent(result, "success get likes", res) : errorCrateContent(result, "failed to get likes", res);
  } catch (error) {
    throw error;
  }
});

routerLikes.delete("/:id", async (req, res) => {
  try {
    const result = await unLike(req.params.id);
    result.length > 0 ? successCrateContent(result, "success delete likes", res) : errorCrateContent(result, "failed to delete likes", res);
  } catch (error) {
    throw error;
  }
});
