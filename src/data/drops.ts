// Drops — bespoke pages (architecture diagrams + other one-offs). One entry per
// drop; the page itself lives at src/pages/drops/<slug>.astro and composes the
// diagram vocabulary in src/components/drops/. A drop may name a companion
// episode (cross-linked from the drop hero; surfaced on the episode later).

export type Drop = {
  id: string;
  /** sequential code: SSEE + a letter for the Nth drop of that episode (e.g. 0101A) */
  code: string;
  slug: string;
  title: string;
  dek: string;
  kind: string;
  publishedAt: string;
  episodeSlug?: string;
  episodeTitle?: string;
};

export const drops: Drop[] = [
  {
    id: 'owning-the-stack',
    code: '0101A',
    slug: 'owning-the-stack',
    title: 'Owning the Stack',
    dek: 'Why the platform behind the show stopped being a bespoke stack per client (v0.2) and became one base that talks to a single hub (v0.3) — the happy path, and why it is so much simpler.',
    kind: 'System map',
    publishedAt: '2026-06-24',
    episodeSlug: 'smooth-operations-how-ai-eliminates-cms-friction',
    episodeTitle: 'S01 E01 — Smooth Operations',
  },
];
