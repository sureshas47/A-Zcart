// packages import
require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

// local import
const { dbConnection } = require("./db/index");
const { productRoutes } = require("./routes/product");
const { userRoute } = require("./routes/user");
const { categoryRoute } = require("./routes/category");
const { uploadImage } = require("./routes/uploadImage");

dbConnection(); //connect to database

app.use(cors()); // middleware to Enable CORS for all incoming requests

const bodyParser = require("body-parser"); // middleware to send data into body
const { orderRoutes } = require("./routes/order");
app.use(bodyParser.json());
app.use(express.static(__dirname)); // serve static files for example images and other files

// routes
uploadImage(app);
productRoutes(app);
userRoute(app);
categoryRoute(app);
orderRoutes(app);

// server starting
const PORT = process.env.PORT || 9000;
app.listen(PORT, (req, res) => {
  console.log("server running at port: " + PORT);
});

// aloneas47
// ckQaJJEhd8yTW7rs
