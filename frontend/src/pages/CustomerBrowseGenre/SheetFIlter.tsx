import { cn, LOCATION_OPTIONS } from "@/lib/utils";
import { setFilter } from "@/redux/features/filter/filterSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Genre } from "@/services/genre/genre.type";
import { filterSchema, FilterValues } from "@/services/global/global.service";
import { Theater } from "@/services/theaters/theaters.type";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";

interface SheetFilterProps {
  onCancel: () => void;
  show: boolean;
  setShow: () => void;
}

type LoaderData = {
  genres: Pick<Genre, "_id" | "name">[];
  theaters: Theater[];
};

export default function SheetFIlter({
  onCancel,
  show,
  setShow,
}: SheetFilterProps) {
  const { genreId } = useParams();
  const { genres, theaters } = useLoaderData() as LoaderData;

  const filter = useAppSelector((state) => state.filter.data);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm<FilterValues>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      city: filter?.city,
      theaters: filter?.theaters?? [],
      availibility: "1",
      genres: genreId,
    },
  });

  const onSubmit = (val: FilterValues) => {
    console.log(val);

    dispatch(
      setFilter({
        data:{
          city: val.city ?? undefined,
          theaters: val.theaters?.filter((theater): theater is string => theater !== null) ?? undefined,
          availablity: val.availibility === "1" ? true : false
        }
      })
    );
    onCancel();
    const body = document.getElementsByTagName("body")[0];
    body.classList.toggle("overflow-hidden");
  
    navigate(`/browse/${val.genres}`);
};


  return (
    <div className="filter-sidebar-container relative w-full">
      <div
        id="Filter-Sidebar"
        className={cn(
          "fixed top-0 left-full flex h-screen w-full max-w-[640px] bg-black/70 z-50 transition-all duration-1000",
          show ? "left-auto" : "left-full"
        )}
      >
        <button
          onClick={() => {
            const body = document.getElementsByTagName("body")[0];

            body.classList.toggle("overflow-hidden");
          }}
          className="w-full h-full"
        />
        <div className="flex flex-col w-full h-full max-w-[320px] shrink-0 bg-white overflow-y-scroll">
          <div className="relative flex items-center justify-between px-5 mt-[60px]">
            <button
              onClick={() => {
                onCancel();

                const body = document.getElementsByTagName("body")[0];

                body.classList.toggle("overflow-hidden");
              }}
              type="button"
              className="w-12 h-12 flex shrink-0 items-center justify-center bg-[#0101011A] backdrop-blur-md rounded-full"
            >
              <img
                src="/assets/images/icons/arrow-left.svg"
                className="w-[22px] h-[22px] flex shrink-0 invert"
                alt=""
              />
            </button>
            <p className="text-center mx-auto font-semibold text-sm text-premiere-black">
              Filter Movies
            </p>
            <div className="dummy-button w-12" />
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-[30px] px-5 mt-[30px] mb-[110px]"
          >
            <div className="flex flex-col gap-3">
              <p className="font-semibold text-premiere-black">Genre</p>
              {genres.map((item) => (
                <label key={item._id} className="flex items-center gap-[10px]">
                  <input
                    type="radio"
                    value={item._id}
                    className="w-6 h-6 rounded-full appearance-none checked:border-4 checked:border-solid checked:border-white checked:bg-premiere-purple ring-1 ring-premiere-purple transition-all duration-300"
                    {...register("genres")}
                  />
                  <p className="font-semibold text-premiere-black">
                    {item.name}
                  </p>
                </label>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              <p className="font-semibold text-premiere-black">City</p>
              {LOCATION_OPTIONS.map((item, i) => (
                <label
                  key={`${item + i}`}
                  className="flex items-center gap-[10px]"
                >
                  <input
                    type="radio"
                    value={item}
                    className="w-6 h-6 rounded-full appearance-none checked:border-4 checked:border-solid checked:border-white checked:bg-premiere-purple ring-1 ring-premiere-purple transition-all duration-300"
                    {...register("city")}
                  />
                  <p className="font-semibold text-premiere-black">{item}</p>
                </label>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              <p className="font-semibold text-premiere-black">Theater</p>
              {theaters.map((item) => (
                <label key={item._id} className="flex items-center gap-[10px]">
                  <input
                    type="checkbox"
                    value={item._id}
                    className="w-6 h-6 rounded-lg appearance-none checked:border-4 checked:border-solid checked:border-white checked:bg-premiere-purple ring-1 ring-premiere-purple transition-all duration-300"
                    {...register("theaters")}
                  />
                  <p className="font-semibold text-premiere-black">
                    {item.name}
                  </p>
                </label>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              <p className="font-semibold text-premiere-black">Availability</p>
              <label className="flex items-center gap-[10px]">
                <input
                  type="radio"
                  value={"1"}
                  className="w-6 h-6 rounded-full appearance-none checked:border-4 checked:border-solid checked:border-white checked:bg-premiere-purple ring-1 ring-premiere-purple transition-all duration-300"
                  {...register("availibility")}
                />
                <p className="font-semibold text-premiere-black">
                  Available Now
                </p>
              </label>
              <label className="flex items-center gap-[10px]">
                <input
                  type="radio"
                  value={"0"}
                  className="w-6 h-6 rounded-full appearance-none checked:border-4 checked:border-solid checked:border-white checked:bg-premiere-purple ring-1 ring-premiere-purple transition-all duration-300"
                  {...register("availibility")}
                />
                <p className="font-semibold text-premiere-black">Coming Soon</p>
              </label>
            </div>
            <button
              type="submit"
              className="w-full rounded-full p-[12px_18px] bg-[#5236FF] text-white font-bold text-center"
            >
              Show Movies
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
