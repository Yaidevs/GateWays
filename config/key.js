// setting up the keys .
require("dotenv").config({ path: "./config/.env" });
module.exports = {
  mongoURI: process.env.REMOTE_DB_URL,
  mongoLocal: process.env.LOCAL_DB_URL,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN,
};
