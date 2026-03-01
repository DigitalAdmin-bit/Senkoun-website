import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {IEventsResponse} from "@/lib/apis/events";
import StrapiBlocks from "@/components/strapi/strapi-blocks";
import {format, parse} from "date-fns";
import {getStrapiMediaUrl} from "@/lib/utils";


export default function EventDialog(data: IEventsResponse) {
    const start_time = data.date.start_time && parse(data.date.start_time, "HH:mm:ss.SSS", new Date());
    const end_time = data.date.end_time && parse(data.date.end_time, "HH:mm:ss.SSS", new Date());


    console.log("data", data)

    return <Dialog>
        <DialogTrigger asChild>
            <button
                className="font-normal text-[#64565a] text-sm border-[#64565A] border px-5 py-3 hover:opacity-80"
            >
                READ MORE
            </button>
        </DialogTrigger>
        <DialogContent
            className="text-[#64565A] z-999999999 max-w-[80%] max-sm:max-w-[90%] max-sm:max-h-full p-0 max-h-[98vh] overflow-y-auto rounded-none border-none">
            <DialogHeader className="sr-only">
                <DialogTitle>{data.title}</DialogTitle>
                <DialogDescription>
                    Event details for {data.title}
                </DialogDescription>
            </DialogHeader>

            <div className="flex flex-col">
                <img
                    src={getStrapiMediaUrl(data.cover?.url!)}
                    alt={data?.cover?.alternativeText || data.title}
                    className="object-cover w-full h-50"
                />

                <div className="px-10 max-sm:px-6 py-10 max-sm:py-6 text-center">
                    <h2 className="font-body text-3xl max-sm:text-2xl font-normal text-[#64565A] mb-4">
                        {data.title}
                    </h2>

                    {data.home && (
                        <p className="text-base font-normal text-[#64565A] mb-2">
                            {data.home.name}
                        </p>
                    )}

                    <p className="font-body text-[#64565A] text-[22px] tracking-[0] leading-7 mb-7">
                        {format(data.date.start_date, "EEEE, dd MMMM yyyy")}<br/>
                        {start_time && format(start_time, "hh:mm a")}
                        {end_time && <span className="mx-2">-</span>}
                        {end_time && format(end_time, "hh:mm a")}
                    </p>

                    <div className="text-left my-8">
                        <StrapiBlocks content={data.body}/>
                    </div>

                    <div className="mt-8 space-y-4 text-left">
                        {data.phone && (
                            <div className="flex items-center gap-3">
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="shrink-0"
                                >
                                    <path
                                        d="M14.5 11.2v2.4c0 .442-.358.8-.8.8-6.627 0-12-5.373-12-12 0-.442.358-.8.8-.8h2.4c.442 0 .8.358.8.8v1.6c0 .442-.358.8-.8.8H4.1c.862 4.142 4.096 7.376 8.238 8.238v-.938c0-.442.358-.8.8-.8h1.562c.442 0 .8.358.8.8z"
                                        fill="#B8853A"
                                    />
                                </svg>
                                <a href={`tel:${data.phone}`}
                                   className="text-base font-normal text-[#64565A] hover:underline">
                                    {data.phone}
                                </a>
                            </div>
                        )}

                        {/* Email */}
                        {data.email && (
                            <div className="flex items-center gap-3">
                                <svg
                                    width="16"
                                    height="12"
                                    viewBox="0 0 16 12"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="shrink-0"
                                >
                                    <path
                                        d="M0 0h16v12H0V0zm1.6 1.6v8.8h12.8V1.6H1.6zm0 0l6.4 4.8 6.4-4.8"
                                        stroke="#B8853A"
                                        strokeWidth="1.5"
                                        fill="none"
                                    />
                                </svg>
                                <a href={`mailto:${data.email}`}
                                   className="text-base font-normal text-[#64565A] hover:underline">
                                    {data.email}
                                </a>
                            </div>
                        )}

                        {/* Address */}
                        {data.address && (
                            <div className="flex items-start gap-3">
                                <svg
                                    width="14"
                                    height="18"
                                    viewBox="0 0 14 18"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="shrink-0 mt-1"
                                >
                                    <path
                                        d="M7 0C3.134 0 0 3.134 0 7c0 5.25 7 11 7 11s7-5.75 7-11c0-3.866-3.134-7-7-7zm0 9.5c-1.381 0-2.5-1.119-2.5-2.5S5.619 4.5 7 4.5s2.5 1.119 2.5 2.5S8.381 9.5 7 9.5z"
                                        fill="#B8853A"
                                    />
                                </svg>
                                <p className="text-base font-normal text-[#64565A]">
                                    {data.address}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </DialogContent>
    </Dialog>
}