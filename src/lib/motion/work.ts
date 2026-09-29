import { EASE, gsap, type MotionModule } from "./register";
import { createWarp } from "./warp";

/**
 * Mouse users get one floating screenshot that follows the cursor over project rows.
 * Touch, small screens and reduced motion get inline images; with the preview on,
 * the inline images stay in the DOM as sr-only so their alt text is still announced.
 */
export const work: MotionModule = ({ root, motion, desktop, finePointer }) => {
  const list = root.querySelector<HTMLElement>("[data-project-list]");
  const preview = root.querySelector<HTMLElement>("[data-preview]");
  if (!list || !preview || !motion || !desktop || !finePointer) return;

  const html = document.documentElement;
  html.classList.add("has-preview");

  const images = new Map(
    gsap.utils
      .toArray<HTMLImageElement>("[data-preview-img]", preview)
      .map((img) => [img.dataset.previewImg ?? "", img]),
  );

  const canvas = document.createElement("canvas");
  canvas.className = "absolute inset-0 size-full opacity-0";
  preview.append(canvas);
  const warp = createWarp(canvas, images);
  if (!warp) canvas.remove();

  gsap.set(preview, { yPercent: -50, x: innerWidth / 2, y: innerHeight / 2 });
  const xTo = gsap.quickTo(preview, "x", { duration: 0.55, ease: EASE.out });
  const yTo = gsap.quickTo(preview, "y", { duration: 0.55, ease: EASE.out });

  // Sits to the right of the cursor so the hovered title stays readable, clamped inside the viewport.
  const place = (x: number, y: number) => {
    const { width, height } = preview.getBoundingClientRect();
    xTo(Math.min(x + 40, innerWidth - width - 24));
    yTo(gsap.utils.clamp(height / 2 + 24, innerHeight - height / 2 - 24, y));
  };

  let active: string | null = null;

  const show = (id: string) => {
    if (id === active) return;
    active = id;
    warp?.show(id);
    images.forEach((img, key) => {
      gsap.to(img, { autoAlpha: key === id ? 1 : 0, duration: 0.25, ease: EASE.out, overwrite: true });
    });
    gsap.to(preview, { autoAlpha: 1, scale: 1, duration: 0.35, ease: EASE.out, overwrite: "auto" });
  };

  const hide = () => {
    active = null;
    warp?.hide();
    gsap.to(preview, { autoAlpha: 0, scale: 0.92, duration: 0.25, ease: EASE.in, overwrite: "auto" });
  };

  const rowId = (target: EventTarget | null) =>
    (target as Element | null)?.closest<HTMLElement>("[data-project]")?.dataset.project ?? null;

  const onMove = (event: PointerEvent) => {
    place(event.clientX, event.clientY);
    warp?.push(event.movementX, event.movementY);
    const id = rowId(event.target);
    if (id) show(id);
  };

  list.addEventListener("pointermove", onMove);
  list.addEventListener("pointerleave", hide);

  return () => {
    list.removeEventListener("pointermove", onMove);
    list.removeEventListener("pointerleave", hide);
    warp?.destroy();
    canvas.remove();
    html.classList.remove("has-preview");
  };
};
