"use client"

import { useActionState } from "react"
import { AlertCircle, LockKeyhole } from "lucide-react"

import { loginAction, type LoginState } from "@/app/admin/actions"
import { ButtonArrow, buttonVariants } from "@/components/ui/button"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export function LoginForm() {
  const [state, action, pending] = useActionState<LoginState, FormData>(loginAction, {})

  return (
    <div className="mx-auto w-full max-w-md rounded-[28px] bg-cream p-7 text-ink shadow-[0_40px_80px_-30px_rgb(0_0_0/0.6)] sm:p-10">
      <span className="grid size-12 place-items-center rounded-2xl bg-navy text-gold">
        <LockKeyhole aria-hidden="true" strokeWidth={1.75} className="size-6" />
      </span>
      <h1 className="mt-6 text-[2rem] leading-tight">Admin sign in</h1>
      <p className="mt-2 text-[0.9375rem] text-slate">See and download everyone who has pre-registered.</p>

      <form action={action} className="mt-8 flex flex-col gap-5">
        <Field data-invalid={!!state.error || undefined} className="gap-2">
          <FieldLabel htmlFor="admin-password" className="text-[0.9375rem] font-semibold text-navy">
            Password
          </FieldLabel>
          <Input
            id="admin-password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            aria-invalid={!!state.error || undefined}
            aria-describedby={state.error ? "admin-error" : undefined}
            className="h-14 rounded-[14px] border-navy/15 bg-white px-4 text-base md:text-base focus-visible:border-gold-large focus-visible:ring-[3px] focus-visible:ring-gold/40"
          />
        </Field>
        {state.error && (
          <p id="admin-error" role="alert" className="flex items-center gap-2 text-[0.9375rem] text-destructive">
            <AlertCircle aria-hidden="true" className="size-4 shrink-0" />
            {state.error}
          </p>
        )}
        <button type="submit" disabled={pending} className={cn(buttonVariants({ variant: "navy", size: "lg" }), "w-full")}>
          {pending ? "Signing in…" : "Sign in"}
          {!pending && <ButtonArrow />}
        </button>
      </form>
    </div>
  )
}
