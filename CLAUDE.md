# CLAUDE.md — Working Rules for aseel-portfolio

## Language
- Communicate with Aseel in simple, clear Arabic. Explain each technical step.
- Website copy and permanent documentation: English.

## Identity
- Public name: Aseel Hamoud (Arabic: أصيل — male). Never "Asil" / "أسيل".

## Source of truth
- `private/project-brief.md` (git-ignored, local only) holds positioning,
  the content inventory with status labels, and the sitemap. Read it
  before any content work. Never commit it — it contains unpublished
  project details.

## Content integrity (hard rules)
- Never invent facts, numbers, dates, achievements, impact, or proficiency levels.
- Use `TODO: VERIFY` for anything unconfirmed.
- Respect status labels: Verified / Needs verification / In progress / Concept.
  Never present a concept as an achievement.

## Confidentiality (hard rules)
- No confidential Saudi Aramco material: equipment identifiers, procedures,
  screenshots, internal locations, operating limits, diagrams, internal links
  or contacts, org hierarchy, grade codes, tank capacities.
- Y-Connect: mention only generically (an internal platform where Aseel
  shares achievements). No specifics.
- Never imply Aramco endorses or owns this site. No company logos.
- Raw evidence (certificates, photos, source files) lives in `private/`
  (git-ignored). Only public-safe wording appears in public files.

## Working style
- One major decision at a time. Ask before major structural or visual choices.
- Before creating or modifying files, state which files and why.
- Teach Git/GitHub concepts (commits, branches, PRs) during the real workflow.
- Challenge weak ideas with clear reasons. No generic filler drafts.
- Record approved decisions in `docs/project-brief.md` so they survive sessions.

## Design direction (for later phases)
- Use the `frontend-design` skill when design/implementation begins.
- Premium, minimal, story-driven. Purposeful motion only.
- Forbidden: purple AI gradients, repeated template cards, excessive rounded
  boxes, fake 3D, decoration-only animation.
- Must be fast, responsive, accessible, excellent on mobile and desktop.
