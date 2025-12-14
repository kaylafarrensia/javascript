exports.validateAuth = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({
      status: "fail",
      message: "Email Format Invalid.",
    });
  }

  if (!password || password.length < 6) {
    return res.status(400).json({
      status: "fail",
      message: "Password must have a minimum of 6 char.",
    });
  }

  next();
};

exports.validateResource = (req, res, next) => {
  const { title, content } = req.body;

  if (!title || title.length < 5) {
    return res.status(400).json({
      status: "fail",
      message: "Resource title must have a minimum of 5 char.",
    });
  }

  if (!content || content.length < 20) {
    return res.status(400).json({
      status: "fail",
      message: "Resouce content must have more details.",
    });
  }

  next();
};
