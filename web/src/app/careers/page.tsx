import Link from "next/link";
import SectionContent from "@/components/common/section-content";
import {ScrollAnimation} from "@/components/animations";
import SectionHeader from "@/components/common/section-header";
import CareerEnquiryForm from "@/components/career-enquiry-form";

export default function Careers() {
    return <>
        <section className="main-container">
            <div className="bg-[#B8853A] flex max-lg:flex-col my-10 h-fit">
                <div className="flex-1 min-h-full">
                    <img alt="Careers cover" className="w-full h-full object-cover" src="/images/careers.webp"/>
                </div>
                <div className="flex-1 text-white px-14 py-20">
                    <h1 className="text-5xl mb-6">
                        WORKING AT<br/>
                        SENKOUN
                    </h1>
                    <p>
                        Every day, our teams make a genuine difference to the lives of the people we support. We believe
                        great care starts with great people, which is why we create a supportive, respectful environment
                        where compassion is valued, voices are heard, and everyone is encouraged to grow.
                    </p>
                    <div className="flex gap-4 mt-6">
                        <Link href="/careers/openings" className="flex-1 justify-center flex main-button text-white border-white">
                            <span className="text-white">LATEST VACANCIES</span>
                        </Link>
                        <Link href="#career-enquiry" className="flex-1 flex justify-center main-button text-white border-white">
                            CAREER ENQUIRY
                        </Link>
                    </div>
                </div>
            </div>
        </section>

        <br/><br/><br/>

        <SectionContent
            subtitle="CAREER"
            title={<>
                JOIN A TEAM THAT CARES,<br/>
                IN EVERY SENCE
            </>}
            description={<>
                Every day, our teams make a genuine difference to the lives of the people we support. We believe great
                care starts with great people, which is why we create a supportive, respectful environment where
                compassion is valued, voices are heard, and everyone is encouraged to grow.<br/>

                <Link href="/careers/openings" className="main-button border-[#64565A] mt-6 mx-auto flex">APPLY NOW</Link>
            </>}
        />

        <section className="main-container my-30">
            <video
                className="w-full"
                src="/videos/file_example_MP4_480_1_5MG.mp4"
                controls={false}
            />
        </section>

        <section className="main-container my-30">
            <ScrollAnimation
                animation="slideLeft"
                delay={0.1}
            >
                <div
                    className={`gap-10 items-center max-sm:gap-1 flex max-sm:flex-col`}
                >
                    <img
                        className="w-[50%] aspect-11/9 object-cover max-sm:w-full max-sm:mb-10"
                        alt="Make a difference"
                        src="/pages/make-a-diff.webp"
                    />
                    <div className="flex-1 h-full">
                        <h2 className="font-heading max-sm:wrap-break-word text-[#b8853a] text-4xl tracking-[0] whitespace-pre-line mb-10 max-sm:mb-4">
                            Make a<br/>
                            Difference
                        </h2>
                        <p className="text-[#64565a] text-sm tracking-[0] line-clamp-10 mb-10 max-sm:mb-4">
                            By taking our teams on a meaningful journey, trusting, and believing in them, we are
                            building a unique culture where everyone is valued, respected, and feels a strong sense of
                            belonging and pride.

                            Every team member who joins SENKOUN understands the reason they are part of the team, what’s
                            expected of them and how their contribution is making a difference. We have built our people
                            pathway to support every element of our team's wellbeing from physical and emotional to
                            career and financial.
                        </p>
                    </div>
                </div>
            </ScrollAnimation>
        </section>

        <section className="bg-[#B8853A] flex items-center overflow-hidden gap-30">
            <div className="text-white flex-1 pl-60">
                <h1 className="text-5xl mb-7">
                    Current<br/>
                    Vacancies
                </h1>
                <p>
                    As we continue our exciting journey, we are looking for the most passionate, caring and talented
                    people to join our team and grow with us. If you’re a nurse or a carer, a chef or a housekeeper,
                    or work in hospitality – there are lots of exciting opportunities at SENKOUN

                    Please have a look at our current vacancies.

                    If we don’t have a job listed that you’re looking for, but you would like to be considered for
                    future roles, please do email us your CV
                </p>

                <Link href="/careers/openings" className="main-button border-white mt-6 flex text-white">APPLY NOW</Link>
            </div>
            <div className="flex-1 relative bg-red-300 h-110">
                <img src="/pages/curr-vacs.webp" alt="Current Vacancies"
                     className="absolute object-cover"/>
            </div>
        </section>

        <section className="main-container my-30">
            <SectionHeader title="Work at SENKOUN" subtitle="CAREER ENQUIRY" id="career-enquiry"/>
            <CareerEnquiryForm/>
        </section>
    </>
}