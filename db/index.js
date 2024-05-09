const mongoose = require("mongoose");

const url =
  "mongodb+srv://aloneas47:6CS0baejQLaoyYB5@cluster0.bjd1tkm.mongodb.net/e-commerce?retryWrites=true&w=majority&appName=Cluster0";

const db = mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const dbConnection = async () => {
  try {
    await db;
    console.log("connected to DB ✅");
  } catch (error) {
    console.log("error");
  }
};
module.exports = { dbConnection };

// aloneas47
// ckQaJJEhd8yTW7rs
