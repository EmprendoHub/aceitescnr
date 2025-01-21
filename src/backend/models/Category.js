import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
  {
    name: {
      es: { type: String, required: true, unique: true },
      en: { type: String },
    },
    summary: {
      es: { type: String },
      en: { type: String },
    },
    images: [
      {
        url: {
          type: String,
        },
      },
    ],
    benefits: {
      es: { type: String },
      en: { type: String },
    },
    precautions: {
      es: { type: String },
      en: { type: String },
    },
    characteristics: [
      {
        test: {
          es: { type: String },
          en: { type: String },
        },
        method: {
          es: { type: String },
          en: { type: String },
        },
        typicalValue: {
          es: { type: String },
          en: { type: String },
        },
      },
    ],
    industry_clients: {
      es: { type: String },
      en: { type: String },
    },
    published: {
      type: Boolean,
      default: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose?.models?.Category ||
  mongoose.model("Category", CategorySchema);
