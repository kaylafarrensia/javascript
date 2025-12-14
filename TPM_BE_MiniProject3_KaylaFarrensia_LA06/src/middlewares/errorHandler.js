exports.globalErrorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  if (err.code && err.code.startsWith("P")) {
    statusCode = 400;
    message = `Kesalahan Database: ${err.meta?.target || "Database Error"}`;

    if (err.code === "P2002") {
      message = "Duplicate Data.";
    }
  }

  if (err.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Invalid Token.";
  }

  if (err.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Expired Token.";
  }

  res.status(statusCode).json({
    status: "error",
    message: message,
  });
};
