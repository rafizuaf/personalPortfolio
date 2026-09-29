"use client";

import { useEffect, useRef, type ReactNode } from "react";

/** Mounts the motion layer from a separate chunk so GSAP and Lenis never block first paint. */
export default function MotionRoot({ children }: { children: ReactNode }) {
  const scope = useRef<HTMLDivElement>(null);

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
  }, []);

  return <div ref={scope}>{children}</div>;
}
