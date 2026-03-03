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

                <div className="px-10 max-sm:px-6 py-10 max-sm:py-6">
                    <h2 className="font-body text-3xl max-sm:text-2xl font-normal text-[#64565A] mb-1">
                        {data.title}
                    </h2>

                    {data.home && (
                        <p className="text-[20px] font-normal text-[#64565A] mb-1">
                            {data.home.name}
                        </p>
                    )}

                    <p className="font-body text-[#64565A] text-[20px] tracking-[0] leading-7 mb-7">
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
                                <svg width="25" height="25" viewBox="0 0 25 25" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M12.4609 24.9384C5.59909 24.9384 0 19.3393 0 12.4609C0 5.58248 5.59909 0 12.4609 0C19.3227 0 24.9218 5.59909 24.9218 12.4609C24.9218 19.3227 19.3227 24.9218 12.4609 24.9218V24.9384ZM12.4609 1.51192C6.42981 1.51192 1.51192 6.42981 1.51192 12.4609C1.51192 18.4919 6.42981 23.4265 12.4775 23.4265C18.5252 23.4265 23.4431 18.5086 23.4431 12.4609C23.4431 6.4132 18.5086 1.51192 12.4609 1.51192Z"
                                        fill="#B8853A"/>
                                    <path
                                        d="M9.11886 6.04767L11.0628 7.99156C11.4283 8.35708 11.4283 8.93859 11.0628 9.30411L10.5311 9.83577C10.1656 10.2013 10.1656 10.7828 10.5311 11.1483L13.8041 14.4214C14.1697 14.7869 14.7512 14.7869 15.1167 14.4214L15.6484 13.8897C16.0139 13.5242 16.5954 13.5242 16.9609 13.8897L18.9048 15.8336C19.2371 16.1659 19.2371 16.7142 18.9048 17.0465C17.2267 18.7245 14.4853 18.7245 12.8073 17.0465L7.92261 12.1618C6.24455 10.4837 6.24455 7.74235 7.92261 6.06428C8.2549 5.73199 8.80318 5.73199 9.13547 6.06428L9.11886 6.04767Z"
                                        fill="#B8853A"/>
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
                                <svg width="25" height="19" viewBox="0 0 25 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20.0205 18.7744H4.90128C2.19312 18.7744 0 16.5647 0 13.8731V4.90128C0 2.20973 2.19312 0 4.90128 0H20.0205C22.7286 0 24.9218 2.20973 24.9218 4.90128V13.8565C24.9218 16.5647 22.712 18.7578 20.0205 18.7578V18.7744ZM4.90128 1.29593C2.92415 1.29593 1.29593 2.92415 1.29593 4.90128V13.8565C1.29593 15.8502 2.90754 17.4618 4.90128 17.4618H20.0205C22.0142 17.4618 23.6258 15.8502 23.6258 13.8565V4.90128C23.6258 2.90754 22.0142 1.29593 20.0205 1.29593H4.90128Z" fill="#B8853A"/>
                                    <path d="M12.5121 8.82215C11.5983 8.82215 10.6845 8.53971 9.90361 8.00804L2.01172 2.52526L2.75937 1.46193L10.6513 6.94471C11.7478 7.70898 13.1933 7.7256 14.3231 6.99456L22.7632 1.44531L23.4777 2.52526L15.0375 8.05789C14.2732 8.55632 13.3927 8.80554 12.5287 8.80554L12.5121 8.82215Z" fill="#B8853A"/>
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
                                <svg width="20" height="26" viewBox="0 0 20 26" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M9.58657 25.9186L1.9439 15.3684C0.66458 13.707 0 11.6966 0 9.58657C0 4.30316 4.30316 0 9.60319 0C14.9032 0 19.2064 4.30316 19.2064 9.58657C19.2064 11.6966 18.5418 13.6904 17.2625 15.3684L9.60319 25.9186H9.58657ZM9.60319 1.379C5.06743 1.379 1.379 5.06743 1.379 9.58657C1.379 11.3976 1.96051 13.1088 3.05707 14.5543L9.58657 23.576L16.1493 14.5543C17.2459 13.1088 17.8274 11.3976 17.8274 9.60319C17.8274 5.08404 14.1389 1.39562 9.6198 1.39562L9.60319 1.379Z"
                                        fill="#B8853A"/>
                                    <path fillRule="evenodd" clipRule="evenodd"
                                          d="M9.65129 5.86487C7.62432 5.86487 5.99609 7.49309 5.99609 9.50345C5.99609 11.5138 7.64093 13.142 9.65129 13.142C11.6783 13.142 13.3065 11.5138 13.3065 9.50345C13.3065 7.49309 11.6616 5.86487 9.65129 5.86487Z"
                                          fill="#B8853A"/>
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