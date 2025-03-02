import mongoose from "mongoose";
import { getAssetUrl } from "../utils/helper";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "customer"],
      default: "customer",
    },
  },
  {
    virtuals: {
      photosUrl: {
        get() {
          if (!this.photo) return null;
          const url = `${process.env.APP_URL}/uploads/photos/${this.photo}`;
          console.log("Virtual getter - Generated URL:", url);
          return url;
        },
      },
    },
    toJSON: {
      virtuals: true,
    },
  }
);

export default mongoose.model("User", UserSchema, "users");
