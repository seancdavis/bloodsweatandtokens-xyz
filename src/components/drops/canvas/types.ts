// The declarative diagram model — the repeatable "vocabulary", now coordinate-based.
// A drop authors a Diagram (nodes/edges/groups in logical canvas coords) and hands
// it to <DiagramCanvas/>. Color encodes subsystem; the legend is derived from it.

export type NodeTone =
  | 'control' // control plane / compute (blood)
  | 'data' // storage (tokens / gold)
  | 'delivery' // sites / edge (sweat / blue)
  | 'ai' // model service (neutral)
  | 'external' // third-party service (neutral)
  | 'retired'; // exists in v0.2 only — faded

export type EdgeKind = 'flow' | 'data' | 'code';

export interface DiagramNode {
  id: string;
  /** top-left + size, in logical canvas coords */
  x: number;
  y: number;
  w: number;
  h: number;
  title: string;
  kind?: string;
  body?: string;
  runsOn?: string;
  tone?: NodeTone;
  /** focal node — rendered with more weight */
  emphasis?: boolean;
}

export interface DiagramEdge {
  from: string;
  to: string;
  label?: string;
  dir?: 'forward' | 'both';
  kind?: EdgeKind;
}

export interface DiagramGroup {
  id: string;
  label?: string;
  nodeIds: string[];
  tone?: 'zone' | 'adapter';
  /** padding around member-node bounds */
  pad?: number;
}

export interface LegendItem {
  tone: NodeTone;
  label: string;
}

export interface Diagram {
  /** logical canvas bounds */
  width: number;
  height: number;
  nodes: DiagramNode[];
  edges: DiagramEdge[];
  groups?: DiagramGroup[];
  legend?: LegendItem[];
}
