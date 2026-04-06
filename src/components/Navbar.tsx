"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        innerRef.current,
        { opacity: 0, y: -12 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", delay: 0.1 }
      );

      let lastY = 0;
      ScrollTrigger.create({
        onUpdate: (self) => {
          const y = self.scroll();
          setScrolled(y > 50);
          if (y > lastY && y > 100) {
            gsap.to(navRef.current, { yPercent: -100, duration: 0.3, ease: "power2.inOut" });
          } else {
            gsap.to(navRef.current, { yPercent: 0, duration: 0.3, ease: "power2.out" });
          }
          lastY = y;
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <nav
      ref={navRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 100,
        transition: "background 0.4s ease, border-color 0.4s ease, backdrop-filter 0.4s ease",
        background: scrolled ? "rgba(255,255,255,0.82)" : "transparent",
        backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
        borderBottom: scrolled ? "1px solid rgba(0,0,0,0.06)" : "1px solid transparent",
      }}
    >
      <div
        ref={innerRef}
        style={{
          maxWidth: "1080px",
          margin: "0 auto",
          padding: "0 2rem",
          height: "60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          opacity: 0,
        }}
      >
        {/* Logo */}
        <a href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <div style={{
            width: "28px", height: "28px", borderRadius: "7px",
            background: "linear-gradient(145deg, #1a56ff, #60a5fa)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 1.5L12.5 4.5V9.5L7 12.5L1.5 9.5V4.5L7 1.5Z" stroke="white" strokeWidth="1.4" strokeLinejoin="round"/>
              <circle cx="7" cy="7" r="1.8" fill="white"/>
            </svg>
          </div>
          <span style={{
            fontFamily: "var(--font-body)",
            fontWeight: 700,
            fontSize: "0.95rem",
            letterSpacing: "-0.03em",
            color: "#0a0a0f",
          }}>
            Axiom
          </span>
        </a>

        {/* Right */}
        <div style={{ display: "flex", alignItems: "center", gap: "1.75rem" }}>
          {["Login", "Pricing"].map((l) => (
            <a key={l} href="#" style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.875rem",
              fontWeight: 400,
              color: "#6b6b7b",
              textDecoration: "none",
              letterSpacing: "-0.01em",
              transition: "color 0.15s",
            }}
              onMouseEnter={e => (e.currentTarget.style.color = "#0a0a0f")}
              onMouseLeave={e => (e.currentTarget.style.color = "#6b6b7b")}
            >{l}</a>
          ))}
          <a href="#" style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.875rem",
            fontWeight: 600,
            color: "#0a0a0f",
            textDecoration: "none",
            letterSpacing: "-0.02em",
            display: "flex",
            alignItems: "center",
            gap: "0.2rem",
            transition: "opacity 0.15s",
          }}
            onMouseEnter={e => (e.currentTarget.style.opacity = "0.6")}
            onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
          >
            Start Free
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M2.5 6.5H10.5M7 3L10.5 6.5L7 10" stroke="#0a0a0f" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </div>
    </nav>
  );
}