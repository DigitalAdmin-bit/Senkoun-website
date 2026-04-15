import SectionHeader from "@/components/common/section-header";
import TeamCard from "@/components/team-card";
import {getTeamsForHomeBySlug} from "@/lib/apis/teams";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function TeamPage({params}: PageProps) {
    const {slug} = await params;

    const teamsRes = await getTeamsForHomeBySlug(slug);

    if (!teamsRes.data) {
        return <div className="main-container my-30 text-center">
            <h1 className="text-4xl">
                Team not found for this home.
            </h1>
            <br/>
            <p className="max-w-100 mx-auto">
                The team you are looking for hasn't been added, once added it will be displayed here.
            </p>
        </div>
    }

    return <section className="main-container my-30">
        <SectionHeader title={`The ${teamsRes.data.home.name} Team`} subtitle="MEET OUR TEAM"
                       description={teamsRes.data.description}/>

        <div className="w-full grid grid-cols-3 gap-10 my-20 max-lg:grid-cols-1">
            {teamsRes.data.teams.length === 0 ? <p className="col-span-3 text-center text-[#64565A]">No team members found.</p> :
                teamsRes.data.teams.map((team, i) => <TeamCard key={i} name={team.name} position={team.role} image={team.image.url} text={team.description}/>)
            }
        </div>
    </section>
}