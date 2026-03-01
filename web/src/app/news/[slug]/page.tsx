import {getNewsBySlug} from "@/lib/apis/news";
import StrapiBlocks from "@/components/strapi/strapi-blocks";

export default async function NewsArticlePage({params}: { params: Promise<{ slug: string }> }) {
    const slug = (await params).slug;
    const data = await getNewsBySlug(slug);
    const news = data.data[0];

    return <div className="py-20">
        <section className="main-container">
            <StrapiBlocks content={news.body}/>

            <hr className="my-15 border-[#A59A9D]"/>

            <div className="font-body text-[#64565A]">
                <h2 className="text-[#B5AAAD] font-body">WRITTEN BY</h2>
                <h3 className="font-body text-2xl mt-2">{news.author?.name}</h3>
                <p className="font-light">{news.author?.title}</p>
            </div>
        </section>
    </div>
}