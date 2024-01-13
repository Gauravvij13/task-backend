import { validationResult } from "express-validator";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const generateAccessAndRefereshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = await user.generateAccessToken();
    return { accessToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating referesh and access token"
    );
  }
};

const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, "-password");
  } catch (err) {
    const error = new ApiError(500, "Fetching users failed");
    return next(error);
  }
  res.json(new ApiResponse(201, { data: users }, "Successfull"));
};

const signup = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new ApiError(500, "Fetching users failed");
    return next(error);
  }
  const { name, email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new ApiError(404, "Signingup failed user not found ");
    return next(error);
  }

  if (existingUser) {
    const error = new ApiError(
      422,
      "User with email or username already exists"
    );
    return next(error);
  }

  const newUser = new User({
    name,
    email,
    password,
    tasks: [],
  });
  let user;
  try {
    user = await newUser.save();
  } catch (err) {
    const error = new ApiError(500, "Signup failed  ");
    return next(error);
  }

  const { accessToken } = await generateAccessAndRefereshTokens(user._id);
  res
    .status(201)
    .json(
      new ApiResponse(201, { user: newUser, accessToken }, "Signup successful")
    );
};

const login = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next("Invalid Inputs");
  }
  const { email, password } = req.body;
  let user;
  try {
    user = await User.findOne({ email: email });
  } catch (err) {
    const error = new ApiError(500, "User does not exist");
    return next(error);
  }
  if (!user) {
    const error = new ApiError(401, "Invalid credentials");
    return next(error);
  }
  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!user || !isPasswordValid) {
    const error = new ApiError(401, "Invalid credentials");
    return next(error);
  }
  const { accessToken } = await generateAccessAndRefereshTokens(user._id);
  res
    .status(201)
    .json(
      new ApiResponse(201, { user: user, accessToken }, "Login successful")
    );
};

export { login, getUsers, signup };
