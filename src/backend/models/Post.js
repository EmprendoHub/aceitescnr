import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  mainTitle: {
    es: { type: String, required: true },
    en: { type: String },
  },
  mainImage: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    unique: true,
  },
  metaDescription: {
    type: String,
  },
  keywords: [
    {
      type: String,
    },
  ],
  category: {
    es: { type: String },
    en: { type: String },
  },
  summary: {
    es: { type: String },
    en: { type: String },
  },
  sectionTwoTitle: {
    es: { type: String },
    en: { type: String },
  },
  sectionTwoParagraphOne: {
    es: { type: String },
    en: { type: String },
  },
  sectionTwoParagraphTwo: {
    es: { type: String },
    en: { type: String },
  },
  sectionThreeTitle: {
    es: { type: String },
    en: { type: String },
  },
  sectionThreeParagraphOne: {
    es: { type: String },
    en: { type: String },
  },
  sectionThreeImage: {
    type: String,
  },
  sectionThreeParagraphFooter: {
    es: { type: String },
    en: { type: String },
  },
  sectionFourTitle: {
    es: { type: String },
    en: { type: String },
  },
  sectionFourOptionOne: {
    es: { type: String },
    en: { type: String },
  },
  sectionFourOptionTwo: {
    es: { type: String },
    en: { type: String },
  },
  sectionFourOptionThree: {
    es: { type: String },
    en: { type: String },
  },
  sectionFourParagraphOne: {
    es: { type: String },
    en: { type: String },
  },
  sectionFourImage: {
    type: String,
  },
  sectionFourParagraphFooter: {
    es: { type: String },
    en: { type: String },
  },
  sectionFiveTitle: {
    es: { type: String },
    en: { type: String },
  },
  sectionFiveImage: {
    type: String,
  },
  sectionFiveParagraphOne: {
    es: { type: String },
    en: { type: String },
  },
  sectionFiveParagraphTwo: {
    es: { type: String },
    en: { type: String },
  },
  sectionSixColOneTitle: {
    es: { type: String },
    en: { type: String },
  },
  sectionSixColOneParagraph: {
    es: { type: String },
    en: { type: String },
  },
  sectionSixColOneImage: {
    type: String,
  },
  sectionSixColTwoTitle: {
    es: { type: String },
    en: { type: String },
  },
  sectionSixColTwoParagraph: {
    es: { type: String },
    en: { type: String },
  },
  sectionSixColTwoImage: {
    type: String,
  },
  sectionSixColThreeTitle: {
    es: { type: String },
    en: { type: String },
  },
  sectionSixColThreeParagraph: {
    es: { type: String },
    en: { type: String },
  },
  sectionSixColThreeImage: {
    type: String,
  },
  sectionSixColOneParagraphFooter: {
    es: { type: String },
    en: { type: String },
  },
  sectionSevenTitle: {
    es: { type: String },
    en: { type: String },
  },
  sectionSevenImage: {
    type: String,
  },
  sectionSevenParagraph: {
    es: { type: String },
    en: { type: String },
  },
  published: {
    type: Boolean,
    default: false,
  },
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
  },
});

export default mongoose?.models?.Post || mongoose.model("Post", PostSchema);
