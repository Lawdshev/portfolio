"use client";

import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion, registerGsapPlugins } from "@/lib/animations/gsap-config";

export default function MagneticButtons() {
  useGSAP(() => {
    registerGsapPlugins();
    if (prefersReducedMotion()) return;

    const buttons = gsap.utils.toArray<HTMLElement>(".magnetic-btn");
    const cleanups: Array<() => void> = [];

    buttons.forEach((button) => {
      const xTo = gsap.quickTo(button, "x", { duration: 0.45, ease: "power3.out" });
      const yTo = gsap.quickTo(button, "y", { duration: 0.45, ease: "power3.out" });

      const onMove = (event: MouseEvent) => {
        const rect = button.getBoundingClientRect();
        xTo((event.clientX - rect.left - rect.width / 2) * 0.18);
        yTo((event.clientY - rect.top - rect.height / 2) * 0.18);
      };

      const onLeave = () => {
        xTo(0);
        yTo(0);
      };

      button.addEventListener("mousemove", onMove);
      button.addEventListener("mouseleave", onLeave);

      cleanups.push(() => {
        button.removeEventListener("mousemove", onMove);
        button.removeEventListener("mouseleave", onLeave);
        gsap.set(button, { x: 0, y: 0 });
      });
    });

    return () => cleanups.forEach((cleanup) => cleanup());
  });

  return null;
}
