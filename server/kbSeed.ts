/* ================================
  TL;DR  -->  COMPANY CONTEXT SIM

      - what we'll use in RAG for MVP
      - each entry becomes 1+ vector chunks in pinecone after chunking
      - TASK  -->  replace the array with generated JSON converted into these objects with 4 properties
================================ */


import type { KbEntry } from "../types";


export const kbSeed: KbEntry[] = [
    // admin tasks / descision style entries
    {
        id: "kb-project-atlas",
        title: "Project Atlas (proposed) - franchise reboot strategy",
        text:
            "Project Atlas is a proposed reboot of the 'Star Harbor' franchise. " +
            "Goal: reintroduce the IP to 18–34 audiences with a tighter canon, shorter seasons, and stronger character arcs. " +
            "Key risks: reboot fatigue, canon backlash, and high VFX costs. " +
            "Proposed mitigation: release a 90-minute animated prologue to reset lore, then launch an 8-episode live-action season. " +
            "Success metric: 30-day completion rate above 55% and subscriber retention lift of 2% in the launch quarter.",
        tags: ["project", "strategy", "franchise"],
    },
    {
        id: "kb-project-saffron",
        title: "Project Saffron (current) - mid-budget originals pipeline",
        text:
            "Project Saffron is the current mid-budget originals pipeline focused on thriller and sci-fi films. " +
            "Budget band: $12M–$25M per title. " +
            "Decision rule: greenlight only if we can secure either (a) a recognizable lead actor, or (b) a director with a prior festival award. " +
            "Marketing approach: TikTok-first teaser testing, with trailers iterated weekly based on engagement rate and watch-through. " +
            "Operational constraint: post-production vendors are overbooked in Q2, so we must avoid overlapping releases that compete for the same finishing houses.",
        tags: ["project", "operations", "marketing"],
    },
    {
        id: "kb-competitor-lumina",
        title: "Competitor Brief - Lumina Studios",
        text:
            "Lumina Studios is a direct competitor with a reputation for prestige dramas. " +
            "They are aggressively pursuing international co-productions to reduce risk and improve distribution. " +
            "Weakness: their slate is slow to adapt to fast-moving social trends, leading to late marketing pivots. " +
            "Opportunity for us: out-execute them with faster concept-to-trailer iteration and tighter release windows for topical content.",
        tags: ["competitor", "analysis"],
    },
    {
        id: "kb-policy-brand",
        title: "Brand Policy - tone, rating, and content guardrails",
        text:
            "Brand guardrails: we avoid extreme tonal whiplash within a franchise and we maintain consistent rating expectations. " +
            "R-rating is permitted for stand-alone originals, but franchise tentpoles should be PG-13 unless there is a clear revenue upside. " +
            "We avoid storylines that require extensive retcons across prior seasons. " +
            "When continuity conflicts arise, the policy is to prioritize the most recently released canon as the primary reference.",
        tags: ["policy", "brand"],
    },

    
    // movie data style entries  -->  useful for retrieval when users mention specific titles
    {
        id: "kb-movie-echolane",
        title: "Movie - Echo Lane (2023)",
        text:
            "Echo Lane (2023) is a sci-fi thriller about a sound engineer who discovers audio artifacts that predict accidents. " +
            "Core themes: obsession, surveillance, and ethical tradeoffs in predictive systems. " +
            "Audience: 18–34 thriller fans, strong overlap with tech-adjacent viewers. " +
            "Sequel viability: moderate, best as anthology rather than direct continuation.",
        tags: ["movie", "thriller", "sci-fi"],
    },
    {
        id: "kb-movie-ironvow",
        title: "Movie - Iron Vow (2021)",
        text:
            "Iron Vow (2021) is a character-driven sports drama about a washed-up coach rebuilding a community team. " +
            "Performance note: high completion rate but limited rewatch; strongest retention came from post-release interviews and short clips. " +
            "Award trajectory: regional critics recognition, not a major festival breakout.",
        tags: ["movie", "drama", "sports"],
    },
];
