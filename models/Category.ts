import mongoose, { Schema, models, model } from "mongoose";

const CategorySchema = new Schema(
  {
    name: {
      fa: { type: String, required: true },
      ar: { type: String, required: true },
      en: { type: String, required: true },
    },
  },
  { timestamps: true }
);

export default models.Category || model("Category", CategorySchema);