const jwt = require("jsonwebtoken")

function generateRefreshToken(user) {
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "250m",
  });
  return refreshToken;
}

module.exports =  generateRefreshToken
