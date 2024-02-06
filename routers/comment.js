const express = require("express");
const routerComment = express.Router();
const { successCrateContent, errorCrateContent } = require("../helpers/response");
const { createComment, getAllComment, deleteComment } = require("../controllers/comments");

routerComment.post("/create", async (req, res) => {
  const date = new Date();
  try {
    const result = await createComment(req.body, date);
    result.length > 0 ? successCrateContent(result, "success create comment", res) : errorCrateContent(result, "failed to get comment", res);
  } catch (error) {
    throw error;
  }
});

routerComment.get("/:id", async (req, res) => {
  try {
    const result = await getAllComment(req.params.id);
    result.length > 0 ? successCrateContent(result, "success get comment", res) : errorCrateContent(result, "failed to get comment", res);
  } catch (error) {
    throw error;
  }
});

routerComment.delete("/:id", async (req, res) => {
  try {
    const result = await deleteComment(req.params.id);
    result.length > 0 ? successCrateContent(result, "success delete comment", res) : errorCrateContent(result, "failed to delete comment", res);
  } catch (error) {
    throw error;
  }
});
module.exports = routerComment;
