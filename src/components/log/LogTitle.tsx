import { ViewTransition, type ReactNode } from "react";

/** The same title on the list and on the entry page, so navigating between them morphs one into the other. */
export default function LogTitle({ slug, children }: { slug: string; children: ReactNode }) {
  return (
    <ViewTransition name={`log-title-${slug}`} share="morph" default="none">
      {children}
    </ViewTransition>
  );
}
