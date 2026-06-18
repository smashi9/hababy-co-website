"use client";

import { useActionState } from "react";
import {
  updateSettingsAction,
  type SettingsUpdateActionState,
} from "@/app/admin/(protected)/settings/actions";
import type { AdminSettings } from "@/types/settings";

const initialActionState: SettingsUpdateActionState = {
  status: "idle",
  message: "",
};

function FieldError({ errors }: { errors: string[] | undefined }) {
  if (!errors?.length) {
    return null;
  }

  return <p className="text-sm font-bold leading-6 text-primary">{errors[0]}</p>;
}

function formatDateTime(value: string | null) {
  if (!value) {
    return "-";
  }

  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? value
    : new Intl.DateTimeFormat("en-GB", { dateStyle: "medium", timeStyle: "short" }).format(date);
}

export function SettingsEditForm({ settings }: { settings: AdminSettings }) {
  const [actionState, formAction, pending] = useActionState(
    updateSettingsAction,
    initialActionState
  );

  return (
    <form action={formAction} className="card grid gap-5">
      <input type="hidden" name="id" value={settings.id} />

      <div className="rounded-2xl border border-primary/25 bg-primary/10 px-4 py-3 text-sm font-bold leading-6 text-primary">
        These settings are stored for operational and future use only and are not live-wired yet.
        They do not yet change the live catalogue, request pricing, or WhatsApp handoff.
        Card/payment, delivery, same-day, and urgent fee controls are intentionally locked for
        later milestones.
      </div>

      <label className="grid gap-2 text-sm font-black text-ink">
        WhatsApp number
        <input
          name="whatsapp_number"
          type="tel"
          defaultValue={settings.whatsapp_number ?? ""}
          placeholder="+212612345678"
          className="min-h-12 rounded-xl border border-taupe/35 bg-white px-4 py-3 font-semibold text-ink outline-primary"
        />
        <span className="text-xs font-bold leading-5 text-ink/60">
          Stored as an international phone number. This does not yet change WhatsApp handoff.
        </span>
        <FieldError errors={actionState.fieldErrors?.whatsapp_number} />
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-black text-ink">
          EUR rate
          <input
            name="eur_rate"
            type="number"
            min="0"
            step="0.0001"
            defaultValue={settings.eur_rate ?? ""}
            className="min-h-12 rounded-xl border border-taupe/35 bg-white px-4 py-3 font-semibold text-ink outline-primary"
          />
          <FieldError errors={actionState.fieldErrors?.eur_rate} />
        </label>

        <label className="grid gap-2 text-sm font-black text-ink">
          USD rate
          <input
            name="usd_rate"
            type="number"
            min="0"
            step="0.0001"
            defaultValue={settings.usd_rate ?? ""}
            className="min-h-12 rounded-xl border border-taupe/35 bg-white px-4 py-3 font-semibold text-ink outline-primary"
          />
          <FieldError errors={actionState.fieldErrors?.usd_rate} />
        </label>
      </div>

      <label className="grid gap-2 text-sm font-black text-ink">
        Public FX note
        <textarea
          name="public_fx_note"
          rows={4}
          defaultValue={settings.public_fx_note ?? ""}
          className="rounded-xl border border-taupe/35 bg-white px-4 py-3 font-semibold text-ink outline-primary"
        />
        <FieldError errors={actionState.fieldErrors?.public_fx_note} />
      </label>

      <section className="rounded-2xl bg-page p-4" aria-label="Locked settings">
        <h2 className="text-sm font-black uppercase tracking-wide text-ink">Locked for later</h2>
        <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <dt className="font-bold text-ink/62">Base currency</dt>
            <dd className="mt-1 font-black text-ink">{settings.base_currency}</dd>
          </div>
          <div>
            <dt className="font-bold text-ink/62">Card enabled</dt>
            <dd className="mt-1 font-black text-ink">{settings.card_enabled ? "Yes" : "No"}</dd>
          </div>
          <div>
            <dt className="font-bold text-ink/62">Same-day enabled</dt>
            <dd className="mt-1 font-black text-ink">
              {settings.same_day_enabled ? "Yes" : "No"}
            </dd>
          </div>
          <div>
            <dt className="font-bold text-ink/62">FX updated</dt>
            <dd className="mt-1 font-black text-ink">
              {formatDateTime(settings.fx_rate_updated_at)}
            </dd>
          </div>
          <div>
            <dt className="font-bold text-ink/62">Settings updated</dt>
            <dd className="mt-1 font-black text-ink">{formatDateTime(settings.updated_at)}</dd>
          </div>
        </dl>
      </section>

      <button
        type="submit"
        className="btn btn-primary disabled:cursor-not-allowed disabled:opacity-60"
        disabled={pending}
      >
        {pending ? "Saving..." : "Save settings"}
      </button>

      {actionState.status === "error" ? (
        <div className="rounded-2xl border border-primary/25 bg-primary/10 p-4">
          <h3 className="font-black text-primary">Settings were not saved.</h3>
          <p className="mt-2 text-sm font-bold leading-6 text-ink/72">{actionState.message}</p>
        </div>
      ) : null}

      {actionState.status === "success" ? (
        <div className="rounded-2xl border border-sage/35 bg-sage/15 p-4">
          <h3 className="font-black text-ink">Settings saved.</h3>
          <p className="mt-2 text-sm font-bold leading-6 text-ink/72">{actionState.message}</p>
        </div>
      ) : null}
    </form>
  );
}
