const bcrypt = require("bcryptjs");
const { PrismaClient } = require("@prisma/client");
const { signToken } = require("../../utils/jwt");
const prisma = new PrismaClient();

exports.register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 13);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
      select: {
        id: true,
        email: true,
        createdAt: true,
      },
    });

    res.status(201).json({
      status: "success",
      message: "Registion successful!",
      data: user,
    });
  } catch (error) {
    if (error.code === "P2002") {
      return res.status(400).json({
        status: "fail",
        message: "Email registered. Use another.",
      });
    }
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(401).json({
        status: "fail",
        message: "Email or password incorrect!",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        status: "fail",
        message: "Email or password incorrect!",
      });
    }

    const token = signToken(user.id);

    res.status(200).json({
      status: "success",
      token,
      data: {
        user: { id: user.id, email: user.email },
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.logout = (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Logout successful!",
    token: null,
  });
};
