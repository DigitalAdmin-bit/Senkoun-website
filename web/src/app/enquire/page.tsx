import {Metadata} from "next";
import SectionContent from "@/components/common/section-content";
import {getHomesWithOnlyName} from "@/lib/apis/homes";
import EnquiryForm from "@/components/enquiry-form";

export const metadata: Metadata = {
    title: "Enquire | Senkoun Care Homes",
    description:
        "Get in touch with Senkoun Care Homes. Our friendly team is here to answer your questions and help you find the right care for your loved one.",
};

export default async function EnquirePage() {
    const data = await getHomesWithOnlyName();

    return (
        <>
            <SectionContent
                subtitle="ENQUIRE"
                title={
                    <>
                        Start Your
                        <br/> Enquiry Here
                    </>
                }
                description="Senkoun  Healthcare Wakering Ltd presents a visionary plan to establish Joseph Lodge in Little Wakering Southend-on-Sea, With a strong focus on delivering high-quality healthcare services and addressing the pressing needs of the ageing population"
            />
            <section className="main-container">
                <EnquiryForm homes={data.data}/>
            </section>
        </>
    );
}
