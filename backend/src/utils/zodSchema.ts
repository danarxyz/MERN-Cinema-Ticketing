import { z } from "zod";

export const allowedFileTypes = ["image/jpeg", "image/png", "image/jpg"];

export const genreSchema = z
  .object({
    name: z.string().min(5),
  })
  .strict();

export const theaterSchema = z
  .object({
    name: z.string().min(3),
    city: z.string().min(5),
  })
  .strict();

export const movieSchema = z
  .object({
    title: z.string().min(5),
    genre: z.array(z.string()).min(1, "At least one genre must be selected"),
    theater: z.array(z.string().min(5)),
    available: z.boolean(),
    description: z.string().min(5).nullable(),
    price: z.number(),
    bonus: z.string().optional(),
  })
  .strict();

export const authSchema = z
  .object({
    name: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(8),
    role: z.enum(["admin", "customer"]),
  })
  .strict();

export const topupSchema = z
  .object({
    balance: z.number().min(1000),
  })
  .strict();

export const transactionSchema = z
  .object({
    subtotal: z.number(),
    total: z.number(),
    bookingFee: z.number(),
    tax: z.number(),
    movieId: z.string(),
    theaterId: z.string(),
    seats: z.array(z.string()),
    date: z.string(),
  })
  .strict();
