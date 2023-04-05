import { generateToken } from "../config/token.js";
import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import User from "../models/userModel.js";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;
    if (!name) {
      return res.status(200).send({ message: "Name is required" });
    } else if (!email) {
      return res.status(200).send({ message: "Email is required" });
    } else if (!password) {
      return res.status(200).send({ message: "Password is required" });
    } else if (!phone) {
      return res.status(200).send({ message: "Phone is required" });
    } else if (!address) {
      return res.status(200).send({ message: "Address is required" });
    }

    // checking for existing user
    const user = await User.findOne({ email });
    if (user)
      return res
        .status(200)
        .send({ success: false, message: "User already exists" });

    // create user
    const hashedPassword = await hashPassword(password);
    const createdUser = await User.create({
      name: name,
      email: email,
      password: hashedPassword,
      phone: phone,
      address: address,
    });
    res.status(201).send({
      message: "User created successfully",
      success: true,
      user: {
        _id: createdUser.id,
        name: name,
        email: email,
        phone: phone,
        address: address,
      },
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in Registration",
      error,
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(200).send({ message: "Invalid email or password" });
    }

    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(200)
        .send({ success: false, message: "Wrong credentials" });

    const isValidPassword = await comparePassword(password, user.password);
    if (!isValidPassword)
      return res.status(200).send({ success: false, message: "Access Denied" });

    const token = await generateToken(user._id);

    res.status(200).send({
      success: true,
      message: "Login Successful",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
      },
      token,
    });
  } catch (error) {
    return res
      .status(500)
      .send({ success: false, message: "Error in login, try again", error });
  }
};
