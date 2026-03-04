import {BlocksContent} from "@strapi/blocks-react-renderer";
import {format} from "date-fns";
import Link from "next/link";
import {blocksToPlainText} from "@/lib/utils";


export default function NewsBox(article: {
    date: string;
    title: string;
    slug: string;
    body: BlocksContent;
}) {
    return <div className="max-sm:min-w-full border-0 shadow-none bg-transparent">
        <p className="font-light text-[#64565a] text-sm tracking-[0] leading-5 mb-7">
            {format(article.date, "MMMM d, yyyy")}
        </p>
        <h3
            className="font-semibold text-[#64565a] text-[22px] tracking-[0] leading-7 mb-7 line-clamp-2">
            {article.title}
        </h3>
        <div
            className="font-normal text-[#64565a] text-sm line-clamp-4">
            {blocksToPlainText(article.body)}
        </div>
        <br/>
        <br/>
        <Link
            href={`/news/${article.slug}`}
            className="main-button mt-8 font-normal text-[#64565a] text-sm border-[#64565A] border px-5 py-3 hover:opacity-80"
        >
            READ
            MORE
        </Link>
    </div>
}