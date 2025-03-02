import mongoose from "mongoose";
import { getAssetUrl } from "../utils/helper";
import Theater from "./Theater";
import Genre from "./Genre";

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    theater: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Theater",
      },
    ],
    genre: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Genre",
        required: true,
      },
    ],
    description: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    price: Number,
    available: Boolean,
    bonus: String,
  },
  {
    virtuals: {
      thumbnailUrl: {
        get() {
          return `${getAssetUrl(this.thumbnail, "thumbnails")}`;
        },
      },
    },
    toJSON: {
      virtuals: true,
    },
  }
);

movieSchema.post("save", async (doc) => {
  if (doc) {
    await Genre.findByIdAndUpdate(doc.genre, {
      $push: { movie: doc._id },
    });
  }

  for (const theater of doc.theater) {
    await Theater.findByIdAndUpdate(theater._id, {
      $push: { movie: theater._id },
    });
  }
});

movieSchema.post("deleteOne", async (doc) => {
  if (doc) {
    await Genre.findByIdAndUpdate(doc.genre, {
      $pull: { movie: doc._id },
    });
  }

  for (const theater of doc.theater) {
    await Theater.findByIdAndUpdate(theater._id, {
      $pull: { movie: theater._id },
    });
  }
});

export default mongoose.model("Movie", movieSchema, "movies");
