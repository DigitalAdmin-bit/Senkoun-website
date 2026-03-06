import {format, parse} from "date-fns";
import {blocksToPlainText, getStrapiMediaUrl} from "@/lib/utils";
import {IEventsResponse} from "@/lib/apis/events";
import EventDialog from "@/components/events/event-dialog";


export default function EventBox(data: IEventsResponse) {
    const start_time = data.date.start_time && parse(data.date.start_time, "HH:mm:ss", new Date());
    const end_time = data.date.end_time && parse(data.date.end_time, "HH:mm:ss", new Date());

    return <div className="min-w-87.5 max-w-100 pb-6 max-sm:min-w-full border-0 shadow-none bg-transparent">
        <img src={getStrapiMediaUrl(data.cover?.url!)} alt={data.cover?.alternativeText}
             className="w-full max-w-100 aspect-square object-cover mb-4"/>
        <h3
            className="font-body text-[#64565A] text-[22px] tracking-[0] leading-7 line-clamp-2 mb-2">
            {data.title}<br/>
        </h3>
        <p className="font-body text-[#64565A] text-[22px] tracking-[0] leading-7 mb-7">
            {format(data?.date?.start_date, "EEEE, dd MMMM yyyy")}<br/>
            {start_time && format(start_time, "hh:mm a")}
            {end_time && <span className="mx-2">-</span>}
            {end_time && format(end_time, "hh:mm a")}
        </p>
        <div
            className="font-normal text-[#64565a] text-sm line-clamp-4">
            {blocksToPlainText(data.body)}
        </div>
        <br/>

        <EventDialog {...data}/>
    </div>
}