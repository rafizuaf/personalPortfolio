import Link from "next/link";
import LogList from "@/components/LogList";
import { LOG_INTRO, LOG_TITLE } from "@/content/log";

export default function Log() {
  return (
    <section id="log" aria-labelledby="log-title" className="border-t border-rule py-(--space-band)">
      <div className="shell grid grid-cols-1 gap-(--space-7) lg:grid-cols-12">
        <div className="lg:col-span-4">
          <h2 id="log-title" data-reveal className="display text-5xl md:text-7xl">
            {LOG_TITLE}
          </h2>
          <p className="mt-(--space-4) max-w-[36ch] text-muted">{LOG_INTRO}</p>
          <Link href="/log" className="link mt-(--space-3) inline-flex min-h-11 items-center font-medium">
            All entries
          </Link>
        </div>
        <div className="lg:col-span-8">
          <LogList />
        </div>
      </div>
    </section>
  );
}
