"use client";

import { useActionState } from "react";
import { loginAdmin, type AdminLoginState } from "@/app/admin/login/actions";

const initialLoginState: AdminLoginState = {
  status: "idle",
  message: "",
};

export function AdminLoginForm() {
  const [state, formAction, pending] = useActionState(loginAdmin, initialLoginState);

  return (
    <form action={formAction} className="card mx-auto grid w-full max-w-md gap-5">
      <div>
        <p className="badge">Owner access</p>
        <h1 className="mt-4 font-heading text-4xl text-ink">Admin login</h1>
        <p className="mt-3 text-sm leading-6 text-ink/72">
          Sign in with the Hababy & Co admin account to review incoming requests.
        </p>
      </div>

      <label className="grid gap-2 text-sm font-black text-ink">
        Email
        <input
          name="email"
          type="email"
          autoComplete="email"
          className="min-h-12 rounded-xl border border-taupe/35 bg-white px-4 py-3 font-semibold text-ink outline-primary"
          required
        />
      </label>

      <label className="grid gap-2 text-sm font-black text-ink">
        Password
        <input
          name="password"
          type="password"
          autoComplete="current-password"
          className="min-h-12 rounded-xl border border-taupe/35 bg-white px-4 py-3 font-semibold text-ink outline-primary"
          required
        />
      </label>

      {state.status === "error" ? (
        <p className="rounded-[1rem] border border-primary/30 bg-primary/10 px-4 py-3 text-sm font-bold leading-6 text-primary">
          {state.message}
        </p>
      ) : null}

      <button
        type="submit"
        className="btn btn-primary disabled:cursor-not-allowed disabled:opacity-60"
        disabled={pending}
      >
        {pending ? "Signing in..." : "Sign in"}
      </button>

      <p className="text-xs font-bold leading-5 text-ink/60">
        There is no public registration. Admin access is confirmed with Supabase Auth and the
        Hababy admin list.
      </p>
    </form>
  );
}
