const mongoose = require("mongoose");
require("dotenv").config();

module.exports = connect = async () => {
  try {
    const response = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: true,
    });
    console.log("databace is conected!");
  } catch (err) {
    console.log(err);
  }
};
