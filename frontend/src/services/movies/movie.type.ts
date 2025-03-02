import type { Genre } from "../genre/genre.type"
import type { Theater } from "../theaters/theaters.type"

export interface Movie {
    _id: string
    title: string
    theater: Pick<Theater, "_id" | "name" | "city">[]
    genre: Pick<Genre, "_id" | "name">
    description: string
    thumbnail: string
    price: number
    available: boolean
    bonus: string
    thumbnailUrl: string
    id: string
  }
