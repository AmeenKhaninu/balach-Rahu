"use client";

import { clsx } from "clsx";
import { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, hint, error, className, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="font-body text-[11px] uppercase tracking-[2px] text-theme-secondary"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={clsx(
            "w-full px-4 py-3 rounded-md",
            "font-body text-sm text-theme-primary",
            "bg-theme-elevated border transition-all duration-300",
            "placeholder:text-theme-tertiary",
            "focus:outline-none focus:ring-1",
            error
              ? "border-error focus:ring-error"
              : "border-theme focus:border-brand-gold focus:ring-brand-gold",
            className
          )}
          {...props}
        />
        {hint && !error && (
          <span className="font-body text-[11px] text-theme-tertiary">
            {hint}
          </span>
        )}
        {error && (
          <span className="font-body text-[11px] text-error-light">
            {error}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
