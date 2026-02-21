import SectionContent from "@/components/section-content";
import SectionHeader from "@/components/section-header";


export default async function News() {
    return <>
        <br/><br/>
        <SectionContent
            title="News and Events"
            description="Our news section will keep you updated with the latest news from SENKOUN, developments in research regarding health and wellbeing and helpful advice for later life."
        />

        <section className="main-container">
            <SectionHeader title="The Next Big Moments" subtitle="UPCOMING EVENTS"
                           description="We’ve got some exciting things lined up! Take a look at our upcoming events and join us for opportunities to learn, connect, and be part of something meaningful."/>

            <div>

            </div>
        </section>

        <section className="main-container">
            <SectionHeader title="Latest News & Insights" subtitle="NEWS & VIEWS"
                           description="Catch up on the latest news and explore fresh viewpoints all in one place. We share updates, stories, and opinions designed to keep you informed and inspired."/>

            <div>

            </div>
        </section>
    </>
}