import SectionHeader from "@/components/common/section-header";
import TeamCard from "@/components/team-card";


const Data = [
    {
        name: "John Doe",
        position: "Founder & CEO",
        image: "/person.webp",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel sapien eget nunc gravida tincidunt."
    }
]

export default async function TeamPage() {
    return <section className="main-container my-30">
        <SectionHeader title="The Joseph Lodge Team" subtitle="MEET OUR TEAM"
                       description="At Joseph Lodge, care comes from the heart and we never compromise our high standards. When selecting colleagues to join our dedicated, multi-disciplinary team, the requisite expertise, sincerity, and empathy are a must."/>

        <div className="w-full grid grid-cols-3 gap-10 my-20 max-lg:grid-cols-1">
            {Data.map((item, index) => <TeamCard {...item}/>)}
        </div>
    </section>
}