import {ChevronRightIcon} from "lucide-react";
import Link from "next/link";

export default function SectionHeader({
                                          title,
                                          subtitle,
                                          rightTitle,
                                          rightLink,
                                          id
                                      }: {
    title: React.ReactNode;
    subtitle?: string;
    rightTitle?: string;
    rightLink?: string;
    id?: string;
}) {
    return (
        <div>
            <p className="font-normal text-[#4b3e39]/70 text-sm tracking-[1.68px] mb-5">
                {subtitle ?? "CARE UPDATES"}
            </p>
            <div className="flex items-center justify-between">
                <h2 className="font-heading font-normal text-[#b8853a] text-6xl max-w-125" id={id}>
                    {title}
                </h2>
                {rightTitle && rightLink && (
                    <Link
                        href={rightLink}
                        className="flex gap-1 font-normal text-[#64565a] text-sm tracking-[1.68px] hover:opacity-80"
                    >
                        {rightTitle}
                        <ChevronRightIcon className="h-4 w-4"/>
                    </Link>
                )}
            </div>
        </div>
    );
}
