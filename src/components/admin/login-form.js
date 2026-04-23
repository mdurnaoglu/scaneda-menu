"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { loginAdmin } from "@/app/admin/actions";
import { Stack } from "@/components/primitives/stack";

const initialLoginFormState = {
  status: "idle",
  fieldErrors: {}
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button className="auth-button" type="submit" disabled={pending}>
      {pending ? "Signing in..." : "Login"}
    </button>
  );
}

export function LoginForm({ nextPath = "/admin" }) {
  const [state, formAction] = useActionState(loginAdmin, initialLoginFormState);

  return (
    <form action={formAction} className="auth-form">
      <input type="hidden" name="next" value={nextPath} />

      <Stack gap="md">
        <label className="auth-field">
          <span className="auth-label">Username</span>
          <input
            className={`auth-input ${state.fieldErrors.username ? "auth-input-error" : ""}`}
            type="text"
            name="username"
            autoComplete="username"
            placeholder="atelier.moscow"
            aria-invalid={Boolean(state.fieldErrors.username)}
          />
          {state.fieldErrors.username ? (
            <span className="auth-message auth-message-error">{state.fieldErrors.username}</span>
          ) : null}
        </label>

        <label className="auth-field">
          <span className="auth-label">Password</span>
          <input
            className={`auth-input ${state.fieldErrors.password ? "auth-input-error" : ""}`}
            type="password"
            name="password"
            autoComplete="current-password"
            placeholder="Enter password"
            aria-invalid={Boolean(state.fieldErrors.password)}
          />
          {state.fieldErrors.password ? (
            <span className="auth-message auth-message-error">{state.fieldErrors.password}</span>
          ) : null}
        </label>

        {state.message ? (
          <div className="auth-alert" role="alert">
            {state.message}
          </div>
        ) : null}

        <SubmitButton />
      </Stack>
    </form>
  );
}
