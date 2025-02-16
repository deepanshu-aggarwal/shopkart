import JWT from "jsonwebtoken";
import User from "../models/userModel.js";

// protected routes token based
export const requireSignIn = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      res.status(400).send({ message: "Token not present" });
      return;
    }
    const decode = await JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );

    const user = await User.findById(decode.id);
    if (!user){
      res.status(404).send({ message: "Invalid Token" });
      return;
    }

    req.user = decode; // modifying the request object, adding authenticated user to it
    next();
  } catch (error) {
    console.log(error);
  }
};

// admin access
export const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (user.role !== 1) {
      res.status(400).send({ message: "Unauthorized Access" });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
  }
};
