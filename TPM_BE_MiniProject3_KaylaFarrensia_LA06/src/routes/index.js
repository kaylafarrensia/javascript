const express = require("express");
const authRoutes = require("./auth/authRoutes");
const postRoutes = require("./api/postRoutes");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/posts", postRoutes);

module.exports = router;
