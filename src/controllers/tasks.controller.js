import { ApiError } from "../utils/ApiError.js";
import { validationResult } from "express-validator";
import { Task } from "../models/task.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

import mongoose from "mongoose";
import { User } from "../models/user.model.js";

const getTaskById = async (req, res, next) => {
  const taskId = req.params.taskId;
  let filteredData;
  try {
    filteredData = await Task.findById(taskId);
  } catch (er) {
    throw new ApiError(500, "Something went wrong");
  }

  if (!filteredData) {
    const error = new ApiError(404, "Task not found");
    return next(error);
  }
  return res.json(
    new ApiResponse(
      200,
      {
        data: filteredData,
      },
      "Tasks found"
    )
  );
};

const getTasks = async (req, res, next) => {
  const userId = req?.userData?.userId;
  let userWithTasks;
  try {
    userWithTasks = await User.findById(userId).populate("tasks");
  } catch (er) {
    const error = new ApiError(500, "Something went wrong");
    return next(error);
  }

  res.json(200, new ApiResponse(201, { data: userWithTasks?.tasks }));
};

const createTask = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(error);
  }
  const userId = req?.userData?.userId;

  const { title, description, dueDate } = req.body;
  const formData = new Task({
    title,
    description,
    completionStatus: false,
    creator: userId,
    dueDate,
  });
  let user;
  try {
    user = await User.findById(userId);
  } catch (error) {
    throw new ApiError(500, "Failed please try again ");
  }

  if (!user) {
    const error = new ApiError(404, "Couldnot find User");
    return next(error);
  }
  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await formData.save({ session: session });
    user.tasks.push(formData);
    await user.save({ session: session });
    await session.commitTransaction();
  } catch (err) {
    const error = new ApiError(500, "Not able to create task ");
    return next(error);
  }

  res.status(201).json({ tasks: formData, messge: "Added successful" });
};

const updateTask = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next("Invalid Inputs");
  }
  const taskId = req.params.taskId;

  const { title, description, dueDate } = req.body;

  let findedTask;
  try {
    findedTask = await Task.findById(taskId);
  } catch (er) {
    throw new ApiError(500, "Something went wrong");
  }
  const userId = req?.userData?.userId;

  if (findedTask.creator.toString() !== userId) {
    const error = new ApiError(401, "You are not allowed to update");
    return next(error);
  }
  findedTask.title = title;
  findedTask.description = description;
  findedTask.dueDate = dueDate;
  try {
    await findedTask.save();
  } catch (er) {
    const error = new ApiError(500, "Something went wrong could not update ");
    return next(error);
  }

  res
    .status(201)
    .json(new ApiResponse(201, { task: findedTask }, "Updated successful"));
};

const updateTaskStatus = async (req, res, next) => {
  const taskId = req.params.taskId;
  let findedTask;
  try {
    findedTask = await Task.findById(taskId);
  } catch (er) {
    throw new ApiError(500, "Something went wrong");
  }
  const userId = req?.userData?.userId;

  if (findedTask.creator.toString() !== userId) {
    const error = new ApiError(401, "You are not allowed to update");
    return next(error);
  }
  findedTask.completionStatus = !findedTask.completionStatus;
  try {
    await findedTask.save();
  } catch (er) {
    const error = new ApiError(500, "Something went wrong could not update ");
    return next(error);
  }

  res
    .status(201)
    .json(new ApiResponse(201, { task: findedTask }, "Updated successful"));
};

const deleteTask = async (req, res, next) => {
  const taskId = req.params.taskId;

  let task;
  try {
    task = await Task.findById(taskId).populate("creator");
  } catch (er) {
    throw new ApiError(500, "Something went wrong");
  }

  if (!task) {
    const error = new ApiError(
      404,
      "Something went wrong Not able to find task  "
    );
    return next(error);
  }
  const userId = req?.userData?.userId;
  if (task.creator._id.toString() !== userId) {
    const error = new ApiError(401, "You are not allowed to delete");
    return next(error);
  }

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await task.deleteOne({ session });
    await task.creator.tasks.pull(task);
    await task.creator.save({ session: session });
    await session.commitTransaction();
  } catch (err) {
    const error = new ApiError(
      500,
      "Something went wrong Not able to delete  "
    );
    return next(error);
  }
  res.status(201).json({ messge: "Deleted successful" });
};

export {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  updateTaskStatus,
};
