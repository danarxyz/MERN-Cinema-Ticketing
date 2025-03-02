import { Request, Response } from "express";
import Movie from "../models/Movie";
import { movieSchema } from "../utils/zodSchema";
import path from "node:path";
import fs from "node:fs";
import Genre from "../models/Genre";
import Theater from "../models/Theater";

export const getMovies = async (req: Request, res: Response) => {
  try {
    const movies = await Movie.find()
      .populate({
        path: "genre",
        select: "name",
      })
      .populate({
        path: "theater",
        select: "name",
      });

    return res.status(200).json({
      data: movies,
      message: "Movies retrieved successfully",
      status: "success",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      data: null,
      message: "Failed to retrieved movies",
      status: "failed",
    });
  }
};

export const createMovies = async (req: Request, res: Response) => {
  try {
    // Debug log
    console.log("Request body:", req.body);
    console.log("File:", req.file);

    if (!req.file) {
      return res.status(400).json({
        data: null,
        message: "Thumbnail is required",
        status: "failed",
      });
    }

    // Handle genres - convert to array if it's a string
    const genres = Array.isArray(req.body.genre)
      ? req.body.genre
      : req.body.genre.split(",");

    console.log("Parsed genres:", genres);

    const parse = movieSchema.safeParse({
      title: req.body.title,
      genre: genres, // Pass array of genres
      theater: req.body.theater.split(","),
      available: req.body.available === "1" ? true : false,
      description: req.body.description,
      price: Number.parseInt(req.body.price),
      bonus: req.body?.bonus,
    });

    if (!parse.success) {
      const errorMessages = parse.error.issues.map((err) => err.message);
      return res.status(400).json({
        message: "Invalid Request",
        status: "failed",
        details: errorMessages,
      });
    }

    const movie = new Movie({
      title: parse.data.title,
      genre: parse.data.genre, // This will now be an array
      theater: parse.data.theater,
      available: parse.data.available,
      description: parse.data.description,
      price: parse.data.price,
      bonus: parse.data.bonus,
      thumbnail: req.file?.filename,
    });

    const savedMovie = await movie.save();

    // Update all selected genres with the new movie
    await Promise.all(
      parse.data.genre.map((genreId) =>
        Genre.findByIdAndUpdate(genreId, {
          $push: { movie: savedMovie._id },
        })
      )
    );

    return res.status(201).json({
      data: savedMovie,
      message: "Movie created successfully",
      status: "success",
    });
  } catch (error) {
    console.error("Create movie error:", error);
    return res.status(500).json({
      data: null,
      message: "Failed to create movie",
      status: "failed",
    });
  }
};

export const updateMovies = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const parse = movieSchema.safeParse({
      title: req.body.title,
      genre: req.body.genre,
      theater: req.body.theater.split(","),
      available: req.body.available === "1" ? true : false,
      description: req.body.description,
      price: Number.parseInt(req.body.price),
      bonus: req.body?.bonus,
    });

    if (!parse.success) {
      const errorMessages = parse.error.issues.map((err) => err.message);

      return res.status(400).json({
        message: "Invalid Request",
        status: "failed",
        details: errorMessages,
      });
    }

    const oldMovie = await Movie.findById(id);

    if (!oldMovie) {
      return res.status(400).json({
        data: null,
        message: "Movie not found",
        status: "failed",
      });
    }

    if (req.file) {
      const dirname = path.resolve();
      const filepath = path.join(
        dirname,
        "public/uploads/thumbnails",
        oldMovie.thumbnail
      );

      if (fs.existsSync(filepath)) {
        fs.unlinkSync(filepath);
      }
    }

    await Genre.findByIdAndUpdate(oldMovie.genre, {
      $pull: { movie: oldMovie._id },
    });

    for (const theater of oldMovie.theater) {
      await Theater.findByIdAndUpdate(theater._id, {
        $pull: { movie: oldMovie._id },
      });
    }

    await Movie.findByIdAndUpdate(oldMovie._id, {
      title: parse.data.title,
      genre: parse.data.genre,
      theater: parse.data.theater,
      available: parse.data.available,
      description: parse.data.description,
      price: parse.data.price,
      bonus: parse.data.bonus,
      thumbnail: req?.file ? req.file.filename : oldMovie.thumbnail,
    });

    await Genre.findByIdAndUpdate(parse.data.genre, {
      $push: { movie: id },
    });

    for (const theater of parse.data.theater) {
      await Theater.findByIdAndUpdate(theater, {
        $push: { movie: id },
      });
    }

    const updatedMovie = await Movie.findById(id);

    return res.status(200).json({
      data: updatedMovie,
      message: "Movie updated successfully",
      status: "success",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      data: null,
      message: "Failed to retrieved movies",
      status: "failed",
    });
  }
};

export const deleteMovies = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const movie = await Movie.findById(id);

    if (!movie) {
      return res.status(400).json({
        data: null,
        message: "Movie not found",
        status: "failed",
      });
    }

    const dirname = path.resolve();
    const filepath = path.join(
      dirname,
      "public/uploads/thumbnails",
      movie.thumbnail
    );

    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
    }

    await Genre.findByIdAndUpdate(movie.genre, {
      $pull: { movie: movie._id },
    });

    for (const theater of movie.theater) {
      await Theater.findByIdAndUpdate(theater._id, {
        $pull: { movie: theater._id },
      });
    }

    await Movie.findByIdAndDelete(id);

    return res.status(200).json({
      data: movie,
      message: "Movie deleted successfully",
      status: "success",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      data: null,
      message: "Failed to delete movies",
      status: "failed",
    });
  }
};

export const getMovieDetail = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const movie = await Movie.findById(id)
      .populate({
        path: "genre",
        select: "name",
      })
      .populate({
        path: "theater",
        select: "name",
      });

    return res.status(200).json({
      data: movie,
      message: "Movie retrieved successfully",
      status: "success",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      data: null,
      message: "Failed to retrieved movie",
      status: "failed",
    });
  }
};
