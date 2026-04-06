"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const S = { fontFamily: "var(--font-body)" } as React.CSSProperties;

const glass: React.CSSProperties = {
  background: "rgba(255,255,255,0.7)",
  backdropFilter: "blur(32px) saturate(220%)",
  WebkitBackdropFilter: "blur(32px) saturate(220%)",
  border: "2px solid rgba(255,255,255,1)",
  boxShadow: [
    "0 0 0 1.5px rgba(26,86,255,0.12)",
    "0 0 0 6px rgba(255,255,255,0.65)",
    "0 0 0 7.5px rgba(26,86,255,0.08)",
    "0 12px 40px rgba(26,86,255,0.1)",
    "inset 0 1.5px 0 rgba(255,255,255,1)",
    "inset 0 -1px 0 rgba(0,0,0,0.04)",
    "inset 1.5px 0 0 rgba(255,255,255,0.8)",
    "inset -1.5px 0 0 rgba(255,255,255,0.8)",
  ].join(", "),
  borderRadius: "22px",
  overflow: "hidden",
  position: "relative",
};

function Counter({ value, suffix, decimals, triggered }: {
  value: number; suffix: string; decimals: number; triggered: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const animated = useRef(false);
  useEffect(() => {
    if (!triggered || animated.current) return;
    animated.current = true;
    const obj = { v: 0 };
    gsap.to(obj, {
      v: value, duration: 2.4, ease: "power2.out",
      onUpdate: () => {
        if (!ref.current) return;
        ref.current.textContent = decimals > 0
          ? obj.v.toFixed(decimals)
          : Math.round(obj.v).toLocaleString();
      },
    });
  }, [triggered, value, decimals]);
  return <><span ref={ref}>0</span>{suffix}</>;
}

export default function Features() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const path2Ref = useRef<SVGPathElement>(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(labelRef.current,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.55, ease: "power3.out",
          scrollTrigger: { trigger: labelRef.current, start: "top 88%" } }
      );
      gsap.fromTo(titleRef.current,
        { clipPath: "inset(100% 0% 0% 0%)", y: 24 },
        { clipPath: "inset(0% 0% 0% 0%)", y: 0, duration: 0.9, ease: "power4.out",
          scrollTrigger: { trigger: titleRef.current, start: "top 85%" } }
      );
      const cards = Array.from(gridRef.current?.querySelectorAll(".bento-card") ?? []);
      gsap.fromTo(cards,
        { opacity: 0, y: 48, scale: 0.97 },
        {
          opacity: 1, y: 0, scale: 1, duration: 0.8,
          stagger: { amount: 0.55, from: "start" },
          ease: "power4.out",
          scrollTrigger: {
            trigger: gridRef.current, start: "top 80%",
            onEnter: () => setTriggered(true),
          },
        }
      );
      [pathRef, path2Ref].forEach(r => {
        if (!r.current) return;
        const len = r.current.getTotalLength();
        gsap.set(r.current, { strokeDasharray: len, strokeDashoffset: len });
        gsap.to(r.current, { strokeDashoffset: 0, duration: 2.2, ease: "power2.inOut",
          scrollTrigger: { trigger: r.current, start: "top 85%" } });
      });
      gsap.to(".orb-a", { y: -18, x: 10, duration: 6, repeat: -1, yoyo: true, ease: "sine.inOut" });
      gsap.to(".orb-b", { y: 14, x: -12, duration: 8, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 1.5 });
      gsap.to(".orb-c", { y: -10, x: 8, duration: 5, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.8 });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const glass: React.CSSProperties = {
    background: "rgba(255,255,255,0.55)",
    backdropFilter: "blur(20px) saturate(180%)",
    WebkitBackdropFilter: "blur(20px) saturate(180%)",
    border: "1px solid rgba(255,255,255,0.75)",
    boxShadow: "0 2px 24px rgba(26,86,255,0.06), inset 0 1px 0 rgba(255,255,255,0.9)",
    borderRadius: "20px",
    overflow: "hidden",
    position: "relative",
    opacity: 0,
    transition: "transform 0.35s ease, box-shadow 0.35s ease",
  };

  const hov = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = "translateY(-5px) scale(1.005)";
    e.currentTarget.style.borderColor = "rgba(255,255,255,1)";
    e.currentTarget.style.boxShadow = "0 24px 64px rgba(26,86,255,0.14), inset 0 2px 0 rgba(255,255,255,1), inset 0 -2px 0 rgba(0,0,0,0.05), inset 2px 0 0 rgba(255,255,255,0.85), inset -2px 0 0 rgba(255,255,255,0.85)";
  };
  const unho = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = "translateY(0) scale(1)";
    e.currentTarget.style.borderColor = "rgba(255,255,255,0.88)";
    e.currentTarget.style.boxShadow = "0 4px 32px rgba(26,86,255,0.07), inset 0 2px 0 rgba(255,255,255,1), inset 0 -2px 0 rgba(0,0,0,0.04), inset 2px 0 0 rgba(255,255,255,0.7), inset -2px 0 0 rgba(255,255,255,0.7)";
  };

  return (
    <section ref={sectionRef} id="features"
      style={{ background: "linear-gradient(180deg, #f0f6ff 0%, #e4eeff 100%)", padding: "120px 2rem 100px" }}>
      <style>{`@keyframes ripple { 0%{transform:scale(0.7);opacity:1} 100%{transform:scale(2.2);opacity:0} }`}</style>
      <div style={{ maxWidth: "1080px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <p ref={labelRef} style={{ ...S, fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#1a56ff", marginBottom: "1rem", opacity: 0 }}>The platform</p>
          <h2 ref={titleRef} style={{ ...S, fontSize: "clamp(2rem, 4.5vw, 3.25rem)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.1, color: "#0a0a0f", clipPath: "inset(100% 0% 0% 0%)" }}>Everything. One place.</h2>
        </div>

        <div ref={gridRef} style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: "1rem", padding: "2px" }}>

          {/* CARD 1 — Full gradient hero (col 1-4, row 1-2) */}
          <div className="bento-card" style={{
            gridColumn: "1 / 5", gridRow: "1 / 3",
            borderRadius: "22px", overflow: "hidden", position: "relative", opacity: 0,
            cursor: "default", minHeight: "340px",
            background: "linear-gradient(145deg, #1a56ff 0%, #3b82f6 45%, #60a5fa 75%, #93c5fd 100%)",
            border: "2px solid rgba(147,197,253,0.7)",
            boxShadow: [
              "0 0 0 1.5px rgba(59,130,246,0.5)",
              "0 0 0 6px rgba(96,165,250,0.25)",
              "0 0 0 7.5px rgba(59,130,246,0.12)",
              "0 12px 48px rgba(26,86,255,0.45)",
              "inset 0 1.5px 0 rgba(255,255,255,0.45)",
              "inset 0 -1px 0 rgba(0,0,0,0.1)",
              "inset 1.5px 0 0 rgba(255,255,255,0.25)",
              "inset -1.5px 0 0 rgba(255,255,255,0.15)",
            ].join(", "),
            transition: "transform 0.35s ease, box-shadow 0.35s ease",
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 20px 60px rgba(26,86,255,0.42)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 8px 40px rgba(26,86,255,0.3)"; }}
          >
            <div className="orb-a" style={{ position: "absolute", top: "-50px", right: "-50px", width: "230px", height: "230px", borderRadius: "50%", background: "radial-gradient(circle, rgba(255,255,255,0.28) 0%, transparent 65%)", pointerEvents: "none" }} />
            <div className="orb-b" style={{ position: "absolute", bottom: "-40px", left: "-40px", width: "190px", height: "190px", borderRadius: "50%", background: "radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 65%)", pointerEvents: "none" }} />
            <div className="orb-c" style={{ position: "absolute", top: "45%", left: "25%", width: "150px", height: "150px", borderRadius: "50%", background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 65%)", pointerEvents: "none" }} />
            <div style={{ position: "relative", zIndex: 1, padding: "2.25rem", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", background: "rgba(255,255,255,0.2)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.3)", borderRadius: "9999px", padding: "0.35rem 0.85rem", alignSelf: "flex-start" }}>
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><circle cx="5.5" cy="5.5" r="3.5" stroke="rgba(255,255,255,0.85)" strokeWidth="1.2"/><path d="M5.5 3.5v2l1.2 1.2" stroke="rgba(255,255,255,0.85)" strokeWidth="1.2" strokeLinecap="round"/></svg>
                <span style={{ ...S, fontSize: "0.72rem", color: "rgba(255,255,255,0.9)", fontWeight: 500 }}>Create fast</span>
              </div>
              <div>
                <p style={{ ...S, fontSize: "0.72rem", fontWeight: 500, color: "rgba(255,255,255,0.6)", marginBottom: "0.5rem" }}>From raw data to</p>
                <h3 style={{ ...S, fontSize: "1.65rem", fontWeight: 800, color: "#fff", letterSpacing: "-0.035em", lineHeight: 1.15 }}>
                  Go from signal to decision in <em style={{ fontStyle: "italic" }}>seconds</em>
                </h3>
              </div>
            </div>
          </div>

          {/* CARD 2 — Real-time ingestion */}
          <div className="bento-card" style={{ ...glass, gridColumn: "5 / 10", padding: "2rem" }} onMouseEnter={hov} onMouseLeave={unho}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.45rem", background: "rgba(26,86,255,0.07)", border: "1px solid rgba(26,86,255,0.13)", borderRadius: "9999px", padding: "0.28rem 0.75rem", marginBottom: "1rem" }}>
              <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#1a56ff", display: "inline-block" }} />
              <span style={{ ...S, fontSize: "0.7rem", color: "#1a56ff", fontWeight: 500 }}>Live — 4.2M events/sec</span>
            </div>
            <h3 style={{ ...S, fontSize: "1.05rem", fontWeight: 800, color: "#0a0a0f", letterSpacing: "-0.03em", marginBottom: "0.45rem" }}>Real-time ingestion</h3>
            <p style={{ ...S, fontSize: "0.85rem", color: "#64748b", lineHeight: 1.65, marginBottom: "1.5rem" }}>Millions of events per second from any source. Zero config, zero cold starts.</p>
            <svg width="100%" height="52" viewBox="0 0 340 52" preserveAspectRatio="none">
              <defs><linearGradient id="cg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="rgba(26,86,255,0.15)"/><stop offset="100%" stopColor="rgba(26,86,255,0)"/></linearGradient></defs>
              <path d="M0,40 C25,36 40,20 65,22 C90,24 105,10 130,7 C155,4 170,24 200,18 C230,12 245,2 270,5 C290,8 315,16 340,10 L340,52 L0,52Z" fill="url(#cg)"/>
              <path ref={pathRef} d="M0,40 C25,36 40,20 65,22 C90,24 105,10 130,7 C155,4 170,24 200,18 C230,12 245,2 270,5 C290,8 315,16 340,10" fill="none" stroke="#1a56ff" strokeWidth="1.8"/>
            </svg>
          </div>

          {/* CARD 3 — AI detection */}
          <div className="bento-card" style={{ ...glass, gridColumn: "10 / 13", padding: "2rem" }} onMouseEnter={hov} onMouseLeave={unho}>
            <div style={{ width: "38px", height: "38px", borderRadius: "10px", background: "rgba(255,255,255,0.8)", border: "1px solid rgba(255,255,255,0.9)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem", boxShadow: "0 2px 8px rgba(26,86,255,0.08)" }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="#1a56ff" strokeWidth="1.4"/><path d="M5.5 8h5M8 5.5v5" stroke="#1a56ff" strokeWidth="1.4" strokeLinecap="round"/></svg>
            </div>
            <h3 style={{ ...S, fontSize: "1rem", fontWeight: 800, color: "#0a0a0f", letterSpacing: "-0.03em", marginBottom: "0.45rem" }}>AI detection</h3>
            <p style={{ ...S, fontSize: "0.82rem", color: "#64748b", lineHeight: 1.65 }}>Surfaces anomalies before they become incidents.</p>
            <div style={{ display: "flex", justifyContent: "center", marginTop: "1.25rem", position: "relative", height: "64px", alignItems: "center" }}>
              {[1, 2, 3].map(i => (<div key={i} style={{ position: "absolute", width: `${i * 36}px`, height: `${i * 36}px`, borderRadius: "50%", border: `1px solid rgba(26,86,255,${0.4 - i * 0.1})`, animation: `ripple ${1.2 + i * 0.45}s ease-out infinite` }} />))}
              <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: "linear-gradient(135deg, #1a56ff, #60a5fa)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", zIndex: 1, boxShadow: "0 0 14px rgba(26,86,255,0.35)" }}>
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M2.5 5.5l2 2 4-4" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
            </div>
          </div>

          {/* CARD 4 — Uptime */}
          <div className="bento-card" style={{ ...glass, gridColumn: "5 / 8", padding: "2rem", textAlign: "center" }} onMouseEnter={hov} onMouseLeave={unho}>
            <p style={{ ...S, fontSize: "0.65rem", fontWeight: 600, color: "#94a3b8", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.6rem" }}>Uptime SLA</p>
            <div style={{ ...S, fontSize: "2.5rem", fontWeight: 900, letterSpacing: "-0.05em", lineHeight: 1, color: "#0a0a0f" }}><Counter value={99.99} suffix="%" decimals={2} triggered={triggered} /></div>
            <p style={{ ...S, fontSize: "0.75rem", color: "#94a3b8", marginTop: "0.45rem" }}>Zero downtime</p>
          </div>

          {/* CARD 5 — Latency */}
          <div className="bento-card" style={{ ...glass, gridColumn: "8 / 11", padding: "2rem", textAlign: "center" }} onMouseEnter={hov} onMouseLeave={unho}>
            <p style={{ ...S, fontSize: "0.65rem", fontWeight: 600, color: "#94a3b8", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.6rem" }}>Avg Latency</p>
            <div style={{ ...S, fontSize: "2.5rem", fontWeight: 900, letterSpacing: "-0.05em", lineHeight: 1, color: "#0a0a0f" }}><Counter value={1.2} suffix="ms" decimals={1} triggered={triggered} /></div>
            <p style={{ ...S, fontSize: "0.75rem", color: "#94a3b8", marginTop: "0.45rem" }}>Edge-first</p>
          </div>

          {/* CARD 6 — Teams */}
          <div className="bento-card" style={{ ...glass, gridColumn: "11 / 13", padding: "1.5rem", textAlign: "center", overflow: "hidden" }} onMouseEnter={hov} onMouseLeave={unho}>
            <p style={{ ...S, fontSize: "0.62rem", fontWeight: 600, color: "#94a3b8", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.6rem" }}>Teams</p>
            <div style={{ ...S, fontSize: "2rem", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1, color: "#0a0a0f", whiteSpace: "nowrap" }}><Counter value={2400} suffix="+" decimals={0} triggered={triggered} /></div>
            <p style={{ ...S, fontSize: "0.72rem", color: "#94a3b8", marginTop: "0.45rem" }}>Worldwide</p>
          </div>

          {/* CARD 7 — Dashboards */}
          <div className="bento-card" style={{ ...glass, gridColumn: "1 / 6", padding: "2rem" }} onMouseEnter={hov} onMouseLeave={unho}>
            <div style={{ width: "38px", height: "38px", borderRadius: "10px", background: "rgba(255,255,255,0.8)", border: "1px solid rgba(255,255,255,0.9)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem", boxShadow: "0 2px 8px rgba(26,86,255,0.08)" }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1.5" y="1.5" width="5.5" height="5.5" rx="1.5" stroke="#1a56ff" strokeWidth="1.4"/><rect x="9" y="1.5" width="5.5" height="5.5" rx="1.5" stroke="#1a56ff" strokeWidth="1.4"/><rect x="1.5" y="9" width="5.5" height="5.5" rx="1.5" stroke="#1a56ff" strokeWidth="1.4"/><rect x="9" y="9" width="5.5" height="5.5" rx="1.5" stroke="#1a56ff" strokeWidth="1.4"/></svg>
            </div>
            <h3 style={{ ...S, fontSize: "1.05rem", fontWeight: 800, color: "#0a0a0f", letterSpacing: "-0.03em", marginBottom: "0.45rem" }}>Composable dashboards</h3>
            <p style={{ ...S, fontSize: "0.85rem", color: "#64748b", lineHeight: 1.65, marginBottom: "1.25rem" }}>Drag, drop, connect. Build what your team needs in minutes, not weeks.</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.5rem" }}>
              {[["Users", "128K"], ["Revenue", "$2.4M"], ["Churn", "0.8%"]].map(([l, v]) => (
                <div key={l} style={{ background: "rgba(255,255,255,0.7)", borderRadius: "10px", padding: "0.6rem 0.75rem", border: "1px solid rgba(255,255,255,0.9)", boxShadow: "0 1px 4px rgba(26,86,255,0.04)" }}>
                  <p style={{ ...S, fontSize: "0.65rem", color: "#94a3b8", marginBottom: "0.2rem" }}>{l}</p>
                  <p style={{ ...S, fontSize: "0.9rem", fontWeight: 700, color: "#0a0a0f", letterSpacing: "-0.03em" }}>{v}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CARD 8 — Security dark */}
          <div className="bento-card" style={{ ...glass, gridColumn: "6 / 10", padding: "2rem", background: "rgba(10,10,15,0.88)", border: "1px solid rgba(255,255,255,0.07)", boxShadow: "0 2px 24px rgba(0,0,0,0.2)" }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 24px 60px rgba(0,0,0,0.28)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 24px rgba(0,0,0,0.2)"; }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.9rem" }}>
              <div style={{ width: "38px", height: "38px", borderRadius: "10px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 1.5L13.5 4V9.5C13.5 12 11.2 14.2 8 15C4.8 14.2 2.5 12 2.5 9.5V4L8 1.5Z" stroke="rgba(255,255,255,0.45)" strokeWidth="1.4" strokeLinejoin="round"/><path d="M5.5 8l2 2 3-3" stroke="rgba(255,255,255,0.45)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <span style={{ ...S, fontSize: "0.6rem", fontWeight: 600, color: "#4ade80", background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.15)", borderRadius: "9999px", padding: "0.15rem 0.55rem" }}>SOC 2 Certified</span>
            </div>
            <h3 style={{ ...S, fontSize: "1.05rem", fontWeight: 800, color: "#fff", letterSpacing: "-0.03em", marginBottom: "0.45rem" }}>Enterprise security</h3>
            <p style={{ ...S, fontSize: "0.85rem", color: "rgba(255,255,255,0.32)", lineHeight: 1.65 }}>Encrypted at rest and in transit. Fully audited. Always yours.</p>
          </div>

          {/* CARD 9 — Edge + chart */}
          <div className="bento-card" style={{ ...glass, gridColumn: "10 / 13", padding: "2rem" }} onMouseEnter={hov} onMouseLeave={unho}>
            <div style={{ width: "38px", height: "38px", borderRadius: "10px", background: "rgba(255,255,255,0.8)", border: "1px solid rgba(255,255,255,0.9)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem", boxShadow: "0 2px 8px rgba(26,86,255,0.08)" }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="#1a56ff" strokeWidth="1.4"/><ellipse cx="8" cy="8" rx="2.5" ry="6" stroke="#1a56ff" strokeWidth="1.4"/><path d="M2 8h12" stroke="#1a56ff" strokeWidth="1.4" strokeLinecap="round"/></svg>
            </div>
            <h3 style={{ ...S, fontSize: "1rem", fontWeight: 800, color: "#0a0a0f", letterSpacing: "-0.03em", marginBottom: "0.45rem" }}>Global edge</h3>
            <p style={{ ...S, fontSize: "0.82rem", color: "#64748b", lineHeight: 1.65, marginBottom: "0.9rem" }}>Processed at the edge. Sub-ms latency guaranteed.</p>
            <div style={{ display: "flex", gap: "0.35rem", flexWrap: "wrap", marginBottom: "1rem" }}>
              {["US-East", "EU-West", "AP", "+12"].map(r => (
                <span key={r} style={{ ...S, fontSize: "0.65rem", fontWeight: 600, color: "#64748b", background: "rgba(255,255,255,0.7)", borderRadius: "9999px", padding: "0.18rem 0.55rem", border: "1px solid rgba(255,255,255,0.9)" }}>{r}</span>
              ))}
            </div>
            <svg width="100%" height="36" viewBox="0 0 160 36" preserveAspectRatio="none">
              <defs><linearGradient id="tg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="rgba(26,86,255,0.12)"/><stop offset="100%" stopColor="rgba(26,86,255,0)"/></linearGradient></defs>
              <path d="M0,28 C20,24 30,14 50,16 C70,18 80,6 100,4 C120,2 130,14 145,10 C152,8 157,12 160,8 L160,36 L0,36Z" fill="url(#tg)"/>
              <path ref={path2Ref} d="M0,28 C20,24 30,14 50,16 C70,18 80,6 100,4 C120,2 130,14 145,10 C152,8 157,12 160,8" fill="none" stroke="#1a56ff" strokeWidth="1.5"/>
            </svg>
          </div>

        </div>
      </div>
    </section>
  );
}