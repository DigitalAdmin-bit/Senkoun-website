import SectionContent from "@/components/common/section-content";
import SectionHeader from "@/components/common/section-header";
import {getLatestEvents} from "@/lib/apis/events";
import NewsBox from "@/components/news/news-box";
import {getNews} from "@/lib/apis/news";
import EventBox from "@/components/events/event-box";


export default async function News() {
    const [newsRes, eventsRes] = await Promise.all([
        getNews(),
        getLatestEvents()
    ]);

    const news = newsRes.data || [];
    const events = eventsRes.data || [];


    return <>
        <br/><br/>
        <SectionContent
            title="News and Events"
            description="Our news section will keep you updated with the latest news from SENKOUN, developments in research regarding health and wellbeing and helpful advice for later life."
        />

        <section className="main-container mb-30">
            <SectionHeader title="The Next Big Moments" subtitle="UPCOMING EVENTS"
                           description="We’ve got some exciting things lined up! Take a look at our upcoming events and join us for opportunities to learn, connect, and be part of something meaningful."/>

            <div className="mt-20">
                {events.length > 0 ? <div className="flex overflow-x-auto gap-10">
                        {events.map((event) => <EventBox key={event.id} {...event}/>)}
                    </div> :
                    <p className="text-center text-gray-500">No events available at the moment. Please check back
                        later.</p>
                }
            </div>
        </section>

        <section className="main-container">
            <SectionHeader title="Latest News & Insights" subtitle="NEWS & VIEWS"
                           description="Catch up on the latest news and explore fresh viewpoints all in one place. We share updates, stories, and opinions designed to keep you informed and inspired."/>

            <div className="mt-20">
                {news.length > 0 ? <div className="grid grid-cols-3 gap-10 gap-y-20 max-sm:grid-cols-1">
                        {
                            news.map((article) => <NewsBox key={article.id} {...article}/>)
                        }
                    </div> :
                    <p className="text-center text-gray-500">No news articles available at the moment. Please check back
                        later.</p>
                }
            </div>
        </section>
        <br/><br/><br/>
        <br/><br/><br/>
    </>
}