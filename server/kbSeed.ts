/* ================================
  TL;DR  -->  COMPANY CONTEXT SIM

      - what we'll use in RAG for MVP
      - each entry becomes 1+ vector chunks in pinecone after chunking
      - TASK  -->  replace the array with generated JSON converted into these objects with 4 properties
================================ */


import type { KbEntry } from "../types";


export const kbSeed: KbEntry[] = [
  // Knowledge base seed for our example company, Aurora Creative, an advertising agency. 
  // The information below contains pertinent details about 17 advertising campaign projects,
  //  important details about the company history, company-wide inititiatives, and their clients.
  {
    id: "kb-campaign-orbit",
    title: "Campaign Orbit (current) - global brand repositioning",
    text:
      "Client: Novatek Consumer Electronics (legacy brand; retail + DTC). " +
      "Client contacts: Maya Chen (VP Brand, maya.chen@novatek.example), Ben Arroyo (Director, Global Media, ben.arroyo@novatek.example). " +
      "Agency lead: Priya Nair (Account Director, priyanair@auroracreative.example). " +
      "Budget: $4.8M total (Strategy $420K; Creative Dev $980K; Production $1.75M; Media $1.55M; Research/Tracking $100K). " +
      "Timeline: 14 weeks (W1–3 research + segmentation; W4–6 creative territories; W7–10 production; W11–14 phased launch across NA/EU). " +
      "Primary goal: modernize perception among 18–35 while maintaining trust with 35–55 core buyers. " +
      "Target: lift unaided awareness +8 pts in Q2 tracker and increase DTC conversion rate from 2.1% → 2.6% during launch window. " +
      "Key deliverables: brand narrative + messaging house, updated visual system (type + color + imagery rules), 30s/15s hero films, cutdowns, paid social toolkit, retailer co-op assets, and a launch landing page with interactive product finder. " +
      "Channels: YouTube/CTV, paid social (TikTok/IG), display, retail media (Amazon + big box), PR-assisted influencer seeding. " +
      "Risks: 'tech-skeptic' backlash to modernization; multi-market legal claims review; production overages due to product availability. " +
      "Mitigation: two creative territories tested via concept + animatic; legal early-review gates; backup product units pre-shipped to studio. " +
      "Current status: concept testing complete (Territory A outperformed by +19% message clarity); production booked; media plan locked pending EU cookie consent requirements. " +
      "Next steps: finalize scripts (Jan 29), casting (Feb 2), first edit review (Feb 16).",
    tags: [
      "type:campaign",
      "campaign:Orbit",
      "client:Novatek",
      "contact:Maya-Chen",
      "contact:Ben-Arroyo",
      "dept:Brand-Strategy",
      "dept:Creative",
      "dept:Production",
      "dept:Media",
      "dept:Analytics",
      "status:current",
    ],
  },
  {
    id: "kb-campaign-nimbus",
    title: "Campaign Nimbus (current) - B2B SaaS product launch",
    text:
      "Client: CloudFleet (B2B SaaS; workflow automation for mid-market ops teams). " +
      "Client contacts: Jordan Patel (CMO, jordan.patel@cloudfleet.example), Alina Ro (PMM Lead, alina.ro@cloudfleet.example). " +
      "Agency contacts: Sam Kline (Growth Lead, samkline@auroracreative.example), Elena Ortiz (Copy Director, elena.ortiz@auroracreative.example). " +
      "Budget: $1.6M (Creative $320K; Web/Landing $180K; Video $240K; Paid Media $780K; Analytics/Attribution $80K). " +
      "Launch date: March 4 (public); soft-launch paid tests begin Feb 10. " +
      "Goal: generate 1,200 MQLs in 90 days with a CAC target ≤ $420 and demo-to-opportunity rate ≥ 18%. " +
      "Audience: Operations Directors + RevOps Managers at 200–2,000 employee companies; pain points: tool sprawl, manual handoffs, slow reporting. " +
      "Key deliverables: messaging framework, 3 landing pages (Ops, IT, Finance), webinar kit, product demo script, paid search + LinkedIn ad sets, sales enablement one-pagers, and a case-study template. " +
      "Measurement: HubSpot lifecycle stages + multi-touch attribution; weekly cohort readout (MQL → SQL → opp). " +
      "Dependencies: product packaging and pricing finalization; security/compliance page updates; customer logo approvals. " +
      "Current status: creative in sprint 2 of 4; paid search keywords mapped; landing page wireframes approved; waiting on pricing deck to finalize value prop. " +
      "Risks: long sales cycle makes early ROI noisy; brand awareness currently low; high CPCs in category. " +
      "Mitigation: focus on high-intent search + retargeting; 'problem-first' creative angle; gated webinar to accelerate nurture.",
    tags: [
      "type:campaign",
      "campaign:Nimbus",
      "client:CloudFleet",
      "contact:Jordan-Patel",
      "contact:Alina-Ro",
      "dept:Growth",
      "dept:UX-Copy",
      "dept:Web",
      "dept:Performance-Media",
      "dept:Analytics",
      "status:current",
    ],
  },
  {
    id: "kb-campaign-halo",
    title: "Campaign Halo (proposed) - nonprofit awareness initiative",
    text:
      "Client: BrightSteps Foundation (national nonprofit; youth education + mentorship). " +
      "Client contacts: Renee Park (Executive Director, renee.park@brightsteps.example), Malik Jones (Comms Manager, malik.jones@brightsteps.example). " +
      "Agency contact: Tessa Waller (Nonprofit Partnerships, tessa.waller@auroracreative.example). " +
      "Budget: $850K projected (Creative $260K; Production $240K; Media $250K; Experiential $60K; Research $40K) plus $400K estimated in-kind media. " +
      "Goal: +15% unaided awareness YoY and +25% volunteer signups during back-to-school season. " +
      "Key message: 'Mentorship changes outcomes—one hour a week.' " +
      "Audience segments: (1) potential volunteers 25–45; (2) corporate CSR leads; (3) small recurring donors. " +
      "Deliverables: 60s hero film + cutdowns, UGC-style testimonial series, influencer partnerships (education creators), a microsite with 'find a local chapter' tool, and a corporate sponsorship deck. " +
      "Guardrails: strictly non-partisan language; privacy protections for minors; release forms + approvals required. " +
      "Risks: limited paid budget; approval bottlenecks; safeguarding concerns. " +
      "Mitigation: lean into earned media + partner org amplification; establish an approvals calendar with locked review days; child-safety compliance checklist. " +
      "Status: proposal under review by board finance committee; final decision expected Feb 12.",
    tags: [
      "type:campaign",
      "campaign:Halo",
      "client:BrightSteps-Foundation",
      "contact:Renee-Park",
      "contact:Malik-Jones",
      "dept:Strategy",
      "dept:Creative",
      "dept:PR",
      "dept:Partnerships",
      "status:proposed",
    ],
  },
  {
    id: "kb-campaign-ember",
    title: "Campaign Ember (current) - quick-service restaurant LTO",
    text:
      "Client: FireBird Tacos (national QSR; 520 locations). " +
      "Client contacts: Dana McKee (VP Marketing, dana.mckee@firebirdtacos.example), Leo Kim (Field Marketing Lead, leo.kim@firebirdtacos.example). " +
      "Agency contacts: Omar Singh (Creative Producer, omar.singh@auroracreative.example), Janelle Price (Media Manager, janelle.price@auroracreative.example). " +
      "Budget: $2.2M (Production $480K; Media $1.55M; Social/Influencers $120K; Local Ops Toolkit $50K). " +
      "Campaign window: Feb 24–Apr 20 (8 weeks). " +
      "Goal: +6% same-store sales and +9% lift in app orders for the 'Blaze Crunch LTO.' " +
      "Deliverables: 15s/6s spots, OOH key art + localized copy, app banners, store POP kit, influencer tasting event recap content, and a 'heat meter' UGC challenge. " +
      "Geo focus: top 22 DMAs; heavier weight in Southwest + Southeast. " +
      "Operational needs: coordinate creative with inventory constraints; align with franchisee co-op requirements. " +
      "Current status: in-market (week 2); creative variant B outperforming in CTR (+0.18pp); OOH placements live; app push notifications scheduled. " +
      "Risks: stockouts and uneven franchise execution. " +
      "Mitigation: weekly inventory check-in; simplified store kit; contingency creative for 'limited availability' messaging.",
    tags: [
      "type:campaign",
      "campaign:Ember",
      "client:FireBird-Tacos",
      "contact:Dana-McKee",
      "contact:Leo-Kim",
      "dept:Creative-Production",
      "dept:Media-Buying",
      "dept:Local-Markets",
      "dept:Analytics",
      "status:current",
    ],
  },
  {
    id: "kb-campaign-vertex",
    title: "Campaign Vertex (current) - fintech trust & credibility",
    text:
      "Client: PineBank Mobile (consumer fintech; checking + credit builder). " +
      "Client contacts: Sienna Brooks (Head of Brand, sienna.brooks@pinebank.example), Victor Alvarez (Compliance Counsel, victor.alvarez@pinebank.example). " +
      "Agency contacts: Laila Haddad (Strategy Director, laila.haddad@auroracreative.example), Max Feld (PR Lead, max.feld@auroracreative.example). " +
      "Budget: $3.1M (Creative $640K; Production $920K; Media $1.35M; PR/Influence $190K). " +
      "Goal: improve trust score by +10 points in quarterly brand tracking and reduce 'scam/hidden fees' negative mentions by 20%. " +
      "Strategy: proof-led messaging (FDIC-insured partner bank, transparent fees, customer support) paired with human stories and third-party validation. " +
      "Deliverables: 'No Surprises' manifesto film, testimonial series, explainer animations, PR narrative + exec talking points, crisis response playbook, and compliance-approved copy library. " +
      "Approvals: all claims require legal sign-off; influencer contracts require disclosure compliance. " +
      "Current status: production paused pending compliance redlines on two key claims; PR plan drafted; media reserved but not released. " +
      "Risks: long compliance cycles + increased scrutiny from consumer advocates. " +
      "Mitigation: claim hierarchy (hard claims vs soft claims); early legal workshops; backup creative using softer language without performance claims.",
    tags: [
      "type:campaign",
      "campaign:Vertex",
      "client:PineBank-Mobile",
      "contact:Sienna-Brooks",
      "contact:Victor-Alvarez",
      "dept:Strategy",
      "dept:Legal-Review",
      "dept:Creative",
      "dept:PR",
      "dept:Media",
      "status:current",
    ],
  },
  {
    id: "kb-campaign-lumen",
    title: "Campaign Lumen (completed) - healthcare enrollment drive",
    text:
      "Client: HarborWell Health (regional provider; 3-state footprint). " +
      "Client contacts: Dr. Elise Morgan (Chief Patient Officer, elise.morgan@harborwell.example), Nate Vaughn (Marketing Ops, nate.vaughn@harborwell.example). " +
      "Agency contacts: Kira Bolton (Account Lead, kira.bolton@auroracreative.example), Hyo Park (Analytics, hyo.park@auroracreative.example). " +
      "Budget: $1.9M (Creative $410K; Production $380K; Media $980K; Research $130K). " +
      "Window: Oct 1–Dec 15 (open enrollment). " +
      "Goal: +8% enrollment conversions vs prior year; reduce cost-per-enrollment by 10%. " +
      "Deliverables: bilingual spots (EN/ES), provider testimonial series, community outreach assets, SEM campaigns around plan switching, and a simplified plan-comparison landing experience. " +
      "Outcome: +10.4% conversion lift; cost-per-enrollment down 12%; highest-performing creative: patient testimonial cutdowns with simple pricing explanations. " +
      "Lessons learned: feature-led ads underperformed; trust and clarity beat 'benefits lists.'",
    tags: [
      "type:campaign",
      "campaign:Lumen",
      "client:HarborWell-Health",
      "contact:Elise-Morgan",
      "contact:Nate-Vaughn",
      "dept:Creative",
      "dept:Media",
      "dept:Community-Outreach",
      "dept:Analytics",
      "status:completed",
    ],
  },
  {
    id: "kb-campaign-pulse",
    title: "Campaign Pulse (current) - music streaming re-engagement",
    text:
      "Client: LoopSound (music streaming; freemium subscription). " +
      "Client contacts: Camila Reyes (Lifecycle Marketing, camila.reyes@loopsound.example), Devon Hart (Data Science, devon.hart@loopsound.example). " +
      "Agency contacts: Noor Iqbal (CRM Strategist, noor.iqbal@auroracreative.example), Theo Grant (Creative Lead, theo.grant@auroracreative.example). " +
      "Budget: $1.2M (Creative $280K; Paid Social $520K; CRM Ops $160K; Offer Funding $240K). " +
      "Goal: reactivate 300K dormant users in 60 days and improve 30-day retention among reactivations to ≥ 35%. " +
      "Tactic: personalized ads + email/push sequences referencing genre affinity (privacy-safe segments) paired with a limited '3 months half off' offer. " +
      "Deliverables: modular creative system (album-art frames, dynamic headlines), 6 email templates, push notification library, and an offer eligibility ruleset. " +
      "Status: week 1 results show CTR +22% above benchmark; email open rates stable; retention signal pending due to lag. " +
      "Risk: personalization perceived as creepy. " +
      "Mitigation: messaging emphasizes 'popular picks for your vibe' (non-specific) and includes preference controls.",
    tags: [
      "type:campaign",
      "campaign:Pulse",
      "client:LoopSound",
      "contact:Camila-Reyes",
      "contact:Devon-Hart",
      "dept:CRM",
      "dept:Creative",
      "dept:Paid-Social",
      "dept:Data-Science",
      "status:current",
    ],
  },
  {
    id: "kb-campaign-anchor",
    title: "Campaign Anchor (current) - real estate brand refresh",
    text:
      "Client: Ridge & Harbor Realty Group (national; residential + commercial). " +
      "Client contacts: Brooke Lin (Head of Marketing, brooke.lin@ridgeharbor.example), Ethan Cole (Regional GM, ethan.cole@ridgeharbor.example). " +
      "Agency contacts: Simone Duval (Brand Designer, simone.duval@auroracreative.example), Miles Okafor (Strategy, miles.okafor@auroracreative.example). " +
      "Budget: $2.7M (Brand System $520K; Photo/Video $610K; Website Refresh $430K; Launch Media $1.05M; Training $90K). " +
      "Goal: reposition as modern + community-first; increase qualified inquiries by 15% in top 10 metro markets. " +
      "Deliverables: logo refinement (not a full rename), brand guidelines, local market templates, agent toolkits, new photography style, and a website IA update with improved property search UX. " +
      "Internal adoption need: agent-facing training and a brand portal for asset downloads. " +
      "Status: creative development; IA approved; photography brief finalized; regional stakeholders scheduled for alignment sessions. " +
      "Risk: inconsistent brand rollout due to franchise-like regional autonomy. " +
      "Mitigation: market-by-market rollout plan + 'minimum viable brand compliance' checklist.",
    tags: [
      "type:campaign",
      "campaign:Anchor",
      "client:Ridge-Harbor-Realty",
      "contact:Brooke-Lin",
      "contact:Ethan-Cole",
      "dept:Brand-Strategy",
      "dept:Design",
      "dept:Web",
      "dept:Training",
      "status:current",
    ],
  },
  {
    id: "kb-campaign-strata",
    title: "Campaign Strata (completed) - enterprise recruitment marketing",
    text:
      "Client: Meridian Systems (Fortune 500; enterprise IT + services). " +
      "Client contacts: Claire Donnelly (Talent Acquisition, claire.donnelly@meridiansystems.example), Raj Mehta (Employer Brand, raj.mehta@meridiansystems.example). " +
      "Agency contacts: Devin Cho (Employer Brand Strategist, devin.cho@auroracreative.example), Paige Novak (Media, paige.novak@auroracreative.example). " +
      "Budget: $900K (Creative $260K; Production $210K; Media $380K; Events/Partnerships $50K). " +
      "Goal: reduce time-to-hire by 20% for technical roles and increase qualified applicants per posting by 30%. " +
      "Deliverables: employee-led video series ('Day in the Build'), refreshed careers landing page modules, job family copy rewrite, and targeted media for 6 priority cities. " +
      "Result: time-to-hire reduced 18%; applicants per posting +27%; strongest lift came from employee authenticity and clear benefits messaging. " +
      "Post-mortem note: highly polished ads underperformed vs documentary style.",
    tags: [
      "type:campaign",
      "campaign:Strata",
      "client:Meridian-Systems",
      "contact:Claire-Donnelly",
      "contact:Raj-Mehta",
      "dept:Employer-Brand",
      "dept:Creative",
      "dept:Media",
      "dept:Web",
      "status:completed",
    ],
  },
  {
    id: "kb-campaign-aurora",
    title: "Campaign Aurora (current) - luxury travel relaunch",
    text:
      "Client: Asteria Voyages (luxury travel; relaunch after ownership change). " +
      "Client contacts: Celeste Wynn (CEO, celeste.wynn@asteriavoyages.example), Hugo Stein (Brand Director, hugo.stein@asteriavoyages.example). " +
      "Agency contacts: Rina Kaur (Executive Creative Director, rina.kaur@auroracreative.example), Jonah Pierce (Production EP, jonah.pierce@auroracreative.example). " +
      "Budget: $5.4M (Strategy $500K; Production $2.6M; Post $620K; Media $1.55M; Influencer/PR $130K). " +
      "Goal: restore desirability and drive high-value bookings; target: +20% YoY revenue in premium itineraries and +12% increase in qualified inquiries. " +
      "Creative tone: cinematic, experiential, editorial; minimal discounting. " +
      "Deliverables: hero film (60s + 30s + 15s), print suite, high-impact digital takeovers, brand photography library, and a refreshed itinerary guide PDF. " +
      "Status: pre-production locked; location permits in progress; casting narrowed to two leads; media reserved for Q3. " +
      "Dependencies: itinerary pricing final; legal clearance for location shots; brand typography final approval. " +
      "Risks: weather/permit delays and post-production timelines. " +
      "Mitigation: backup indoor set day; parallel edit team; pre-approved music library options.",
    tags: [
      "type:campaign",
      "campaign:Aurora",
      "client:Asteria-Voyages",
      "contact:Celeste-Wynn",
      "contact:Hugo-Stein",
      "dept:Strategy",
      "dept:Creative",
      "dept:Production",
      "dept:Media",
      "dept:PR",
      "status:current",
    ],
  },
  {
    id: "kb-campaign-catalyst",
    title: "Campaign Catalyst (proposed) - startup growth sprint",
    text:
      "Client: ParcelPilot (Series B; last-mile logistics app for SMBs). " +
      "Client contacts: Ingrid Shaw (Head of Growth, ingrid.shaw@parcelpilot.example), Mateo Ruiz (Product, mateo.ruiz@parcelpilot.example). " +
      "Agency contacts: Jae Min (Performance Director, jae.min@auroracreative.example), Sasha Bell (Design Systems, sasha.bell@auroracreative.example). " +
      "Budget: $600K (Creative $140K; Landing/UX $90K; Media Test $330K; Research $40K). " +
      "Sprint length: 90 days with 2-week test cycles. " +
      "Goal: validate top 2 messaging angles and identify 1 scalable paid channel with CAC ≤ $120 and payback ≤ 3 months. " +
      "Deliverables: creative test matrix (20–30 variants), new landing page with modular sections, onboarding email sequence, and weekly test readouts with clear kill/keep decisions. " +
      "Constraints: limited brand assets; product roadmap changes mid-sprint. " +
      "Risks: category confusion and weak trust signals. " +
      "Mitigation: trust modules (reviews, proof points), crisp explainer motion, and a 'how it works' interactive section. " +
      "Status: proposal in negotiation; awaiting contract and access to analytics + ad accounts.",
    tags: [
      "type:campaign",
      "campaign:Catalyst",
      "client:ParcelPilot",
      "contact:Ingrid-Shaw",
      "contact:Mateo-Ruiz",
      "dept:Performance-Media",
      "dept:UX",
      "dept:Design",
      "dept:Analytics",
      "status:proposed",
    ],
  },
  {
    id: "kb-campaign-northstar",
    title: "Campaign Northstar (current) - corporate reputation",
    text:
      "Client: HelioGrid Energy (multinational; energy transition + infrastructure). " +
      "Client contacts: Anya Volkov (Chief Communications Officer, anya.volkov@heliogrid.example), Trent Ellis (Public Affairs, trent.ellis@heliogrid.example). " +
      "Agency contacts: Marcus Yen (PR Director, marcus.yen@auroracreative.example), Felicia Stone (Content Strategy, felicia.stone@auroracreative.example). " +
      "Budget: $3.9M (Thought Leadership $620K; PR $780K; Paid Amplification $1.4M; Video/Content $900K; Social Listening $200K). " +
      "Goal: align perception with updated mission; reduce negative sentiment by 12% and increase 'innovation' association by 8 pts in tracking. " +
      "Deliverables: exec narrative + talking points, quarterly insights report, documentary-style mini-series, stakeholder microsite, crisis comms escalation tree, and a media training workshop. " +
      "Approval process: comms + legal + public affairs; high scrutiny for claims. " +
      "Current status: content pipeline active; first report drafted; executive reviews scheduled; paid amplification held until message validation is complete. " +
      "Risks: activist criticism and misinterpretation of sustainability claims. " +
      "Mitigation: precise language, third-party citations within owned content, and scenario planning.",
    tags: [
      "type:campaign",
      "campaign:Northstar",
      "client:HelioGrid-Energy",
      "contact:Anya-Volkov",
      "contact:Trent-Ellis",
      "dept:PR",
      "dept:Public-Affairs",
      "dept:Content",
      "dept:Social-Listening",
      "status:current",
    ],
  },
  {
    id: "kb-campaign-forge",
    title: "Campaign Forge (completed) - automotive EV model launch",
    text:
      "Client: Vanta Motors (automotive; EV line expansion). " +
      "Client contacts: Keisha Brown (Brand GM, keisha.brown@vantamotors.example), Tomás Silva (Launch Ops, tomas.silva@vantamotors.example). " +
      "Agency contacts: Evan Hale (Media Director, evan.hale@auroracreative.example), Yumi Sato (Producer, yumi.sato@auroracreative.example). " +
      "Budget: $6.2M (Production $2.4M; Media $3.5M; Experiential $220K; Research $80K). " +
      "Goal: drive test-drive intent and early reservations; target: 18K test-drive bookings and 4,500 reservations pre-delivery. " +
      "Deliverables: launch film, performance cutdowns, interactive 360 product viewer, dealership toolkit, and influencer drive-day content. " +
      "Outcome: reservations exceeded target by 14%; dealership toolkit adoption high; strongest channel: YouTube/CTV with retargeting to site. " +
      "Post-campaign note: 'range anxiety' creative addressed objections most effectively.",
    tags: [
      "type:campaign",
      "campaign:Forge",
      "client:Vanta-Motors",
      "contact:Keisha-Brown",
      "contact:Tomas-Silva",
      "dept:Creative-Production",
      "dept:Media",
      "dept:Experiential",
      "dept:Analytics",
      "status:completed",
    ],
  },
  {
    id: "kb-campaign-drift",
    title: "Campaign Drift (current) - social-first fashion drop",
    text:
      "Client: Juniper & Main (fashion; DTC; seasonal collabs). " +
      "Client contacts: Naomi Price (Head of Brand, naomi.price@junipermain.example), Kai Nguyen (Ecom Director, kai.nguyen@junipermain.example). " +
      "Agency contacts: Arlo Bennett (Influencer Lead, arlo.bennett@auroracreative.example), Mira Das (Social Creative, mira.das@auroracreative.example). " +
      "Budget: $750K (Creators $280K; Paid Social $260K; Content Production $160K; Community Mgmt $50K). " +
      "Goal: sell out collab inventory in 72 hours and capture 18K new email subscribers. " +
      "Deliverables: teaser countdown, creator seeding kits, TikTok-first lookbook, Instagram story templates, paid whitelisting ads, and a product drop microsite with waitlist logic. " +
      "Status: influencer seeding underway; content calendar locked; paid creative variants in review. " +
      "Risk: negative sentiment if drop feels inaccessible. " +
      "Mitigation: transparent inventory messaging, staggered restock plan, and a 'second chance' waitlist.",
    tags: [
      "type:campaign",
      "campaign:Drift",
      "client:Juniper-Main",
      "contact:Naomi-Price",
      "contact:Kai-Nguyen",
      "dept:Social",
      "dept:Influencer",
      "dept:Paid-Social",
      "dept:Community",
      "status:current",
    ],
  },
  {
    id: "kb-campaign-keystone",
    title: "Campaign Keystone (current) - insurance education initiative",
    text:
      "Client: ClearShield Insurance (personal lines; renters + auto). " +
      "Client contacts: Peter Lang (Marketing Director, peter.lang@clearshield.example), Aisha Khan (Product Counsel, aisha.khan@clearshield.example). " +
      "Agency contacts: Gia Romano (Content Director, gia.romano@auroracreative.example), Lucas Reed (SEM Lead, lucas.reed@auroracreative.example). " +
      "Budget: $1.4M (Content $420K; Paid Search $620K; Video $210K; Research $150K). " +
      "Goal: increase quote starts by 12% and improve quote completion by 6% among 22–35 audiences. " +
      "Approach: simplify confusing terms with explainers, calculators, and myth-busting content; pair with high-intent search capture. " +
      "Deliverables: explainer video series (8 episodes), interactive deductible calculator, SEO pillar pages, SEM campaigns, and compliance-approved copy bank. " +
      "Status: in-market testing; calculator live; SEM performance steady; content shares strong but conversions still ramping. " +
      "Risk: compliance constraints reduce clarity. " +
      "Mitigation: pre-approved wording modules and early legal involvement.",
    tags: [
      "type:campaign",
      "campaign:Keystone",
      "client:ClearShield-Insurance",
      "contact:Peter-Lang",
      "contact:Aisha-Khan",
      "dept:Content",
      "dept:SEM",
      "dept:Legal-Review",
      "dept:Analytics",
      "status:current",
    ],
  },
  {
    id: "kb-campaign-horizon",
    title: "Campaign Horizon (completed) - tourism recovery",
    text:
      "Client: Coastline Tourism Board (regional tourism authority). " +
      "Client contacts: Sofia Delgado (Tourism Director, sofia.delgado@coastlinetourism.example), Glen Harris (Partnerships, glen.harris@coastlinetourism.example). " +
      "Agency contacts: Beth Kim (Strategy, beth.kim@auroracreative.example), Andre Moreau (Media, andre.moreau@auroracreative.example). " +
      "Budget: $2.5M (Creative $540K; Production $430K; Media $1.4M; Partnerships $130K). " +
      "Goal: restore visitation to pre-downturn baseline and increase off-season bookings by 10%. " +
      "Deliverables: seasonal hero spots, itinerary content, partner hotel packages, influencer weekend series, and a 'trip builder' landing experience. " +
      "Outcome: reached 95% of baseline in one season; off-season bookings +11%; best performing creative: local food + outdoor experiences. " +
      "Post-campaign insight: deals mattered less than 'ease of planning' messaging.",
    tags: [
      "type:campaign",
      "campaign:Horizon",
      "client:Coastline-Tourism-Board",
      "contact:Sofia-Delgado",
      "contact:Glen-Harris",
      "dept:Strategy",
      "dept:Creative",
      "dept:Media",
      "dept:Partnerships",
      "status:completed",
    ],
  },
  {
    id: "kb-campaign-spark",
    title: "Campaign Spark (current) - consumer app onboarding optimization",
    text:
      "Client: TaskMint (consumer productivity app; subscription). " +
      "Client contacts: April Tan (Product Marketing, april.tan@taskmint.example), Colin Moore (Growth PM, colin.moore@taskmint.example). " +
      "Agency contacts: Heidi Lopes (UX Writer, heidi.lopes@auroracreative.example), Ronan Blake (Product Analyst, ronan.blake@auroracreative.example). " +
      "Budget: $500K (Creative $120K; In-app UX $150K; Paid Social $180K; Research $50K). " +
      "Goal: increase 7-day retention by +5 points and improve trial-to-paid by +1.2 points. " +
      "Scope: onboarding screens, paywall messaging, tutorial emails, and paid social that sets expectations accurately. " +
      "Deliverables: 3 onboarding flows (persona-based), in-app tooltips, email series (5), paywall copy + pricing layout recommendations, and a measurement plan (A/B framework). " +
      "Status: variants in testing; onboarding flow B improving activation by 9% but paywall conversion flat; iterative copy adjustments in progress. " +
      "Risk: overpromising features leading to churn. " +
      "Mitigation: messaging focuses on 'first win' outcomes and transparent setup time.",
    tags: [
      "type:campaign",
      "campaign:Spark",
      "client:TaskMint",
      "contact:April-Tan",
      "contact:Colin-Moore",
      "dept:Product-Marketing",
      "dept:UX",
      "dept:Paid-Social",
      "dept:Analytics",
      "status:current",
    ],
  },
  {
    id: "kb-campaign-tide",
    title: "Campaign Tide (current) - CPG seasonal creative rotation",
    text:
      "Client: BlueCrest Beverages (CPG; sparkling water). " +
      "Client contacts: Marisol Vega (Brand Manager, marisol.vega@bluecrest.example), Darius Kent (Retail Media, darius.kent@bluecrest.example). " +
      "Agency contacts: Nina Rowe (Art Director, nina.rowe@auroracreative.example), Chris Yoon (Retail Media Lead, chris.yoon@auroracreative.example). " +
      "Budget: $1.05M (Creative Rotation $310K; Photo $120K; Retail Media $520K; Social $100K). " +
      "Goal: maintain share-of-voice during spring/summer peak; target: +4% unit sales in grocery + +6% in club channels. " +
      "Deliverables: quarterly creative refresh kit, retailer PDP updates, shoppable recipe content, and influencer 'mocktail' series. " +
      "Status: spring kit delivered; summer concepts in review; retail media pacing slightly behind due to category competition. " +
      "Risk: creative fatigue and retailer spec changes. " +
      "Mitigation: modular asset system and pre-built size variants.",
    tags: [
      "type:campaign",
      "campaign:Tide",
      "client:BlueCrest-Beverages",
      "contact:Marisol-Vega",
      "contact:Darius-Kent",
      "dept:Creative",
      "dept:Retail-Media",
      "dept:Social",
      "dept:Production",
      "status:current",
    ],
  },
  {
    id: "kb-campaign-kite",
    title: "Campaign Kite (current) - education tech back-to-school",
    text:
      "Client: LearnLoop EDU (edtech; parent-facing subscription). " +
      "Client contacts: Hannah Brooks (CMO, hannah.brooks@learnloop.example), Joon Park (Partnerships, joon.park@learnloop.example). " +
      "Agency contacts: Val Romero (Strategy Lead, val.romero@auroracreative.example), Ian Wells (Video Producer, ian.wells@auroracreative.example). " +
      "Budget: $1.3M (Creative $360K; Production $390K; Media $470K; Partnerships $80K). " +
      "Goal: +30% trial starts during Aug–Sep and improve parent trust perception (+7 pts). " +
      "Deliverables: parent testimonial videos, teacher partnership content, search and social campaigns, and a 'grade-level quiz' landing experience that routes to tailored messaging. " +
      "Status: pre-production; teacher partners contracted; landing quiz prototype in UX review. " +
      "Risk: skepticism about outcomes claims. " +
      "Mitigation: careful language, real parent stories, and clear explanation of methodology.",
    tags: [
      "type:campaign",
      "campaign:Kite",
      "client:LearnLoop-EDU",
      "contact:Hannah-Brooks",
      "contact:Joon-Park",
      "dept:Strategy",
      "dept:Production",
      "dept:Media",
      "dept:Partnerships",
      "dept:UX",
      "status:current",
    ],
  },
  {
    id: "kb-campaign-summit",
    title: "Campaign Summit (current) - B2B conference integrated marketing",
    text:
      "Client: QuartzWorks (enterprise analytics; annual user conference). " +
      "Client contacts: Elise Romero (Events Director, elise.romero@quartzworks.example), Kenji Ito (Demand Gen, kenji.ito@quartzworks.example). " +
      "Agency contacts: Harper Lin (Integrated PM, harper.lin@auroracreative.example), Owen Price (Email Lead, owen.price@auroracreative.example). " +
      "Budget: $980K (Creative $210K; Paid Media $430K; Email/CRM $140K; Content $150K; On-site capture $50K). " +
      "Goal: 3,500 registrations, 1,200 qualified attendee check-ins, and 250 booked sales meetings at event. " +
      "Deliverables: registration landing page, email nurture, speaker promo kits, paid LinkedIn + search, agenda PDF, and an on-site content capture plan to produce 20 post-event clips. " +
      "Status: registration live; pacing slightly above plan (+6%); speaker kits delivered; media optimization ongoing. " +
      "Risk: last-minute agenda changes create asset churn. " +
      "Mitigation: modular agenda blocks and rapid-turn design templates.",
    tags: [
      "type:campaign",
      "campaign:Summit",
      "client:QuartzWorks",
      "contact:Elise-Romero",
      "contact:Kenji-Ito",
      "dept:Integrated-Marketing",
      "dept:CRM",
      "dept:Media",
      "dept:Content",
      "status:current",
    ],
  },

  // HR / internal
  {
    id: "kb-hr-open",
    title: "HR Initiative (open) - performance review framework redesign",
    text:
      "Internal owner: People Operations (Aurora Creative). " +
      "Primary contacts: Selena Grant (Head of People, selena.grant@auroracreative.example), Marco Diaz (HRBP, marco.diaz@auroracreative.example). " +
      "Stakeholders: Department Heads (Creative, Strategy, Media, Engineering), Finance, and Legal. " +
      "Goal: redesign performance reviews to improve clarity, fairness, and development planning across departments. " +
      "Current pain points: inconsistent competencies by team, uneven calibration, unclear promotion criteria, and manager feedback quality variance. " +
      "Scope: define role levels + competencies, introduce midpoint check-ins, standardize rating definitions, and select or configure a lightweight review tool. " +
      "Deliverables: competency matrix (by department + level), review templates, calibration guidelines, manager training deck, employee FAQ, and a rollout timeline. " +
      "Status: discovery phase—employee survey drafted; manager interviews scheduled; reviewing 3 tooling options for cost and data privacy. " +
      "Success metrics: +15% improvement in 'review fairness' on engagement survey and ≥ 90% on-time completion rate in first cycle.",
    tags: [
      "type:internal",
      "project:HR-Performance-Framework",
      "client:Internal",
      "contact:Selena-Grant",
      "contact:Marco-Diaz",
      "dept:HR",
      "dept:Legal",
      "dept:Finance",
      "dept:Leadership",
      "status:open",
    ],
  },
  {
    id: "kb-events-calendar",
    title: "Company Events Calendar - upcoming internal events",
    text:
      "Owner: Operations Team (Aurora Creative). " +
      "Primary contact: Keaton Shaw (Operations Manager, keaton.shaw@auroracreative.example). " +
      "Purpose: maintain a rolling calendar for all-hands, trainings, client summits, and culture events; used for scheduling coordination and internal comms. " +
      "Update cadence: monthly review + ad-hoc updates as dates change. " +
      "Upcoming events: " +
      "Jan 30: Monthly All-Hands (11:00–12:00 ET, Zoom) — Q1 priorities + new client wins. " +
      "Feb 6: Creative Crit (4:00–5:00 ET, Studio A) — cross-team portfolio reviews. " +
      "Feb 13: Manager Training Part 1 (2:00–3:30 ET, Zoom) — feedback fundamentals + documentation. " +
      "Feb 20: Client Summit: HelioGrid Workshop (10:00–3:00 ET, Midtown) — stakeholder alignment + narrative review. " +
      "Mar 7: Social: Agency Game Night (6:30–9:00 ET, Brooklyn office) — optional + bring a friend. " +
      "Note: travel approvals and room bookings tracked separately in Ops ticketing.",
    tags: [
      "type:internal",
      "project:Events-Calendar",
      "client:Internal",
      "contact:Keaton-Shaw",
      "dept:Operations",
      "dept:People",
      "status:active",
    ],
  },
  {
    id: "kb-benefits-handbook",
    title: "Employee Benefits & Handbook Overview",
    text:
      "Owner: People Operations + Legal (Aurora Creative). " +
      "Primary contacts: Selena Grant (Head of People, selena.grant@auroracreative.example), Nadia Imani (Legal Ops, nadia.imani@auroracreative.example). " +
      "Scope: this document summarizes core benefits and high-level policies for full-time employees unless otherwise specified. " +
      "Healthcare: medical/dental/vision options with employer contribution tiers; open enrollment each October; qualifying life events handled within 30 days. " +
      "Time off: PTO accrues per pay period; separate sick time per local requirements; company holidays published annually; manager approval required for PTO over 5 consecutive days. " +
      "Retirement: 401(k) with employer match after eligibility period; annual contribution guidance provided by Finance. " +
      "Remote work: hybrid default for NYC office teams; fully remote available for certain roles; home office stipend issued once per year for eligible employees. " +
      "Conduct: anti-harassment, anti-discrimination, reporting channels, conflict of interest rules, and confidentiality expectations for client work. " +
      "Security: device policy, password manager requirement, and guidelines for handling client data and NDAs. " +
      "Performance & growth: review cycle twice per year; promotion criteria tied to role levels and competency expectations. " +
      "Where to find updates: the 'People Portal' is the source of truth; handbook reviewed annually and updated as laws change.",
    tags: [
      "type:policy",
      "project:Benefits-Handbook",
      "client:Internal",
      "contact:Selena-Grant",
      "contact:Nadia-Imani",
      "dept:HR",
      "dept:Legal",
      "dept:Finance",
      "status:active",
    ],
  },
  {
  id: "kb-company-structure",
  title: "Aurora Creative — Company History, Hierarchy, and Employee Roster",
  text:
    "Company overview: Aurora Creative is a mid-sized independent advertising agency founded in 2016 in New York City. " +
    "The agency specializes in brand strategy, integrated campaigns, performance marketing, and content production for consumer, B2B, and regulated industries. " +
    "Aurora Creative has intentionally remained small (50 employees) to prioritize senior-level involvement, cross-functional collaboration, and speed of execution. " +

    "Founding history: Aurora Creative was founded by Rina Kaur (CEO & Executive Creative Director) and Marcus Yen (Chief Communications Officer) after both previously held leadership roles at large global agency networks. " +
    "The founding thesis was to build an agency that balanced high craft with operational discipline and transparent client partnerships. " +
    "The company reached profitability in its second year and has grown steadily without outside investment. " +

    "Leadership team (Executive): " +
    "Rina Kaur — Chief Executive Officer & Executive Creative Director. Oversees company vision, creative quality, major client relationships, and final creative approvals. " +
    "Marcus Yen — Chief Communications Officer. Leads PR, corporate reputation work, crisis communications, and executive messaging across clients. " +
    "Selena Grant — Head of People. Owns talent strategy, performance reviews, compensation, benefits, and company culture. " +
    "Keaton Shaw — Head of Operations. Manages resourcing, finance coordination, vendor contracts, facilities, and internal systems. " +

    "Department structure and employee roster (50 total): " +

    "Brand Strategy (8 employees): " +
    "Laila Haddad — Strategy Director (department lead; brand frameworks, research synthesis). " +
    "Miles Okafor — Senior Strategist (brand positioning, messaging architecture). " +
    "Val Romero — Strategy Lead (education + nonprofit clients). " +
    "Beth Kim — Senior Strategist (tourism and destination marketing). " +
    "Felicia Stone — Content Strategy Director (thought leadership and narrative development). " +
    "Marcus Lee — Strategist (qualitative research, audience segmentation). " +
    "Jenna Morales — Associate Strategist (insights, competitive audits). " +
    "Aaron Feld — Associate Strategist (measurement planning, briefs). " +

    "Creative (12 employees): " +
    "Rina Kaur — Executive Creative Director (shared with leadership). " +
    "Theo Grant — Creative Director (concept development, film). " +
    "Elena Ortiz — Copy Director (brand voice, long-form copy). " +
    "Gia Romano — Content Director (educational + regulated content). " +
    "Simone Duval — Senior Brand Designer (visual systems, guidelines). " +
    "Nina Rowe — Art Director (campaign visual execution). " +
    "Mira Das — Senior Social Creative (short-form and platform-native content). " +
    "Arlo Bennett — Influencer Creative Lead (creator partnerships). " +
    "Heidi Lopes — UX Writer (product and onboarding copy). " +
    "Chris Molina — Senior Copywriter (campaign copy). " +
    "Lena Fischer — Designer (digital + motion support). " +
    "Owen Price — Junior Copywriter (email and CRM copy). " +

    "Production (7 employees): " +
    "Jonah Pierce — Executive Producer (department lead; film + large-scale production). " +
    "Omar Singh — Creative Producer (campaign production management). " +
    "Yumi Sato — Producer (automotive and experiential). " +
    "Ian Wells — Video Producer (education and testimonial content). " +
    "Rachel Bloom — Production Manager (budgets, timelines, vendors). " +
    "Carlos Mendes — Post-Production Supervisor (editing, delivery). " +
    "Talia Rosen — Production Coordinator (logistics, releases). " +

    "Media & Growth (9 employees): " +
    "Evan Hale — Media Director (channel strategy, investment planning). " +
    "Jae Min — Performance Director (paid media testing, CAC modeling). " +
    "Janelle Price — Media Manager (QSR and retail accounts). " +
    "Chris Yoon — Retail Media Lead (Amazon, big box retail). " +
    "Lucas Reed — SEM Lead (search strategy and optimization). " +
    "Paige Novak — Media Strategist (recruitment and B2B). " +
    "Andre Moreau — Media Planner (tourism and destination marketing). " +
    "Noor Iqbal — CRM Strategist (email, lifecycle, retention). " +
    "Ronan Blake — Product Analyst (attribution, experimentation). " +

    "PR & Public Affairs (4 employees): " +
    "Marcus Yen — Chief Communications Officer (shared with leadership). " +
    "Max Feld — PR Lead (fintech and healthcare). " +
    "Harper Lin — Integrated Project Manager (conference + integrated work). " +
    "Sasha Bell — Communications Designer (reports, presentations). " +

    "Operations, HR, and Finance (6 employees): " +
    "Selena Grant — Head of People (shared with leadership). " +
    "Marco Diaz — HR Business Partner (performance, employee relations). " +
    "Keaton Shaw — Head of Operations (shared with leadership). " +
    "Nadia Imani — Legal Operations Manager (contracts, compliance). " +
    "Hyo Park — Analytics & Finance Manager (budget tracking, forecasting). " +
    "Kira Bolton — Account Lead (client operations and resourcing). " +

    "Organizational principles: Aurora Creative operates on small, senior-led pods with shared accountability across strategy, creative, media, and production. " +
    "Titles reflect responsibility rather than tenure. Managers are expected to remain hands-on. " +
    "Cross-department collaboration is required for all major campaigns, and no department operates in isolation.",
  tags: [
    "type:internal",
    "company:Aurora-Creative",
    "project:Company-Structure",
    "dept:Leadership",
    "dept:Strategy",
    "dept:Creative",
    "dept:Production",
    "dept:Media",
    "dept:PR",
    "dept:HR",
    "dept:Operations",
    "status:active",
  ],
},
{
  id: "kb-client-portfolio",
  title: "Aurora Creative — Key Client Portfolio & Contacts",
  text:
    "This document summarizes Aurora Creative’s key client companies, primary contacts, engagement history, and notable relationship context. " +
    "It includes active accounts as well as selected former clients that remain relevant for case studies, referrals, or re-engagement. " +

    "Novatek Consumer Electronics (current). " +
    "Industry: consumer electronics (hardware; retail + DTC). " +
    "Primary contacts: Maya Chen (VP Brand, maya.chen@novatek.example); Ben Arroyo (Director, Global Media, ben.arroyo@novatek.example). " +
    "Active work: Campaign Orbit — global brand repositioning focused on modernizing perception among 18–35 audiences while maintaining trust with legacy buyers. " +
    "Client context: Novatek has strong retail distribution but declining DTC performance; internal teams are risk-averse due to prior failed rebrand attempt (2019). " +
    "Relationship note: requires early concept testing and data-backed recommendations to build confidence. " +

    "CloudFleet (current). " +
    "Industry: B2B SaaS (workflow automation). " +
    "Primary contacts: Jordan Patel (CMO, jordan.patel@cloudfleet.example); Alina Ro (PMM Lead, alina.ro@cloudfleet.example). " +
    "Active work: Campaign Nimbus — product launch and demand generation. " +
    "Client context: sales-led organization transitioning to product-led growth; strong alignment between marketing and product but long enterprise sales cycle. " +
    "Relationship note: highly collaborative; expects rapid iteration and weekly performance readouts. " +

    "BrightSteps Foundation (proposed / intermittent). " +
    "Industry: nonprofit (youth education and mentorship). " +
    "Primary contacts: Renee Park (Executive Director, renee.park@brightsteps.example); Malik Jones (Comms Manager, malik.jones@brightsteps.example). " +
    "Active work: Campaign Halo (proposal under review). " +
    "Client context: board-governed organization with strict messaging guardrails; relies heavily on earned media and partnerships. " +
    "Relationship note: historically slow approvals; values mission alignment over scale. " +

    "FireBird Tacos (current). " +
    "Industry: quick-service restaurant (national franchise). " +
    "Primary contacts: Dana McKee (VP Marketing, dana.mckee@firebirdtacos.example); Leo Kim (Field Marketing Lead, leo.kim@firebirdtacos.example). " +
    "Active work: Campaign Ember — limited-time offer promotion. " +
    "Client context: franchise model creates execution variability; strong appetite for bold creative when tied directly to sales lift. " +
    "Relationship note: requires close coordination with field marketing and franchisee ops teams. " +

    "PineBank Mobile (current). " +
    "Industry: consumer fintech. " +
    "Primary contacts: Sienna Brooks (Head of Brand, sienna.brooks@pinebank.example); Victor Alvarez (Compliance Counsel, victor.alvarez@pinebank.example). " +
    "Active work: Campaign Vertex — trust and credibility initiative. " +
    "Client context: operating in a high-scrutiny regulatory environment; recent increase in customer support volume drove need for trust reset. " +
    "Relationship note: legal is deeply embedded in the creative process; timelines must account for extended review cycles. " +

    "HarborWell Health (former, seasonal). " +
    "Industry: healthcare provider (regional). " +
    "Primary contacts: Dr. Elise Morgan (Chief Patient Officer, elise.morgan@harborwell.example); Nate Vaughn (Marketing Ops, nate.vaughn@harborwell.example). " +
    "Past work: Campaign Lumen — open enrollment campaign (completed). " +
    "Client context: performance-driven but highly sensitive to tone; prefers testimonial-led storytelling. " +
    "Relationship note: strong results but engagement limited to enrollment periods; potential reactivation each fall. " +

    "LoopSound (current). " +
    "Industry: entertainment / music streaming. " +
    "Primary contacts: Camila Reyes (Lifecycle Marketing, camila.reyes@loopsound.example); Devon Hart (Data Science, devon.hart@loopsound.example). " +
    "Active work: Campaign Pulse — lapsed user re-engagement. " +
    "Client context: data-mature organization with strict privacy standards; personalization must be subtle and opt-in. " +
    "Relationship note: values experimentation and creative modularity; quick to pause underperforming tactics. " +

    "Ridge & Harbor Realty Group (current). " +
    "Industry: real estate (residential + commercial). " +
    "Primary contacts: Brooke Lin (Head of Marketing, brooke.lin@ridgeharbor.example); Ethan Cole (Regional GM, ethan.cole@ridgeharbor.example). " +
    "Active work: Campaign Anchor — brand refresh and rollout. " +
    "Client context: semi-franchise structure with strong regional autonomy; adoption and training are as critical as creative quality. " +
    "Relationship note: requires extensive internal stakeholder alignment. " +

    "Meridian Systems (former). " +
    "Industry: enterprise IT services. " +
    "Primary contacts: Claire Donnelly (Talent Acquisition, claire.donnelly@meridiansystems.example); Raj Mehta (Employer Brand, raj.mehta@meridiansystems.example). " +
    "Past work: Campaign Strata — recruitment marketing (completed). " +
    "Client context: large matrixed organization; employer brand historically under-invested. " +
    "Relationship note: engagement concluded after internal team was built; remains a strong referral source. " +

    "Asteria Voyages (current). " +
    "Industry: luxury travel. " +
    "Primary contacts: Celeste Wynn (CEO, celeste.wynn@asteriavoyages.example); Hugo Stein (Brand Director, hugo.stein@asteriavoyages.example). " +
    "Active work: Campaign Aurora — brand relaunch. " +
    "Client context: founder-led culture with high creative expectations; prioritizes craft over short-term efficiency. " +
    "Relationship note: executive-level involvement required; decisions centralized with CEO. " +

    "ParcelPilot (proposed / early-stage). " +
    "Industry: logistics technology (SMB-focused). " +
    "Primary contacts: Ingrid Shaw (Head of Growth, ingrid.shaw@parcelpilot.example); Mateo Ruiz (Product, mateo.ruiz@parcelpilot.example). " +
    "Active work: Campaign Catalyst (proposal). " +
    "Client context: fast-moving startup with limited brand assets and evolving roadmap. " +
    "Relationship note: success dependent on rapid testing and tight scope control. " +

    "HelioGrid Energy (current). " +
    "Industry: energy and infrastructure. " +
    "Primary contacts: Anya Volkov (Chief Communications Officer, anya.volkov@heliogrid.example); Trent Ellis (Public Affairs, trent.ellis@heliogrid.example). " +
    "Active work: Campaign Northstar — corporate reputation and thought leadership. " +
    "Client context: politically sensitive category; public perception varies significantly by region. " +
    "Relationship note: requires rigorous scenario planning and disciplined language.",
  tags: [
    "type:internal",
    "company:Aurora-Creative",
    "project:Client-Portfolio",
    "dept:Accounts",
    "dept:Strategy",
    "dept:Creative",
    "dept:Media",
    "dept:PR",
    "status:active",
  ],
}, 
{
  id: "kb-admin-team",
  title: "Aurora Creative — Administrative Team Overview",
  text:
    "The Administrative Team at Aurora Creative is a cross-functional leadership and operations group responsible for governance, internal decision-making, and day-to-day business continuity. " +
    "The team combines executive leadership with senior operations staff to ensure strategic alignment, financial discipline, legal compliance, and people operations across the agency’s 50-person organization. " +

    "Mandate and scope: " +
    "The Administrative Team oversees agency-wide planning, budgeting, resourcing, hiring approvals, vendor relationships, policy enforcement, and risk management. " +
    "This group meets weekly to review operational health, active client risks, staffing capacity, and upcoming milestones. " +

    "Executive members: " +
    "Rina Kaur — Chief Executive Officer & Executive Creative Director. Provides overall company direction, final approval on major investments, senior client escalations, and creative arbitration when priorities conflict. " +
    "Marcus Yen — Chief Communications Officer. Advises on reputational risk, crisis preparedness, executive communications, and public-facing messaging for both Aurora Creative and select clients. " +
    "Selena Grant — Head of People. Owns hiring strategy, performance frameworks, compensation planning, benefits administration, and employee relations. Acts as final decision-maker on people-related policy matters. " +

    "Operations and administration members: " +
    "Keaton Shaw — Head of Operations. Leads financial planning, agency resourcing, vendor management, facilities, IT tooling, and internal process design. Responsible for quarterly forecasting and margin health. " +
    "Marco Diaz — HR Business Partner. Manages performance review execution, manager coaching, employee feedback intake, and compliance with employment regulations. " +
    "Nadia Imani — Legal Operations Manager. Oversees client contracts, NDAs, SOWs, data privacy compliance, and legal review workflows for regulated industries. " +
    "Hyo Park — Analytics & Finance Manager. Tracks budgets, burn rates, and revenue recognition across campaigns; supports forecasting and post-campaign financial analysis. " +
    "Kira Bolton — Account Lead (Operations Liaison). Acts as bridge between client services and operations; ensures staffing plans, scopes, and timelines align with financial and resourcing constraints. " +

    "Decision authority: " +
    "The Administrative Team has authority over hiring approvals, budget reallocations over $50K, vendor selection, policy updates, and escalation resolution across departments. " +
    "Creative and strategy decisions remain department-led unless they introduce financial, legal, or reputational risk, in which case this group intervenes. " +

    "Operating cadence: " +
    "Weekly admin sync (60 minutes) covering staffing, finance, risks, and upcoming deadlines. " +
    "Monthly financial review with department heads. " +
    "Quarterly planning session aligned to company goals and capacity forecasts. " +

    "Guiding principles: " +
    "Maintain a senior-led, low-bureaucracy organization. " +
    "Protect creative quality while enforcing operational discipline. " +
    "Prioritize transparency with employees and clients. " +
    "Scale deliberately without exceeding sustainable team capacity.",
  tags: [
    "type:internal",
    "company:Aurora-Creative",
    "project:Administrative-Team",
    "dept:Leadership",
    "dept:Operations",
    "dept:HR",
    "dept:Finance",
    "dept:Legal",
    "status:active",
  ],
},
{
  id: "kb-industry-trends",
  title: "Advertising Industry — Current Trends & Key Players",
  text:
    "This document summarizes current industry-wide trends in advertising and highlights influential professionals and organizations shaping the market. " +
    "It is intended to inform strategic planning, competitive positioning, and talent awareness for Aurora Creative leadership. " +

    "Trend: Senior-led boutique agencies gaining ground. " +
    "Overview: Mid-sized and boutique agencies with senior involvement are increasingly favored over large holding-company agencies for high-stakes brand and reputation work. " +
    "Key players: Rina Kaur (Aurora Creative); Elaine Porter (Northline Collective); James Holloway (Signal & Form). " +

    "Trend: Vertical specialization in regulated industries. " +
    "Overview: Healthcare, fintech, and energy clients increasingly favor agencies with narrow vertical focus and embedded compliance expertise. " +
    "Key firms: CarePoint Marketing Group (healthcare); Ledger & Loop (fintech); Public Axis (energy and public affairs). " +
    "Notable professionals: Linda Carver (CarePoint); Victor Alvarez (PineBank Mobile, client-side). " +

    "Trend: Performance marketing saturation and rising costs. " +
    "Overview: Paid media costs continue to rise across search and social, pushing agencies toward hybrid brand + performance strategies and retention-focused work. " +
    "Key voices: Jae Min (Aurora Creative); Dana Schultz (Growthcraft); Devon Hart (LoopSound, client-side data science). " +

    "Trend: Content modularity and rapid iteration. " +
    "Overview: Campaigns increasingly rely on modular creative systems that allow fast testing and localized adaptation rather than single hero executions. " +
    "Key firms: Aurora Creative; Driftline Studio; Northline Collective. " +
    "Key practitioners: Theo Grant (Aurora Creative); Mira Das (Aurora Creative); Rachel Kim (VistaTrail). " +

    "Trend: Increased executive and reputational risk management. " +
    "Overview: Corporate reputation, crisis preparedness, and narrative control have become core agency offerings rather than PR-only services. " +
    "Key firms: Aurora Creative; Public Axis; Meridian Advisory. " +
    "Key professionals: Marcus Yen (Aurora Creative); Anya Volkov (HelioGrid Energy); Max Feld (Aurora Creative). " +

    "Industry outlook: Agencies that combine creative excellence, operational discipline, and strategic restraint are expected to outperform both large holding companies and narrowly scoped production shops over the next 3–5 years.",
  tags: [
    "type:analysis",
    "project:Industry-Trends",
    "dept:Strategy",
    "dept:Leadership",
    "dept:PR",
    "status:active",
  ],
}, 
{
  id: "kb-campaign-strata-archive",
  title: "Campaign Strata (inactive) - enterprise recruitment marketing",
  text:
    "Client: Meridian Systems (enterprise IT + services; Fortune 500). " +
    "Client contacts: Claire Donnelly (Talent Acquisition, claire.donnelly@meridiansystems.example), Raj Mehta (Employer Brand, raj.mehta@meridiansystems.example). " +
    "Agency contacts: Devin Cho (Employer Brand Strategist, devin.cho@auroracreative.example), Paige Novak (Media Strategist, paige.novak@auroracreative.example). " +
    "Budget: $900K (Creative $260K; Production $210K; Media $380K; Events/Partnerships $50K). " +
    "Project start date: January 9, 2023. " +
    "Project inactive date: September 15, 2023. " +
    "Goal: reduce time-to-hire by 20% for technical roles and increase qualified applicants per posting by 30%. " +
    "Deliverables: employee-led video series ('Day in the Build'), refreshed careers landing page modules, job family copy rewrite, and targeted media for six priority hiring markets. " +
    "Outcome summary: campaign achieved strong performance metrics (time-to-hire −18%; applicants per posting +27%) and met core objectives. " +
    "Reason for inactivity: Meridian Systems elected to build an internal employer brand team and transitioned ongoing work to a retainer-based agency better suited for internal communications support. " +
    "Post-project note: engagement concluded on positive terms; client remains a referral source and past-case-study reference.",
  tags: [
    "type:campaign",
    "campaign:Strata",
    "client:Meridian-Systems",
    "contact:Claire-Donnelly",
    "contact:Raj-Mehta",
    "dept:Employer-Brand",
    "dept:Creative",
    "dept:Media",
    "dept:Web",
    "status:inactive",
  ],
},
{
  id: "kb-campaign-lumen-archive",
  title: "Campaign Lumen (inactive) - healthcare enrollment drive",
  text:
    "Client: HarborWell Health (regional healthcare provider; three-state footprint). " +
    "Client contacts: Dr. Elise Morgan (Chief Patient Officer, elise.morgan@harborwell.example), Nate Vaughn (Marketing Operations, nate.vaughn@harborwell.example). " +
    "Agency contacts: Kira Bolton (Account Lead, kira.bolton@auroracreative.example), Hyo Park (Analytics & Finance Manager, hyo.park@auroracreative.example). " +
    "Budget: $1.9M (Creative $410K; Production $380K; Media $980K; Research $130K). " +
    "Project start date: August 22, 2022. " +
    "Project inactive date: January 5, 2023. " +
    "Window: October 1–December 15 (open enrollment period). " +
    "Goal: increase enrollment conversions by 8% year-over-year and reduce cost-per-enrollment by 10%. " +
    "Deliverables: bilingual broadcast and digital spots (EN/ES), provider testimonial series, community outreach assets, SEM campaigns focused on plan switching, and a simplified plan-comparison landing experience. " +
    "Outcome summary: exceeded performance targets with +10.4% conversion lift and −12% cost-per-enrollment. " +
    "Reason for inactivity: HarborWell Health consolidated future enrollment marketing under a healthcare-specialist agency to support year-round compliance and media needs. " +
    "Post-project note: Aurora Creative retained as an approved vendor for future discrete creative projects.",
  tags: [
    "type:campaign",
    "campaign:Lumen",
    "client:HarborWell-Health",
    "contact:Elise-Morgan",
    "contact:Nate-Vaughn",
    "dept:Creative",
    "dept:Media",
    "dept:Community-Outreach",
    "dept:Analytics",
    "status:inactive",
  ],
},
{
  id: "kb-campaign-horizon-archive",
  title: "Campaign Horizon (inactive) - tourism recovery initiative",
  text:
    "Client: Coastline Tourism Board (regional tourism authority). " +
    "Client contacts: Sofia Delgado (Tourism Director, sofia.delgado@coastlinetourism.example), Glen Harris (Partnerships Lead, glen.harris@coastlinetourism.example). " +
    "Agency contacts: Beth Kim (Senior Strategist, beth.kim@auroracreative.example), Andre Moreau (Media Planner, andre.moreau@auroracreative.example). " +
    "Budget: $2.5M (Creative $540K; Production $430K; Media $1.4M; Partnerships $130K). " +
    "Project start date: February 14, 2022. " +
    "Project inactive date: October 31, 2022. " +
    "Goal: restore regional tourism visitation to pre-downturn baseline and increase off-season bookings by 10%. " +
    "Deliverables: seasonal hero spots, itinerary-driven content, partner hotel packages, influencer weekend series, and a trip-builder landing experience. " +
    "Outcome summary: visitation recovered to 95% of baseline within one season; off-season bookings increased by 11%. " +
    "Reason for inactivity: recovery mandate deemed complete; tourism board diversified agency roster for long-term destination marketing and influencer relations. " +
    "Post-project note: work remains a flagship case study for tourism and recovery-focused campaigns.",
  tags: [
    "type:campaign",
    "campaign:Horizon",
    "client:Coastline-Tourism-Board",
    "contact:Sofia-Delgado",
    "contact:Glen-Harris",
    "dept:Strategy",
    "dept:Creative",
    "dept:Media",
    "dept:Partnerships",
    "status:inactive",
  ],
},


];
