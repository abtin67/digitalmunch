import { model, models, Schema } from "mongoose";
import "@/models/Category";

const ItemSchema = new Schema(
  {
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
      index: true,
    },

    image: {
      type: String,
      default: "",
    },

    tags: [String],

    isAvailable: {
      type: Boolean,
      default: true,
    },

    title: {
      fa: {
        type: String,
        required: true,
        trim: true,
      },
      en: {
        type: String,
        required: true,
        trim: true,
      },
      ar: {
        type: String,
        required: true,
        trim: true,
      },
    },

    description: {
      fa: {
        type: String,
        default: "",
        trim: true,
      },
      en: {
        type: String,
        default: "",
        trim: true,
      },
      ar: {
        type: String,
        default: "",
        trim: true,
      },
    },

    price: {
      single: {
        type: Number,
        required: true,
        min: 0,
      },

      double: {
        type: Number,
        required: true,
        min: 0,
      },

      discountedSingle: {
        type: Number,
        default: null,
        min: 0,
      },

      discountedDouble: {
        type: Number,
        default: null,
        min: 0,
      },
    },

    offer: {
      isSpecial: {
        type: Boolean,
        default: false,
      },

      discountPercent: {
        type: Number,
        default: 0,
        min: 0,
        max: 100,
      },

      expiresAt: {
        type: Date,
        default: null,
      },
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// آیا آفر هنوز فعال است؟
ItemSchema.virtual("isOfferActive").get(function () {
  return (
    this.offer?.isSpecial &&
    (!this.offer?.expiresAt ||
      this.offer.expiresAt > new Date())
  );
});

export default models.Item || model("Item", ItemSchema);