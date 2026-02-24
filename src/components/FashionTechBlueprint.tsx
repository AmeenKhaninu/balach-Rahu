"use client";

import { useState } from "react";

const phases = [
  {
    id: 1,
    title: "Brand DNA & Design System",
    duration: "Weeks 1–4",
    color: "#8B1A1A",
    accent: "#D4A574",
    icon: "◆",
    summary:
      "Before writing a single line of code, define your brand's digital soul. The original plan skips this — fatal mistake for a fashion brand.",
    whyBetter:
      "The original plan jumps straight to 'wireframes' without establishing brand identity. A fashion platform lives or dies on its aesthetic coherence.",
    deliverables: [
      {
        name: "Brand Identity System",
        details:
          "Logo system, typography scale (Urdu + English bilingual), color tokens, photography direction, editorial voice guidelines. Think: how does your brand feel when someone lands on it at 2am browsing for their sister's wedding outfit?",
      },
      {
        name: "Design Token Library",
        details:
          "CSS custom properties for every color, spacing unit, shadow, border-radius, and animation curve. Two modes: 'Pret' (clean, airy, modern) and 'Bridal' (rich, textured, gold-accented). The UI literally transforms based on collection context.",
      },
      {
        name: "Component Library in Figma + Code",
        details:
          "Build once, use everywhere. Product cards, measurement input forms, AI chat bubbles, order timeline components — all designed before the pages are assembled.",
      },
      {
        name: "Bilingual Content Strategy",
        details:
          "Urdu/English toggle with culturally appropriate copy. Not just translation — the Urdu experience should feel native, with right-to-left layout adjustments and culturally resonant imagery.",
      },
    ],
    techDecisions: [
      "Next.js 14+ (App Router) — SSR for SEO, server components for performance, image optimization built-in",
      "Tailwind CSS + custom design tokens — utility-first but branded",
      "Framer Motion — the animations that make fashion sites feel alive",
      "Cloudinary — image CDN with on-the-fly transformations for dress photos (zoom, color adjustment, fabric texture closeups)",
    ],
  },
  {
    id: 2,
    title: "Storefront & Smart Catalog",
    duration: "Weeks 5–10",
    color: "#1A3C5E",
    accent: "#7EB8DA",
    icon: "◇",
    summary:
      "Not just an e-commerce site — a curated editorial experience where every collection tells a story.",
    whyBetter:
      "The original plan treats the catalog as a filter dropdown. In fashion, discovery IS the product. Browsing should feel like flipping through a lookbook, not scrolling Amazon.",
    deliverables: [
      {
        name: "Editorial Collection Pages",
        details:
          "Each collection (Bridal '25, Eid Festive, Summer Lawn) gets its own immersive landing page with parallax photography, mood-setting video headers, and storytelling copy. Not just a grid of products.",
      },
      {
        name: "Intelligent Product Pages",
        details:
          "360° product viewer, fabric swatch selector (real photographed swatches, not color circles), size recommendation widget, 'Complete the Look' AI suggestions, and a 'How It's Made' section showing craftsperson stories.",
      },
      {
        name: "Smart Filtering Beyond Categories",
        details:
          "Filter by occasion (Mehndi, Barat, Walima, Dholki), budget range, body type suitability, fabric weight (summer vs winter), embroidery intensity (minimal → heavy). Also: visual search — upload a photo of a design you like and find similar pieces.",
      },
      {
        name: "Wishlist & Mood Board",
        details:
          "Users don't just 'save' items — they build mood boards. Drag designs together, mix fabrics with silhouettes, share boards with family for feedback. This is how Pakistani women actually shop for events.",
      },
    ],
    techDecisions: [
      "PostgreSQL via Supabase — relational data (users, orders, inventory) with real-time subscriptions for live inventory",
      "MongoDB Atlas — flexible schema for AI-generated designs, varying measurement profiles, mood board compositions",
      "Algolia — instant search with visual search extensions, Urdu language support, typo tolerance",
      "Stripe + JazzCash/EasyPaisa/PayFast — dual payment stack with currency detection (PKR, GBP, USD, AED)",
    ],
  },
  {
    id: 3,
    title: "Custom Tailoring Engine",
    duration: "Weeks 11–16",
    color: "#2D5016",
    accent: "#A8D08D",
    icon: "◈",
    summary:
      "The core differentiator. This isn't just 'pick a size' — it's a full digital tailoring experience.",
    whyBetter:
      "The original plan treats AI measurement as a checkout step. Wrong framing. Custom tailoring should be a rich, guided experience — like sitting with a master darzi (tailor), not filling out a form.",
    deliverables: [
      {
        name: "AI Body Measurement Studio",
        details:
          "Camera-based sizing using 3DLOOK or Mirrorsize SDK. But wrapped in YOUR branded experience: step-by-step guided capture with Urdu voice instructions, real-time pose correction overlay, instant measurement visualization on a 3D body model. Show users their exact silhouette.",
      },
      {
        name: "Customization Configurator",
        details:
          "Interactive visual builder: select neckline shape (see it change on the dress in real-time), pick sleeve style, choose trouser cut (straight, sharara, gharara, tulip shalwar, palazzo), add/remove dupatta, select lining. Every change renders live on the product image.",
      },
      {
        name: "Measurement Profile Manager",
        details:
          "Save multiple profiles: 'My Sizes', 'Ammi's Sizes', 'Baji's Sizes'. Each profile stores measurements, body type notes, preferred ease/fit preferences (loose, fitted, semi-fitted), and alteration history.",
      },
      {
        name: "Darzi Override Panel",
        details:
          "Manual measurement entry for users who already have a trusted tailor's numbers. Plus a 'Tailor Share' link — send your digital measurements directly to your local darzi via WhatsApp if needed.",
      },
    ],
    techDecisions: [
      "3DLOOK BodyKit SDK — most accurate camera-based measurement API, supports Pakistani body types",
      "Three.js / React Three Fiber — real-time 3D dress configurator rendering",
      "WebRTC for camera access — smooth in-browser measurement capture without app download",
      "WhatsApp Business API — share measurements, order updates, and consultation links natively",
    ],
  },
  {
    id: 4,
    title: "AI Design Studio & Style Intelligence",
    duration: "Weeks 17–24",
    color: "#5C1A8E",
    accent: "#C9A0DC",
    icon: "✦",
    summary:
      "Where technology meets tradition. AI that understands Pakistani fashion vocabulary, aesthetics, and cultural context.",
    whyBetter:
      "The original plan says 'integrate GenAI'. That's like saying 'add intelligence'. The real challenge is training AI to understand gota, dabka, tilla, kora work, and the difference between a Hyderabadi khada dupatta and a Punjabi phulkari — and to generate designs that respect these traditions.",
    deliverables: [
      {
        name: "Co-Design with AI Studio",
        details:
          "Upload a base design or start from scratch. Use natural language in English or Urdu: 'Mujhe is design mein maroon color chahiye aur neckline pe heavy zardozi lagao' or 'Make this more suitable for a Walima — lighter embroidery, pastel tones'. AI generates 4 variations in seconds.",
      },
      {
        name: "Style Advisor Engine",
        details:
          "Input: skin undertone (warm/cool/neutral), body measurements, height, event type, budget range, and personal style preferences. Output: curated recommendations with explanations — 'This A-line silhouette with vertical embroidery panels will elongate your frame. The jewel-tone emerald complements warm undertones beautifully.'",
      },
      {
        name: "Trend Forecasting Dashboard",
        details:
          "Internal tool for your design team. AI analyzes Instagram, Pinterest, and bridal expo data to predict upcoming color trends, embroidery styles, and silhouette preferences across Pakistani, Middle Eastern, and UK South Asian markets.",
      },
      {
        name: "Heritage Pattern Library",
        details:
          "A searchable, AI-tagged library of traditional Pakistani embroidery patterns — Sindhi ajrak motifs, Punjabi phulkari patterns, Balochi mirror work, Kashmiri aari work. Designers and clients can browse, remix, and apply these to modern silhouettes.",
      },
    ],
    techDecisions: [
      "Fine-tuned Stable Diffusion XL — trained on Pakistani fashion dataset (your own designs + licensed editorial imagery)",
      "OpenAI GPT-4 / Google Gemini — Style Advisor NLP, trained with custom system prompts on Pakistani fashion terminology",
      "Pinecone vector DB — semantic search across design library ('show me something like heavy Mughal-era jali work but modern')",
      "ComfyUI backend — for controllable AI image generation pipelines (ControlNet for pose, IP-Adapter for style transfer)",
    ],
  },
  {
    id: 5,
    title: "Client Experience & Operations",
    duration: "Weeks 25–30",
    color: "#8B6914",
    accent: "#F2D98B",
    icon: "❖",
    summary:
      "The invisible infrastructure that makes everything feel magical — from the moment someone orders to the moment they unwrap their outfit.",
    whyBetter:
      "The original plan puts CRM in Month 3 as an afterthought. Client experience should be architected from the ground up, not bolted on. Especially for bridal clients spending 200K+ PKR.",
    deliverables: [
      {
        name: "Bridal Journey Command Center",
        details:
          "A dedicated dashboard for bridal clients. Timeline showing: Design Consultation → Sketch Approval → Fabric Selection → Dyeing → Embroidery Progress (with photos!) → Assembly → Fitting Notes → Final QC → Shipping. Real-time updates with craftsperson stories and behind-the-scenes photos.",
      },
      {
        name: "AI Support Agent (Rani Bot)",
        details:
          "Named, branded chatbot with personality. Trained on your complete catalog, policies, and Pakistani fashion knowledge. Handles: order tracking, size questions, fabric care advice, appointment scheduling, and escalation to human designers. Available on web, WhatsApp, and Instagram DMs.",
      },
      {
        name: "Admin Operations Hub",
        details:
          "For your team: order pipeline kanban board (New → In Production → Embroidery → QC → Shipped), inventory management with low-stock alerts, production scheduling with craftsperson assignment, financial dashboards with multi-currency reporting.",
      },
      {
        name: "Loyalty & Referral Engine",
        details:
          "Points system that rewards repeat orders, referrals, and social sharing. VIP tiers with early access to collections, priority production slots, and complimentary alterations. Family group accounts — because Pakistani fashion shopping is a family affair.",
      },
    ],
    techDecisions: [
      "Twilio — SMS/WhatsApp notifications for order milestones in both Urdu and English",
      "Retool or custom Next.js admin — internal operations dashboard",
      "Langchain + RAG pipeline — AI chatbot grounded in your actual product data, policies, and fashion knowledge base",
      "PostHog — privacy-first analytics to understand user behavior across the funnel",
    ],
  },
  {
    id: 6,
    title: "Launch, Scale & Iterate",
    duration: "Weeks 31–36",
    color: "#333333",
    accent: "#E8E8E8",
    icon: "◉",
    summary:
      "Soft launch with your most loyal clients, gather brutal feedback, fix everything, then go loud.",
    whyBetter:
      "The original plan has 1 month for 'beta testing and launch'. That's not enough. A proper launch needs staged rollout, load testing, influencer seeding, and a feedback loop.",
    deliverables: [
      {
        name: "Private Beta (2 weeks)",
        details:
          "Invite 50 loyal clients. Focus testing: AI measurement accuracy (compare AI numbers with actual tailor measurements), payment flow across all gateways, mobile experience on mid-range Android phones (your primary Pakistani audience), and AI design generation quality.",
      },
      {
        name: "Performance Hardening",
        details:
          "Lighthouse audit targeting 90+ scores. Image lazy loading and AVIF/WebP format optimization. Edge caching via Vercel/Cloudflare for fast load times in Karachi, London, Dubai, and New York. AI inference optimization — pre-generate popular design variations, cache frequent style recommendations.",
      },
      {
        name: "Launch Campaign",
        details:
          "Influencer seeding with 10 micro-influencers (50K–200K followers) across Pakistan, UK, and UAE. 'Design Your Dream Outfit with AI' interactive campaign. PR push highlighting the fusion of traditional craftsmanship with cutting-edge AI. Launch event with live AI design demonstrations.",
      },
      {
        name: "Post-Launch Iteration Loop",
        details:
          "Weekly analytics reviews. A/B test product page layouts, AI recommendation algorithms, and checkout flows. Monthly client interviews. Quarterly collection drops with AI-designed capsule collections based on trend data.",
      },
    ],
    techDecisions: [
      "Vercel — deployment with edge functions, preview deployments for staging, and built-in analytics",
      "Sentry — error monitoring and performance tracking across all services",
      "GitHub Actions — CI/CD pipeline with automated testing, linting, and deployment",
      "Terraform — infrastructure as code for reproducible AWS/GCP deployments as you scale",
    ],
  },
];

const critiques = [
  {
    original: "React.js or Next.js for frontend",
    problem: "Vague. These are very different choices with different tradeoffs.",
    better:
      "Next.js 14+ with App Router. SSR for SEO (critical for fashion discovery via Google), server components for performance with heavy imagery, built-in image optimization via next/image, and incremental static regeneration for product pages that update without full rebuilds.",
  },
  {
    original: "Python backend because it integrates with AI",
    problem:
      "Oversimplified. You don't need your entire backend in Python just because you use AI models.",
    better:
      "Next.js API routes for core web backend (auth, cart, orders). Separate Python microservices (FastAPI) ONLY for AI-specific tasks: measurement processing, style recommendations, design generation. This gives you the best of both worlds without forcing Python on your web team.",
  },
  {
    original: "PostgreSQL + MongoDB",
    problem:
      "Running two databases from day one adds complexity without clear justification.",
    better:
      "Start with PostgreSQL via Supabase (handles 90% of your data needs with JSONB columns for semi-structured data). Add MongoDB only when you genuinely need it — likely for the AI design studio's flexible document storage. Don't over-architect on day one.",
  },
  {
    original: "8-month timeline",
    problem:
      "Too aggressive for the scope described, yet paradoxically also has idle months where teams wait for Phase N to finish before starting Phase N+1.",
    better:
      "9-month timeline with parallel workstreams. Design system + branding runs parallel with backend setup. AI measurement integration starts while storefront is in QA. Multiple teams working simultaneously, not sequentially.",
  },
  {
    original: "AI Measurement as a checkout step",
    problem: "Treats the core differentiator as an afterthought.",
    better:
      "AI measurement should be a rich, standalone experience — a 'Digital Fitting Room' that users visit before they even start browsing. Get measured first, then every product they see is already shown in their size with fit predictions.",
  },
];

const budgetTiers = [
  {
    name: "Lean MVP",
    range: "$15K – $30K",
    currency: "PKR 42L – 85L",
    scope:
      "Phases 1-2 only. Beautiful storefront + smart catalog + basic customization. No AI measurement or design studio yet. Use manual measurement input. Launch in 3-4 months.",
    team: "2 developers, 1 designer, part-time PM",
  },
  {
    name: "Full Vision",
    range: "$60K – $120K",
    currency: "PKR 1.7Cr – 3.4Cr",
    scope:
      "All 6 phases. Complete AI measurement, design studio, bridal journey tracker, multi-market payments. 8-9 months to full launch.",
    team: "3-4 developers, 1 designer, 1 AI/ML engineer, PM, QA",
  },
  {
    name: "Premium Scale",
    range: "$150K – $250K+",
    currency: "PKR 4.2Cr – 7Cr+",
    scope:
      "Full vision + native mobile apps (iOS/Android), AR try-on, multi-language support (Urdu, Arabic, English), dedicated AI training on your proprietary designs, and white-glove bridal concierge features.",
    team: "Full product team of 8-12 people",
  },
];

export default function FashionTechBlueprint() {
  const [activePhase, setActivePhase] = useState(0);
  const [activeTab, setActiveTab] = useState("roadmap");
  const [expandedDeliverable, setExpandedDeliverable] = useState<number | null>(
    null
  );

  const phase = phases[activePhase];

  return (
    <div
      style={{
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        background: "#0A0A0A",
        color: "#E8E0D8",
        minHeight: "100vh",
        maxWidth: "100%",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "48px 32px 32px",
          borderBottom: "1px solid rgba(212, 165, 116, 0.2)",
          background:
            "linear-gradient(180deg, rgba(139, 26, 26, 0.15) 0%, transparent 100%)",
        }}
      >
        <div
          style={{
            fontSize: "11px",
            letterSpacing: "4px",
            textTransform: "uppercase",
            color: "#D4A574",
            marginBottom: "12px",
            fontFamily: "'Helvetica Neue', sans-serif",
          }}
        >
          Strategic Blueprint — AI-Powered Fashion Platform
        </div>
        <h1
          style={{
            fontSize: "clamp(28px, 5vw, 42px)",
            fontWeight: 300,
            lineHeight: 1.15,
            margin: 0,
            color: "#F5EDE4",
          }}
        >
          Where Traditional Craftsmanship
          <br />
          <span style={{ color: "#D4A574", fontStyle: "italic" }}>
            Meets Intelligent Technology
          </span>
        </h1>
        <p
          style={{
            fontSize: "15px",
            color: "#9A8E82",
            marginTop: "16px",
            maxWidth: "680px",
            lineHeight: 1.7,
            fontFamily: "'Helvetica Neue', sans-serif",
            fontWeight: 300,
          }}
        >
          A reimagined roadmap that treats your platform as a fashion product —
          not just a software project. Every technical decision serves the
          aesthetic vision. Every feature serves the client experience.
        </p>
      </div>

      {/* Tab Navigation */}
      <div
        style={{
          display: "flex",
          gap: "0",
          borderBottom: "1px solid rgba(212, 165, 116, 0.15)",
          padding: "0 32px",
          fontFamily: "'Helvetica Neue', sans-serif",
        }}
      >
        {[
          { key: "roadmap", label: "Phased Roadmap" },
          { key: "critique", label: "What's Wrong with the Original" },
          { key: "budget", label: "Budget Tiers" },
          { key: "stack", label: "Architecture" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            style={{
              padding: "16px 24px",
              background: "none",
              border: "none",
              borderBottom:
                activeTab === tab.key
                  ? "2px solid #D4A574"
                  : "2px solid transparent",
              color: activeTab === tab.key ? "#D4A574" : "#6B6259",
              fontSize: "12px",
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              cursor: "pointer",
              fontFamily: "inherit",
              transition: "all 0.3s ease",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div style={{ padding: "32px" }}>
        {/* === ROADMAP TAB === */}
        {activeTab === "roadmap" && (
          <div>
            {/* Phase Selector */}
            <div
              style={{
                display: "flex",
                gap: "8px",
                marginBottom: "32px",
                flexWrap: "wrap",
              }}
            >
              {phases.map((p, i) => (
                <button
                  key={p.id}
                  onClick={() => {
                    setActivePhase(i);
                    setExpandedDeliverable(null);
                  }}
                  style={{
                    padding: "10px 16px",
                    background:
                      activePhase === i
                        ? `linear-gradient(135deg, ${p.color}, ${p.color}CC)`
                        : "rgba(255,255,255,0.04)",
                    border:
                      activePhase === i
                        ? `1px solid ${p.accent}`
                        : "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "6px",
                    color: activePhase === i ? "#F5EDE4" : "#7A7068",
                    cursor: "pointer",
                    fontSize: "12px",
                    fontFamily: "'Helvetica Neue', sans-serif",
                    letterSpacing: "0.5px",
                    transition: "all 0.3s ease",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <span style={{ fontSize: "14px" }}>{p.icon}</span>
                  <span>Phase {p.id}</span>
                </button>
              ))}
            </div>

            {/* Active Phase Detail */}
            <div
              style={{
                background: `linear-gradient(135deg, ${phase.color}15, transparent)`,
                border: `1px solid ${phase.accent}30`,
                borderRadius: "12px",
                padding: "32px",
                marginBottom: "24px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  flexWrap: "wrap",
                  gap: "16px",
                  marginBottom: "20px",
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: "11px",
                      letterSpacing: "3px",
                      textTransform: "uppercase",
                      color: phase.accent,
                      marginBottom: "8px",
                      fontFamily: "'Helvetica Neue', sans-serif",
                    }}
                  >
                    Phase {phase.id} — {phase.duration}
                  </div>
                  <h2
                    style={{
                      fontSize: "28px",
                      fontWeight: 400,
                      margin: 0,
                      color: "#F5EDE4",
                    }}
                  >
                    {phase.title}
                  </h2>
                </div>
                <div
                  style={{
                    background: `${phase.accent}15`,
                    border: `1px solid ${phase.accent}30`,
                    borderRadius: "8px",
                    padding: "10px 16px",
                    fontSize: "11px",
                    color: phase.accent,
                    fontFamily: "'Helvetica Neue', sans-serif",
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                  }}
                >
                  {phase.duration}
                </div>
              </div>

              <p
                style={{
                  fontSize: "15px",
                  lineHeight: 1.8,
                  color: "#B8ADA2",
                  marginBottom: "16px",
                  fontFamily: "'Helvetica Neue', sans-serif",
                  fontWeight: 300,
                }}
              >
                {phase.summary}
              </p>

              <div
                style={{
                  background: "rgba(212, 165, 116, 0.08)",
                  borderLeft: "3px solid #D4A574",
                  padding: "12px 16px",
                  borderRadius: "0 6px 6px 0",
                  marginBottom: "24px",
                }}
              >
                <div
                  style={{
                    fontSize: "10px",
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    color: "#D4A574",
                    marginBottom: "4px",
                    fontFamily: "'Helvetica Neue', sans-serif",
                  }}
                >
                  Why this is better
                </div>
                <p
                  style={{
                    fontSize: "13px",
                    color: "#C4B8AB",
                    margin: 0,
                    lineHeight: 1.6,
                    fontFamily: "'Helvetica Neue', sans-serif",
                    fontWeight: 300,
                  }}
                >
                  {phase.whyBetter}
                </p>
              </div>

              {/* Deliverables */}
              <div style={{ marginBottom: "24px" }}>
                <div
                  style={{
                    fontSize: "10px",
                    letterSpacing: "2.5px",
                    textTransform: "uppercase",
                    color: "#7A7068",
                    marginBottom: "12px",
                    fontFamily: "'Helvetica Neue', sans-serif",
                  }}
                >
                  Key Deliverables
                </div>
                {phase.deliverables.map((d, i) => (
                  <div
                    key={i}
                    onClick={() =>
                      setExpandedDeliverable(
                        expandedDeliverable === i ? null : i
                      )
                    }
                    style={{
                      background:
                        expandedDeliverable === i
                          ? "rgba(255,255,255,0.06)"
                          : "rgba(255,255,255,0.02)",
                      border: "1px solid rgba(255,255,255,0.06)",
                      borderRadius: "8px",
                      padding: "14px 18px",
                      marginBottom: "8px",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "14px",
                          color: "#E8E0D8",
                          fontWeight: 500,
                        }}
                      >
                        {d.name}
                      </span>
                      <span
                        style={{
                          color: phase.accent,
                          fontSize: "16px",
                          transition: "transform 0.3s ease",
                          transform:
                            expandedDeliverable === i
                              ? "rotate(45deg)"
                              : "rotate(0deg)",
                        }}
                      >
                        +
                      </span>
                    </div>
                    {expandedDeliverable === i && (
                      <p
                        style={{
                          fontSize: "13px",
                          color: "#9A8E82",
                          marginTop: "10px",
                          marginBottom: 0,
                          lineHeight: 1.7,
                          fontFamily: "'Helvetica Neue', sans-serif",
                          fontWeight: 300,
                        }}
                      >
                        {d.details}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {/* Tech Stack */}
              <div>
                <div
                  style={{
                    fontSize: "10px",
                    letterSpacing: "2.5px",
                    textTransform: "uppercase",
                    color: "#7A7068",
                    marginBottom: "12px",
                    fontFamily: "'Helvetica Neue', sans-serif",
                  }}
                >
                  Technical Decisions
                </div>
                <div
                  style={{
                    display: "grid",
                    gap: "6px",
                  }}
                >
                  {phase.techDecisions.map((tech, i) => (
                    <div
                      key={i}
                      style={{
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.05)",
                        borderRadius: "6px",
                        padding: "10px 14px",
                        fontSize: "12px",
                        color: "#A89E92",
                        fontFamily: "'SF Mono', 'Fira Code', monospace",
                        lineHeight: 1.5,
                      }}
                    >
                      <span
                        style={{ color: phase.accent, marginRight: "8px" }}
                      >
                        →
                      </span>
                      {tech}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Timeline Overview */}
            <div
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: "12px",
                padding: "24px",
              }}
            >
              <div
                style={{
                  fontSize: "10px",
                  letterSpacing: "2.5px",
                  textTransform: "uppercase",
                  color: "#7A7068",
                  marginBottom: "16px",
                  fontFamily: "'Helvetica Neue', sans-serif",
                }}
              >
                Full Timeline — 36 Weeks / ~9 Months
              </div>
              <div style={{ display: "grid", gap: "4px" }}>
                {phases.map((p, i) => {
                  const widths = [11, 17, 17, 22, 17, 17];
                  return (
                    <div
                      key={p.id}
                      onClick={() => {
                        setActivePhase(i);
                        setExpandedDeliverable(null);
                      }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        cursor: "pointer",
                        padding: "6px 0",
                      }}
                    >
                      <div
                        style={{
                          width: "80px",
                          fontSize: "10px",
                          color: "#6B6259",
                          fontFamily: "'Helvetica Neue', sans-serif",
                          letterSpacing: "0.5px",
                          flexShrink: 0,
                        }}
                      >
                        {p.duration}
                      </div>
                      <div
                        style={{
                          flex: 1,
                          height: "28px",
                          background: "rgba(255,255,255,0.03)",
                          borderRadius: "4px",
                          overflow: "hidden",
                          position: "relative",
                        }}
                      >
                        <div
                          style={{
                            width: `${widths[i]}%`,
                            height: "100%",
                            background: `linear-gradient(90deg, ${p.color}, ${p.color}88)`,
                            borderRadius: "4px",
                            display: "flex",
                            alignItems: "center",
                            paddingLeft: "10px",
                            fontSize: "10px",
                            color: p.accent,
                            fontFamily: "'Helvetica Neue', sans-serif",
                            letterSpacing: "0.5px",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {p.icon} {p.title}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* === CRITIQUE TAB === */}
        {activeTab === "critique" && (
          <div>
            <h2
              style={{
                fontSize: "24px",
                fontWeight: 300,
                color: "#F5EDE4",
                marginBottom: "8px",
              }}
            >
              What&apos;s Wrong with the Original Plan
            </h2>
            <p
              style={{
                fontSize: "14px",
                color: "#7A7068",
                marginBottom: "32px",
                fontFamily: "'Helvetica Neue', sans-serif",
                fontWeight: 300,
              }}
            >
              Five critical improvements, not just nitpicks.
            </p>
            <div style={{ display: "grid", gap: "16px" }}>
              {critiques.map((c, i) => (
                <div
                  key={i}
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    borderRadius: "10px",
                    padding: "24px",
                    display: "grid",
                    gap: "16px",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: "10px",
                        letterSpacing: "2px",
                        textTransform: "uppercase",
                        color: "#6B6259",
                        marginBottom: "6px",
                        fontFamily: "'Helvetica Neue', sans-serif",
                      }}
                    >
                      Original says
                    </div>
                    <div
                      style={{
                        fontSize: "14px",
                        color: "#8B6B5A",
                        fontStyle: "italic",
                      }}
                    >
                      &ldquo;{c.original}&rdquo;
                    </div>
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: "10px",
                        letterSpacing: "2px",
                        textTransform: "uppercase",
                        color: "#8B1A1A",
                        marginBottom: "6px",
                        fontFamily: "'Helvetica Neue', sans-serif",
                      }}
                    >
                      The Problem
                    </div>
                    <div
                      style={{
                        fontSize: "13px",
                        color: "#C4736A",
                        lineHeight: 1.6,
                        fontFamily: "'Helvetica Neue', sans-serif",
                        fontWeight: 300,
                      }}
                    >
                      {c.problem}
                    </div>
                  </div>
                  <div
                    style={{
                      background: "rgba(45, 80, 22, 0.1)",
                      borderLeft: "3px solid #A8D08D",
                      padding: "12px 16px",
                      borderRadius: "0 6px 6px 0",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "10px",
                        letterSpacing: "2px",
                        textTransform: "uppercase",
                        color: "#A8D08D",
                        marginBottom: "6px",
                        fontFamily: "'Helvetica Neue', sans-serif",
                      }}
                    >
                      Better Approach
                    </div>
                    <div
                      style={{
                        fontSize: "13px",
                        color: "#B8C8A8",
                        lineHeight: 1.7,
                        fontFamily: "'Helvetica Neue', sans-serif",
                        fontWeight: 300,
                      }}
                    >
                      {c.better}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* === BUDGET TAB === */}
        {activeTab === "budget" && (
          <div>
            <h2
              style={{
                fontSize: "24px",
                fontWeight: 300,
                color: "#F5EDE4",
                marginBottom: "8px",
              }}
            >
              Realistic Budget Tiers
            </h2>
            <p
              style={{
                fontSize: "14px",
                color: "#7A7068",
                marginBottom: "32px",
                fontFamily: "'Helvetica Neue', sans-serif",
                fontWeight: 300,
              }}
            >
              The original plan has no budget guidance. Here&apos;s what this
              actually costs.
            </p>
            <div style={{ display: "grid", gap: "16px" }}>
              {budgetTiers.map((tier, i) => (
                <div
                  key={i}
                  style={{
                    background:
                      i === 1
                        ? "linear-gradient(135deg, rgba(139, 26, 26, 0.12), rgba(212, 165, 116, 0.08))"
                        : "rgba(255,255,255,0.02)",
                    border:
                      i === 1
                        ? "1px solid rgba(212, 165, 116, 0.3)"
                        : "1px solid rgba(255,255,255,0.06)",
                    borderRadius: "12px",
                    padding: "28px",
                  }}
                >
                  {i === 1 && (
                    <div
                      style={{
                        fontSize: "9px",
                        letterSpacing: "3px",
                        textTransform: "uppercase",
                        color: "#D4A574",
                        marginBottom: "12px",
                        fontFamily: "'Helvetica Neue', sans-serif",
                      }}
                    >
                      ★ Recommended
                    </div>
                  )}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      flexWrap: "wrap",
                      gap: "12px",
                      marginBottom: "12px",
                    }}
                  >
                    <h3
                      style={{
                        fontSize: "22px",
                        fontWeight: 400,
                        color: "#F5EDE4",
                        margin: 0,
                      }}
                    >
                      {tier.name}
                    </h3>
                    <div style={{ textAlign: "right" }}>
                      <div
                        style={{
                          fontSize: "18px",
                          color: "#D4A574",
                          fontWeight: 500,
                        }}
                      >
                        {tier.range}
                      </div>
                      <div
                        style={{
                          fontSize: "12px",
                          color: "#7A7068",
                          fontFamily: "'Helvetica Neue', sans-serif",
                        }}
                      >
                        {tier.currency}
                      </div>
                    </div>
                  </div>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "#9A8E82",
                      lineHeight: 1.7,
                      marginBottom: "12px",
                      fontFamily: "'Helvetica Neue', sans-serif",
                      fontWeight: 300,
                    }}
                  >
                    {tier.scope}
                  </p>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "#6B6259",
                      fontFamily: "'SF Mono', monospace",
                    }}
                  >
                    Team: {tier.team}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* === ARCHITECTURE TAB === */}
        {activeTab === "stack" && (
          <div>
            <h2
              style={{
                fontSize: "24px",
                fontWeight: 300,
                color: "#F5EDE4",
                marginBottom: "8px",
              }}
            >
              System Architecture
            </h2>
            <p
              style={{
                fontSize: "14px",
                color: "#7A7068",
                marginBottom: "32px",
                fontFamily: "'Helvetica Neue', sans-serif",
                fontWeight: 300,
              }}
            >
              A polyglot architecture — right tool for each job, not one
              language for everything.
            </p>

            {[
              {
                layer: "Frontend",
                color: "#1A3C5E",
                items: [
                  {
                    tech: "Next.js 14+",
                    role: "App shell, SSR, routing, API routes",
                  },
                  {
                    tech: "Tailwind CSS",
                    role: "Utility styling with custom design tokens",
                  },
                  {
                    tech: "Framer Motion",
                    role: "Page transitions, product reveals, scroll animations",
                  },
                  {
                    tech: "React Three Fiber",
                    role: "3D dress configurator, body model visualization",
                  },
                  {
                    tech: "Cloudinary SDK",
                    role: "Image CDN, on-the-fly transforms, zoom, color swap",
                  },
                ],
              },
              {
                layer: "Backend Services",
                color: "#2D5016",
                items: [
                  {
                    tech: "Next.js API Routes",
                    role: "Auth, cart, checkout, order management, CRM",
                  },
                  {
                    tech: "FastAPI (Python)",
                    role: "AI microservices — measurement, style advisor, design gen",
                  },
                  {
                    tech: "Langchain + RAG",
                    role: "AI chatbot grounded in your catalog and policies",
                  },
                  {
                    tech: "ComfyUI Server",
                    role: "Stable Diffusion pipelines for AI design generation",
                  },
                ],
              },
              {
                layer: "Data Layer",
                color: "#5C1A8E",
                items: [
                  {
                    tech: "Supabase (PostgreSQL)",
                    role: "Users, orders, inventory, payments, CRM — with real-time subscriptions",
                  },
                  {
                    tech: "Pinecone",
                    role: "Vector embeddings for semantic design search",
                  },
                  {
                    tech: "Redis (Upstash)",
                    role: "Session cache, rate limiting, AI response caching",
                  },
                  {
                    tech: "Cloudinary",
                    role: "Image & video storage with automatic optimization",
                  },
                ],
              },
              {
                layer: "External Integrations",
                color: "#8B6914",
                items: [
                  {
                    tech: "3DLOOK / Mirrorsize",
                    role: "Camera-based body measurement SDK",
                  },
                  {
                    tech: "Stripe + JazzCash/EasyPaisa",
                    role: "Multi-currency payments (PKR, GBP, USD, AED)",
                  },
                  {
                    tech: "Twilio / WhatsApp Business",
                    role: "Order notifications, measurement sharing",
                  },
                  {
                    tech: "OpenAI / Gemini API",
                    role: "Style advisor NLP, fashion terminology understanding",
                  },
                  {
                    tech: "Algolia",
                    role: "Instant product search with Urdu support & visual search",
                  },
                ],
              },
              {
                layer: "Infrastructure",
                color: "#333333",
                items: [
                  {
                    tech: "Vercel",
                    role: "Frontend hosting, edge functions, preview deploys",
                  },
                  {
                    tech: "AWS / GCP",
                    role: "AI model hosting (GPU instances), heavy compute",
                  },
                  { tech: "GitHub Actions", role: "CI/CD pipeline" },
                  {
                    tech: "Sentry + PostHog",
                    role: "Error monitoring + privacy-first analytics",
                  },
                ],
              },
            ].map((layer, li) => (
              <div
                key={li}
                style={{
                  marginBottom: "20px",
                  background: `linear-gradient(135deg, ${layer.color}12, transparent)`,
                  border: `1px solid ${layer.color}40`,
                  borderRadius: "10px",
                  padding: "20px",
                }}
              >
                <div
                  style={{
                    fontSize: "10px",
                    letterSpacing: "3px",
                    textTransform: "uppercase",
                    color: "#7A7068",
                    marginBottom: "12px",
                    fontFamily: "'Helvetica Neue', sans-serif",
                  }}
                >
                  {layer.layer}
                </div>
                <div style={{ display: "grid", gap: "6px" }}>
                  {layer.items.map((item, ii) => (
                    <div
                      key={ii}
                      style={{
                        display: "flex",
                        gap: "12px",
                        alignItems: "baseline",
                        padding: "6px 0",
                        borderBottom:
                          ii < layer.items.length - 1
                            ? "1px solid rgba(255,255,255,0.04)"
                            : "none",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "13px",
                          color: "#D4A574",
                          fontFamily: "'SF Mono', monospace",
                          minWidth: "180px",
                          flexShrink: 0,
                        }}
                      >
                        {item.tech}
                      </span>
                      <span
                        style={{
                          fontSize: "12px",
                          color: "#8A7E72",
                          fontFamily: "'Helvetica Neue', sans-serif",
                          fontWeight: 300,
                        }}
                      >
                        {item.role}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div
        style={{
          padding: "24px 32px 40px",
          borderTop: "1px solid rgba(212, 165, 116, 0.1)",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontSize: "12px",
            color: "#4A4238",
            fontFamily: "'Helvetica Neue', sans-serif",
            fontWeight: 300,
          }}
        >
          This blueprint replaces the generic document. Each phase is
          actionable, each tech decision is justified, and the whole plan is
          built around how Pakistani fashion actually works — not how Silicon
          Valley thinks e-commerce should work.
        </p>
      </div>
    </div>
  );
}
