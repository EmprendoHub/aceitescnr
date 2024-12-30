import mongoose from "mongoose";

const VisitorSchema = new mongoose.Schema({
  country: {
    type: String,
  },
  ip: {
    type: String,
    required: true,
  },
  actions: [
    {
      name: {
        type: String,
      },
      source: {
        type: String,
      },
      visits: {
        type: Number,
        default: 1,
      },
      viewport: {
        type: String,
      },
      browser: {
        type: String,
      },
      date: {
        type: Date,
      },
      device: {
        vendor: {
          type: String,
        },
        model: {
          type: String,
        },
        type: {
          type: String,
        },
      },
    },
  ],
  points: {
    type: Number,
  },
  createdAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

// Ensure index on createdAt
VisitorSchema.index({ ip: 1 });

export default mongoose?.models?.Visitor ||
  mongoose.model("Visitor", VisitorSchema);
