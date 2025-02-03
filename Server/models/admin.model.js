import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const adminSchema = new mongoose.Schema(
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
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  { timestamps: true }
);

adminSchema.methods = {
  generateJWTToken: async function () {
    return await jwt.sign(
      { id: this._id, email: this.email, role: "admin" },
      process.env.SECRET_KEY,
      {
        expiresIn: "7d",
      }
    );
  },
  comparePassword: async function (plaintextPassword) {
    return await bcrypt.compare(plaintextPassword, this.password);
  },
};

export const Admin = mongoose.model("Admin", adminSchema);
