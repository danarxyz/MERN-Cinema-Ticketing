import TitleHeading from "@/components/TitleHeading";
import type { Genre } from "@/services/genre/genre.type";
import {
  createMovie,
  movieSchema,
  MovieValues,
  updateMovie,
} from "@/services/movies/movie.service";
import { Movie } from "@/services/movies/movie.type";
import type { Theater } from "@/services/theaters/theaters.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Form, useLoaderData, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Save } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

type LoaderData = {
  genres: Genre[];
  theaters: Theater[];
  detail: Movie | null;
};

const updateMovieSchema = movieSchema.partial({thumbnail:true});

export default function AdminMovieForm() {
  const { detail, genres, theaters } = useLoaderData() as LoaderData;

  const form = useForm<MovieValues>({
    resolver: zodResolver(detail === null ? movieSchema : updateMovieSchema),
    defaultValues: {
      title: detail?.title,
      theater: detail === null ? [] : detail?.theater?.map((t) => t._id), 
      genre: detail === null ? [] : [detail?.genre?._id ?? ''],
      description: detail?.description,
      price: detail?.price ? detail?.price?.toString() : undefined,
      bonus: detail?.bonus,
      available: detail?.available ,
    },
  });

  const { isPending, mutateAsync } = useMutation({
    mutationFn: (data: FormData) =>
      detail === null ? createMovie(data) : updateMovie(data, detail._id),
  });

  const selectedTheaters = form.watch("theater");
  const selectedGenres = form.watch("genre");

  const handleChangeTheaters = (val: string) => {
    if (!selectedTheaters.includes(val)) {
      const newTheaters = [...selectedTheaters, val];

      form.setValue("theater", newTheaters);
    }
  };

  const handleRemoveTheaters = (val: string) => {
    const updatedTheaters = selectedTheaters.filter(
      (theater) => theater !== val
    );
    form.setValue("theater", updatedTheaters);
  };

  const handleChangeGenres = (val: string) => {
    if (!selectedGenres.includes(val)) {
      const newGenres = [...selectedGenres, val];
      form.setValue("genre", newGenres);
    }
  };

  const handleRemoveGenres = (val: string) => {
    const updatedGenres = selectedGenres.filter(
      (genre) => genre !== val
    );
    form.setValue("genre", updatedGenres);
  };

  const navigate = useNavigate();

  const onSubmit = async (val: MovieValues) => {
    try {
      // Debug log the form values
      console.log('Form Values:', val);

      const formData = new FormData();

      // Log each FormData append
      formData.append("available", val.available ? "1" : "0");
      console.log('Available:', val.available);

      if (val.description) {
        formData.append("description", val.description);
        console.log('Description:', val.description);
      }

      formData.append("genre", val.genre.join(","));
      console.log('Genres:', val.genre);

      formData.append("theater", val.theater.join(","));
      console.log('Theaters:', val.theater);

      formData.append("title", val.title);
      console.log('Title:', val.title);

      formData.append("price", val.price.toString());
      console.log('Price:', val.price);

      if (val?.thumbnail) {
        formData.append("thumbnail", val.thumbnail);
        console.log('Thumbnail:', val.thumbnail);
      }

      if (val.bonus) {
        formData.append("bonus", val.bonus);
        console.log('Bonus:', val.bonus);
      }

      // Log the complete FormData
      console.log('FormData entries:');
      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

      // Add error handling to mutation
      const response = await mutateAsync(formData);
      console.log('Mutation response:', response);

      navigate("/admin/movies");
      toast.success(`Movie data successfully ${detail === null ? "created" : "updated"}`);
    } catch (error: any) {
      // Enhanced error logging
      console.error('Form submission error:', {
        message: error.message,
        response: error.response?.data,
        stack: error.stack
      });

      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      <TitleHeading
        title={`${detail === null ? "Create" : "Update"} Data Movies`}
      />

      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 w-1/2"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter movie name..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="thumbnail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Thumbnail</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files) {
                        form.setValue("thumbnail", e.target.files[0]);
                      }
                    }}
                    placeholder="Choose movie poster image..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    type="Number"
                    placeholder="Enter movie price..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="genre"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Genres</FormLabel>
                <Select onValueChange={handleChangeGenres}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select movie genres" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {genres.map((val) => (
                      <SelectItem key={`${val._id}`} value={val._id}>
                        {val.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {selectedGenres?.length > 0 && (
                  <div className="inline-flex items-center space-x-2">
                    {selectedGenres.map((item, i) => (
                      <Badge
                        onClick={() => handleRemoveGenres(item)}
                        key={`${item + i}`}
                        className="cursor-pointer"
                      >
                        {genres.find((genre) => genre._id === item)?.name}
                      </Badge>
                    ))}
                  </div>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="theater"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Theaters</FormLabel>
                <Select onValueChange={handleChangeTheaters}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select theater" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {theaters.map((val, i) => (
                      <SelectItem key={`${val._id}`} value={val._id}>
                        {val.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {selectedTheaters?.length > 0 && (
                  <div className="inline-flex items-center space-x-2">
                    {selectedTheaters.map((item, i) => (
                      <Badge
                        onClick={() => handleRemoveTheaters(item)}
                        key={`${item + i}`}
                        className="cursor-pointer"
                      >
                        {theaters.find((theater) => theater._id === item)?.name}
                      </Badge>
                    ))}
                  </div>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Enter description..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bonus"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bonus</FormLabel>
                <FormControl>
                  <Input placeholder="Enter bonus..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="available"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Available</FormLabel>
                <FormControl>
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="data-[state=checked]:bg-primary"
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Showing Now</FormLabel>
                    </div>
                  </FormItem>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button isLoading={isPending}>
            <Save className="h-4 w-4 mr-2" />
            Submit
          </Button>
        </form>
      </FormProvider>
    </>
  );
}
