import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";
import { Movie } from "@/services/movies/movie.type";
import { rupiahFormat } from "@/lib/utils";
import ActionColumn from "./ActionColumn";

export const columns: ColumnDef<Movie>[] = [
  {
    accessorKey: "title",
    header: "Movie Detail",
    cell: ({ row }) => {
      const movie = row.original;

      return (
        <div className="inline-flex items-center gap-4">
          <img
            src={movie.thumbnailUrl}
            alt={movie.thumbnailUrl}
            className="w-[50px]"
          />

          <div className="space-y-3">
            <div>
              <h4>{movie.title}</h4>
              <p>{movie.description}</p>
            </div>
            <p>Bonus: {movie.bonus}</p>

            <Badge variant={movie.available ? "default" : "destructive"}>
              {movie.available ? "Live Now" : "Coming Soon"}
            </Badge>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => rupiahFormat(row.original.price),
  },
  {
    accessorKey: "genre",
    header: "Genre",
    cell: ({ row }) => {
      const genres = row.original.genre;
      return (
        <div className="flex flex-wrap gap-1">
          {Array.isArray(genres) ? (
            genres.map((genre) => (
              <Badge 
                key={genre._id} 
                variant="outline"
              >
                {genre.name}
              </Badge>
            ))
          ) : (
            genres?.name ?? '-'
          )}
        </div>
      );
    }
  },
  {
    accessorKey: "theater",
    header: "Theater",
    cell: ({ row }) => {
      const theaters = row.original.theater
      return (
        <div className="flex flex-wrap gap-1">
          {theaters?.map((theater) => (
            <Badge 
              key={theater._id} 
              variant="outline"
            >
              {theater.name}
            </Badge>
          )) ?? '-'}
        </div>
      )
    }
  },
  {
    id: "action",
    cell: ({ row }) => {
      const movies = row.original;

      return (
        <ActionColumn id={movies._id} />);
    },
  },
];
