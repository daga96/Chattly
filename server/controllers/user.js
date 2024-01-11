const userModel = require("../models/user");
const util = require("../utils/common");
const Result = require("../utils/result");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

exports.createUser = async (ctx) => {
  const { username, email, password } = ctx.request.body;

  try {
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return Result.error(ctx, 400, "User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new userModel({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return Result.success(ctx, newUser, "User created successfully");
  } catch (error) {
    return Result.error(ctx, error.code, error.message);
  }
};

exports.authUser = async (ctx) => {
  const { username, password } = ctx.request.body;
  const user = await userModel.findOne({ username });

  if (util.isEmpty(user)) {
    return Result.error(ctx, 400, "User not found");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return Result.error(ctx, 401, "Incorrect password");
  }

  const accessToken = jwt.sign(
    { userId: user._id, username: user.username },
    process.env.ACCESS_TOKEN_KEY,
    { expiresIn: "1h" }
  );

  const refreshToken = jwt.sign(
    { userId: user._id, username: user.username },
    process.env.REFRESH_TOKEN_KEY,
    { expiresIn: "7d" }
  );

  return Result.success(ctx, { user, accessToken, refreshToken });
};
exports.getUser = async (ctx) => {
  const { email } = ctx.request.body;
  try {
    const existingUser = await userModel.findOne({ email });
    return Result.success(ctx, existingUser);
  } catch (error) {
    return Result.error(ctx, error.code, error.message);
  }
};

exports.getUserById = async (ctx) => {
  const { _id } = ctx.request.body;
  try {
    const existingUser = await userModel.findOne({ _id });
    return Result.success(ctx, existingUser);
  } catch (error) {
    return Result.error(ctx, error.code, error.message);
  }
};

exports.getAllUsers = async (ctx) => {
  try {
    const userList = await userModel.find();
    return Result.success(ctx, userList);
  } catch (error) {
    return Result.error(ctx, error.code, error.message);
  }
};

exports.exchangeAccessToken = async (ctx) => {
  const { refreshToken } = ctx.request.body;
  try {
    decodedToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY);
  } catch (error) {
    //throw error
  }

  const user = await await userModel.findOne(decodedToken._id);
  if (!user) {
    //throw error
  }
  const accessToken = jwt.sign(
    { userId: user._id, username: user.username },
    process.env.ACCESS_TOKEN_KEY,
    { expiresIn: "1h" }
  );

  return Result.success(ctx, { user, accessToken });
};
