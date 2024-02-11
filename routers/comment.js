const routerComment = require("express").Router();
const { successCrateContent, errorCrateContent } = require("../helpers/response");
const { createComment, getAllComment, deleteComment } = require("../controllers/comments");

routerComment.post("/create", async (req, res) => {
  const date = new Date();
  try {
    const result = await createComment(req.body, date);
    result.length > 0 ? successCrateContent(result, result.message, res) : errorCrateContent(result, result.message, res);
  } catch (error) {
    throw error;
  }
});

routerComment.get("/:id", async (req, res) => {
  try {
    const result = await getAllComment(req.params.id);
    result.result.length > 0 ? successCrateContent(result, result.result.message, res) : errorCrateContent(result, result.message, res);
  } catch (error) {
    throw error;
  }
});

routerComment.delete("/:id", async (req, res) => {
  try {
    const result = await deleteComment(req.params.id);
    result.length > 0 ? successCrateContent(result, result.message, res) : errorCrateContent(result, "failed to delete comment", res);
  } catch (error) {
    throw error;
  }
});
module.exports = routerComment;
