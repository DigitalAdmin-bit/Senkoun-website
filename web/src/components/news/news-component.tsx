import {cn} from "@/lib/utils";
import SectionHeader from "@/components/common/section-header";
import {getLatestNews} from "@/lib/apis/news";
import NewsBox from "@/components/news/news-box";
import {Suspense} from "react";
import NewsSkeleton from "@/components/news/news-skeleton";


async function SuspenseNewsCards() {
    const news = await getLatestNews();
    return news.data.map((item) =>
        <NewsBox date={item.date} title={item.title} body={item.body} key={item.documentId} slug={item.slug} />);
}

export default function NewsComponent({className}: { className?: string }) {
    return (
        <section
            className={cn("main-container mx-auto space-y-16 mb-32", className)}
        >
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
                rightLink="/news"
            />
            <div
                className="max-sm:flex max-sm:gap-5 max-sm:pb-10 max-sm:w-full max-sm:overflow-x-scroll max-sm:overflow-y-hidden max-sm:flex-nowrap sm:grid sm:grid-cols-3 sm:gap-10">
                <Suspense fallback={<NewsSkeleton />}>
                    <SuspenseNewsCards />
                </Suspense>
            </div>
        </section>
    );
}
