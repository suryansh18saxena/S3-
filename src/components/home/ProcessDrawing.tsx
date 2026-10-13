/**
 * Front elevation of a contemporary house, layered by project stage:
 * 0 site analysis · 1 design intent · 2 approvals · 3 structure ·
 * 4 quality checks · 5 handover. Every stroke has pathLength=1 so it can be
 * "drawn" by animating stroke-dashoffset from 1 to 0.
 */
function P(d: string, extra: React.SVGProps<SVGPathElement> & { key?: string | number } = {}) {
  const { key, ...rest } = extra;
  return <path key={key} d={d} pathLength={1} {...rest} />;
}

const timber = Array.from({ length: 29 }, (_, i) => 236 + i * 14);
const hatch = Array.from({ length: 34 }, (_, i) => 150 + i * 28);

export function ProcessDrawing({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 1200 760" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden focusable="false">
      {/* 0 — Site: ground, sun path, north point, survey pegs */}
      <g data-stage="0" strokeWidth={1.4}>
        {P("M40 640H1160")}
        {P("M90 330Q600 -70 1110 330", { opacity: 0.4, strokeWidth: 1 })}
        {P("M120 150m-28 0a28 28 0 1 0 56 0a28 28 0 1 0-56 0")}
        {P("M120 126L131 160L120 152L109 160Z")}
        {P("M140 632v16M132 640h16M1052 632v16M1044 640h16")}
      </g>

      {/* 1 — Design intent: massing outline + column grid */}
      <g data-stage="1" strokeWidth={1.4}>
        {P("M150 640V480H380V300H660V220H880V280H1060V640")}
        {P("M380 480H660")}
        {P("M660 220V640")}
        {P("M880 280V640")}
        {P("M380 90V300M660 90V220M880 90V280M1060 90V280", { opacity: 0.5 })}
        {P("M380 72m-16 0a16 16 0 1 0 32 0a16 16 0 1 0-32 0M660 72m-16 0a16 16 0 1 0 32 0a16 16 0 1 0-32 0M880 72m-16 0a16 16 0 1 0 32 0a16 16 0 1 0-32 0M1060 72m-16 0a16 16 0 1 0 32 0a16 16 0 1 0-32 0")}
      </g>

      {/* 2 — Approvals: dimension strings, level markers, seal */}
      <g data-stage="2" strokeWidth={1.2}>
        {P("M150 600V700M1060 600V700M150 690H1060M150 684v12M380 684v12M660 684v12M880 684v12M1060 684v12")}
        {P("M1090 640h40M1090 480h40M1090 300h40M1100 640l10-12l10 12M1100 480l10-12l10 12M1100 300l10-12l10 12")}
        {P("M1010 150m-44 0a44 44 0 1 0 88 0a44 44 0 1 0-88 0M1010 150m-34 0a34 34 0 1 0 68 0a34 34 0 1 0-68 0")}
        {P("M994 151l11 11l21-24")}
      </g>

      {/* 3 — Structure: foundation, columns, slabs */}
      <g data-stage="3" strokeWidth={2.2}>
        {P("M140 640H1070V686H140Z")}
        {hatch.map((x) => P(`M${x} 686L${x + 30} 640`, { key: x, strokeWidth: 1, opacity: 0.55 }))}
        {P("M376 640V300M384 640V300M656 640V220M664 640V220M876 640V280M884 640V280M1056 640V280M1064 640V280M146 640V480M154 640V480")}
        {P("M146 484H664M376 304H664M656 224H884M876 284H1064M876 484H1064")}
      </g>

      {/* 4 — Quality: inspection points and checks */}
      <g data-stage="4" strokeWidth={1.4}>
        {P("M60 480H1140", { opacity: 0.35, strokeWidth: 1 })}
        {[
          [265, 560],
          [520, 390],
          [770, 300],
          [970, 380],
          [970, 560],
        ].map(([x, y]) => (
          <g key={`${x}-${y}`}>
            {P(`M${x} ${y}m-15 0a15 15 0 1 0 30 0a15 15 0 1 0-30 0`)}
            {P(`M${x - 6} ${y + 1}l4 5l9-11`)}
          </g>
        ))}
      </g>

      {/* 5 — Handover: openings, cladding, canopy, landscape */}
      <g data-stage="5" strokeWidth={1.4}>
        <rect x="190" y="530" width="180" height="110" pathLength={1} className="fill-current/5" />
        {P("M250 530V640M310 530V640")}
        <rect x="410" y="340" width="230" height="70" pathLength={1} className="fill-sky-300/10" />
        {P("M467 340V410M525 340V410M582 340V410")}
        {P("M400 470H760V500H400Z")}
        <rect x="520" y="518" width="58" height="122" pathLength={1} />
        <rect x="592" y="512" width="64" height="128" pathLength={1} className="fill-sky-300/10" />
        {timber.map((y) => P(`M672 ${y}H868`, { key: y, strokeWidth: 0.9, opacity: 0.6 }))}
        <rect x="900" y="320" width="140" height="120" pathLength={1} className="fill-sky-300/10" />
        {P("M946 320V440M993 320V440")}
        <rect x="900" y="500" width="140" height="120" pathLength={1} className="fill-sky-300/10" />
        {P("M946 500V620M993 500V620")}
        {P("M78 640V560M78 560m-34 -24a40 40 0 1 0 68 0a40 40 0 1 0-68 0")}
        {P("M1110 640V575M1110 575m-26 -18a32 32 0 1 0 52 0a32 32 0 1 0-52 0")}
      </g>

      <g fill="currentColor" stroke="none" className="font-display" fontSize="15" letterSpacing="2">
        <text x="1138" y="645" data-stage-label="2">GL</text>
        <text x="1138" y="485" data-stage-label="2">FFL</text>
        <text x="1138" y="305" data-stage-label="2">TOS</text>
        <text x="113" y="205" data-stage-label="0">N</text>
      </g>
    </svg>
  );
}
