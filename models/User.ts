import mongoose, { Schema, models, model } from "mongoose";

const UserSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }, 
    role: { type: String, enum: ["admin"], default: "admin" },
  },
  { timestamps: true }
);

export default models.User || model("User", UserSchema);