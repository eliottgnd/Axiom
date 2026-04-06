"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const S = { fontFamily: "var(--font-body)" } as React.CSSProperties;

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const btnRef = useRef<HTMLAnchorElement>(null);
  const noteRef = useRef<HTMLParagraphElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Card scale reveal
      gsap.fromTo(cardRef.current,
        { opacity: 0, scale: 0.94, y: 40 },
        { opacity: 1, scale: 1, y: 0, duration: 1.1, ease: "power4.out",
          scrollTrigger: { trigger: cardRef.current, start: "top 82%" } }
      );

      // Title wipe
      gsap.fromTo(titleRef.current,
        { clipPath: "inset(100% 0% 0% 0%)", y: 20 },
        { clipPath: "inset(0% 0% 0% 0%)", y: 0, duration: 0.9, ease: "power4.out", delay: 0.2,
          scrollTrigger: { trigger: cardRef.current, start: "top 82%" } }
      );

      gsap.fromTo([subRef.current, btnRef.current, noteRef.current],
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.65, stagger: 0.1, ease: "power3.out", delay: 0.4,
          scrollTrigger: { trigger: cardRef.current, start: "top 82%" } }
      );

      // Brand text parallax
      gsap.fromTo(brandRef.current,
        { y: 40 },
        { y: -20, ease: "none",
          scrollTrigger: {
            trigger: brandRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          }
        }
      );

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Magnetic effect
  const onMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.3;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.3;
    gsap.to(e.currentTarget, { x, y, duration: 0.4, ease: "power2.out" });
  };
  const onMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.5)" });
  };

  return (
    <>
      {/* CTA */}
      <section
        ref={sectionRef}
        id="cta"
        style={{ background: "#f8faff", padding: "100px 2rem 0" }}
      >
        <div style={{ maxWidth: "1080px", margin: "0 auto" }}>
          <div
            ref={cardRef}
            style={{
              background: "linear-gradient(145deg, #0f172a 0%, #1e3a8a 55%, #1d4ed8 100%)",
              borderRadius: "28px",
              padding: "clamp(3.5rem, 7vw, 6rem) 2rem",
              textAlign: "center",
              position: "relative",
              overflow: "hidden",
              opacity: 0,
            }}
          >
            {/* Grid texture */}
            <div style={{
              position: "absolute", inset: 0, pointerEvents: "none",
              backgroundImage: "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }} />

            {/* Orb */}
            <div style={{
              position: "absolute", top: "-30%", left: "50%", transform: "translateX(-50%)",
              width: "700px", height: "400px", pointerEvents: "none",
              background: "radial-gradient(ellipse, rgba(96,165,250,0.18) 0%, transparent 65%)",
            }} />

            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: "0.4rem",
                background: "rgba(96,165,250,0.12)", border: "1px solid rgba(96,165,250,0.2)",
                borderRadius: "9999px", padding: "0.3rem 0.9rem", marginBottom: "2rem",
              }}>
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#60a5fa", display: "inline-block" }} />
                <span style={{ ...S, fontSize: "0.72rem", color: "#93c5fd", fontWeight: 500, letterSpacing: "0.04em" }}>
                  Free 14-day trial — no credit card
                </span>
              </div>

              <h2
                ref={titleRef}
                style={{
                  ...S,
                  fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                  fontWeight: 800,
                  letterSpacing: "-0.04em",
                  lineHeight: 1.05,
                  color: "#fff",
                  marginBottom: "1.5rem",
                  clipPath: "inset(100% 0% 0% 0%)",
                }}
              >
                Your data is talking.
                <br />
                <span style={{
                  backgroundImage: "linear-gradient(135deg, #60a5fa, #e0f2fe)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}>
                  Start listening.
                </span>
              </h2>

              <p
                ref={subRef}
                style={{
                  ...S, fontSize: "1.05rem", color: "rgba(255,255,255,0.5)",
                  lineHeight: 1.65, maxWidth: "420px", margin: "0 auto 2.5rem",
                  letterSpacing: "-0.01em", opacity: 0,
                }}
              >
                Join 2,400+ teams who use Axiom to ship faster, debug smarter, and stay ahead of every incident.
              </p>

              <a
                ref={btnRef}
                href="#"
                onMouseMove={onMouseMove}
                onMouseLeave={onMouseLeave}
                style={{
                  ...S,
                  display: "inline-flex", alignItems: "center", gap: "0.5rem",
                  padding: "1rem 2.25rem",
                  borderRadius: "9999px",
                  background: "#fff",
                  color: "#0a0a0f",
                  fontSize: "1rem",
                  fontWeight: 700,
                  textDecoration: "none",
                  letterSpacing: "-0.025em",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.8)",
                  transition: "box-shadow 0.2s, background 0.2s",
                  opacity: 0,
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.boxShadow = "0 8px 40px rgba(0,0,0,0.35)";
                  e.currentTarget.style.background = "#f0f6ff";
                }}
                // Leave handled by magnetic
              >
                Start for free
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                  <path d="M3 7.5H12M8 3.5L12 7.5L8 11.5" stroke="#0a0a0f" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>

              <p
                ref={noteRef}
                style={{
                  ...S, fontSize: "0.78rem", color: "rgba(255,255,255,0.3)",
                  marginTop: "1.25rem", letterSpacing: "-0.01em", opacity: 0,
                }}
              >
                SOC 2 compliant · Cancel anytime · Setup in 2 minutes
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#f8faff", padding: "80px 2rem 0" }}>
        <div style={{ maxWidth: "1080px", margin: "0 auto" }}>

          {/* Top grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr",
            gap: "3rem",
            paddingBottom: "60px",
            borderBottom: "1px solid rgba(0,0,0,0.07)",
          }}>
            {/* Brand */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
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
                <span style={{ ...S, fontWeight: 700, fontSize: "0.95rem", letterSpacing: "-0.03em", color: "#0a0a0f" }}>Axiom</span>
              </div>
              <p style={{ ...S, fontSize: "0.875rem", color: "#94a3b8", lineHeight: 1.65, maxWidth: "240px", letterSpacing: "-0.01em" }}>
                Turn your data into decisions. Built for teams that move fast.
              </p>
            </div>

            {/* Links */}
            {[
              { title: "Product", links: ["Features", "Analytics", "Integrations", "Changelog"] },
              { title: "Company", links: ["About", "Blog", "Careers", "Press"] },
              { title: "Legal", links: ["Privacy", "Terms", "Security", "DPA"] },
            ].map(col => (
              <div key={col.title}>
                <p style={{ ...S, fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#94a3b8", marginBottom: "1rem" }}>
                  {col.title}
                </p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                  {col.links.map(l => (
                    <li key={l}>
                      <a href="#" style={{
                        ...S, fontSize: "0.875rem", color: "#64748b", textDecoration: "none",
                        letterSpacing: "-0.01em", transition: "color 0.15s",
                      }}
                        onMouseEnter={e => (e.currentTarget.style.color = "#0a0a0f")}
                        onMouseLeave={e => (e.currentTarget.style.color = "#64748b")}
                      >{l}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "1.5rem 0",
          }}>
            <p style={{ ...S, fontSize: "0.78rem", color: "#94a3b8", letterSpacing: "-0.01em" }}>
              © 2025 Axiom Technologies, Inc.
            </p>
            <p style={{ ...S, fontSize: "0.78rem", color: "#cbd5e1", letterSpacing: "-0.01em" }}>
              Made with precision.
            </p>
          </div>
        </div>

        {/* Big brand text with parallax */}
        <div style={{ overflow: "hidden" }}>
          <div ref={brandRef}>
            <p style={{
              ...S,
              textAlign: "center",
              fontWeight: 900,
              letterSpacing: "-0.05em",
              lineHeight: 0.85,
              fontSize: "clamp(6rem, 20vw, 18rem)",
              color: "transparent",
              WebkitTextStroke: "1px rgba(26,86,255,0.08)",
              userSelect: "none",
              marginBottom: "-0.1em",
            }}>
              axiom
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}