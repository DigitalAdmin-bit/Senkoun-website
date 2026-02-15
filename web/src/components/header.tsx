"use client";

import Link from "next/link";
import {useEffect, useState} from "react";
import {usePathname} from "next/navigation";
import {mobileNavigation, topBarNavigation,} from "@/lib/navigation";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import {SOCIAL_LINKS} from "@/data/socials";
import {cn} from "@/lib/utils";

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [defaultView, setDefaultView] = useState(true);
    const pathname = usePathname();

    const isActive = (href: string) => {
        if (href === "/") {
            return pathname === "/";
        }
        return pathname.startsWith(href);
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.innerWidth <= 1024) {
                setIsVisible(true);
                return;
            }
            const currentScrollY = window.scrollY;

            if (currentScrollY < 300) {
                setDefaultView(true);
            } else {
                setDefaultView(false);
            }

            if (currentScrollY < lastScrollY) {
                setIsVisible(true);
            } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setIsVisible(false);
            }
            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollY]);

    return (
        <header className={cn("bg-white sticky top-0 z-60 transition-transform duration-300",
            !defaultView && isVisible && "shadow-md border-b border-gray-200",
        )} style={{
            transform: isVisible ? 'translateY(0)' : 'translateY(-100%)',
        }}>
            <div className="hidden lg:block bg-[#b8853a]">
                <div className="max-w-[80%] mx-auto">
                    <div className="flex items-center justify-between h-11">
                        <nav className="flex items-center">
                            {topBarNavigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`px-5 text-sm font-medium transition-colors py-3 ${
                                        isActive(item.href) ? "bg-white text-black" : "text-white"
                                    }`}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </nav>

                        <Link
                            href="/enquire"
                            className="text-white flex gap-2 items-center font-light text-xs"
                        >
                            <svg
                                width="17"
                                height="15"
                                viewBox="0 0 22 19"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M11.2699 10.3129H9.98381C9.99524 9.9356 10.0867 9.59835 10.2582 9.30111C10.4297 9.00388 10.6412 8.72951 10.8927 8.478C11.1556 8.21506 11.4128 7.96355 11.6643 7.72348C11.9273 7.4834 12.1502 7.22618 12.3331 6.95181C12.516 6.67744 12.6132 6.37449 12.6246 6.04296C12.6361 5.57424 12.4874 5.19698 12.1788 4.91117C11.8815 4.61394 11.4643 4.46532 10.927 4.46532C10.5611 4.46532 10.2582 4.53391 10.0181 4.6711C9.78946 4.79685 9.60655 4.96833 9.46936 5.18554C9.34361 5.39132 9.25787 5.61425 9.21214 5.85432C9.16641 6.0944 9.14354 6.32876 9.14354 6.5574H7.78884C7.73168 6.14584 7.74882 5.74572 7.84028 5.35703C7.94317 4.9569 8.11465 4.59679 8.35473 4.27669C8.60623 3.95659 8.93777 3.69937 9.34932 3.50502C9.76088 3.31067 10.2639 3.2135 10.8584 3.2135C11.4528 3.2135 11.9901 3.32211 12.4703 3.53932C12.9504 3.75653 13.3277 4.0652 13.6021 4.46532C13.8879 4.85401 14.0308 5.32273 14.0308 5.87147C14.0308 6.32876 13.9393 6.71745 13.7564 7.03755C13.5735 7.35765 13.3449 7.64345 13.0705 7.89496C12.8075 8.14647 12.5389 8.38654 12.2645 8.61519C11.9901 8.84383 11.7558 9.09534 11.5614 9.36971C11.3785 9.63265 11.2814 9.94703 11.2699 10.3129ZM10.6354 13.1252C10.2925 13.1252 10.0638 13.0394 9.94951 12.8679C9.83519 12.685 9.77803 12.4735 9.77803 12.2335C9.77803 11.9934 9.83519 11.7933 9.94951 11.6333C10.0753 11.4618 10.3039 11.376 10.6354 11.376C10.967 11.376 11.1842 11.4618 11.2871 11.6333C11.4014 11.7933 11.4586 11.9934 11.4586 12.2335C11.4586 12.485 11.4014 12.6965 11.2871 12.8679C11.1842 13.0394 10.967 13.1252 10.6354 13.1252Z"
                                    fill="white"
                                />
                                <path
                                    d="M2 0.5H19.6152C20.4437 0.5 21.1152 1.17157 21.1152 2V17.8496L17.0693 15.4229L16.9502 15.3516H2C1.17167 15.3516 0.500152 14.6799 0.5 13.8516V2C0.5 1.17157 1.17157 0.5 2 0.5Z"
                                    stroke="white"
                                />
                            </svg>
                            Help & Support
                        </Link>
                    </div>
                </div>
            </div>

            <nav className="max-w-[80%] mx-auto flex items-center justify-between py-5">
                <div className="flex items-center gap-10">
                    <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                        <SheetTrigger>
                            <svg
                                width="20"
                                height="18"
                                viewBox="0 0 28 22"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <rect width="28" height="2" fill="#64565A"/>
                                <rect y="10" width="28" height="2" fill="#64565A"/>
                                <rect y="20" width="28" height="2" fill="#64565A"/>
                            </svg>
                        </SheetTrigger>
                        <SheetContent
                            side="left"
                            showCloseButton={false}
                            className="flex flex-col gap-8 pt-20 items-center justify-between"
                        >
                            <div className="w-[70%]">
                                <SheetHeader className="sr-only">
                                    <SheetTitle>Are you absolutely sure?</SheetTitle>
                                    <SheetDescription>
                                        This action cannot be undone.
                                    </SheetDescription>
                                </SheetHeader>
                                <div className="">
                                    <SheetClose>
                                        <div className="flex items-center text-muted-foreground gap-2">
                                            <svg
                                                width="22"
                                                height="22"
                                                viewBox="0 0 22 22"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <rect
                                                    x="0.00226686"
                                                    y="19.7998"
                                                    width="28"
                                                    height="2"
                                                    transform="rotate(-45 0.00226686 19.7998)"
                                                    fill="#64565A"
                                                />
                                                <rect
                                                    x="1.41438"
                                                    y="0.00195312"
                                                    width="28"
                                                    height="2"
                                                    transform="rotate(45 1.41438 0.00195312)"
                                                    fill="#64565A"
                                                />
                                            </svg>

                                            <span className="uppercase text-sm">Close</span>
                                        </div>
                                    </SheetClose>
                                    <br/>
                                    <br/>

                                    <div className="flex flex-col font-heading text-xl gap-4">
                                        {mobileNavigation.map((item) => (
                                            <Link
                                                key={item.name}
                                                onClick={() => {
                                                    setMobileMenuOpen(false);
                                                }}
                                                href={item.href}
                                            >
                                                {item.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="w-[70%] mb-10">
                                <div className="uppercase opacity-80 font-light text-sm mb-4">
                                    Follow Us
                                </div>
                                <div className="flex gap-6 items-center">
                                    {SOCIAL_LINKS.map((item, i) => (
                                        <a key={i} href={item.href}>
                                            <img
                                                draggable={false}
                                                className="h-5"
                                                src={item.icon}
                                                alt={item.name}
                                            />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>

                    {/* Logo */}
                    <Link href="/" className="flex items-center cursor-pointer">
                        <img src="/logo.webp" alt="Senkoun Logo" className="h-12"/>
                    </Link>
                </div>

                {/* Desktop Right Section */}
                {/*<Link*/}
                {/*    href="/enquire"*/}
                {/*    className="max-sm:hidden flex gap-2 items-center font-light text-sm"*/}
                {/*>*/}
                {/*    <svg*/}
                {/*        width="19"*/}
                {/*        height="17"*/}
                {/*        viewBox="0 0 22 19"*/}
                {/*        fill="none"*/}
                {/*        xmlns="http://www.w3.org/2000/svg"*/}
                {/*    >*/}
                {/*        <path*/}
                {/*            d="M11.2699 10.3129H9.98381C9.99524 9.9356 10.0867 9.59835 10.2582 9.30111C10.4297 9.00388 10.6412 8.72951 10.8927 8.478C11.1556 8.21506 11.4128 7.96355 11.6643 7.72348C11.9273 7.4834 12.1502 7.22618 12.3331 6.95181C12.516 6.67744 12.6132 6.37449 12.6246 6.04296C12.6361 5.57424 12.4874 5.19698 12.1788 4.91117C11.8815 4.61394 11.4643 4.46532 10.927 4.46532C10.5611 4.46532 10.2582 4.53391 10.0181 4.6711C9.78946 4.79685 9.60655 4.96833 9.46936 5.18554C9.34361 5.39132 9.25787 5.61425 9.21214 5.85432C9.16641 6.0944 9.14354 6.32876 9.14354 6.5574H7.78884C7.73168 6.14584 7.74882 5.74572 7.84028 5.35703C7.94317 4.9569 8.11465 4.59679 8.35473 4.27669C8.60623 3.95659 8.93777 3.69937 9.34932 3.50502C9.76088 3.31067 10.2639 3.2135 10.8584 3.2135C11.4528 3.2135 11.9901 3.32211 12.4703 3.53932C12.9504 3.75653 13.3277 4.0652 13.6021 4.46532C13.8879 4.85401 14.0308 5.32273 14.0308 5.87147C14.0308 6.32876 13.9393 6.71745 13.7564 7.03755C13.5735 7.35765 13.3449 7.64345 13.0705 7.89496C12.8075 8.14647 12.5389 8.38654 12.2645 8.61519C11.9901 8.84383 11.7558 9.09534 11.5614 9.36971C11.3785 9.63265 11.2814 9.94703 11.2699 10.3129ZM10.6354 13.1252C10.2925 13.1252 10.0638 13.0394 9.94951 12.8679C9.83519 12.685 9.77803 12.4735 9.77803 12.2335C9.77803 11.9934 9.83519 11.7933 9.94951 11.6333C10.0753 11.4618 10.3039 11.376 10.6354 11.376C10.967 11.376 11.1842 11.4618 11.2871 11.6333C11.4014 11.7933 11.4586 11.9934 11.4586 12.2335C11.4586 12.485 11.4014 12.6965 11.2871 12.8679C11.1842 13.0394 10.967 13.1252 10.6354 13.1252Z"*/}
                {/*            fill="#64565A"*/}
                {/*        />*/}
                {/*        <path*/}
                {/*            d="M2 0.5H19.6152C20.4437 0.5 21.1152 1.17157 21.1152 2V17.8496L17.0693 15.4229L16.9502 15.3516H2C1.17167 15.3516 0.500152 14.6799 0.5 13.8516V2C0.5 1.17157 1.17157 0.5 2 0.5Z"*/}
                {/*            stroke="#64565A"*/}
                {/*        />*/}
                {/*    </svg>*/}
                {/*    Help & Support*/}
                {/*</Link>*/}
            </nav>
        </header>
    );
}
