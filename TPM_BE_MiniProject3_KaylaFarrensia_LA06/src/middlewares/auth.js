const { verifyToken } = require("../utils/jwt");

exports.protect = (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({
      status: "fail",
      message: "Access denied!",
    });
  }

  const decoded = verifyToken(token);

  if (!decoded) {
    return res.status(403).json({
      status: "fail",
      message: "Token invalid or expired. Try again.",
    });
  }
  req.userId = decoded.id;
  next();
};
