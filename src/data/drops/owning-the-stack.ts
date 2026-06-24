import type { Diagram } from '../../components/drops/canvas/types';

// "Owning the Stack" — two separate canvases, read like an article.
//
// v0.2: every client is a bespoke stack (their own framework, their own cloud —
// Netlify vs Cloudflare — and maybe their own content source — Contentful vs a
// self-hosted content backend). A desktop app sits on every user's machine, and
// one orchestrator in the middle is the only shared piece.
//
// v0.3: homogeneous. Every customer site starts from the same base template +
// shared libraries and talks to one hub for everything (read, write, AI). Only
// the hub touches the backends (Postgres + OpenRouter). Far simpler.

const TONE_LEGEND_V02 = [
  { tone: 'control' as const, label: 'Our app + orchestrator' },
  { tone: 'delivery' as const, label: 'Client sites' },
  { tone: 'data' as const, label: 'Our content backend' },
  { tone: 'external' as const, label: 'Third-party platform' },
];

export const v02: Diagram = {
  width: 1320,
  height: 820,
  nodes: [
    {
      id: 'desk',
      x: 535,
      y: 40,
      w: 230,
      h: 96,
      tone: 'control',
      kind: 'desktop app',
      title: 'Desk',
      body: 'one copy installed per user',
    },
    {
      id: 'orchestrator',
      x: 520,
      y: 224,
      w: 260,
      h: 116,
      tone: 'control',
      emphasis: true,
      kind: 'Hono · Mac mini',
      title: 'Orchestrator',
      body: 'the only shared piece · per-client adapters',
    },

    // Client A — their own stack
    {
      id: 'site-a',
      x: 150,
      y: 452,
      w: 220,
      h: 96,
      tone: 'delivery',
      kind: 'framework: Next',
      title: 'Client A site',
      body: 'their own stack',
    },
    {
      id: 'netlify',
      x: 110,
      y: 632,
      w: 190,
      h: 88,
      tone: 'external',
      kind: 'hosting',
      title: 'Netlify',
    },
    {
      id: 'contentful',
      x: 330,
      y: 632,
      w: 200,
      h: 96,
      tone: 'external',
      kind: 'external CMS',
      title: 'Contentful',
    },

    // Client B — their own stack
    {
      id: 'site-b',
      x: 950,
      y: 452,
      w: 220,
      h: 96,
      tone: 'delivery',
      kind: 'framework: Astro',
      title: 'Client B site',
      body: 'their own stack',
    },
    {
      id: 'cloudflare',
      x: 800,
      y: 632,
      w: 200,
      h: 88,
      tone: 'external',
      kind: 'hosting',
      title: 'Cloudflare Pages',
    },
    {
      id: 'backend',
      x: 1030,
      y: 632,
      w: 220,
      h: 104,
      tone: 'data',
      kind: 'self-hosted CMS',
      title: 'Content backend',
      body: 'shipped per project',
    },
  ],
  edges: [
    { from: 'desk', to: 'orchestrator', label: 'SSE · REST', kind: 'flow' },
    { from: 'orchestrator', to: 'site-a', label: 'adapter', kind: 'flow' },
    { from: 'orchestrator', to: 'site-b', label: 'adapter', kind: 'flow' },
    { from: 'site-a', to: 'netlify', label: 'deploys', kind: 'flow' },
    { from: 'site-a', to: 'contentful', label: 'content', kind: 'flow' },
    { from: 'site-b', to: 'cloudflare', label: 'deploys', kind: 'flow' },
    { from: 'site-b', to: 'backend', label: 'content', kind: 'flow' },
  ],
  groups: [
    {
      id: 'client-a',
      label: 'Client A — their own stack',
      tone: 'zone',
      pad: 30,
      labelAt: 'bottom',
      nodeIds: ['site-a', 'netlify', 'contentful'],
    },
    {
      id: 'client-b',
      label: 'Client B — their own stack',
      tone: 'zone',
      pad: 30,
      labelAt: 'bottom',
      nodeIds: ['site-b', 'cloudflare', 'backend'],
    },
  ],
  legend: TONE_LEGEND_V02,
};

export const v03: Diagram = {
  width: 820,
  height: 780,
  nodes: [
    {
      id: 'base',
      x: 280,
      y: 56,
      w: 260,
      h: 102,
      tone: 'delivery',
      kind: 'Astro + toolkits',
      title: 'Base template',
      body: 'every site starts from the same base',
    },
    {
      id: 'site-1',
      x: 110,
      y: 244,
      w: 210,
      h: 88,
      tone: 'delivery',
      kind: 'from the base',
      title: 'Customer site 1',
    },
    {
      id: 'site-2',
      x: 500,
      y: 244,
      w: 210,
      h: 88,
      tone: 'delivery',
      kind: 'from the base',
      title: 'Customer site 2',
    },
    {
      id: 'hub',
      x: 250,
      y: 426,
      w: 320,
      h: 132,
      tone: 'control',
      emphasis: true,
      kind: 'Astro SSR · Netlify',
      title: 'Hub',
      body: 'control plane · orchestrator · the one content + AI API',
    },
    {
      id: 'postgres',
      x: 150,
      y: 636,
      w: 220,
      h: 96,
      tone: 'data',
      kind: 'Netlify DB',
      title: 'Netlify Postgres',
      body: 'tenant-isolated content',
    },
    {
      id: 'openrouter',
      x: 450,
      y: 636,
      w: 210,
      h: 92,
      tone: 'ai',
      kind: 'AI · cheap models',
      title: 'OpenRouter',
    },
  ],
  edges: [
    { from: 'base', to: 'site-1', label: 'applies', kind: 'flow' },
    { from: 'base', to: 'site-2', label: 'applies', kind: 'flow' },
    { from: 'site-1', to: 'hub', label: 'read · write · AI', kind: 'flow' },
    { from: 'site-2', to: 'hub', label: 'read · write · AI', kind: 'flow' },
    { from: 'hub', to: 'postgres', label: 'content', kind: 'data' },
    { from: 'hub', to: 'openrouter', label: 'AI', kind: 'data' },
  ],
  groups: [
    {
      id: 'sites',
      label: 'Two sites, one base + shared libraries',
      tone: 'zone',
      pad: 30,
      labelAt: 'top',
      nodeIds: ['base', 'site-1', 'site-2'],
    },
  ],
  legend: [
    { tone: 'control', label: 'Hub (control plane)' },
    { tone: 'delivery', label: 'Customer sites + base' },
    { tone: 'data', label: 'Postgres (content)' },
    { tone: 'ai', label: 'OpenRouter (AI)' },
  ],
};
