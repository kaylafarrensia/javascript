const express = require("express");
const postController = require("../../controllers/api/postController");
const { protect } = require("../../middlewares/auth");
const { validateResource } = require("../../middlewares/validator");

const router = express.Router();

router.get("/", postController.getAllPosts);
router.get("/:id", postController.getPostById);

router.use(protect);
router.post("/", validateResource, postController.createPost);
router.patch("/:id", validateResource, postController.updatePost);
router.delete("/:id", postController.deletePost);

module.exports = router;
