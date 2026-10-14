import React from "react";
import { BlockNoteBlock, BlockNoteInlineContent } from "@/lib/api/article-api";

export interface HeadingItem {
  id: string;
  text: string;
  level: number;
}

export function slugifyText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/--+/g, "-")
    .trim();
}

export function extractTextFromContent(content?: BlockNoteInlineContent[] | any): string {
  if (!content) return "";
  if (typeof content === "string") return content;
  if (Array.isArray(content)) {
    return content.map((c) => (typeof c === "string" ? c : c?.text || "")).join("");
  }
  return String(content);
}

/**
 * Ekstraksi seluruh heading (H2 & H3) dari array blok BlockNote
 * untuk keperluan Table of Contents (Daftar Isi)
 */
export function extractHeadings(blocks: BlockNoteBlock[]): HeadingItem[] {
  const headings: HeadingItem[] = [];
  const counts: Record<string, number> = {};

  function traverse(list: BlockNoteBlock[]) {
    if (!Array.isArray(list)) return;
    for (const b of list) {
      if (b.type === "heading") {
        const text = extractTextFromContent(b.content);
        if (text) {
          let baseId = slugifyText(text) || "section";
          if (counts[baseId]) {
            counts[baseId]++;
            baseId = `${baseId}-${counts[baseId]}`;
          } else {
            counts[baseId] = 1;
          }
          headings.push({
            id: baseId,
            text,
            level: b.props?.level ?? 2,
          });
        }
      }
      if (b.children && Array.isArray(b.children)) {
        traverse(b.children);
      }
    }
  }

  traverse(blocks);
  return headings;
}

interface BlockRendererProps {
  blocks: BlockNoteBlock[];
  className?: string;
}

/**
 * Merender konten inline (bold, italic, link, code, underline, strikethrough)
 */
function renderInlineContent(content?: BlockNoteInlineContent[] | any): React.ReactNode {
  if (!content) return null;
  if (typeof content === "string") return content;
  if (!Array.isArray(content)) return String(content);

  return content.map((item, idx) => {
    if (!item) return null;
    let node: React.ReactNode = item.text ?? "";

    if (item.styles) {
      if (item.styles.bold) {
        node = <strong key="b" className="font-bold text-slate-900">{node}</strong>;
      }
      if (item.styles.italic) {
        node = <em key="i" className="italic">{node}</em>;
      }
      if (item.styles.underline) {
        node = <u key="u" className="underline underline-offset-2">{node}</u>;
      }
      if (item.styles.strike) {
        node = <s key="s" className="line-through">{node}</s>;
      }
      if (item.styles.code) {
        node = (
          <code key="c" className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[0.88em] text-[#388324] font-semibold border border-slate-200/60">
            {node}
          </code>
        );
      }
    }

    if (item.type === "link" || item.href) {
      const href = item.href || (item.props && item.props.url) || "#";
      node = (
        <a
          key={`link-${idx}`}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-[#45a02e] hover:text-[#388324] underline underline-offset-2 transition-colors"
        >
          {node}
        </a>
      );
    }

    return <React.Fragment key={idx}>{node}</React.Fragment>;
  });
}

/**
 * Merender satu blok BlockNote
 */
function SingleBlock({ block }: { block: BlockNoteBlock }) {
  const { type, props, content, children } = block;

  switch (type) {
    case "heading": {
      const level = props?.level ?? 2;
      const rawText = extractTextFromContent(content);
      const headingId = slugifyText(rawText) || "section";
      const textNode = renderInlineContent(content);

      if (level === 3) {
        return (
          <h3
            id={headingId}
            className="group mt-8 mb-3 font-[family-name:var(--font-plus-jakarta),var(--font-sora),sans-serif] text-lg sm:text-xl font-bold tracking-tight text-slate-900 scroll-mt-28 flex items-center gap-2"
          >
            <span>{textNode}</span>
            <a
              href={`#${headingId}`}
              aria-label={`Tautan langsung ke ${rawText}`}
              className="opacity-0 group-hover:opacity-100 text-[#45a02e] hover:text-[#388324] text-sm transition-opacity"
            >
              #
            </a>
          </h3>
        );
      }

      return (
        <h2
          id={headingId}
          className="group mt-12 mb-4 font-[family-name:var(--font-plus-jakarta),var(--font-sora),sans-serif] text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 scroll-mt-28 flex items-center gap-2 border-b border-slate-100 pb-2.5"
        >
          <span>{textNode}</span>
          <a
            href={`#${headingId}`}
            aria-label={`Tautan langsung ke ${rawText}`}
            className="opacity-0 group-hover:opacity-100 text-[#45a02e] hover:text-[#388324] text-base transition-opacity"
          >
            #
          </a>
        </h2>
      );
    }

    case "paragraph": {
      const text = renderInlineContent(content);
      if (!text || (typeof text === "string" && text.trim() === "")) {
        return <div className="h-4" aria-hidden="true" />;
      }
      return (
        <p className="mb-5 text-[15px] sm:text-base leading-relaxed text-slate-700">
          {text}
        </p>
      );
    }

    case "quote": {
      return (
        <blockquote className="my-7 rounded-2xl border-l-4 border-[#45a02e] bg-gradient-to-r from-[#f8fdf6] to-white p-5 sm:p-6 text-sm sm:text-base italic font-medium text-slate-800 shadow-2xs">
          {renderInlineContent(content)}
        </blockquote>
      );
    }

    case "bulletListItem": {
      return (
        <li className="mb-2 ml-4 list-disc text-[15px] sm:text-base leading-relaxed text-slate-700 marker:text-[#45a02e]">
          {renderInlineContent(content)}
          {children && children.length > 0 && (
            <ul className="mt-1 space-y-1">
              {children.map((child, idx) => (
                <SingleBlock key={child.id || idx} block={child} />
              ))}
            </ul>
          )}
        </li>
      );
    }

    case "numberedListItem": {
      return (
        <li className="mb-2 ml-4 list-decimal text-[15px] sm:text-base leading-relaxed text-slate-700 marker:text-[#45a02e] marker:font-bold">
          {renderInlineContent(content)}
          {children && children.length > 0 && (
            <ol className="mt-1 space-y-1">
              {children.map((child, idx) => (
                <SingleBlock key={child.id || idx} block={child} />
              ))}
            </ol>
          )}
        </li>
      );
    }

    case "image": {
      const url = props?.url;
      const caption = props?.caption || props?.alt || "";
      if (!url) return null;

      return (
        <figure className="my-8 overflow-hidden rounded-2xl border border-slate-200/90 bg-slate-50 shadow-xs">
          <div className="relative w-full overflow-hidden bg-slate-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={url}
              alt={caption || "Gambar artikel Bidtech"}
              className="w-full h-auto max-h-[520px] object-cover mx-auto"
              loading="lazy"
            />
          </div>
          {caption && (
            <figcaption className="px-4 py-2.5 text-center text-xs text-slate-500 italic bg-white border-t border-slate-100">
              {caption}
            </figcaption>
          )}
        </figure>
      );
    }

    case "divider": {
      return <hr className="my-8 border-slate-200" />;
    }

    case "columnList": {
      return (
        <div className="my-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {children?.map((col, idx) => (
            <div key={col.id || idx} className="space-y-3">
              {col.children?.map((child, cIdx) => (
                <SingleBlock key={child.id || cIdx} block={child} />
              ))}
            </div>
          ))}
        </div>
      );
    }

    case "column": {
      return (
        <div className="space-y-3">
          {children?.map((child, idx) => (
            <SingleBlock key={child.id || idx} block={child} />
          ))}
        </div>
      );
    }

    case "table": {
      const rows = content?.rows || [];
      if (!Array.isArray(rows) || rows.length === 0) return null;

      return (
        <div className="my-7 overflow-x-auto rounded-2xl border border-slate-200 shadow-2xs">
          <table className="w-full text-left text-sm text-slate-700 border-collapse">
            <tbody>
              {rows.map((row: any, rIdx: number) => (
                <tr
                  key={rIdx}
                  className={
                    rIdx === 0
                      ? "bg-slate-50 font-bold border-b border-slate-200 text-slate-900"
                      : "border-b border-slate-100 last:border-b-0 hover:bg-slate-50/50 transition-colors"
                  }
                >
                  {row.cells?.map((cell: any, cIdx: number) => (
                    <td key={cIdx} className="p-3.5 border-r border-slate-100 last:border-r-0">
                      {renderInlineContent(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    default: {
      if (content) {
        return (
          <p className="mb-4 text-[15px] sm:text-base leading-relaxed text-slate-700">
            {renderInlineContent(content)}
          </p>
        );
      }
      return null;
    }
  }
}

/**
 * Komponen pembungkus daftar blok BlockNote
 */
export function BlockRenderer({ blocks, className = "" }: BlockRendererProps) {
  if (!blocks || !Array.isArray(blocks) || blocks.length === 0) {
    return null;
  }

  // Mengelompokkan item list berurutan ke dalam <ul> atau <ol>
  const renderedElements: React.ReactNode[] = [];
  let currentListType: "bullet" | "numbered" | null = null;
  let currentListItems: React.ReactNode[] = [];

  const flushList = () => {
    if (currentListItems.length > 0) {
      if (currentListType === "bullet") {
        renderedElements.push(
          <ul key={`ul-${renderedElements.length}`} className="my-4 space-y-1 pl-2">
            {currentListItems}
          </ul>
        );
      } else if (currentListType === "numbered") {
        renderedElements.push(
          <ol key={`ol-${renderedElements.length}`} className="my-4 space-y-1 pl-2">
            {currentListItems}
          </ol>
        );
      }
      currentListItems = [];
      currentListType = null;
    }
  };

  blocks.forEach((block, index) => {
    if (block.type === "bulletListItem") {
      if (currentListType !== "bullet") {
        flushList();
        currentListType = "bullet";
      }
      currentListItems.push(<SingleBlock key={block.id || index} block={block} />);
    } else if (block.type === "numberedListItem") {
      if (currentListType !== "numbered") {
        flushList();
        currentListType = "numbered";
      }
      currentListItems.push(<SingleBlock key={block.id || index} block={block} />);
    } else {
      flushList();
      renderedElements.push(<SingleBlock key={block.id || index} block={block} />);
    }
  });

  flushList();

  return (
    <div className={`prose-slate max-w-none ${className}`}>
      {renderedElements}
    </div>
  );
}
