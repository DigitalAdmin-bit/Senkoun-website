import { getCookiePolicy } from "@/lib/apis/legal";
import StrapiBlocks from "@/components/strapi/strapi-blocks";

export default async function CookiePolicyPage() {
    const data = await getCookiePolicy();

    if (!data) {
        return (
            <div className="py-20">
                <section className="main-container">
                    <h1 className="font-body text-4xl text-[#B8853A] mb-8">Cookie Policy</h1>
                    <p className="text-[#64565A]">Cookie policy not available at the moment.</p>
                </section>
            </div>
        );
    }

    return (
        <div className="py-20">
            <section className="main-container">
                <h1 className="font-body text-4xl text-[#B8853A] mb-8">Cookie Policy</h1>
                <StrapiBlocks content={data.content} />
            </section>
        </div>
    );
}

