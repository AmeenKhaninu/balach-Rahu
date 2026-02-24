import { clsx } from "clsx";

interface TypographyProps {
  children: React.ReactNode;
  className?: string;
}

/** Oversized display heading — hero/landing sections */
export function DisplayHeading({ children, className }: TypographyProps) {
  return (
    <h1
      className={clsx(
        "font-display font-light leading-[1.1] tracking-tight",
        "text-[clamp(32px,6vw,64px)]",
        "text-theme-primary",
        className
      )}
    >
      {children}
    </h1>
  );
}

/** Section heading */
export function SectionHeading({ children, className }: TypographyProps) {
  return (
    <h2
      className={clsx(
        "font-display font-normal leading-[1.2]",
        "text-[clamp(24px,4vw,40px)]",
        "text-theme-primary",
        className
      )}
    >
      {children}
    </h2>
  );
}

/** Card or subsection heading */
export function CardHeading({ children, className }: TypographyProps) {
  return (
    <h3
      className={clsx(
        "font-display font-medium text-xl leading-snug",
        "text-theme-primary",
        className
      )}
    >
      {children}
    </h3>
  );
}

/** Small label — metadata, captions, tags */
export function Label({ children, className }: TypographyProps) {
  return (
    <span
      className={clsx(
        "font-body text-[10px] font-normal uppercase tracking-[3px]",
        "text-theme-secondary",
        className
      )}
    >
      {children}
    </span>
  );
}

/** Body paragraph text */
export function Body({ children, className }: TypographyProps) {
  return (
    <p
      className={clsx(
        "font-body text-[15px] font-light leading-[1.75]",
        "text-theme-secondary",
        className
      )}
    >
      {children}
    </p>
  );
}

/** Accent / highlight text — gold in bridal, burgundy in pret */
export function AccentText({ children, className }: TypographyProps) {
  return (
    <span
      className={clsx(
        "font-display italic",
        "text-theme-accent",
        className
      )}
    >
      {children}
    </span>
  );
}

/** Monospace technical text */
export function MonoText({ children, className }: TypographyProps) {
  return (
    <code
      className={clsx(
        "font-mono text-xs",
        "text-theme-gold",
        "bg-theme-elevated px-2 py-0.5 rounded-sm",
        className
      )}
    >
      {children}
    </code>
  );
}
