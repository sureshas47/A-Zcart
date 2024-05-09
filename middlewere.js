const jwt = require("jsonwebtoken");

const adminMiddlewere = (req, res, next) => {
  const bearerToken = req.headers["authorization"]; // getting token from header sent from client
  const token = bearerToken?.replace("Bearer ", "").trim(); // removing 'bearer' string from token
  console.log(token, "TOKEN IN MIDDLEWERE");
  if (!token) {
    return res.status(401).json({ message: "Unauthorized, token not found" });
  }
  // verify token
  jwt.verify(token, "secretKey:v3RyS3cR3tK3y#f0rJWt_Auth", (err, user) => {
    console.log(user, "USER IN MIDDLEWARE");
    if (err) {
      return res.status(401).json({ message: "forbidden: token not verified" });
    }

    req.user = user; // setting user in req object

    if (req.user.userType !== "admin") {
      const response = {
        statusCode: 401,
        msg: "Forbidden - Not Authorized",
      };
      return res.send(response);
    } else {
      next();
    }
  });
};
module.exports = { adminMiddlewere };
