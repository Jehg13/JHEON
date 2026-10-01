import { useEffect, type RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

export default function useScrollReveal<T extends HTMLElement>(
  root: RefObject<T | null>,
) {
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion || !root.current) return;

    const context = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        const image = element.matches("[data-reveal-image]");
        gsap.fromTo(
          element,
          {
            opacity: 0,
            y: image ? 0 : 28,
            scale: image ? 1.045 : 1,
            clipPath: image ? "inset(10% 5% 10% 5%)" : "inset(0 0 0 0)",
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            clipPath: "inset(0% 0% 0% 0%)",
            duration: image ? 0.55 : 0.42,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 92%",
              once: true,
            },
          },
        );
      });
    }, root);

    return () => context.revert();
  }, [root, shouldReduceMotion]);
}
