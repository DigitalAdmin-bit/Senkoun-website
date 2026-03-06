import {HomeSlugResponse} from "@/types/home-slug-response";
import {getStrapiMediaUrl} from "@/lib/utils";
import Link from "next/link";

export default function MeetTheTeam({
                                        data,
                                        id,
    teamPageUrl
                                    }: {
    data: HomeSlugResponse['meet_our_team'],
    id: string,
    teamPageUrl: string
}) {
    if (!data) {
        return null; // or a loading state, or an error message
    }

    return (<section className="bg-[#B8853A] mb-40 max-sm:mt-20 flex gap-20 max-sm:gap-10 max-sm:flex-col text-white" id={id}>
            <div className="flex-1">
                <img src={getStrapiMediaUrl(data.image.url)}
                     alt={data.image.alternativeText || "Meet the team"}
                     className="h-125 object-cover object-center"/>
            </div>
            <div className="flex-1 flex flex-col justify-center max-sm:px-5 max-sm:pb-10">
                <h1 className="text-4xl">
                    Meet Our Team
                    <div className="border-b border-[#DADADA] w-[80%] mt-3"/>
                </h1>
                <p className="line-clamp-6 w-125 text-sm mt-10 max-w-[80%] max-sm:max-w-full leading-relaxed tracking-wide">
                    {data.description}
                </p>
                <Link href={teamPageUrl}
                      className="main-button bg-white text-black mt-10 inline-block">
                    VIEW ALL TEAMS
                </Link>
            </div>
        </section>
    );
}
