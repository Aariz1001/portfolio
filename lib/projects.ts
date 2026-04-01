export type ProjectTag = string;

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  longDescription: string;
  tags: ProjectTag[];
  github?: string;
  demo?: string;
  type: "mobile" | "cli" | "web" | "library" | "platform";
  featured: boolean;
  screenshots?: string[];   // paths under /public
  color: string;            // accent gradient colour
}

export const projects: Project[] = [
  {
    id: "flexidiet",
    title: "FlexiDiet",
    tagline: "AI nutrition coach — shipped, monetised iOS & Android app",
    description:
      "Third-generation AI nutrition app. Conversational food logging, camera-based meal recognition, and a weekly AI-generated audio podcast built from your personal nutrition data.",
    longDescription: `FlexiDiet is a production iOS and Android app at v2.4.3. It replaces calorie-counting with conversational AI — tell it what you ate in plain English, snap a photo, or ask it to plan a week of meals.

The standout feature is AI Progress Meetings: a fully automated 5–10 minute audio podcast generated weekly from your nutrition data. Two AI agents debate your wins and challenges — no user input required, data in → audio out.

Built with Flutter for the frontend, Firebase Cloud Functions for the AI layer, LangChain + Gemini Flash for tool-calling and RAG meal planning over a 145+ recipe corpus, and RevenueCat for subscriptions.`,
    tags: ["Flutter", "Firebase", "LangChain", "Gemini", "RAG", "iOS", "Android", "RevenueCat"],
    github: "https://github.com/Aariz1001/FlexiDiet-Public",
    type: "mobile",
    featured: true,
    screenshots: [
      "/screenshots/flexidiet/home.png",
      "/screenshots/flexidiet/chat.png",
      "/screenshots/flexidiet/plan.png",
      "/screenshots/flexidiet/podcast.png",
      "/screenshots/flexidiet/camera.png",
      "/screenshots/flexidiet/progress.png",
    ],
    color: "#22c55e",
  },
  {
    id: "job-outreach",
    title: "Job Outreach",
    tagline: "Autonomous AI pipeline — finds companies, tailors your CV, writes cold emails",
    description:
      "Crawls 120+ companies across YC, HN, Wellfound and more. Embeds your CV and scores every company by fit. Surgically edits your DOCX CV per target. Drafts humanised emails with Gmail compose links.",
    longDescription: `Built to solve the problem of finding the right jobs to apply to. The pipeline runs entirely locally — crawl, score, research, tailor, draft, send.

Discovery: multi-source crawler (YC API, HN Who's Hiring, RemoteOK, Wellfound, Sifted) builds a company cache incrementally.

Matching: CV and company descriptions are embedded with Gemini and ranked by cosine similarity.

CV Specialisation: an LLM audits the DOCX and makes up to 10 surgical text substitutions — character growth capped at 8% to guarantee it stays one page.

Email drafting: humanise rules prevent AI-sounding output — banned vocabulary list, no markdown, post-processing regex strip.

This site was found using this tool.`,
    tags: ["Python", "LangChain", "CrewAI", "OpenRouter", "Gemini", "Click", "DOCX"],
    github: "https://github.com/Aariz1001/job-outreach",
    type: "cli",
    featured: true,
    color: "#7c6aff",
  },
  {
    id: "voxguard",
    title: "VoxGuard",
    tagline: "Sub-200ms voice intent classifier for live AI systems",
    description:
      "Distinguishes backchannels (\"uh-huh\", \"ok\") from genuine interruptions in real-time. Tiered pipeline: rule-based → timing → acoustic energy → LLM fallback.",
    longDescription: `The problem: when an AI is speaking and the user says something, current systems either ignore it or stop on any sound. VoxGuard solves this with a tiered classification engine.

Tier 1 — Rule-based (~5ms): 50+ backchannel tokens across 10 languages.
Tier 2 — Continuation timing (~1.5s): detects if user keeps speaking.
Tier 3 — Energy analysis: RMS, peak amplitude, zero-crossing rate, energy slope.
Tier 4 — LLM fallback: ambiguous cases sent to Gemini 2.5 Flash Lite for contextual judgment.
Tier 5 — Timeout: defaults to backchannel after 3s max window.

Ships with an Electron demo app with full Gemini Live integration. Per-user adaptive profiles learn individual speech patterns over sessions.`,
    tags: ["TypeScript", "Electron", "Gemini Live", "WebSockets", "Audio DSP"],
    github: "https://github.com/Aariz1001/VoxGuard",
    type: "platform",
    featured: true,
    color: "#f59e0b",
  },
  {
    id: "voice-ai-agent",
    title: "Voice AI Agent Platform",
    tagline: "Multi-tenant SaaS — businesses get a managed AI phone agent via Twilio",
    description:
      "Businesses subscribe and get a fully managed AI voice agent — no infrastructure, no API keys, no token tracking. Real-time audio bridging between Twilio PSTN and Gemini Live API.",
    longDescription: `A production-grade multi-tenant voice AI platform. Businesses onboard to the platform and receive a dedicated phone number backed by a configurable AI agent — they never touch infrastructure.

Architecture: incoming call → Twilio webhook → Node.js bridge server → dual WebSocket (Twilio ↔ Gemini Live). A transcoder handles mulaw 8kHz ↔ PCM 16kHz/24kHz conversion in real time.

Each tenant has isolated Firestore documents for agents, calls, and usage. Tenants configure their agent's persona, knowledge base, and webhook tool calls from a dashboard.

Call transcript, AI summary, and usage metrics are saved automatically at end of call.`,
    tags: ["TypeScript", "Node.js", "Gemini Live", "Twilio", "Firebase", "Firestore", "Docker"],
    type: "platform",
    featured: true,
    color: "#ec4899",
  },
  {
    id: "agentforge",
    title: "AgentForge",
    tagline: "Autonomous CLI agent that generates its own tools and evolves its own architecture",
    description:
      "Beyond task execution — AgentForge can audit its own codebase, propose architectural improvements, generate new tools from natural language, and implement approved changes directly.",
    longDescription: `AgentForge is a TypeScript/Node.js CLI agent built on OpenRouter and GitHub Copilot (300+ model support).

Key capabilities:
- ToolForge: generates new tools from natural language descriptions and registers them for immediate use.
- ComponentForge: audits core services (Memory, Middleware, Swarm Orchestration), proposes improvements with technical justification, and implements approved changes — a self-improving loop.
- Three-tier hierarchical memory: Working → Episodic → Semantic, with vector similarity search for cross-session analogical reasoning and background consolidation jobs.
- Multi-agent swarms for parallel sub-task execution.
- Virtual Phone Controller toolkit: ADB-based Android device automation, emulator boot, APK installation, UI automation.`,
    tags: ["TypeScript", "Node.js", "OpenRouter", "GitHub Copilot", "Vector Search"],
    github: "https://github.com/Aariz1001/AgentForge",
    type: "cli",
    featured: false,
    color: "#06b6d4",
  },
  {
    id: "fusionrag",
    title: "FusionRAG",
    tagline: "60% retrieval accuracy improvement over baseline RAG",
    description:
      "Advanced RAG chatbot using query fusion, hybrid search (vector + BM25), and cross-encoder reranking. Supports local Ollama models and 400+ cloud models via OpenRouter.",
    longDescription: `FusionRAG was built to push past the ceiling of naive RAG implementations.

Techniques applied:
- Query Fusion: expands each user query into multiple related queries before retrieval, capturing different facets of the information need.
- Hybrid Retrieval: combines dense vector search (semantic) with BM25 keyword search for complementary recall.
- Reranking: cross-encoder models rescore the retrieved chunk pool for final relevance ordering.
- Prompt Engineering: structured prompts constrain the LLM to cite retrieved context and surface uncertainty.

Measured 60% improvement in document retrieval accuracy over a naive single-query vector-only baseline. Ships with a Streamlit UI, real-time token counting, and cost tracking across providers.`,
    tags: ["Python", "LlamaIndex", "Ollama", "OpenRouter", "Streamlit", "BM25"],
    github: "https://github.com/Aariz1001/FusionRAG",
    type: "web",
    featured: false,
    color: "#10b981",
  },
  {
    id: "predictive-intent",
    title: "Predictive Intent",
    tagline: "Runtime safety primitive — AI agents declare and verify tool outcomes before execution",
    description:
      "Enforced transactional semantics for AI agent tool calls. Agents must predict expected outcomes and prove they occurred. Immutable audit trail. Framework-agnostic.",
    longDescription: `Predictive Intent is a safety layer that sits between an AI agent and its tools.

Instead of blind execution, every tool call goes through a four-stage protocol:
1. Stage — agent declares intended tool, args, expected outcome delta, and verification checks.
2. Verify — pre-flight checks run before execution (schema validation, impact assessment).
3. Execute — tool call fires.
4. Commit — post-execution checks confirm the declared outcome was achieved.

If any check fails, the transaction rolls back and the failure is recorded in an immutable ledger.

Works with LangChain, LangGraph, AutoGen, CrewAI, LlamaIndex, or any agent framework. Impact-based automatic safety gating (reversible → irreversible → destructive).`,
    tags: ["Python", "LangChain", "CrewAI", "LangGraph", "Agent Safety"],
    github: "https://github.com/Aariz1001/Predictive-Intent",
    type: "library",
    featured: false,
    color: "#ef4444",
  },
  {
    id: "intellicv",
    title: "IntelliCV",
    tagline: "AI CV builder — JSON to ATS-optimised DOCX with GitHub README ingestion",
    description:
      "Upload your CV as JSON, select GitHub repos, get a one-page ATS-optimised Word document tailored per job. Page-aware content reduction, change tracking, business-impact translation.",
    longDescription: `IntelliCV treats your CV as structured data rather than a document. You maintain a JSON file representing your career history, then the tool tailors it per application.

Key features:
- GitHub integration: pulls READMEs from public and private repos and uses them as additional context for the AI tailoring pass.
- Page-aware reduction: automatically fits content to a 1, 2, or 3 page constraint while preserving quality, not just truncating.
- Real-world impact translation: converts technical achievement bullets into business-oriented language for non-technical hiring managers.
- Change tracking: shows exactly what changed and why, with the ability to steer the AI in a different direction.
- ATS keyword injection: analyses job description keywords and weaves them into bullets without fabricating experience.`,
    tags: ["Python", "OpenRouter", "Gemini", "python-docx", "ATS"],
    github: "https://github.com/Aariz1001/IntelliCV",
    type: "cli",
    featured: false,
    color: "#8b5cf6",
  },
  {
    id: "chesster",
    title: "Chesster",
    tagline: "AI chess competition platform — LLM models battle with ELO ratings",
    description:
      "Watch AI models play chess against each other. Full ELO rating system, live board visualisation, game replay with move trails, and chaos mode where models attempt illegal moves.",
    longDescription: `Chesster is a tournament platform for LLM chess agents. The interesting question isn't who wins — it's what you learn about model behaviour under constrained, adversarial conditions.

Features:
- ELO rating system with persistent storage across sessions.
- Live SVG board with real-time move visualisation.
- Replay system: jump to any position, view per-move AI reasoning, see move trails.
- DGAF Chaos Mode: models attempt illegal moves; the system handles gracefully and logs the reasoning. Good for probing model behaviour at rule boundaries.
- Multi-provider support: OpenRouter, OpenAI, or any OpenAI-compatible API.`,
    tags: ["Python", "OpenRouter", "Chess Engine", "ELO", "SVG"],
    github: "https://github.com/Aariz1001/Chesster",
    type: "cli",
    featured: false,
    color: "#f97316",
  },
];

export const skills = [
  {
    category: "AI & LLM",
    items: ["LangChain", "CrewAI", "LlamaIndex", "OpenRouter", "Gemini", "RAG", "Agent Orchestration", "Prompt Engineering"],
  },
  {
    category: "Languages",
    items: ["Python", "TypeScript", "Dart", "SQL"],
  },
  {
    category: "Cloud & Infra",
    items: ["GCP", "Firebase", "Firestore", "Cloud Functions", "Docker", "Twilio"],
  },
  {
    category: "Mobile & Web",
    items: ["Flutter", "Next.js", "React", "Electron", "Streamlit"],
  },
];
