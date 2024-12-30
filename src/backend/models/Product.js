import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  title: {
    es: { type: String, required: true, unique: true },
    en: { type: String },
  },
  presentations: [
    {
      value: {
        type: String,
      },
      label: {
        type: String,
      },
    },
  ],
  slug: {
    type: String,
    unique: true,
  },
  description: {
    es: { type: String, required: true },
    en: { type: String },
  },
  brand: {
    type: String,
  },
  weight: {
    es: { type: Number },
    en: { type: Number },
  },
  weightTwo: {
    es: { type: Number },
    en: { type: Number },
  },
  packing: {
    es: { type: String },
    en: { type: String },
  },
  packingTwo: {
    es: { type: String },
    en: { type: String },
  },
  category: {
    es: { type: String, required: true },
    en: { type: String },
  },
  tags: [
    {
      value: {
        type: String,
      },
      label: {
        type: String,
      },
    },
  ],
  images: [
    {
      url: {
        type: String,
      },
    },
  ],
  origins: [
    {
      country: {
        es: { type: String },
        en: { type: String },
      },
      month: {
        label: {
          es: {
            type: String,
          },
          en: {
            type: String,
          },
        },
        value: {
          type: Number,
        },
      },
    },
  ],
  availability: {
    type: Boolean,
    default: true,
  },
  stock: {
    require: true,
    type: Number,
    default: 0,
  },
  rating: {
    type: Number,
    default: 0,
  },
  price: {
    require: true,
    type: Number,
  },
  cost: {
    type: Number,
  },
  active: {
    default: true,
    type: Boolean,
  },
  createdAt: {
    type: Date,
  },
  published: {
    type: Boolean,
    default: true,
  },
  quantity: {
    type: Number,
    default: 1,
  },
  reviews: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Review",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: "User",
  },
});

export default mongoose?.models?.Product ||
  mongoose.model("Product", ProductSchema);
