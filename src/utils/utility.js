import jwt from "jsonwebtoken";
import { ApiError } from "./ApiError.js";

export const getCurrentUserId = async (req) => {
  const token =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    throw new ApiError(401, "unautthorized");
  }
  let decodedToken;
  try {
    decodedToken = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  } catch (error) {
    throw new ApiError(401, "invalid acess token");
  }
  return decodedToken?._id;
};
