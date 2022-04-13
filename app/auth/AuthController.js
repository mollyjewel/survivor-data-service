const jwt = require("jsonwebtoken");
//import { User } from "../db/models";

const AuthController = {
  async googleLogin(req, res, next) {
    if (!req.user) {
      return res.status(401).send({ error: "User was not authenticated" });
    }
    console.log(req)
    const user = req.user;
    //const user = await User.findOne({ where: { email } });
    const token = jwt.sign(user.googleId, process.env.JWT_SECRET);
    return res.status(200).send({ token, user });
  },

  async jwtAdminLogin(req, res, next) {
    if (!req.user) {
      return res.status(401).send({ error: "User was not authenticated" });
    }
    if (req.user != process.env.ADMIN_GOOGLE_ID) {
      return res.status(401).send({ error: "User was not authorized" });
    }
    //return res.status(200).send({ msg: "login success" });
    next()
  },
}

module.exports = AuthController
