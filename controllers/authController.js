import { generateToken } from "../config/token.js";
import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import User from "../models/userModel.js";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, answer } = req.body;
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
    } else if (!answer) {
      return res.status(200).send({ message: "Answer is required" });
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
      answer: answer,
    });

    return res.status(201).send({
      message: "User created successfully",
      success: true,
      user: {
        _id: createdUser.id,
        name: createdUser.name,
        email: createdUser.email,
        phone: createdUser.phone,
        address: createdUser.address,
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
      return res
        .status(200)
        .send({ success: false, message: "Email or password is missing" });
    }

    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(200)
        .send({ success: false, message: "User not found" });

    const isValidPassword = await comparePassword(password, user.password);
    if (!isValidPassword)
      return res
        .status(200)
        .send({ success: false, message: "Email or password invalid" });

    const token = await generateToken(user._id);

    return res.status(200).send({
      success: true,
      message: "Login Successful",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    return res
      .status(500)
      .send({ success: false, message: "Error in login, try again", error });
  }
};

export const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    if (!email) {
      return res.status(200).send({ message: "Email is required" });
    } else if (!answer) {
      return res.status(200).send({ message: "Answer is required" });
    } else if (!newPassword) {
      return res.status(200).send({ message: "New password is required" });
    }

    const user = await User.findOne({ email });

    if (!user)
      return res
        .status(200)
        .send({ success: false, message: "User not found" });
    if (answer !== user.answer)
      return res
        .status(200)
        .send({ success: false, message: "Invalid answer to the question" });

    const encryptedPassword = await hashPassword(newPassword);
    const updatedUser = await User.findByIdAndUpdate(user._id, {
      password: encryptedPassword,
    });

    return res.status(200).send({
      success: true,
      message: "New Password updated",
      user: {
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        address: updatedUser.address,
      },
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};
