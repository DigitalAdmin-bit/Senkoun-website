import Link from "next/link";
import BookCallBack from "@/components/care-homes-quick/book-call-back";

export default function CareHomeQuickBtns({homeId}: { homeId: string }) {
    return <>
        <div className="fixed right-0 w-fit h-fit top-[50%] z-50 translate-y-[-50%] flex items-end justify-center gap-2 flex-col">
            <BookCallBack homeId={homeId} type="call-back">
                <div className="care-home-quick-btns">
                    <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M6.41667 1.0297L8.9375 3.55054C9.69689 4.30993 9.69689 5.54115 8.9375 6.30054C8.17811 7.05993 8.17811 8.29115 8.9375 9.05054L13.0625 13.1755C13.8219 13.9349 15.0531 13.9349 15.8125 13.1755C16.5719 12.4161 17.8031 12.4161 18.5625 13.1755L21.0833 15.6964C21.5896 16.2026 21.5896 17.0234 21.0833 17.5297C18.552 20.061 14.448 20.061 11.9167 17.5297L4.58333 10.1964C2.05203 7.66507 2.05203 3.56101 4.58333 1.0297C5.08959 0.523443 5.9104 0.523442 6.41667 1.0297Z"
                            stroke="white" strokeWidth="1.3"/>
                        <path d="M14.2998 7.81304L20.8998 1.21304" stroke="white" strokeWidth="1.3"/>
                        <path d="M14.2998 3.41302V7.81302H19.2498" stroke="white" strokeWidth="1.3"/>
                    </svg>
                    BOOK CALL BACK
                </div>
            </BookCallBack>
            <BookCallBack homeId={homeId} type="tour">
                <div className="care-home-quick-btns">
                    <svg width="22" height="19" viewBox="0 0 22 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.31641 10H7.31641" stroke="white" strokeWidth="1.3"/>
                        <path d="M3.31641 14H7.31641" stroke="white" strokeWidth="1.3"/>
                        <path d="M9.9834 10H13.9834" stroke="white" strokeWidth="1.3"/>
                        <path d="M5.9834 0V4.66667" stroke="white" strokeWidth="1.3"/>
                        <path d="M15.3164 0V4.66667" stroke="white" strokeWidth="1.3"/>
                        <rect x="0.649902" y="2" width="20" height="16" rx="2.66667" stroke="white" strokeWidth="1.3"/>
                        <path d="M0.649902 6H20.6499" stroke="white" strokeWidth="1.3"/>
                    </svg>
                    BOOK TOUR
                </div>
            </BookCallBack>
            <Link href="" className="care-home-quick-btns">
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
                APPLY FOR
                A JOB
            </Link>
        </div>
    </>
}