import JWT from "jsonwebtoken";

export const generateToken = async (id) => {
  const token = await JWT.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  return token;
};
