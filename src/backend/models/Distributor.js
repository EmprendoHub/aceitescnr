import mongoose from "mongoose";

const DistributorSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
    },
    lastName: {
      type: String,
    },
    avatar: {
      type: String,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    dateOfBirth: {
      type: Date,
    },
    address: {
      street: {
        type: String,
      },
      city: {
        type: String,
      },
      province: {
        type: String,
      },
      zip_code: {
        type: String,
      },
      country: {
        type: String,
      },
    },
    contact: {
      website: {
        type: String,
      },
      socialMedia: {
        tiktok: {
          type: String,
        },
        facebook: {
          type: String,
        },
        instagram: {
          type: String,
        },
      },
    },
    balance: {
      type: Number,
    },
    joinedAt: {
      type: Date,
    },
    isActive: {
      type: Boolean,
    },
    settings: {
      notificationPreferences: {
        email: {
          type: Boolean,
        },
        sms: {
          type: Boolean,
        },
      },
    },
  },
  { timestamps: true }
);

export default mongoose?.models?.Distributor ||
  mongoose.model("Distributor", DistributorSchema);
