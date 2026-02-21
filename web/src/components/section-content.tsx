import { ScrollAnimation } from "./animations";

export default function SectionContent({
                                           subtitle,
                                           title,
                                           description,
                                           id
                                       }: {
    subtitle?: React.ReactNode;
    title: React.ReactNode;
    description: React.ReactNode;
    id?: string;
}) {
    return (
        <section className="mt-10 w-[40%] mx-auto mb-30 max-sm:w-[90%]">
            {subtitle && <ScrollAnimation animation="fadeIn">
                <p className="text-[#64565A] text-sm text-center mb-10">{subtitle}</p>
            </ScrollAnimation>}

            <ScrollAnimation animation="slideUp" delay={0.2}>
                <h1 className="text-[#B8853A] text-center text-5xl mb-10 max-sm:text-4xl" id={id}>{title}</h1>
            </ScrollAnimation>

            <ScrollAnimation animation="slideUp" delay={0.3}>
                <p className="text-center text-sm text-[#64565A] leading-relaxed text-balance">
                    {description}
                </p>
            </ScrollAnimation>
        </section>
    );
}
