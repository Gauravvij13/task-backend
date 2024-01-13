import mongoose, { Schema } from "mongoose";

const taskSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    completionStatus: { type: Boolean, required: true },
    dueDate: { type: String },
    creator: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
  },
  {
    timestamps: true,
  }
);

export const Task = mongoose.model("Task", taskSchema);
