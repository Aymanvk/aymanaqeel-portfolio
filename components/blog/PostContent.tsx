import ReactMarkdown from 'react-markdown';
// @ts-ignore: Missing types
import rehypeSanitize from 'rehype-sanitize';

export default function PostContent({ content }: { content: string }) {
  return (
    <div className="markdown-body font-body text-[1.1rem] leading-[1.85] text-[#c8c2b0]">
      <style>{`
        .markdown-body h1 { font-family: var(--font-display); font-size: 2.5rem; font-weight: 500; margin-top: 3rem; margin-bottom: 1.5rem; color: #F5F0E6; line-height: 1.2; }
        .markdown-body h2 { font-family: var(--font-display); font-size: 2rem; font-weight: 500; margin-top: 2.5rem; margin-bottom: 1.25rem; color: #F5F0E6; line-height: 1.3; }
        .markdown-body h3 { font-family: var(--font-display); font-size: 1.5rem; font-weight: 500; margin-top: 2rem; margin-bottom: 1rem; color: #F5F0E6; }
        .markdown-body p { margin-bottom: 1.5rem; }
        .markdown-body a { color: #C8956C; text-decoration: underline; text-underline-offset: 4px; transition: color 0.2s; }
        .markdown-body a:hover { color: #D4A87C; }
        .markdown-body ul { list-style-type: disc; margin-left: 1.5rem; margin-bottom: 1.5rem; }
        .markdown-body ol { list-style-type: decimal; margin-left: 1.5rem; margin-bottom: 1.5rem; }
        .markdown-body blockquote { border-left: 4px solid #C8956C; padding-left: 1.5rem; font-style: italic; opacity: 0.8; margin-bottom: 1.5rem; background: #243328; padding-top: 1rem; padding-bottom: 1rem; }
        .markdown-body code { font-family: var(--font-mono); font-size: 0.85em; background: #243328; padding: 0.2rem 0.4rem; border-radius: 4px; border: 1px solid #2E4434; color: #D4A87C; }
        .markdown-body pre { background: #243328; padding: 1.5rem; border-radius: 4px; border: 1px solid #2E4434; overflow-x: auto; margin-bottom: 1.5rem; }
        .markdown-body pre code { background: transparent; padding: 0; border: none; color: inherit; }
        .markdown-body img { max-width: 100%; height: auto; border: 1px solid #2E4434; margin: 2.5rem 0; }
      `}</style>
      <ReactMarkdown rehypePlugins={[rehypeSanitize]}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
