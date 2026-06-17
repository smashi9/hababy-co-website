"use client";

import { useMemo, useState } from "react";
import type { AdminOrderDetail } from "@/types/order";
import { createWhatsAppHandoffDraft } from "@/lib/whatsapp/message";

export function WhatsAppHandoff({ order }: { order: AdminOrderDetail }) {
  const draft = useMemo(() => createWhatsAppHandoffDraft(order), [order]);
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">("idle");

  async function copyMessage() {
    try {
      await navigator.clipboard.writeText(draft.message);
      setCopyState("copied");
    } catch {
      setCopyState("error");
    }
  }

  return (
    <section className="card" data-testid="whatsapp-handoff">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="badge badge-sage">Manual WhatsApp handoff</p>
          <h2 className="mt-4 text-xl font-black text-ink">WhatsApp message draft</h2>
          <p className="mt-3 text-sm leading-6 text-ink/72">
            Copy this message or open WhatsApp with the text prefilled. Nothing is sent
            automatically.
          </p>
        </div>
        <span className="rounded-full bg-sand/60 px-3 py-2 text-xs font-black text-ink/70">
          {draft.label}
        </span>
      </div>

      <textarea
        className="mt-5 min-h-48 w-full rounded-xl border border-taupe/35 bg-page px-4 py-3 text-sm font-semibold leading-6 text-ink outline-primary"
        readOnly
        value={draft.message}
      />

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button className="btn btn-primary" type="button" onClick={copyMessage}>
          Copy message
        </button>
        {draft.whatsappUrl ? (
          <a className="btn btn-secondary" href={draft.whatsappUrl} target="_blank" rel="noreferrer">
            Open WhatsApp
          </a>
        ) : (
          <span className="rounded-[1rem] border border-taupe/25 bg-white px-4 py-3 text-sm font-bold leading-6 text-ink/70">
            Phone cannot be safely opened in WhatsApp. Copy the message instead.
          </span>
        )}
      </div>

      {copyState === "copied" ? (
        <p className="mt-4 rounded-[1rem] border border-sage/35 bg-sage/15 px-4 py-3 text-sm font-bold leading-6 text-ink">
          Message copied.
        </p>
      ) : null}
      {copyState === "error" ? (
        <p className="mt-4 rounded-[1rem] border border-primary/30 bg-primary/10 px-4 py-3 text-sm font-bold leading-6 text-primary">
          Copy failed. Select the message text and copy it manually.
        </p>
      ) : null}
    </section>
  );
}
