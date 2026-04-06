"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Hero() {
  const refs = {
    section: useRef<HTMLElement>(null),
    badge: useRef<HTMLDivElement>(null),
    h1: useRef<HTMLHeadingElement>(null),
    sub: useRef<HTMLParagraphElement>(null),
    cta: useRef<HTMLDivElement>(null),
    search: useRef<HTMLDivElement>(null),
    press: useRef<HTMLDivElement>(null),
    card: useRef<HTMLDivElement>(null),
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.35 });
      const ease = "power3.out";

      tl.fromTo(refs.badge.current, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5, ease })
        .fromTo(refs.h1.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.65, ease }, "-=0.25")
        .fromTo(refs.sub.current, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.5, ease }, "-=0.35")
        .fromTo(refs.cta.current, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.45, ease }, "-=0.3")
        .fromTo(refs.search.current, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.45, ease }, "-=0.25")
        .fromTo(refs.press.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4, ease }, "-=0.2")
        .fromTo(refs.card.current, { opacity: 0, y: 36, scale: 0.98 }, { opacity: 1, y: 0, scale: 1, duration: 0.85, ease: "power4.out" }, "-=0.25");
    }, refs.section);
    return () => ctx.revert();
  }, []);

  const S: React.CSSProperties = {
    fontFamily: "var(--font-body)",
  };

  return (
    <section
      ref={refs.section}
      style={{
        minHeight: "100vh",
        background: "linear-gradient(175deg, #f8faff 0%, #e8f0ff 18%, #c7d9ff 42%, #7aaeff 68%, #3b82f6 84%, #1d4ed8 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "90px",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Soft vignette depth */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,255,255,0.6) 0%, transparent 70%)",
      }}/>

      <div style={{
        maxWidth: "680px", width: "100%",
        padding: "0 1.5rem",
        display: "flex", flexDirection: "column", alignItems: "center",
        textAlign: "center", position: "relative", zIndex: 1,
        gap: 0,
      }}>

        {/* Badge */}
        <div ref={refs.badge} style={{ opacity: 0, marginBottom: "1.5rem" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "0.5rem",
            background: "rgba(255,255,255,0.7)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.85)",
            borderRadius: "9999px",
            padding: "0.35rem 0.9rem",
          }}>
            <div style={{ display: "flex" }}>
              {["😊","😎","🙂"].map((e, i) => (
                <span key={i} style={{ fontSize: "0.85rem", marginLeft: i ? "-4px" : 0 }}>{e}</span>
              ))}
            </div>
            <span style={{ ...S, fontSize: "0.75rem", fontWeight: 500, color: "#3b4a6b", letterSpacing: "-0.01em" }}>
              Loved by <strong style={{ color: "#0a0a0f" }}>1,200+ teams</strong>
            </span>
          </div>
        </div>

        {/* H1 */}
        <h1
          ref={refs.h1}
          style={{
            ...S,
            opacity: 0,
            fontSize: "clamp(2.75rem, 7vw, 4.75rem)",
            fontWeight: 800,
            lineHeight: 1.08,
            letterSpacing: "-0.04em",
            color: "#0a0a0f",
            marginBottom: "1.25rem",
          }}
        >
          Turn your data into{" "}
          <span style={{
            fontStyle: "italic",
            background: "linear-gradient(135deg, #1a56ff 0%, #fff 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
            decisions.
          </span>
        </h1>

        {/* Sub */}
        <p
          ref={refs.sub}
          style={{
            ...S,
            opacity: 0,
            fontSize: "1.05rem",
            fontWeight: 400,
            color: "#3b4a6b",
            lineHeight: 1.65,
            maxWidth: "440px",
            marginBottom: "1.75rem",
            letterSpacing: "-0.01em",
          }}
        >
          Ingest, query, and visualize billions of events in real-time —{" "}
          <span style={{ color: "#0a0a0f", fontWeight: 500 }}>no infrastructure needed.</span>
        </p>

        {/* CTA */}
        <div ref={refs.cta} style={{ opacity: 0, marginBottom: "1.5rem" }}>
          <a href="#" style={{
            ...S,
            display: "inline-flex", alignItems: "center", gap: "0.35rem",
            padding: "0.7rem 1.6rem",
            borderRadius: "9999px",
            background: "linear-gradient(135deg, #1a56ff, #60a5fa)",
            color: "#fff",
            fontSize: "0.95rem",
            fontWeight: 600,
            textDecoration: "none",
            letterSpacing: "-0.02em",
            boxShadow: "0 4px 24px rgba(26,86,255,0.35), inset 0 1px 0 rgba(255,255,255,0.2)",
            transition: "transform 0.2s, box-shadow 0.2s",
          }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "translateY(-1px)";
              e.currentTarget.style.boxShadow = "0 8px 32px rgba(26,86,255,0.45), inset 0 1px 0 rgba(255,255,255,0.2)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 24px rgba(26,86,255,0.35), inset 0 1px 0 rgba(255,255,255,0.2)";
            }}
          >
            Get Started
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 7H11M7.5 3.5L11 7L7.5 10.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>

        {/* Search bar */}
        <div ref={refs.search} style={{ opacity: 0, width: "100%", maxWidth: "500px", marginBottom: "2.5rem" }}>
          <div style={{
            background: "rgba(255,255,255,0.72)",
            backdropFilter: "blur(20px) saturate(180%)",
            border: "1px solid rgba(255,255,255,0.9)",
            borderRadius: "14px",
            padding: "0.85rem 1rem",
            boxShadow: "0 2px 20px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.8)",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.65rem" }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
                <circle cx="6" cy="6" r="4" stroke="#94a3b8" strokeWidth="1.4"/>
                <path d="M9.5 9.5L12 12" stroke="#94a3b8" strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
              <span style={{ ...S, fontSize: "0.875rem", color: "#94a3b8", flex: 1, textAlign: "left", letterSpacing: "-0.01em" }}>
                Ask anything about your data...
              </span>
              <div style={{
                width: "26px", height: "26px", borderRadius: "7px",
                background: "linear-gradient(135deg, #1a56ff, #60a5fa)",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M6 2V10M2 6H10" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
            </div>
            <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
              {["📊 Query events", "📈 Trending", "🔍 Find anomalies", "⚡ Live view"].map((t) => (
                <span key={t} style={{
                  ...S, fontSize: "0.72rem", color: "#64748b",
                  background: "rgba(241,245,249,0.85)",
                  borderRadius: "9999px",
                  padding: "0.22rem 0.65rem",
                  cursor: "pointer",
                  letterSpacing: "-0.01em",
                  border: "1px solid rgba(0,0,0,0.05)",
                  transition: "background 0.15s",
                }}
                  onMouseEnter={e => (e.currentTarget.style.background = "rgba(226,232,240,0.9)")}
                  onMouseLeave={e => (e.currentTarget.style.background = "rgba(241,245,249,0.85)")}
                >{t}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Press */}
        <div ref={refs.press} style={{ opacity: 0, marginBottom: "3.5rem" }}>
          <p style={{ ...S, fontSize: "0.68rem", fontWeight: 500, color: "#94a3b8", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
            Featured in
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: "2rem", flexWrap: "wrap", justifyContent: "center" }}>
            {["Forbes", "TechCrunch", "Product Hunt", "Y Combinator"].map((n) => (
              <span key={n} style={{
                ...S, fontSize: "0.9rem", fontWeight: 700,
                color: "rgba(59,74,107,0.5)",
                letterSpacing: "-0.03em",
              }}>{n}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Card */}
      <div ref={refs.card} style={{
        width: "100%", maxWidth: "820px",
        padding: "0 1.5rem",
        position: "relative", zIndex: 1, opacity: 0,
      }}>
        <div style={{
          background: "rgba(255,255,255,0.28)",
          backdropFilter: "blur(24px) saturate(180%)",
          border: "1px solid rgba(255,255,255,0.55)",
          borderRadius: "20px 20px 0 0",
          padding: "1.25rem",
          boxShadow: "0 -4px 40px rgba(26,86,255,0.1), inset 0 1px 0 rgba(255,255,255,0.7)",
        }}>
          {/* Window chrome */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "1rem" }}>
            {["#ff5f57","#febc2e","#28c840"].map((c) => (
              <div key={c} style={{ width: "10px", height: "10px", borderRadius: "50%", background: c }}/>
            ))}
            <div style={{
              flex: 1, marginLeft: "0.75rem", height: "22px", borderRadius: "6px",
              background: "rgba(0,0,0,0.06)",
              display: "flex", alignItems: "center", paddingLeft: "0.75rem",
            }}>
              <span style={{ ...S, fontSize: "0.7rem", color: "#94a3b8", letterSpacing: "-0.01em" }}>app.axiom.ai/dashboard</span>
            </div>
          </div>

          {/* Inner */}
          <div style={{
            background: "rgba(255,255,255,0.55)",
            borderRadius: "12px",
            padding: "2rem 1.5rem",
            minHeight: "240px",
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1.5rem",
          }}>
            {/* Stats row */}
            <div style={{ display: "flex", gap: "1rem", width: "100%", justifyContent: "center" }}>
              {[
                { label: "Events / sec", value: "4.2M", color: "#1a56ff" },
                { label: "Avg latency", value: "1.2ms", color: "#0ea5e9" },
                { label: "Uptime", value: "99.99%", color: "#10b981" },
              ].map((s) => (
                <div key={s.label} style={{
                  flex: 1, maxWidth: "160px",
                  background: "rgba(255,255,255,0.7)",
                  border: "1px solid rgba(255,255,255,0.9)",
                  borderRadius: "10px",
                  padding: "0.85rem 1rem",
                  textAlign: "left",
                }}>
                  <p style={{ ...S, fontSize: "0.7rem", color: "#94a3b8", marginBottom: "0.3rem", letterSpacing: "-0.01em" }}>{s.label}</p>
                  <p style={{ ...S, fontSize: "1.5rem", fontWeight: 700, color: s.color, letterSpacing: "-0.04em" }}>{s.value}</p>
                </div>
              ))}
            </div>

            {/* Mini chart */}
            <div style={{ width: "100%", padding: "0 0.5rem" }}>
              <svg width="100%" height="70" viewBox="0 0 740 70" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#1a56ff" stopOpacity="0.18"/>
                    <stop offset="100%" stopColor="#1a56ff" stopOpacity="0"/>
                  </linearGradient>
                </defs>
                <path
                  d="M0,55 C60,50 90,32 140,36 C190,40 210,22 260,18 C310,14 330,38 380,30 C430,22 450,8 500,12 C550,16 570,4 620,8 C660,11 700,24 740,18 L740,70 L0,70Z"
                  fill="url(#g1)"
                />
                <path
                  d="M0,55 C60,50 90,32 140,36 C190,40 210,22 260,18 C310,14 330,38 380,30 C430,22 450,8 500,12 C550,16 570,4 620,8 C660,11 700,24 740,18"
                  fill="none" stroke="#1a56ff" strokeWidth="1.8"
                />
              </svg>
            </div>

            <p style={{ ...S, fontSize: "0.85rem", color: "#64748b", fontWeight: 500, letterSpacing: "-0.01em" }}>
              See how{" "}
              <span style={{ color: "#1a56ff", fontWeight: 700, fontStyle: "italic" }}>Axiom</span>
              {" "}transforms your data pipeline →
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}