const image = (req, res, next) => {
  res.send({
    status: true,
    payload: {
      statusCode: 200,
      message: "uploading success",
      data: req.files[0],
    },
  });
};
module.exports = { image };
