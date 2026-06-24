// Drops — bespoke pages (architecture diagrams + other one-offs). One entry per
// drop; the page itself lives at src/pages/drops/<slug>.astro and composes the
// diagram vocabulary in src/components/drops/. A drop may name a companion
// episode (cross-linked from the drop hero; surfaced on the episode later).

export type Drop = {
  id: string;
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
    slug: 'owning-the-stack',
    title: 'Owning the Stack',
    dek: 'How the platform behind the show went from an engine-plus-adapters sprawl (v0.2) to one owned, content-as-data stack (v0.3) — and deleted most of the moving parts on the way.',
    kind: 'System map',
    publishedAt: '2026-06-24',
    episodeSlug: 'smooth-operations-how-ai-eliminates-cms-friction',
    episodeTitle: 'S01 E01 — Smooth Operations',
  },
];
