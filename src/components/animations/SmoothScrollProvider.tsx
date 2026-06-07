"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type MouseEvent,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap, registerGsapPlugins, ScrollTrigger } from "@/lib/animations/gsap-config";

type SmoothScrollContextValue = {
  scrollTo: (target: string | number | HTMLElement, options?: { offset?: number }) => void;
};

const SmoothScrollContext = createContext<SmoothScrollContextValue | null>(null);

export function useSmoothScroll() {
  return useContext(SmoothScrollContext);
}

export function useAnchorClick(offset = -80) {
  const smoothScroll = useSmoothScroll();

  return useCallback(
    (event: MouseEvent<HTMLAnchorElement>, href: string) => {
      if (!href.startsWith("#") || !smoothScroll) return;
      event.preventDefault();
      smoothScroll.scrollTo(href, { offset });
    },
    [smoothScroll, offset],
  );
}

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    if (pathname.startsWith("/admin")) {
      setLenis(null);
      return;
    }

    registerGsapPlugins();

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const instance = new Lenis({
      lerp: 0.085,
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });

    document.documentElement.classList.add("lenis", "lenis-smooth");
    setLenis(instance);

    instance.on("scroll", ScrollTrigger.update);

    const ticker = (time: number) => {
      instance.raf(time * 1000);
    };

    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      document.documentElement.classList.remove("lenis", "lenis-smooth");
      gsap.ticker.remove(ticker);
      instance.destroy();
      setLenis(null);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [pathname]);

  const value = useMemo<SmoothScrollContextValue | null>(() => {
    if (!lenis) return null;
    return {
      scrollTo: (target, options) => {
        lenis.scrollTo(target, options);
      },
    };
  }, [lenis]);

  return <SmoothScrollContext.Provider value={value}>{children}</SmoothScrollContext.Provider>;
}
