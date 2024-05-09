const jwt = require("jsonwebtoken");

const { UserModel } = require("../models/user");
const bcrypt = require("bcrypt");
// create user
const createUser = async (req, res) => {
  try {
    // checking user before creating
    const user = await UserModel.findOne({
      $or: [{ email: req.body.email }, { phoneNumber: req.body.phoneNumber }],
    });
    if (user) {
      res.status(403).send({ message: "Conflict - User Already Exists" });
      console.log("Conflict - User Already Exists");
    } else {
      const saltRounds = 10;
      const hashPassword = await bcrypt.hash(req.body.password, saltRounds);

      const user = new UserModel({
        userName: req.body.userName,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        userType: req.body.userType,
        password: hashPassword,
      });
      const createdUser = await user.save();
      const { userName, email, phoneNumber, userType } = createdUser;
      res.status(200).send({
        message: "User Created Successfully",
        payload: {
          _id: createdUser._id,
          userName,
          email,
          phoneNumber,
          userType,
        },
      });
      console.log("USER CREATED");
    }
  } catch (error) {
    res.status(400).send({
      message: "Error While Creating User",
      error: error,
    });
    console.log("USER NOT CREATED");
  }
};

// login user
const loginUser = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    bcrypt.compare(req.body.password, user.password, (err, result) => {
      if (result == true) {
        // generate token at login
        const token = jwt.sign(
          {
            userId: user._id,
            userName: user.userName,
            email: user.email,
            userType: user.userType,
          },
          "secretKey:v3RyS3cR3tK3y#f0rJWt_Auth",
          { expiresIn: "9hr" }
        );

        res.status(200).send({ msg: "Login Success", token }); // send token to the client.
        console.log("LOGIN SUCCESS", token);
      } else {
        console.log("LOGIN FAILED");
        res.status(400).send({ msg: "Invalid Password, Please Try Again !" });
      }
    });
  } catch (error) {
    console.log("LOGIN FAILED ", error);
    res
      .status(401)
      .send({ msg: "Error - Check Your credentials and try again", error });
  }
};

// const logoutUser = async (req, res) => {
//   console.log(req, "Request in Logo utput controller");
//   const bearerToken = req.headers["authorization"];
//   const token = bearerToken?.replace("bearer ", "").trim();
//   if (token) {
//     const decoded = jwt.decode(token);
//     console.log(decoded, "DECODED");
//     const pastExpiration = new Date(0);
//     const invalidToken = jwt.sign(
//       decoded,
//       "secretKey:v3RyS3cR3tK3y#f0rJWt_Auth",
//       pastExpiration
//     );
//     res.send({ message: "Logout Success", invalidToken });
//   }
// };

const getUsers = async (req, res) => {
  const user = await UserModel.find();
  res.send(user);
};

const getUser = async (req, res) => {
  const userId = req.params.userId; // getting user id from params
  const loggedInUser = req.user; // getting logged in user id from the request

  // console.log(loggedInUser, "LOGGED IN USERID");
  if (userId === loggedInUser.userId) {
    const user = await UserModel.findOne({ _id: userId });
    res.send(user);
  } else {
    res.send({ message: "UnAuthorized User" });
  }
};
module.exports = { createUser, loginUser, getUsers, getUser };
