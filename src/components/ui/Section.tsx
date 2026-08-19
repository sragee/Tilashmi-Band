import { ReactNode } from "react";
import clsx from "clsx";

export function Section({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={clsx("section-pad relative", className)}>
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-10">{children}</div>
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="mb-4 text-xs font-medium uppercase tracking-[0.35em] text-accent/80">
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={clsx("max-w-2xl", align === "center" && "mx-auto text-center")}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="text-[clamp(2rem,8vw,3rem)] font-display font-medium leading-[1.05] text-gradient">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base md:text-lg text-muted leading-relaxed">{description}</p>
      )}
    </div>
  );
}
