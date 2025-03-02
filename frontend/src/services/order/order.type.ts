import type { Movie } from "../movies/movie.type";
import { Theater } from "../theaters/theaters.type";

interface Seat {
  seats: string;
}

export interface Order {
  _id: string;
  movie: Pick<
    Movie,
    "title" | "genre" | "thumbnail" | "thumbnailUrl" | "bonus" | "price"
  >;
  theater: Pick<Theater, "name" | "city">;
  date: string;
  seats: Seat[];
  subtotal: number;
  total: number;
  bookingFee: number;
  tax: number;
  status: string;
}
