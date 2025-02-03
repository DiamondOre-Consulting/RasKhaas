import mongoose, { model } from "mongoose";

const raspeopleSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["INTERN", "EMPLOYEE"],
      required: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    about: {
      type: String,
    },
    youtubeLink:{
      type:String
    },
    avatar: {
      publicId: {
        type: String,
      },
      secure_url: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

export const raspeople = model("raspeople" , raspeopleSchema)
