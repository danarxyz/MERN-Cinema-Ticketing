import path from "node:path";
import type { Request, Response } from "express";
import Movie from "../models/Movie";
import Genre from "../models/Genre";
import Transaction from "../models/Transaction";
import Theater from "../models/Theater";

export const getMovies = async (req: Request, res: Response) => {
  try {
    const data = await Movie.find()
      .select("title thumbnail")
      .populate({
        path: "genre",
        select: "name -_id",
      })
      .populate({
        path: "theater",
        select: "name city",
      })
      .limit(3);

    return res.status(200).json({
      data: data,
      message: "Data retrieved successfully",
      status: "success",
    });
  } catch (error) {
    return res.status(500).json({
      data: null,
      message: "Failed to get data",
      status: "failed",
    });
  }
};

export const getGenres = async (req: Request, res: Response) => {
  try {
    const genres = await Genre.find().select("name").limit(3);
    return res.status(200).json({
      data: genres,
      message: "Data retrieved successfully",
      status: "success",
    });
  } catch (error) {
    return res.status(500).json({
      data: null,
      message: "Failed to get data",
      status: "failed",
    });
  }
};

export const getMovieDetail = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const seats = [];

    for (let i = 0; i < 5; i++) {
      seats.push({
        seat: `A${i + 1}`,
        isBooked: false,
      });
    }

    for (let i = 0; i < 5; i++) {
      seats.push({
        seat: `B${i + 1}`,
        isBooked: false,
      });
    }

    for (let i = 0; i < 5; i++) {
      seats.push({
        seat: `C${i + 1}`,
        isBooked: false,
      });
    }

    const movie = await Movie.findById(id)
      .populate({
        path: "theater",
        select: "name city",
      })
      .populate({
        path: "genre",
        select: "name -_id",
      });

    return res.status(200).json({
      data: {
        movie: {
          ...movie?.toJSON(),
          seats,
          times: ["12:30", "14:30", "16:30", "18:30", "20:30"],
        },
      },
      message: "Data retrieved successfully",
      status: "success",
    });
  } catch (error) {
    return res.status(500).json({
      data: null,
      message: "Failed to get data",
      status: "failed",
    });
  }
};

export const getAvailableSeats = async (req: Request, res: Response) => {
  try {
    const { movieId } = req.params;
    const { date } = req.query;

    const transactions = await Transaction.find({
      date: date?.toString().replace("+", " "),
      movie: movieId,
    }).select("seats").populate({
      path:"seats",
      select:"seats -_id"
    })

    // Flatten the seats array since each transaction can have multiple seats
    const bookedSeats = transactions.flatMap((t) => t.seats);

    console.log("Found booked seats:", bookedSeats);

    return res.status(200).json({
      data: bookedSeats.map((seat) => ({
        seats: seat, // Now this will be the actual seat value like "C2"
      })),
      message: "Data retrieved successfully",
      status: "success",
    });
  } catch (error) {
    console.error("Error getting seats:", error);
    return res.status(500).json({
      data: null,
      message: "Failed to get data",
      status: "failed",
    });
  }
};

export const getMoviesFilter = async (req: Request, res: Response) => {
  try {
    const { genreId } = req.params;
    const { city, theaters, availibility } = req.query;

    let filterQuery: any = {};

    if (genreId) {
      filterQuery = {
        ...filterQuery,
        genre: genreId,
      };
    }

    if (city) {
      const theaters_lists = await Theater.find({ city: city });

      const theaterIds = theaters_lists.map((the) => the._id);

      filterQuery = {
        ...filterQuery,
        theater: {
          $in: [...theaterIds],
        },
      };
    }

    if (theaters) {
      const theaterIds2 = theaters as string[];
      filterQuery = {
        ...filterQuery,
        theater: {
          // Changed from 'theaters' to 'theater'
          $in: [...(filterQuery?.theater?.$in ?? []), ...theaterIds2],
        },
      };
    }

    if (availibility === "true") {
      filterQuery = {
        ...filterQuery,
        availibility: true,
      };
    }

    const data = await Movie.find(filterQuery)
      .select("title genre thumbnail theater")
      .populate({
        path: "genre",
        select: "name",
      })
      .populate({
        path: "theater",
        select: "name city -_id",
      });

    const allData = await Movie.find(filterQuery)
      .select("title genre theater thumbnail price available description")
      .populate({
        path: "theater",
        select: "name city",
      })
      .populate({
        path: "genre",
        select: "name",
      });

    return res.status(200).json({
      data: {
        filteredMovies: data,
        filterAllMovies: allData,
      },
      message: "Data retrieved successfully",
      status: "success",
    });
  } catch (error) {
    return res.status(500).json({
      data: null,
      message: "Failed to get data",
      status: "failed",
    });
  }
};

export const getTheaters = async (req: Request, res: Response) => {
  try {
    const theaters = await Theater.find();

    return res.status(200).json({
      data: theaters,
      message: "Data retrieved successfully",
      status: "success",
    });
  } catch (error) {
    return res.status(500).json({
      data: null,
      message: "Failed to get data",
      status: "failed",
    });
  }
};
