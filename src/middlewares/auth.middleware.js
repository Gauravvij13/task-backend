import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

import { User } from "../models/user.model.js";
import { getCurrentUserId } from "../utils/utility.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  try {
    const userId = await getCurrentUserId(req);
    const user = User?.findById(userId).select("-password -refreshToken");

    if (!user) {
      throw new ApiError(401, "invalid acess token");
    }

    req.userData = { userId: userId };
    next();
  } catch (error) {
    throw new ApiError(401, "invalid acess token");
  }
});
