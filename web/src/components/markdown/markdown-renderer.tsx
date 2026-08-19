"use client";

import Link from "next/link";
import ReactMarkdown, { type Components } from "react-markdown";

/**
 * Renders Markdown content with explicit Tailwind styling so that global
 * element-level rules (e.g. the `h1-h6 { font-family: var(--font-zcool) }`
 * rule in globals.css) do not override the rendered elements. Class selectors
 * take precedence over element selectors, so each tag keeps its intended
 * font, size and spacing here.
 */
const components: Components = {
  h1: ({ children }) => <h1 className="font-body text-4xl">{children}</h1>,
  h2: ({ children }) => <h2 className="font-body text-3xl">{children}</h2>,
  h3: ({ children }) => <h3 className="font-body text-2xl">{children}</h3>,
  h4: ({ children }) => <h4 className="font-body text-xl">{children}</h4>,
  h5: ({ children }) => <h5 className="font-body text-lg">{children}</h5>,
  h6: ({ children }) => <h6 className="font-body text-base">{children}</h6>,
  p: ({ children }) => (
    <p className="text-gray-700 leading-relaxed">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="list-disc list-inside my-4 space-y-2 text-gray-700">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal list-inside my-4 space-y-2 text-gray-700">
      {children}
    </ol>
  ),
  li: ({ children }) => <li>{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-gray-300 pl-4 my-4 italic text-gray-600">
      {children}
    </blockquote>
  ),
  pre: ({ children }) => (
    <pre className="bg-gray-100 rounded-lg p-4 my-4 overflow-x-auto">
      {children}
    </pre>
  ),
  code: ({ children }) => (
    <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono text-gray-800">
      {children}
    </code>
  ),
  a: ({ children, href }) => (
    <Link
      href={href ?? "#"}
      className="text-blue-600 hover:text-blue-800 underline"
    >
      {children}
    </Link>
  ),
  strong: ({ children }) => <strong className="font-bold">{children}</strong>,
  em: ({ children }) => <em className="italic">{children}</em>,
};

export default function MarkdownRenderer({ content }: { content: string }) {
  return <ReactMarkdown components={components}>{content}</ReactMarkdown>;
}
