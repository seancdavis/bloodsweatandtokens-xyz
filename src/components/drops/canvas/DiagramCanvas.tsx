import { useCallback, useEffect, useRef, useState } from 'react';
import type { Diagram } from './types';
import { anchors, bezierPath, groupBox, nodeIndex } from './geometry';

interface Props {
  diagram: Diagram;
  /** screen-reader description; the page prose is the real explanation */
  label?: string;
}

const MIN_K = 0.45;
const MAX_K = 2.8;
const clampK = (k: number) => Math.min(MAX_K, Math.max(MIN_K, k));

interface Transform {
  x: number;
  y: number;
  k: number;
}

// --- compact line icons (stroke = currentColor) ---
const ico = { width: 18, height: 18, viewBox: '0 0 20 20', fill: 'none' } as const;
const stroke = { stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
const IconMinus = () => (<svg {...ico} aria-hidden="true"><line x1="4" y1="10" x2="16" y2="10" {...stroke} /></svg>);
const IconPlus = () => (<svg {...ico} aria-hidden="true"><line x1="4" y1="10" x2="16" y2="10" {...stroke} /><line x1="10" y1="4" x2="10" y2="16" {...stroke} /></svg>);
const IconFit = () => (<svg {...ico} aria-hidden="true"><rect x="3.5" y="5.5" width="13" height="9" rx="1" {...stroke} /></svg>);
const IconExpand = () => (<svg {...ico} aria-hidden="true"><path d="M8 10H3m0 0l2.5-2.5M3 10l2.5 2.5M12 10h5m0 0l-2.5-2.5M17 10l-2.5 2.5" {...stroke} /></svg>);
const IconFullscreen = () => (<svg {...ico} aria-hidden="true"><path d="M3 7V3h4M17 7V3h-4M3 13v4h4M17 13v4h-4" {...stroke} /></svg>);

/**
 * An owned, hand-built SVG canvas: pan (drag / two-finger), zoom (buttons,
 * ⌘/ctrl-scroll, pinch), fit, expand (full-bleed) and true fullscreen. Nodes are
 * <foreignObject> HTML cards (so text reuses CSS) that pan/zoom with the group
 * transform; edges are SVG paths. Base fit is the viewBox, so it renders
 * correctly server-side and the user transform layers on top.
 */
export default function DiagramCanvas({ diagram, label }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const [t, setT] = useState<Transform>({ x: 0, y: 0, k: 1 });
  const [expanded, setExpanded] = useState(false);
  const [isFs, setIsFs] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  const pointers = useRef<Map<number, { x: number; y: number }>>(new Map());
  const pinch = useRef<{ dist: number; midX: number; midY: number } | null>(null);

  const byId = nodeIndex(diagram);

  const rootScale = useCallback(() => svgRef.current?.getScreenCTM()?.a ?? 1, []);

  const panByScreen = useCallback((dxScreen: number, dyScreen: number) => {
    const s = rootScale() || 1;
    setT((p) => ({ ...p, x: p.x + dxScreen / s, y: p.y + dyScreen / s }));
  }, [rootScale]);

  const zoomAtClient = useCallback((clientX: number, clientY: number, factor: number) => {
    const svg = svgRef.current;
    const m = svg?.getScreenCTM();
    if (!svg || !m) return;
    const Ls = new DOMPoint(clientX, clientY).matrixTransform(m.inverse());
    setT((p) => {
      const k2 = clampK(p.k * factor);
      if (k2 === p.k) return p;
      const c = { x: (Ls.x - p.x) / p.k, y: (Ls.y - p.y) / p.k };
      return { k: k2, x: p.x + (p.k - k2) * c.x, y: p.y + (p.k - k2) * c.y };
    });
  }, []);

  const zoomCenter = useCallback((factor: number) => {
    const r = containerRef.current?.getBoundingClientRect();
    if (!r) return;
    zoomAtClient(r.left + r.width / 2, r.top + r.height / 2, factor);
  }, [zoomAtClient]);

  const fit = useCallback(() => setT({ x: 0, y: 0, k: 1 }), []);

  // ---- pointer pan + pinch ----
  const onPointerDown = (e: React.PointerEvent<SVGSVGElement>) => {
    (e.target as Element).setPointerCapture?.(e.pointerId);
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.current.size >= 2) pinch.current = null;
  };

  const onPointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    const prev = pointers.current.get(e.pointerId);
    if (!prev) return;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    const pts = [...pointers.current.values()];
    if (pts.length === 1) {
      panByScreen(e.clientX - prev.x, e.clientY - prev.y);
      return;
    }
    const [a, b] = pts;
    const dist = Math.hypot(a.x - b.x, a.y - b.y);
    const midX = (a.x + b.x) / 2;
    const midY = (a.y + b.y) / 2;
    if (pinch.current && pinch.current.dist > 0) {
      zoomAtClient(midX, midY, dist / pinch.current.dist);
      panByScreen(midX - pinch.current.midX, midY - pinch.current.midY);
    }
    pinch.current = { dist, midX, midY };
  };

  const endPointer = (e: React.PointerEvent<SVGSVGElement>) => {
    pointers.current.delete(e.pointerId);
    if (pointers.current.size < 2) pinch.current = null;
  };

  // ⌘/ctrl-wheel zoom (plain scroll passes to the page). Native, non-passive.
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const onWheel = (e: WheelEvent) => {
      if (!(e.ctrlKey || e.metaKey)) return;
      e.preventDefault();
      zoomAtClient(e.clientX, e.clientY, e.deltaY < 0 ? 1.12 : 1 / 1.12);
    };
    svg.addEventListener('wheel', onWheel, { passive: false });
    return () => svg.removeEventListener('wheel', onWheel);
  }, [zoomAtClient]);

  useEffect(() => {
    const onChange = () => setIsFs(document.fullscreenElement === containerRef.current);
    document.addEventListener('fullscreenchange', onChange);
    return () => document.removeEventListener('fullscreenchange', onChange);
  }, []);

  const toggleFs = () => {
    const el = containerRef.current;
    if (!el) return;
    if (document.fullscreenElement) document.exitFullscreen();
    else el.requestFullscreen?.();
  };

  return (
    <div className="dgmc-shell" data-expanded={expanded ? '' : undefined}>
      <div className="dgmc" ref={containerRef} data-fs={isFs ? '' : undefined} role="img" aria-label={label}>
        <svg
          ref={svgRef}
          className="dgmc__svg"
          viewBox={`0 0 ${diagram.width} ${diagram.height}`}
          preserveAspectRatio="xMidYMid meet"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endPointer}
          onPointerCancel={endPointer}
        >
          <defs>
            <marker id="dgmc-arrow" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0,0 L10,5 L0,10 z" fill="context-stroke" />
            </marker>
          </defs>

          <g transform={`translate(${t.x} ${t.y}) scale(${t.k})`}>
            {/* regions */}
            {diagram.groups?.map((g) => {
              const box = groupBox(g, byId);
              const labelY = g.labelAt === 'bottom' ? box.y + box.h - 22 : box.y - 4;
              return (
                <g key={g.id}>
                  <rect className={`dgmc-region dgmc-region--${g.tone ?? 'zone'}`} x={box.x} y={box.y} width={box.w} height={box.h} />
                  {g.label && (
                    <foreignObject x={box.x + 8} y={labelY} width={box.w - 16} height={26}>
                      <div className="dgmc-region__label">{g.label}</div>
                    </foreignObject>
                  )}
                </g>
              );
            })}

            {/* edges */}
            {diagram.edges.map((e, i) => {
              const a = byId.get(e.from);
              const b = byId.get(e.to);
              if (!a || !b) return null;
              const { p1, p2, horizontal } = anchors(a, b);
              const { d, mid } = bezierPath(p1, p2, horizontal);
              return (
                <g key={`${e.from}-${e.to}-${i}`}>
                  <path
                    className={`dgmc-edge dgmc-edge--${e.kind ?? 'flow'}`}
                    d={d}
                    markerEnd="url(#dgmc-arrow)"
                    markerStart={e.dir === 'both' ? 'url(#dgmc-arrow)' : undefined}
                  />
                  {e.label && (
                    <foreignObject x={mid.x - 84} y={mid.y - 14} width={168} height={28}>
                      <div className="dgmc-edge-label"><span>{e.label}</span></div>
                    </foreignObject>
                  )}
                </g>
              );
            })}

            {/* nodes */}
            {diagram.nodes.map((n) => (
              <foreignObject key={n.id} x={n.x} y={n.y} width={n.w} height={n.h}>
                <div className={`dgmc-node dgmc-node--${n.tone ?? 'control'}${n.emphasis ? ' is-focal' : ''}`}>
                  <span className="dgmc-node__bar" />
                  {n.kind && <p className="dgmc-node__kind">{n.kind}</p>}
                  <p className="dgmc-node__title">{n.title}</p>
                  {n.body && <p className="dgmc-node__body">{n.body}</p>}
                  {n.runsOn && <p className="dgmc-node__runs">{n.runsOn}</p>}
                </div>
              </foreignObject>
            ))}
          </g>
        </svg>

        {diagram.legend && (
          <ul className="dgmc__legend">
            {diagram.legend.map((item) => (
              <li key={item.tone} className="dgmc__legend-item">
                <span className={`dgmc__legend-swatch dgmc-node--${item.tone}`} />
                {item.label}
              </li>
            ))}
          </ul>
        )}

        <div className="dgmc__controls">
          <button type="button" className="dgmc__btn" onClick={() => zoomCenter(1 / 1.2)} title="Zoom out" aria-label="Zoom out"><IconMinus /></button>
          <button type="button" className="dgmc__btn" onClick={() => zoomCenter(1.2)} title="Zoom in" aria-label="Zoom in"><IconPlus /></button>
          <button type="button" className="dgmc__btn" onClick={fit} title="Fit to view" aria-label="Fit to view"><IconFit /></button>
          <button type="button" className="dgmc__btn" onClick={() => setExpanded((v) => !v)} title={expanded ? 'Contract' : 'Expand to full width'} aria-label="Expand to full width" aria-pressed={expanded}><IconExpand /></button>
          <button type="button" className="dgmc__btn" onClick={toggleFs} title={isFs ? 'Exit fullscreen' : 'Fullscreen'} aria-label="Fullscreen" aria-pressed={isFs}><IconFullscreen /></button>
          <button type="button" className="dgmc__btn dgmc__btn--help" onClick={() => setShowHelp((v) => !v)} title="How to navigate" aria-label="How to navigate" aria-expanded={showHelp}>?</button>
        </div>

        {showHelp && (
          <div className="dgmc__help" role="status">
            <p>Drag to pan.</p>
            <p>⌘/Ctrl-scroll — or pinch — to zoom.</p>
            <p>Use the buttons to fit, expand, or go fullscreen.</p>
          </div>
        )}
      </div>
    </div>
  );
}
