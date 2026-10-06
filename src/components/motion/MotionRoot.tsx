"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, type ReactNode } from "react";

/** Mounts the motion layer from a separate chunk so GSAP and Lenis never block first paint. */
export default function MotionRoot({ children }: { children: ReactNode }) {
  const scope = useRef<HTMLDivElement>(null);
  // The layout persists across client navigations, so motion restarts per page to bind the new DOM.
  const pathname = usePathname();

  useEffect(() => {
    let stop: (() => void) | undefined;
    let cancelled = false;

    import("@/lib/motion/boot").then(({ startMotion }) => {
      if (!cancelled && scope.current) stop = startMotion(scope.current);
    });

    return () => {
      cancelled = true;
      stop?.();
    };
  }, [pathname]);

  return <div ref={scope}>{children}</div>;
}
