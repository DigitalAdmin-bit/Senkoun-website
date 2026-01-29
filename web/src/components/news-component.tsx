import {cn} from "@/lib/utils";
import SectionHeader from "@/components/section-header";

const newsArticles = [
    {
        date: "November 19, 2025",
        title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        description:
            "Nam sodales interdum mi id bibendum. Aenean blandit ipsum a interdum semper. Mauris malesuada, diam sit amet feugiat fermentum, dolor ex malesuada lectus, eget suscipit massa est non urna. Donec ultricies molestie laoreet. Curabitur pellentesque congue purus, eu dignissim mauris lacinia ...",
    },
    {
        date: "November 19, 2025",
        title:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit Duis consectetur",
        description:
            "Morbi eget sapien dignissim, scelerisque ipsum ut, convallis nunc. In augue elit, blandit vel sollicitudin vitae, varius ac dui. Vestibulum tempus a dolor vel gravida...",
    },
    {
        date: "November 19, 2025",
        title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        description:
            "Nam sodales interdum mi id bibendum. Aenean blandit ipsum a interdum semper. Mauris malesuada, diam sit amet feugiat fermentum, dolor ex malesuada lectus, eget suscipit massa est non urna. Donec ultricies molestie laoreet. Curabitur pellentesque congue purus, eu dignissim mauris lacinia ...",
    },
];

export default function NewsComponent({className}: { className?: string }) {
    return <section className={cn("main-container mx-auto space-y-16 mb-32", className)}>
        <SectionHeader
            title={
                <>
                    SENKOUN
                    <br/>
                    NEWS
                </>
            }
            subtitle="CARE UPDATES"
            rightTitle="VIEW ALL NEWS"
            rightLink="#"
        />
        <div className="grid grid-cols-3 gap-10">
            {newsArticles.map((article, index) => (
                <div key={index} className="border-0 shadow-none bg-transparent">
                    <p className="font-light text-[#64565a] text-sm tracking-[0] leading-5 mb-7">
                        {article.date}
                    </p>
                    <h3 className="font-semibold text-[#64565a] text-[22px] tracking-[0] leading-7 mb-7 line-clamp-2">
                        {article.title}
                    </h3>
                    <p className="font-normal text-[#64565a] text-sm line-clamp-4">
                        {article.description}
                    </p>
                    <br/>
                    <br/>
                    <a
                        href="#"
                        className="mt-8 font-normal text-[#64565a] text-sm border-[#64565A] border px-5 py-3 hover:opacity-80"
                    >
                        READ MORE
                    </a>
                </div>
            ))}
        </div>
    </section>

}