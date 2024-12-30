import mongoose from "mongoose";

const AuthorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    aboutAuthor: {
      es: { type: String, require: true },
      en: { type: String },
    },
    avatar: {
      type: String,
    },
    socials: {
      instagram: {
        type: String,
      },
      facebook: {
        type: String,
      },
      tiktok: {
        type: String,
      },
      youtube: {
        type: String,
      },
      linkedin: {
        type: String,
      },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose?.models?.Author ||
  mongoose.model("Author", AuthorSchema);
