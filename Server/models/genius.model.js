import mongoose from "mongoose";

const geniusSchema = new mongoose.Schema(
  {
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
    calendlyUrl:{
        type:String
    },
    avatar: {
      publicId: {
        type: String,
        required :true
      },
      secure_url: {
        type: String,
        required :true
      },
    },
   
  },
  { timestamps: true }
);

export const genius = mongoose.model("genius", geniusSchema);
