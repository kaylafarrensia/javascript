const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.createPost = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const authorId = req.userId;

    const post = await prisma.post.create({
      data: {
        title,
        content,
        authorId,
      },
    });

    res.status(201).json({
      status: "success",
      message: "Post success!",
      data: post,
    });
  } catch (error) {
    next(error);
  }
};

exports.getAllPosts = async (req, res, next) => {
  try {
    const posts = await prisma.post.findMany({
      include: { author: { select: { id: true, email: true } } },
    });

    res.status(200).json({
      status: "success",
      results: posts.length,
      data: posts,
    });
  } catch (error) {
    next(error);
  }
};

exports.getPostById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const post = await prisma.post.findUnique({
      where: { id },
      include: { author: { select: { id: true, email: true } } },
    });

    if (!post) {
      return res.status(404).json({
        status: "fail",
        message: "Post not found!",
      });
    }

    res.status(200).json({
      status: "success",
      data: post,
    });
  } catch (error) {
    next(error);
  }
};

exports.updatePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const authorId = req.userId;
    const updates = req.body;

    const existingPost = await prisma.post.findUnique({ where: { id } });

    if (!existingPost) {
      return res
        .status(404)
        .json({ status: "fail", message: "Post not found!" });
    }

    if (existingPost.authorId !== authorId) {
      console.log("User unauthorized attempt to modify post:", req.userId);
      return res.status(403).json({
        status: "fail",
        message: "Unauthorized update!",
      });
    }

    const updatedPost = await prisma.post.update({
      where: { id },
      data: updates,
    });

    res.status(200).json({
      status: "success",
      message: "Post updated!.",
      data: updatedPost,
    });
  } catch (error) {
    next(error);
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const authorId = req.userId;

    const existingPost = await prisma.post.findUnique({ where: { id } });

    if (!existingPost) {
      return res
        .status(404)
        .json({ status: "fail", message: "Post not found!" });
    }

    if (existingPost.authorId !== authorId) {
      return res.status(403).json({
        status: "fail",
        message: "Unauthorized deletion!",
      });
    }

    await prisma.post.delete({ where: { id } });

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    next(error);
  }
};
