import mongoose from "mongoose";

const AnalyticSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
  },
  source: [
    {
      page: {
        type: String,
      },
      visits: {
        type: Number,
        default: 1,
      },
    },
  ],
});

// Ensure index on createdAt
AnalyticSchema.index({ createdAt: 1 });

// Ensure index on source.page
AnalyticSchema.index({ "source.page": 1 });

export default mongoose?.models?.Analytic ||
  mongoose.model("Analytic", AnalyticSchema);
