
import { MovieDetail } from "@/services/global/global.type";
import { useAppSelector } from "@/redux/hooks";
import SelectTheater from "./SelectTheater";
import DetailMovie from "./DetailMovie";
import SelectTime from "./SelectTime";
import SelectSeat from "./SelectSeat";


export type LoaderData = {
    detail: MovieDetail
}

export default function CustomerMovieDetail() {
    const {step} = useAppSelector((state) => state.ticket)


  return (
    <>
        {step === "DETAIL" && <DetailMovie/>}
        {step === "THEATER" && <SelectTheater/>}
        {step === "TIME" && <SelectTime/>}
        {step === "SEAT" && <SelectSeat/>}
        
    </>
  );
}
