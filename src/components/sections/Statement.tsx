import { STATEMENT } from "@/content/profile";

export default function Statement() {
  return (
    <section
      data-statement
      aria-label="Background"
      className="relative z-10 flex min-h-svh items-center border-t border-rule bg-paper py-(--space-band)"
    >
      <div className="shell">
        <p
          data-statement-text
          className="max-w-[26ch] text-statement leading-[1.12] font-medium tracking-[-0.015em]"
        >
          {STATEMENT}
        </p>
      </div>
    </section>
  );
}
