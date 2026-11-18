"use client"

import { useActionState, useState, useSyncExternalStore } from "react"
import { AlertCircle, MessageCircle } from "lucide-react"

import { registerAction } from "@/app/register/actions"
import { RegisterSuccess } from "@/components/register/register-success"
import { ButtonArrow, buttonVariants } from "@/components/ui/button"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  type Field as FieldName,
  type FieldErrors,
  type RegisterState,
  type Values,
  validate,
  validateField,
} from "@/lib/pre-registration"
import { externalLinkProps, waLink } from "@/lib/site"
import { cn } from "@/lib/utils"

const initialState: RegisterState = { status: "idle" }
const noopSubscribe = () => () => {}
const readUrlPhone = () => new URLSearchParams(window.location.search).get("phone")?.slice(0, 20) ?? ""
const EMPTY: Values = { full_name: "", location: "", phone: "" }

const inputClass =
  "h-14 rounded-[14px] border-navy/15 bg-white px-4 text-base text-navy shadow-[inset_0_1px_2px_rgb(7_29_59/0.04)] placeholder:text-slate/80 hover:border-navy/30 focus-visible:border-gold-large focus-visible:ring-[3px] focus-visible:ring-gold/40 md:text-base aria-invalid:border-destructive aria-invalid:ring-destructive/15"

export function RegisterForm() {
  const [state, formAction, pending] = useActionState(registerAction, initialState)
  const [typed, setValues] = useState<Values>(EMPTY)
  const [phoneEdited, setPhoneEdited] = useState(false)
  const [clientErrors, setClientErrors] = useState<FieldErrors>({})
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({})

  // Prefill the phone from the hero's field (/register?phone=…), read in the browser so the
  // page stays fully static ("" on the server, the param after hydration — no mismatch).
  const urlPhone = useSyncExternalStore(noopSubscribe, readUrlPhone, () => "")
  const values: Values = phoneEdited ? typed : { ...typed, phone: typed.phone || urlPhone }

  if (state.status === "success" || state.status === "duplicate") {
    return <RegisterSuccess state={state} />
  }

  const serverErrors: FieldErrors = state.status === "invalid" ? state.errors : {}
  const errorFor = (f: FieldName) => (touched[f] ? clientErrors[f] : undefined) ?? serverErrors[f]

  const onChange = (f: FieldName) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value
    if (f === "phone") setPhoneEdited(true)
    setValues((s) => ({ ...s, [f]: v }))
    if (touched[f]) setClientErrors((s) => ({ ...s, [f]: validateField(f, v) }))
  }
  const onBlur = (f: FieldName) => () => {
    setTouched((t) => ({ ...t, [f]: true }))
    setClientErrors((s) => ({ ...s, [f]: validateField(f, values[f]) }))
  }
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const errs = validate(values)
    if (Object.keys(errs).length) {
      e.preventDefault()
      setTouched({ full_name: true, location: true, phone: true })
      setClientErrors(errs)
      const first = (Object.keys(errs) as FieldName[])[0]
      document.getElementById(`reg-${first}`)?.focus()
    }
  }

  return (
    <form action={formAction} onSubmit={onSubmit} noValidate className="flex flex-col gap-6">
      <TextField
        name="full_name"
        label="Full name"
        autoComplete="name"
        value={values.full_name}
        error={errorFor("full_name")}
        onChange={onChange("full_name")}
        onBlur={onBlur("full_name")}
      />
      <TextField
        name="location"
        label="Location"
        autoComplete="address-level2"
        placeholder="e.g. Wuse 2, Abuja…"
        value={values.location}
        error={errorFor("location")}
        onChange={onChange("location")}
        onBlur={onBlur("location")}
      />

      {/* Phone with a fixed +234 segment */}
      <Field data-invalid={!!errorFor("phone") || undefined} className="gap-2">
        <FieldLabel htmlFor="reg-phone" className="text-[0.9375rem] font-semibold text-navy">
          Phone number
        </FieldLabel>
        <div className="flex gap-2">
          <span
            aria-hidden="true"
            className="flex h-14 shrink-0 items-center gap-2 rounded-[14px] border border-navy/15 bg-cream px-4 text-base font-semibold text-navy"
          >
            <span className="eyebrow text-[0.625rem] text-gold-text">NG</span>
            +234
          </span>
          <Input
            id="reg-phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="803 123 4567…"
            value={values.phone}
            onChange={onChange("phone")}
            onBlur={onBlur("phone")}
            aria-invalid={!!errorFor("phone") || undefined}
            aria-describedby={errorFor("phone") ? "reg-phone-error" : "reg-phone-hint"}
            className={inputClass}
          />
        </div>
        {errorFor("phone") ? (
          <FieldError id="reg-phone-error" className="flex items-center gap-1.5 text-[0.875rem]">
            <AlertCircle aria-hidden="true" className="size-4 shrink-0" />
            {errorFor("phone")}
          </FieldError>
        ) : (
          <p id="reg-phone-hint" className="text-[0.875rem] text-slate">
            We&rsquo;ll use this to reach you when we launch. 0803… or 803… both work.
          </p>
        )}
      </Field>

      {/* Honeypot — hidden from people and assistive tech, bots fill it */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="reg-company">Company</label>
        <input id="reg-company" name="company" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>

      {state.status === "error" && (
        <div role="alert" className="flex gap-3 rounded-[14px] border border-destructive/25 bg-destructive/5 p-4 text-[0.9375rem] text-ink">
          <AlertCircle aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-destructive" />
          <p>
            {state.message}{" "}
            <a href={waLink("general")} {...externalLinkProps} className="font-semibold text-whatsapp underline underline-offset-4">
              Send it on WhatsApp instead
            </a>
          </p>
        </div>
      )}

      <div className="pt-1">
        <button
          type="submit"
          disabled={pending}
          aria-disabled={pending}
          className={cn(buttonVariants({ size: "lg" }), "h-14 w-full text-base")}
        >
          {pending ? "Registering…" : "Pre-register"}
          {!pending && <ButtonArrow />}
        </button>
        <p className="mt-4 text-center text-[0.8125rem] leading-relaxed text-slate">
          By pre-registering you agree that Okafor&rsquo;s Place may contact you about the launch.
        </p>
      </div>

      <p className="text-center text-[0.9375rem] text-ink/80 lg:hidden">
        Prefer WhatsApp?{" "}
        <a href={waLink("join")} {...externalLinkProps} className="inline-flex items-center gap-1 font-semibold text-whatsapp">
          <MessageCircle aria-hidden="true" strokeWidth={1.75} className="size-4" />
          Chat with us
        </a>
      </p>
    </form>
  )
}

function TextField({
  name,
  label,
  error,
  ...props
}: {
  name: FieldName
  label: string
  error?: string
} & React.ComponentProps<"input">) {
  const id = `reg-${name}`
  return (
    <Field data-invalid={!!error || undefined} className="gap-2">
      <FieldLabel htmlFor={id} className="text-[0.9375rem] font-semibold text-navy">
        {label}
      </FieldLabel>
      <Input
        id={id}
        name={name}
        type="text"
        maxLength={80}
        aria-invalid={!!error || undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={inputClass}
        {...props}
      />
      {error && (
        <FieldError id={`${id}-error`} className="flex items-center gap-1.5 text-[0.875rem]">
          <AlertCircle aria-hidden="true" className="size-4 shrink-0" />
          {error}
        </FieldError>
      )}
    </Field>
  )
}
