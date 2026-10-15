"use client";

import { useState, type FormEvent } from "react";
import { ArrowUpRight, CheckCircle2, MessageCircle, Star } from "lucide-react";

import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";
import { createWhatsAppUrl } from "@/lib/whatsapp";
import { useLanguage } from "@/context/LanguageContext";

type Mode = "kenalan" | "komentar";

const goals = [
  "Turun berat badan",
  "Bangun otot",
  "Perbaiki postur / nyeri",
  "Tingkatkan kekuatan & performa",
  "Belum tahu, ingin konsultasi",
];

const ratingLabels = ["", "Kurang", "Cukup", "Baik", "Sangat Baik", "Luar Biasa"];

const inputClass =
  "w-full rounded-xl border border-black/10 bg-[#f4f2ee] px-4 py-3 text-sm text-black outline-none transition-colors placeholder:text-black/35 focus:border-[var(--color-primary)] focus:bg-white";

type TrainerContactFormProps = {
  trainerName: string;
};

export function TrainerContactForm({ trainerName }: TrainerContactFormProps) {
  const firstName = trainerName.split(" ")[0];
  const { t, locale } = useLanguage();
  const f = t.trainerDetailPage.form;

  const localizedGoals = locale === "en" ? [
    "Weight loss & fat reduction",
    "Muscle building & hypertrophy",
    "Posture correction & pain relief",
    "Strength & athletic performance",
    "Not sure yet, need initial consultation"
  ] : goals;

  const localizedRatingLabels = locale === "en"
    ? ["", "Poor", "Fair", "Good", "Very Good", "Outstanding"]
    : ratingLabels;

  const [mode, setMode] = useState<Mode>("kenalan");
  const [name, setName] = useState("");
  const [goal, setGoal] = useState(goals[0]);
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{ name?: string; message?: string }>({});
  const [sentUrl, setSentUrl] = useState<string | null>(null);

  function buildMessage() {
    const brand = siteConfig.brand.name;
    const stars = "\u2605".repeat(rating);

    if (mode === "kenalan") {
      return [
        `Halo ${brand}, saya ${name.trim()}.`,
        `Saya ingin berkenalan dan berkonsultasi dengan Coach ${trainerName}.`,
        "",
        `Tujuan latihan: ${goal}`,
        `Pesan: ${message.trim()}`,
      ].join("\n");
    }

    return [
      `Halo ${brand}, saya ${name.trim()}.`,
      `Saya ingin memberikan komentar untuk Coach ${trainerName}.`,
      "",
      `Rating: ${stars} (${rating}/5)`,
      `Komentar: ${message.trim()}`,
    ].join("\n");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors: { name?: string; message?: string } = {};

    if (name.trim().length < 2) {
      nextErrors.name = f.nameError;
    }

    if (message.trim().length < 10) {
      nextErrors.message = f.msgError;
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;

    const url = createWhatsAppUrl(buildMessage());

    window.open(url, "_blank", "noopener,noreferrer");
    setSentUrl(url);
  }

  function resetForm() {
    setName("");
    setMessage("");
    setRating(5);
    setGoal(goals[0]);
    setErrors({});
    setSentUrl(null);
  }

  if (sentUrl) {
    return (
      <div className="rounded-[1.75rem] border border-black/10 bg-white p-8 text-center shadow-xl sm:p-10">
        <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
          <CheckCircle2 size={28} />
        </div>

        <h3 className="mt-6 font-heading text-2xl font-bold uppercase tracking-tight text-black">
          {f.successTitle}
        </h3>

        <p className="mx-auto mt-3 max-w-sm text-sm leading-7 text-black/60">
          {f.successDesc}
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <a
            href={sentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-primary)] px-6 py-3.5 text-xs font-bold uppercase tracking-[0.12em] text-white transition-colors hover:bg-[var(--color-primary-hover)]"
          >
            <MessageCircle size={15} />
            {f.reopenButton}
          </a>

          <button
            type="button"
            onClick={resetForm}
            className="inline-flex items-center justify-center rounded-full border border-black/15 px-6 py-3.5 text-xs font-bold uppercase tracking-[0.12em] text-black/70 transition-colors hover:border-black hover:text-black"
          >
            {f.resetButton}
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-[1.75rem] border border-black/10 bg-white p-7 shadow-xl sm:p-9"
    >
      {/* Mode tabs */}
      <div
        role="tablist"
        aria-label="Jenis pesan"
        className="flex gap-2 rounded-full bg-[#f4f2ee] p-1"
      >
        {(
          [
            { id: "kenalan", label: f.tabKenalan },
            { id: "komentar", label: f.tabKomentar },
          ] as const
        ).map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={mode === tab.id}
            onClick={() => setMode(tab.id)}
            className={cn(
              "flex-1 rounded-full px-4 py-2.5 text-xs font-bold uppercase tracking-[0.12em] transition-all duration-300",
              mode === tab.id
                ? "bg-[#0b0b0b] text-white shadow-md"
                : "text-black/55 hover:text-black"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-7 space-y-5">
        {/* Name */}
        <div>
          <label
            htmlFor="trainer-form-name"
            className="mb-2 block text-[11px] font-bold uppercase tracking-[0.16em] text-black/50"
          >
            {f.nameLabel}
          </label>
          <input
            id="trainer-form-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={f.namePlaceholder}
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            className={cn(inputClass, errors.name && "border-red-500")}
          />
          {errors.name && (
            <p className="mt-1.5 text-xs text-red-600">{errors.name}</p>
          )}
        </div>

        {/* Goal (kenalan) / Rating (komentar) */}
        {mode === "kenalan" ? (
          <div>
            <label
              htmlFor="trainer-form-goal"
              className="mb-2 block text-[11px] font-bold uppercase tracking-[0.16em] text-black/50"
            >
              {f.goalLabel}
            </label>
            <select
              id="trainer-form-goal"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className={inputClass}
            >
              {localizedGoals.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <div>
            <span className="mb-2 block text-[11px] font-bold uppercase tracking-[0.16em] text-black/50">
              {f.ratingLabel} {firstName}
            </span>
            <div className="flex items-center gap-1.5">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  aria-label={`${value} bintang`}
                  onClick={() => setRating(value)}
                  onMouseEnter={() => setHoverRating(value)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="rounded-full p-1 text-[var(--color-primary)] transition-transform hover:scale-110"
                >
                  <Star
                    size={26}
                    fill={value <= (hoverRating || rating) ? "currentColor" : "none"}
                  />
                </button>
              ))}
              <span className="ml-2 text-xs font-semibold text-black/55">
                {localizedRatingLabels[hoverRating || rating]}
              </span>
            </div>
          </div>
        )}

        {/* Message */}
        <div>
          <label
            htmlFor="trainer-form-message"
            className="mb-2 block text-[11px] font-bold uppercase tracking-[0.16em] text-black/50"
          >
            {mode === "kenalan" ? f.introLabel : f.reviewLabel}
          </label>
          <textarea
            id="trainer-form-message"
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={
              mode === "kenalan" ? f.introPlaceholder : f.reviewPlaceholder
            }
            aria-invalid={Boolean(errors.message)}
            className={cn(inputClass, "resize-none", errors.message && "border-red-500")}
          />
          {errors.message && (
            <p className="mt-1.5 text-xs text-red-600">{errors.message}</p>
          )}
        </div>
      </div>

      <button
        type="submit"
        className="group mt-7 flex w-full items-center justify-between rounded-full bg-[var(--color-primary)] px-7 py-4 text-xs font-bold uppercase tracking-[0.14em] text-white transition-colors hover:bg-[var(--color-primary-hover)]"
      >
        <span className="inline-flex items-center gap-2.5">
          <MessageCircle size={16} />
          {f.submitButton}
        </span>
        <ArrowUpRight
          size={17}
          className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      </button>

      <p className="mt-4 text-center text-[11px] leading-5 text-black/40">
        {f.noteText}
      </p>
    </form>
  );
}
