import Link from "next/link";
import {HomeSlugResponse} from "@/types/home-slug-response";
import {getMapUrl} from "@/lib/utils";

export default function CareHomeQuickBtns({data}: { data: HomeSlugResponse}) {
    return <>
        <div className="fixed right-0 w-fit h-fit top-[50%] z-50 translate-y-[-50%] flex items-end justify-center gap-2 flex-col">
            <a href={`tel:${data.phone}`}>
                <div className="care-home-quick-btns">
                    <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M6.41667 1.0297L8.9375 3.55054C9.69689 4.30993 9.69689 5.54115 8.9375 6.30054C8.17811 7.05993 8.17811 8.29115 8.9375 9.05054L13.0625 13.1755C13.8219 13.9349 15.0531 13.9349 15.8125 13.1755C16.5719 12.4161 17.8031 12.4161 18.5625 13.1755L21.0833 15.6964C21.5896 16.2026 21.5896 17.0234 21.0833 17.5297C18.552 20.061 14.448 20.061 11.9167 17.5297L4.58333 10.1964C2.05203 7.66507 2.05203 3.56101 4.58333 1.0297C5.08959 0.523443 5.9104 0.523442 6.41667 1.0297Z"
                            stroke="white" strokeWidth="1.3"/>
                        <path d="M14.2998 7.81304L20.8998 1.21304" stroke="white" strokeWidth="1.3"/>
                        <path d="M14.2998 3.41302V7.81302H19.2498" stroke="white" strokeWidth="1.3"/>
                    </svg>
                    CALL
                </div>
            </a>
            <a href={getMapUrl(data.location.lat, data.location.log)}>
                <div className="care-home-quick-btns">
                    <svg
                        width="22"
                        height="20"
                        viewBox="0 0 19 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle
                            cx="9.08749"
                            cy="9.08642"
                            r="5.11117"
                            stroke="white"
                            strokeWidth="1.13793"
                        />
                        <path
                            d="M9.0874 0.56897V4.23193e-06H9.0874L9.0874 0.56897ZM17.606 9.08752H18.1749V9.08752L17.606 9.08752ZM15.9028 14.1979L15.4478 13.8562L15.4427 13.8632L15.9028 14.1979ZM9.0874 23.568L8.62726 23.9026L9.08738 24.5353L9.54753 23.9027L9.0874 23.568ZM2.28467 14.2145L2.74488 13.8798L2.73879 13.8717L2.28467 14.2145ZM0.568848 9.08752L-0.000117838 9.08752V9.08752H0.568848ZM9.0874 0.56897V1.13794C13.4778 1.13794 17.037 4.69708 17.037 9.08753L17.606 9.08752L18.1749 9.08752C18.1749 4.06862 14.1063 4.23193e-06 9.0874 4.23193e-06V0.56897ZM17.606 9.08752H17.037C17.037 10.8775 16.4457 12.5276 15.4479 13.8562L15.9028 14.1979L16.3578 14.5396C17.4984 13.0208 18.1749 11.1325 18.1749 9.08752H17.606ZM15.9028 14.1979L15.4427 13.8632L8.62728 23.2333L9.0874 23.568L9.54753 23.9027L16.363 14.5326L15.9028 14.1979ZM9.0874 23.568L9.54754 23.2333L2.74481 13.8798L2.28467 14.2145L1.82453 14.5491L8.62726 23.9026L9.0874 23.568ZM2.28467 14.2145L2.73879 13.8717C1.73389 12.5404 1.13781 10.8844 1.13781 9.08752H0.568848H-0.000117838C-0.000117838 11.1406 0.681931 13.0356 1.83055 14.5573L2.28467 14.2145ZM0.568848 9.08752L1.13781 9.08753C1.13785 4.69711 4.69698 1.13797 9.08741 1.13794L9.0874 0.56897L9.0874 4.23193e-06C4.06852 4.43459e-05 -7.77245e-05 4.06864 -0.000117838 9.08752L0.568848 9.08752Z"
                            fill="white"
                        />
                    </svg>
                    GET DIRECTION
                </div>
            </a>
            <Link href="#download-brochure" className="care-home-quick-btns">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="10.33" cy="10.33" r="7.04" stroke="white" strokeWidth="1.3"/>
                    <circle cx="10.3299" cy="10.33" r="9.68" stroke="white" strokeWidth="1.3"/>
                    <circle cx="10.3299" cy="8.57005" r="2.64" stroke="white" strokeWidth="1.3"/>
                    <path
                        d="M16.3646 14.0005C14.9119 12.2931 12.7475 11.21 10.33 11.21C7.9126 11.21 5.74813 12.2931 4.29541 14.0005"
                        stroke="white" strokeWidth="1.3"/>
                    <path
                        d="M22.0033 19.5498C22.8079 20.2017 22.871 21.4068 22.1387 22.139C21.4065 22.8713 20.2014 22.8082 19.5495 22.0037L16.4897 18.2269L18.2266 16.4901L22.0033 19.5498Z"
                        stroke="white" strokeWidth="1.3"/>
                </svg>
                DOWNLOAD BROCHURE
            </Link>
        </div>
    </>
}