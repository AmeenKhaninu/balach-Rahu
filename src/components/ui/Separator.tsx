import { clsx } from "clsx";

interface SeparatorProps {
  ornament?: string;
  className?: string;
}

export default function Separator({
  ornament = "◆",
  className,
}: SeparatorProps) {
  return (
    <div className={clsx("separator-ornate my-12", className)}>
      {ornament}
    </div>
  );
}
