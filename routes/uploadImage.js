const { upload } = require("../helper/diskStorage");
const { image } = require("../controllers/uploadImage");

const uploadImage = (app) => {
  app.post(
    "/profile",
    upload.any([{ name: "avatar" }, { name: "gallery" }]),
    (req, res, next) => image(req, res, next)
  );
};
module.exports = { uploadImage };
