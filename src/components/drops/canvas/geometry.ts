// Pure geometry helpers for the canvas. No DOM, no deps — easy to test and to
// lift into the bst platform later.
import type { Diagram, DiagramNode, DiagramGroup } from './types';

export interface Pt {
  x: number;
  y: number;
}
export interface Box {
  x: number;
  y: number;
  w: number;
  h: number;
}

export function nodeIndex(d: Diagram): Map<string, DiagramNode> {
  return new Map(d.nodes.map((n) => [n.id, n]));
}

export function center(n: DiagramNode): Pt {
  return { x: n.x + n.w / 2, y: n.y + n.h / 2 };
}

export function groupBox(g: DiagramGroup, byId: Map<string, DiagramNode>): Box {
  const ns = g.nodeIds.map((id) => byId.get(id)).filter((n): n is DiagramNode => Boolean(n));
  const pad = g.pad ?? 26;
  const minX = Math.min(...ns.map((n) => n.x)) - pad;
  const minY = Math.min(...ns.map((n) => n.y)) - pad;
  const maxX = Math.max(...ns.map((n) => n.x + n.w)) + pad;
  const maxY = Math.max(...ns.map((n) => n.y + n.h)) + pad;
  return { x: minX, y: minY, w: maxX - minX, h: maxY - minY };
}

/** Anchor points on each node's border, chosen by the dominant axis between them. */
export function anchors(a: DiagramNode, b: DiagramNode): { p1: Pt; p2: Pt; horizontal: boolean } {
  const ca = center(a);
  const cb = center(b);
  const dx = cb.x - ca.x;
  const dy = cb.y - ca.y;
  const horizontal = Math.abs(dx) >= Math.abs(dy);
  if (horizontal) {
    return {
      p1: { x: dx >= 0 ? a.x + a.w : a.x, y: ca.y },
      p2: { x: dx >= 0 ? b.x : b.x + b.w, y: cb.y },
      horizontal,
    };
  }
  return {
    p1: { x: ca.x, y: dy >= 0 ? a.y + a.h : a.y },
    p2: { x: cb.x, y: dy >= 0 ? b.y : b.y + b.h },
    horizontal,
  };
}

/** Cubic bezier between two anchors, eased along the connection axis. Returns the
 * path `d` plus the t=0.5 midpoint (for the label chip). */
export function bezierPath(p1: Pt, p2: Pt, horizontal: boolean): { d: string; mid: Pt } {
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  const k = 0.5;
  const c1: Pt = horizontal ? { x: p1.x + dx * k, y: p1.y } : { x: p1.x, y: p1.y + dy * k };
  const c2: Pt = horizontal ? { x: p2.x - dx * k, y: p2.y } : { x: p2.x, y: p2.y - dy * k };
  const d = `M ${p1.x} ${p1.y} C ${c1.x} ${c1.y}, ${c2.x} ${c2.y}, ${p2.x} ${p2.y}`;
  const mid: Pt = {
    x: 0.125 * p1.x + 0.375 * c1.x + 0.375 * c2.x + 0.125 * p2.x,
    y: 0.125 * p1.y + 0.375 * c1.y + 0.375 * c2.y + 0.125 * p2.y,
  };
  return { d, mid };
}
