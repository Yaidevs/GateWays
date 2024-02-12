const mongoose = require("mongoose");
const config = require("./key");
const db = config.mongoURI;
const dbLocal = config.mongoLocal;

const connectDb = async () => {
  try {
    console.log(dbLocal);
    await mongoose.connect(dbLocal);
    console.log("connected to db");
  } catch (err) {
    console.log(err);
    console.log("is not connected to DB");
    process.exit(1);
  }
};

module.exports = connectDb;
