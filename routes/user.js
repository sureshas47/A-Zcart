const {
  createUser,
  loginUser,
  // logoutUser,
  getUsers,
  getUser,
} = require("../controllers/user");
const { adminMiddlewere } = require("../middlewere");

const userRoute = (app) => {
  app.post("/api/v1/signup", (req, res) => createUser(req, res));
  app.post("/api/v1/login", (req, res) => loginUser(req, res));
  app.get("/api/v1/users", (req, res) => getUsers(req, res));
  app.get("/api/v1/user/:userId", adminMiddlewere, (req, res) =>
    getUser(req, res)
  );
  // app.post("/api/v1/logout", (req, res) => logoutUser(req, res));
};

module.exports = { userRoute };
