"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { type PropertyItem } from "@/lib/data";

interface BlueprintModalProps {
  isOpen: boolean;
  property?: PropertyItem | null;
  onClose: () => void;
  onRequestDossier: () => void;
  lang?: "en" | "id";
}

export default function BlueprintModal({
  isOpen,
  property,
  onClose,
  onRequestDossier,
  lang = "en",
}: BlueprintModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const propertyTitle = property ? `${property.name} — ${property.location}` : "SANDER HOUSE — Layout (Y219)";
  const propertySpecs = property
    ? `${property.location} • ${property.price} • ${property.specs}`
    : "Dubai Hills • 6 Bedrooms • 8 Bathrooms • 1,450 m²";

  return (
    <div
      id="layout-modal"
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 transition-all duration-300 animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white text-black w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl border border-neutral-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-neutral-200 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500">
              {lang === "en" ? "ARCHITECTURAL BLUEPRINT" : "DENAH ARSITEKTUR"}
            </span>
            <h3 id="modal-heading" className="text-base font-bold text-neutral-900">
              {propertyTitle}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-700 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6">
          {/* SVG Layout Graphic */}
          <div className="bg-neutral-50 rounded-2xl p-6 border border-neutral-200 flex items-center justify-center min-h-[220px]">
            <svg
              viewBox="0 0 500 240"
              className="w-full h-auto text-neutral-800 max-h-[200px]"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <rect x="20" y="20" width="460" height="200" rx="8" stroke="#1F2937" strokeWidth="2" fill="#FFFFFF" />
              <rect x="20" y="20" width="200" height="110" fill="#F3F4F6" />
              <text x="35" y="55" fontSize="11" fontWeight="bold" fill="#111827">MASTER RESIDENCE</text>
              <text x="35" y="75" fontSize="9" fill="#6B7280">• Ensuite Marble Spa</text>
              <text x="35" y="90" fontSize="9" fill="#6B7280">• Private Terrace</text>
              
              <rect x="220" y="20" width="260" height="130" fill="#FFFFFF" />
              <text x="235" y="55" fontSize="11" fontWeight="bold" fill="#111827">GREAT ATRIUM & LIVING</text>
              <text x="235" y="75" fontSize="9" fill="#6B7280">• 6.5m Double Ceilings</text>
              
              <rect x="20" y="150" width="460" height="70" fill="#EFF6FF" />
              <text x="160" y="190" fontSize="11" fontWeight="bold" fill="#1D4ED8">HEATED INFINITY POOL & SUN DECK</text>
            </svg>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <div id="modal-specs" className="text-xs text-neutral-600 font-medium">
              {propertySpecs}
            </div>
            <button
              onClick={onRequestDossier}
              className="w-full sm:w-auto bg-black text-white hover:bg-neutral-800 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-colors active:scale-95 shadow-md"
            >
              {lang === "en" ? "Request Full Architectural Dossier" : "Ajukan Dossier Arsitektural Lengkap"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
