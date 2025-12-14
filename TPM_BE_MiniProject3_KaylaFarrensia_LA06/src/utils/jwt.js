const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "your_default_secret_key";
const JWT_EXPIRES_IN = "1d";

//  @param {string} userId
//  @returns {string}

const signToken = (userId) => {
  return jwt.sign({ id: userId }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
};

//  @param {string} token
//  @returns {object | null}

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (error) {
    return null;
  }
};

module.exports = { signToken, verifyToken };
