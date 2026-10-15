"use client";

import { useState } from "react";
import { Share2, Check, Copy, MessageCircle } from "lucide-react";

interface ArticleShareBarProps {
  title: string;
  url: string;
  className?: string;
}

export function ArticleShareBar({ title, url, className = "" }: ArticleShareBarProps) {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = {
    whatsapp: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
  };

  const handleCopy = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
      } else {
        const input = document.createElement("input");
        input.value = url;
        document.body.appendChild(input);
        input.select();
        document.execCommand("copy");
        document.body.removeChild(input);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      alert("Gagal menyalin tautan.");
    }
  };

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5 mr-1">
        <Share2 className="size-3.5 text-slate-400" />
        <span>Bagikan:</span>
      </span>

      {/* WhatsApp */}
      <a
        href={shareLinks.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#25D366]/10 text-[#1da851] hover:bg-[#25D366]/20 transition-all cursor-pointer"
        title="Bagikan ke WhatsApp"
      >
        <MessageCircle className="size-3.5 fill-current" />
        <span>WhatsApp</span>
      </a>

      {/* Twitter / X */}
      <a
        href={shareLinks.twitter}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-all cursor-pointer"
        title="Bagikan ke X (Twitter)"
      >
        <span className="font-bold">𝕏</span>
        <span>Post</span>
      </a>

      {/* LinkedIn */}
      <a
        href={shareLinks.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#0A66C2]/10 text-[#0A66C2] hover:bg-[#0A66C2]/20 transition-all cursor-pointer"
        title="Bagikan ke LinkedIn"
      >
        <span className="font-bold">in</span>
        <span>LinkedIn</span>
      </a>

      {/* Copy Link Button */}
      <button
        type="button"
        onClick={handleCopy}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer border ${
          copied
            ? "bg-[#eaf7e7] text-[#388324] border-[#b5e7ac]"
            : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:border-slate-300"
        }`}
        title="Salin Tautan Artikel"
      >
        {copied ? (
          <>
            <Check className="size-3.5 text-[#388324]" />
            <span>Tersalin!</span>
          </>
        ) : (
          <>
            <Copy className="size-3.5 text-slate-500" />
            <span>Salin Tautan</span>
          </>
        )}
      </button>
    </div>
  );
}
