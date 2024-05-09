const image = (req, res, next) => {
  res.send({
    status: true,
    payload: {
      message: "uploading success",
      data: req.files,
    },
  });
};
module.exports = { image };
