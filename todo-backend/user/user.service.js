import {
  emailValidationSchema,
  userValidationSchema,
} from "./user.validation.js";
import { User } from "./user.model.js";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// validate new user
export const validateNewUser = async (req, res, next) => {
  //extract new user data from req.body
  const newUser = req.body;
  // validate new user
  try {
    await userValidationSchema.validate(newUser);
  } catch (error) {
    // if validation fails throw error
    return res.status(400).send({ message: error.message });
  }
  next();
};

// validate user Email
export const validateUserEmail = async (req, res, next) => {
  // extract login credentials from req.body
  const loginCredentials = req.body;
  // validate email
  try {
    await emailValidationSchema.validate(loginCredentials.email);
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
  next();
};

// register user
export const registerUser = async (req, res, next) => {
  // extract new user data from req.body
  const newUser = req.body;
  // check if user with the email exists
  const user = await User.findOne({ email: newUser.email });
  // if user exists, throw error
  if (user) {
    return res
      .status(409)
      .send({ message: "User with this email already exists" });
  }
  // hash password using bcrypt
  const hashedPassword = await bcrypt.hash(newUser.password, 10);
  newUser.password = hashedPassword;

  // create user
  await User.create(newUser);
  return res.status(201).send({ message: "User created successfully" });
};

// log the user in
export const loginUser = async (req, res) => {
  // extract login credentials from re.body
  const loginCredentials = req.body;
  // check if email matches
  const user = await User.findOne({ email: loginCredentials.email });
  if (!user) {
    return res.status(404).send({ message: "Invalid credentials" });
  }
  // check if the password matches or not
  const passwordMatch = await bcrypt.compare(
    loginCredentials.password,
    user.password
  );
  if (!passwordMatch) {
    return res.status(404).send({ message: "Invalid credentials" });
  }
  user.password = undefined;
  // generate token using encryption algorithm
  const token = jwt.sign(
    { email: user.email },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );
  return res.status(200).send({ user, accessToken: token });
};
