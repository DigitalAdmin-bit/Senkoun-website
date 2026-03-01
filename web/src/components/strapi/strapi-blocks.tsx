"use client"

import { BlocksRenderer } from "@strapi/blocks-react-renderer"
import Image from "next/image"
import Link from "next/link"

export default function StrapiBlocks({ content }: { content: any }) {
    return (
        <BlocksRenderer
            content={content}
            blocks={{
                heading: ({ children, level }) => {
                    switch (level) {
                        case 1:
                            return <h1 className="text-4xl font-bold my-6">{children}</h1>
                        case 2:
                            return <h2 className="text-3xl font-semibold my-5">{children}</h2>
                        case 3:
                            return <h3 className="text-2xl font-semibold my-4">{children}</h3>
                        case 4:
                            return <h4 className="text-xl font-semibold my-3">{children}</h4>
                        case 5:
                            return <h5 className="text-lg font-semibold my-2">{children}</h5>
                        case 6:
                            return <h6 className="text-base font-semibold my-2">{children}</h6>
                        default:
                            return <h3 className="text-2xl font-normal my-4">{children}</h3>
                    }
                },
                paragraph: ({ children }) => (
                    <p className="text-gray-700 my-4 leading-relaxed">{children}</p>
                ),
                list: ({ children, format }) => {
                    if (format === "ordered") {
                        return <ol className="list-decimal list-inside my-4 space-y-2 text-gray-700">{children}</ol>
                    }
                    return <ul className="list-disc list-inside my-4 space-y-2 text-gray-700">{children}</ul>
                },
                quote: ({ children }) => (
                    <blockquote className="border-l-4 border-gray-300 pl-4 my-4 italic text-gray-600">
                        {children}
                    </blockquote>
                ),
                code: ({ children }) => (
                    <pre className="bg-gray-100 rounded-lg p-4 my-4 overflow-x-auto">
                        <code className="text-sm font-mono text-gray-800">{children}</code>
                    </pre>
                ),
                image: ({ image }) => (
                    <div className="my-6">
                        <Image
                            src={image.url}
                            alt={image.alternativeText || ""}
                            width={image.width}
                            height={image.height}
                            className="rounded-lg w-full h-auto"
                        />
                        {image.caption && (
                            <p className="text-sm text-gray-500 text-center mt-2">{image.caption}</p>
                        )}
                    </div>
                ),
                link: ({ children, url }) => (
                    <Link href={url} className="text-blue-600 hover:text-blue-800 underline">
                        {children}
                    </Link>
                ),
            }}
            modifiers={{
                bold: ({ children }) => <strong className="font-bold">{children}</strong>,
                italic: ({ children }) => <em className="italic">{children}</em>,
                underline: ({ children }) => <u className="underline">{children}</u>,
                strikethrough: ({ children }) => <s className="line-through">{children}</s>,
                code: ({ children }) => (
                    <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono text-gray-800">
                        {children}
                    </code>
                ),
            }}
        />
    )
}