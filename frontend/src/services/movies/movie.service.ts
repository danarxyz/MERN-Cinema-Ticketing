import { privateInstance } from "@/lib/axios";
import type { BaseResponse } from "@/types/response";
import { z } from "zod";
import { Movie } from "./movie.type";

export const movieSchema = z
  .object({
    title: z.string().min(5),
    genre: z.array(z.string()).min(1, "At least one genre must be selected"),
    theater: z.array(z.string().min(5)).min(1),
    available: z.boolean().optional(),
    description: z.string().min(5).optional(),
    price: z.string(),
    bonus: z.string().optional(),
    thumbnail: z.any().refine((file: File) => file?.name, {
      message: "Please upload a thumbnail image",
    }),
  })
  .strict();

export type MovieValues = z.infer<typeof movieSchema>;

export const getMovies = (): Promise<BaseResponse<Movie[]>> =>
  privateInstance.get("/admin/movies").then((res) => res.data);

export const createMovie = (data: FormData) =>
  privateInstance
    .post("/admin/movies", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => res.data);

export const getMovieDetail = (id: string): Promise<BaseResponse<Movie>> =>
  privateInstance.get(`/admin/movies/${id}`).then((res) => res.data);

export const updateMovie = (data: FormData, id: string) =>
  privateInstance
    .put(`/admin/movies/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => res.data);

export const deleteMovie = (id: string) =>
  privateInstance.delete(`/admin/movies/${id}`).then((res) => res.data);
