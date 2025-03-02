import type { Genre } from "../genre/genre.type"
import { Theater } from "../theaters/theaters.type"

export interface Movie {
    _id: string
    title: string
    genre: Pick<Genre, "name" | "_id">
    thumbnail: string
    thumbnailUrl: string
}

type MovieTheater = Movie & {
    theater: Pick<Theater, "_id"|"city">[]
}

export interface MovieExplore{
    filteredMovies:Movie[]
    filterAllMovies:MovieTheater[]
}

export interface DataMovieDetail {
    movie: MovieDetail
  }
  
  export interface MovieDetail extends Movie {
    theater: Theater[]
    description: string
    price: number
    available: boolean
    bonus: string
    seats: Seat[]
    times: string[]
  }

  export interface Seat {
    seats: string
    isBooked: boolean
  }

  export interface SelectedSeat {
    seats: {
      seats:string
    }
  }
  

  export interface Balance {
    balance: number
  }