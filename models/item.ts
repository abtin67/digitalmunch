import { model, models, Schema } from "mongoose";
import Category from "@/models/Category";

const ItemSchema = new Schema(
  {
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    image: {
      type: String,
      default: "",
    },

    tags: [
      {
        type: String,
      },
    ],

    isAvailable: {
      type: Boolean,
      default: true,
    },

    title: {
      fa: {
        type: String,
        required: true,
      },
      en: {
        type: String,
        required: true,
      },
      ar: {
        type: String,
        required: true,
      },
    },

    description: {
      fa: {
        type: String,
        default: "",
      },
      en: {
        type: String,
        default: "",
      },
      ar: {
        type: String,
        default: "",
      },
    },

    price: {
      single: {
        type: Number,
        required: true,
      },
      double: {
        type: Number,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  },
);

export default models.Item || model("Item", ItemSchema);
