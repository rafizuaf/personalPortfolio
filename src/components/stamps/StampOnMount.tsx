"use client";

import { useEffect } from "react";
import { collect, type StampId } from "@/lib/stamps";

/** Awards a stamp for reaching a page; the delay lets the page settle before the toast arrives. */
export default function StampOnMount({ id }: { id: StampId }) {
  useEffect(() => {
    const timer = window.setTimeout(() => collect(id), 800);
    return () => window.clearTimeout(timer);
  }, [id]);
  return null;
}
