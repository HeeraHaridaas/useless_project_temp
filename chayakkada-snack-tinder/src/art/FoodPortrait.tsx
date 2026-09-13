import type { JSX } from 'react'
import type { Food } from '../data/foods'

/**
 * Hand-authored SVG food portraits. One drawing per registered food.
 * Each portrait is a small scene, not an icon: plate, leaf, glass, kadai,
 * banana leaf, newspaper cone etc. drawn with flat print-like shapes.
 */

const P = {
  ink: '#2B2118',
  cream: '#F2E8D5',
  leaf: '#5F7A3D',
  leafDark: '#3E5527',
  plate: '#E9E2D0',
  plateShade: '#CFC6AE',
  wood: '#8A5A32',
  woodDark: '#5C3A1E',
  gold: '#D9A441',
  goldDeep: '#8A5A1B',
  steam: '#D9CDB6',
}

function Steam({ x, y }: { x: number; y: number }) {
  return (
    <g stroke={P.steam} strokeWidth="2.4" strokeLinecap="round" fill="none" opacity="0.8">
      <path d={`M ${x} ${y} q 4 -8 0 -14 q -4 -6 0 -13`} />
      <path d={`M ${x + 11} ${y + 3} q 4 -8 0 -14`} opacity="0.6" />
    </g>
  )
}

function Eyes({ x, y }: { x: number; y: number }) {
  return (
    <g fill={P.ink}>
      <circle cx={x} cy={y} r="2.6" />
      <circle cx={x + 13} cy={y} r="2.6" />
    </g>
  )
}

function Smile({ x, y }: { x: number; y: number }) {
  return <path d={`M ${x} ${y} q 7 7 14 0`} stroke={P.ink} strokeWidth="2.4" fill="none" strokeLinecap="round" />
}

function Plate({ cx, cy, rx = 52, ry = 15 }: { cx: number; cy: number; rx?: number; ry?: number }) {
  return (
    <g>
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={P.plate} stroke={P.ink} strokeWidth="2" />
      <ellipse cx={cx} cy={cy - 3} rx={rx - 8} ry={ry - 5} fill="none" stroke={P.plateShade} strokeWidth="2" />
    </g>
  )
}

function BananaLeaf({ x, y, w = 130, h = 34 }: { x: number; y: number; w?: number; h?: number }) {
  return (
    <g>
      <path
        d={`M ${x} ${y} q ${w / 2} ${-h} ${w} 0 q ${-w / 2} ${h * 0.7} ${-w} 0 z`}
        fill={P.leaf}
        stroke={P.leafDark}
        strokeWidth="2"
      />
      <path d={`M ${x + 6} ${y} L ${x + w - 6} ${y}`} stroke={P.leafDark} strokeWidth="1.6" />
    </g>
  )
}

function Glass({ x, y, fill, deep }: { x: number; y: number; fill: string; deep: string }) {
  return (
    <g>
      <path d={`M ${x} ${y} L ${x + 34} ${y} L ${x + 30} ${y + 44} L ${x + 4} ${y + 44} Z`} fill={deep} stroke={P.ink} strokeWidth="2" />
      <path d={`M ${x + 3.5} ${y + 6} L ${x + 30.5} ${y + 6} L ${x + 27} ${y + 40} L ${x + 7} ${y + 40} Z`} fill={fill} />
      <ellipse cx={x + 17} cy={y + 2.5} rx="17" ry="4" fill={fill} stroke={P.ink} strokeWidth="2" />
    </g>
  )
}

const DRAWINGS: Record<string, () => JSX.Element> = {
  'pazham-pori': () => (
    <g>
      <Plate cx={110} cy={150} />
      <g>
        <rect x="72" y="92" width="42" height="56" rx="8" fill={P.gold} stroke={P.ink} strokeWidth="2.4" transform="rotate(-8 93 120)" />
        <rect x="108" y="88" width="42" height="58" rx="8" fill="#E8C14A" stroke={P.ink} strokeWidth="2.4" transform="rotate(7 129 117)" />
        <rect x="90" y="86" width="44" height="60" rx="8" fill={P.gold} stroke={P.ink} strokeWidth="2.4" />
      </g>
      <Eyes x={100} y={110} />
      <Smile x={100} y={118} />
      <circle cx="82" cy="140" r="3" fill={P.goldDeep} />
      <circle cx="140" cy="136" r="3" fill={P.goldDeep} />
      <Steam x={150} y={70} />
    </g>
  ),
  parotta: () => (
    <g>
      <Plate cx={110} cy={152} />
      <g>
        <ellipse cx="110" cy="120" rx="48" ry="30" fill="#EAD9A8" stroke={P.ink} strokeWidth="2.4" />
        <path d="M 70 112 q 40 -18 80 0" stroke="#B89455" strokeWidth="3" fill="none" />
        <path d="M 68 124 q 42 -16 84 0" stroke="#B89455" strokeWidth="3" fill="none" />
        <path d="M 74 136 q 36 -12 72 0" stroke="#B89455" strokeWidth="3" fill="none" />
      </g>
      <Eyes x={94} y={110} />
      <Smile x={99} y={118} />
      <Steam x={152} y={66} />
    </g>
  ),
  appam: () => (
    <g>
      <Plate cx={110} cy={152} />
      <path d="M 62 118 a 48 40 0 0 1 96 0 l -8 8 a 40 32 0 0 0 -80 0 z" fill="#D9B77E" stroke={P.ink} strokeWidth="2.2" />
      <ellipse cx="110" cy="128" rx="40" ry="26" fill={P.cream} stroke={P.ink} strokeWidth="2.2" />
      <Eyes x={96} y={122} />
      <Smile x={101} y={130} />
      <Steam x={154} y={72} />
    </g>
  ),
  puttu: () => (
    <g>
      <rect x="84" y="120" width="30" height="34" rx="4" fill={P.cream} stroke={P.ink} strokeWidth="2.2" />
      <rect x="84" y="96" width="30" height="26" rx="4" fill="#F7F3E8" stroke={P.ink} strokeWidth="2.2" />
      <rect x="86" y="118" width="26" height="8" fill="#E8E0CC" />
      <rect x="86" y="102" width="26" height="6" fill="#F5EFDC" />
      <g transform="translate(44 4)">
        <rect x="84" y="120" width="30" height="34" rx="4" fill="#F0E8D2" stroke={P.ink} strokeWidth="2.2" />
        <rect x="84" y="96" width="30" height="26" rx="4" fill="#F7F3E8" stroke={P.ink} strokeWidth="2.2" />
      </g>
      <Eyes x={92} y={132} />
      <Smile x={97} y={140} />
      <Steam x={122} y={82} />
    </g>
  ),
  unniyappam: () => (
    <g>
      <BananaLeaf x={44} y={148} />
      {[0, 1, 2, 3].map((i) => (
        <circle
          key={i}
          cx={78 + i * 22}
          cy={130 - (i % 2) * 6}
          r="15"
          fill="#B67A3A"
          stroke={P.ink}
          strokeWidth="2.2"
        />
      ))}
      <circle cx="100" cy="124" r="15" fill="#C98A45" stroke={P.ink} strokeWidth="2.2" />
      <Eyes x={94} y={120} />
      <Smile x={99} y={128} />
      <circle cx="64" cy="140" r="2.5" fill="#5E3617" />
      <circle cx="138" cy="142" r="2.5" fill="#5E3617" />
    </g>
  ),
  samosa: () => (
    <g>
      <Plate cx={110} cy={150} />
      <g strokeLinejoin="round">
        <path d="M 70 140 L 96 92 L 122 140 Z" fill="#D9A441" stroke={P.ink} strokeWidth="2.4" />
        <path d="M 104 142 L 130 94 L 156 142 Z" fill="#C9932F" stroke={P.ink} strokeWidth="2.4" transform="translate(-8 0)" />
      </g>
      <Eyes x={88} y={112} />
      <Smile x={93} y={120} />
      <circle cx="150" cy="112" r="4" fill={P.leaf} />
      <circle cx="158" cy="118" r="4" fill={P.leaf} />
    </g>
  ),
  'banana-chips': () => (
    <g>
      <g stroke={P.ink} strokeWidth="2.2">
        <ellipse cx="86" cy="118" rx="26" ry="30" fill="#E3C368" transform="rotate(-14 86 118)" />
        <ellipse cx="128" cy="112" rx="26" ry="30" fill="#D9B84B" transform="rotate(12 128 112)" />
        <ellipse cx="108" cy="136" rx="26" ry="30" fill="#E8CC58" transform="rotate(-4 108 136)" />
      </g>
      <Eyes x={100} y={124} />
      <Smile x={105} y={132} />
      <path d="M 62 84 L 158 84" stroke={P.woodDark} strokeWidth="3" strokeDasharray="10 6" />
      <text x="110" y="76" textAnchor="middle" fontSize="13" fill={P.woodDark} fontFamily="inherit" letterSpacing="2">
        KILO 1
      </text>
    </g>
  ),
  kozhukatta: () => (
    <g>
      <Plate cx={110} cy={152} />
      {[0, 1].map((i) => (
        <g key={i} transform={`translate(${i * 40 - 20} 0)`}>
          <path d="M 110 90 q 26 10 26 38 a 26 26 0 0 1 -52 0 q 0 -28 26 -38 z" fill="#F1ECDC" stroke={P.ink} strokeWidth="2.2" />
          <path d="M 96 116 q 14 8 28 0" stroke="#C9BFA4" strokeWidth="2" fill="none" />
        </g>
      ))}
      <Eyes x={102} y={116} />
      <Smile x={107} y={124} />
      <Steam x={150} y={70} />
    </g>
  ),
  'beef-fry': () => (
    <g>
      <path d="M 52 128 a 58 26 0 0 1 116 0 l -4 16 a 54 22 0 0 1 -108 0 z" fill="#3B2A20" stroke={P.ink} strokeWidth="2.4" />
      <ellipse cx="110" cy="128" rx="58" ry="24" fill="#4A3226" stroke={P.ink} strokeWidth="2.4" />
      {[78, 100, 124, 144].map((x, i) => (
        <rect key={i} x={x} y={112 - (i % 2) * 8} width="20" height="14" rx="5" fill="#6B3A26" stroke={P.ink} strokeWidth="1.8" />
      ))}
      <Eyes x={98} y={116} />
      <Smile x={103} y={124} />
      <g fill={P.leafDark}>
        <ellipse cx="64" cy="98" rx="7" ry="3.5" transform="rotate(-30 64 98)" />
        <ellipse cx="156" cy="102" rx="7" ry="3.5" transform="rotate(24 156 102)" />
      </g>
      <Steam x={150} y={64} />
    </g>
  ),
  'kerala-biriyani': () => (
    <g>
      <path d="M 48 110 h 124 l -10 44 h -104 z" fill="#B08A4A" stroke={P.ink} strokeWidth="2.4" />
      <ellipse cx="110" cy="110" rx="62" ry="20" fill="#E8C873" stroke={P.ink} strokeWidth="2.4" />
      <g fill="#B89455">
        <ellipse cx="86" cy="106" rx="10" ry="3.4" />
        <ellipse cx="112" cy="112" rx="10" ry="3.4" />
        <ellipse cx="136" cy="105" rx="10" ry="3.4" />
      </g>
      <circle cx="98" cy="100" r="3.4" fill="#F2E8D5" />
      <circle cx="126" cy="102" r="3.4" fill="#F2E8D5" />
      <Eyes x={100} y={92} />
      <Smile x={105} y={100} />
      <g fill={P.leaf}>
        <ellipse cx="70" cy="92" rx="8" ry="3.4" transform="rotate(-20 70 92)" />
        <ellipse cx="150" cy="94" rx="8" ry="3.4" transform="rotate(18 150 94)" />
      </g>
      <Steam x={158} y={62} />
    </g>
  ),
  chaya: () => (
    <g>
      <Glass x={72} y={70} fill="#6B4226" deep="#4A2C16" />
      <Eyes x={82} y={84} />
      <Smile x={86} y={96} />
      <g opacity="0.85">
        <Glass x={130} y={98} fill="#7A4E2E" deep="#52301A" />
      </g>
      <path d="M 60 52 q 8 -10 0 -20" stroke={P.steam} strokeWidth="2.4" fill="none" strokeLinecap="round" />
      <path d="M 96 56 q 8 -10 0 -20" stroke={P.steam} strokeWidth="2.4" fill="none" strokeLinecap="round" />
      <path d="M 40 148 h 140" stroke={P.woodDark} strokeWidth="4" strokeLinecap="round" />
    </g>
  ),
  'kattan-kapi': () => (
    <g>
      <g>
        <path d="M 70 84 h 60 l -8 62 h -44 z" fill="#E9E2D0" stroke={P.ink} strokeWidth="2.4" />
        <path d="M 74 96 h 52 l -6 44 h -40 z" fill="#3A2416" />
        <path d="M 130 92 q 22 4 6 24" stroke={P.ink} strokeWidth="2.4" fill="none" />
      </g>
      <Eyes x={88} y={104} />
      <Smile x={93} y={114} />
      <path d="M 84 62 q 6 -8 0 -16" stroke={P.steam} strokeWidth="2.4" fill="none" strokeLinecap="round" />
      <path d="M 116 62 q 6 -8 0 -16" stroke={P.steam} strokeWidth="2.4" fill="none" strokeLinecap="round" />
    </g>
  ),
  'lime-tea': () => (
    <g>
      <Glass x={78} y={68} fill="#D9C96A" deep="#9A8A2E" />
      <Eyes x={88} y={82} />
      <Smile x={93} y={94} />
      <circle cx="142" cy="120" r="16" fill="#D9C96A" stroke={P.ink} strokeWidth="2.2" />
      <circle cx="142" cy="120" r="10" fill="#E8DC8A" stroke={P.ink} strokeWidth="1.6" />
      <g stroke={P.ink} strokeWidth="1.6">
        <path d="M 142 104 l 0 -6" />
        <path d="M 152 110 l 5 -4" />
        <path d="M 132 110 l -5 -4" />
      </g>
      <text x="142" y="156" textAnchor="middle" fontSize="11" fill={P.woodDark} letterSpacing="2" fontFamily="inherit">
        CHILLED
      </text>
    </g>
  ),
  pizza: () => (
    <g>
      <path d="M 54 96 L 166 96 L 110 164 Z" fill="#E8B84B" stroke={P.ink} strokeWidth="2.4" />
      <path d="M 62 102 L 158 102 L 110 156 Z" fill="#D97045" />
      <g fill="#C9452A">
        <circle cx="94" cy="112" r="7" />
        <circle cx="124" cy="118" r="7" />
        <circle cx="110" cy="136" r="6" />
      </g>
      <Eyes x={100} y={112} />
      <Smile x={105} y={122} />
      <circle cx="140" cy="108" r="4" fill="#C9452A" />
    </g>
  ),
  shawarma: () => (
    <g>
      <rect x="62" y="86" width="96" height="58" rx="26" fill="#E8D2A0" stroke={P.ink} strokeWidth="2.4" />
      <path d="M 62 108 h 96" stroke="#C9A86A" strokeWidth="2.4" />
      <path d="M 70 132 q 40 10 80 0" stroke="#C9A86A" strokeWidth="2" fill="none" />
      <Eyes x={94} y={106} />
      <Smile x={99} y={114} />
      <path d="M 154 96 q 10 -2 8 8" stroke={P.leafDark} strokeWidth="2.4" fill="none" />
      <text x="110" y="76" textAnchor="middle" fontSize="11" fill={P.woodDark} letterSpacing="2" fontFamily="inherit">
        AFTER 9 PM
      </text>
    </g>
  ),
  burger: () => (
    <g>
      <path d="M 60 96 a 50 34 0 0 1 100 0 z" fill="#D9A441" stroke={P.ink} strokeWidth="2.4" />
      <g stroke="#8A5A1B" strokeWidth="2">
        <path d="M 84 76 l 4 -6" />
        <path d="M 110 72 l 4 -6" />
        <path d="M 136 76 l 4 -6" />
      </g>
      <rect x="58" y="96" width="104" height="10" fill={P.leaf} stroke={P.ink} strokeWidth="2" />
      <rect x="62" y="106" width="96" height="16" rx="7" fill="#7A3B2A" stroke={P.ink} strokeWidth="2.2" />
      <rect x="58" y="122" width="104" height="12" rx="5" fill="#E8C14A" stroke={P.ink} strokeWidth="2.2" />
      <path d="M 60 134 a 50 26 0 0 0 100 0 z" fill="#D9A441" stroke={P.ink} strokeWidth="2.4" />
      <Eyes x={98} y={84} />
      <Smile x={103} y={92} />
    </g>
  ),
  'ice-cream': () => (
    <g>
      <path d="M 88 100 L 110 162 L 132 100 Z" fill="#D9A441" stroke={P.ink} strokeWidth="2.2" />
      <g stroke="#8A5A1B" strokeWidth="1.6">
        <path d="M 92 108 L 128 108" />
        <path d="M 96 122 L 124 122" />
        <path d="M 100 136 L 120 136" />
      </g>
      <circle cx="96" cy="92" r="16" fill="#F2E8D5" stroke={P.ink} strokeWidth="2.2" />
      <circle cx="124" cy="92" r="16" fill="#EFD9E8" stroke={P.ink} strokeWidth="2.2" />
      <circle cx="110" cy="76" r="17" fill="#F6EFE2" stroke={P.ink} strokeWidth="2.2" />
      <Eyes x={102} y={72} />
      <Smile x={107} y={80} />
      <circle cx="88" cy="84" r="2" fill="#C98AA5" />
      <circle cx="132" cy="84" r="2" fill="#C98AA5" />
    </g>
  ),
  'french-fries': () => (
    <g>
      <path d="M 66 104 h 88 l -8 52 h -72 z" fill="#C9452A" stroke={P.ink} strokeWidth="2.4" />
      <g stroke={P.ink} strokeWidth="2">
        <rect x="82" y="70" width="10" height="44" fill="#E8C84B" transform="rotate(-8 87 92)" />
        <rect x="98" y="64" width="10" height="50" fill="#E8C14A" />
        <rect x="114" y="68" width="10" height="46" fill="#E8C84B" transform="rotate(7 119 91)" />
        <rect x="128" y="72" width="10" height="42" fill="#D9B83B" transform="rotate(14 133 93)" />
      </g>
      <path d="M 96 118 l 14 10 l 20 -14" stroke={P.cream} strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <text x="110" y="150" textAnchor="middle" fontSize="10" fill={P.cream} letterSpacing="3" fontFamily="inherit">
        EXTRA
      </text>
    </g>
  ),
  'plain-rice': () => (
    <g>
      <ellipse cx="110" cy="120" rx="66" ry="44" fill="#E9E2D0" stroke={P.ink} strokeWidth="2.4" />
      <path d="M 52 104 a 62 36 0 0 1 116 0" fill="#F4F0E4" stroke={P.ink} strokeWidth="2.4" />
      <g fill="#F7F4EA" stroke={P.ink} strokeWidth="1.4">
        <ellipse cx="88" cy="112" rx="9" ry="5" transform="rotate(-16 88 112)" />
        <ellipse cx="112" cy="106" rx="9" ry="5" transform="rotate(10 112 106)" />
        <ellipse cx="132" cy="116" rx="9" ry="5" transform="rotate(-6 132 116)" />
        <ellipse cx="98" cy="128" rx="9" ry="5" transform="rotate(14 98 128)" />
        <ellipse cx="124" cy="130" rx="9" ry="5" transform="rotate(-12 124 130)" />
      </g>
      <Eyes x={100} y={106} />
      <Smile x={105} y={114} />
    </g>
  ),
  noodles: () => (
    <g>
      <ellipse cx="110" cy="122" rx="62" ry="40" fill="#E9E2D0" stroke={P.ink} strokeWidth="2.4" />
      <g stroke="#E8C84B" strokeWidth="5" fill="none" strokeLinecap="round">
        <path d="M 66 118 q 44 -20 88 0" />
        <path d="M 70 130 q 40 -16 80 0" />
        <path d="M 76 142 q 34 -12 68 0" />
      </g>
      <g fill="#C9452A">
        <rect x="94" y="108" width="12" height="8" rx="2" />
        <rect x="120" y="122" width="12" height="8" rx="2" />
      </g>
      <Eyes x={100} y={104} />
      <Smile x={105} y={112} />
      <path d="M 160 84 q 12 -12 2 -24" stroke={P.steam} strokeWidth="2.4" fill="none" strokeLinecap="round" />
    </g>
  ),
  'hostel-maggi': () => (
    <g>
      <path d="M 74 92 h 72 v 46 a 12 12 0 0 1 -12 12 h -48 a 12 12 0 0 1 -12 -12 z" fill="#C9452A" stroke={P.ink} strokeWidth="2.4" />
      <path d="M 74 104 h 72" stroke={P.cream} strokeWidth="2" />
      <path d="M 86 118 h 48" stroke="#8A2F14" strokeWidth="2" />
      <rect x="88" y="126" width="44" height="12" rx="2" fill={P.cream} stroke={P.ink} strokeWidth="1.6" />
      <text x="110" y="135" textAnchor="middle" fontSize="8" fill={P.ink} letterSpacing="1" fontFamily="inherit">
        4 MIN
      </text>
      <g stroke={P.ink} strokeWidth="2">
        <rect x="60" y="60" width="12" height="30" fill="#E8C84B" transform="rotate(-16 66 75)" />
        <rect x="148" y="60" width="12" height="30" fill="#E8C84B" transform="rotate(16 154 75)" />
      </g>
      <Steam x={150} y={54} />
    </g>
  ),
  'kadala-curry': () => (
    <g>
      <path d="M 56 116 h 108 a 8 8 0 0 1 8 8 l -6 30 a 10 10 0 0 1 -10 8 H 64 a 10 10 0 0 1 -10 -8 l -6 -30 a 8 8 0 0 1 8 -8 z" fill="#7A4A26" stroke={P.ink} strokeWidth="2.4" />
      <ellipse cx="110" cy="116" rx="62" ry="16" fill="#5C3617" stroke={P.ink} strokeWidth="2.4" />
      <g fill="#8A5A32" stroke={P.ink} strokeWidth="1.6">
        <circle cx="86" cy="112" r="7" />
        <circle cx="112" cy="118" r="7" />
        <circle cx="134" cy="111" r="7" />
        <circle cx="100" cy="122" r="6" />
        <circle cx="126" cy="124" r="6" />
      </g>
      <path d="M 74 98 q 18 6 36 0 q 18 -6 36 0" stroke="#B89455" strokeWidth="3" fill="none" opacity="0.7" />
      <Eyes x={98} y={116} />
      <Smile x={103} y={124} />
      <Steam x={152} y={72} />
    </g>
  ),
  stew: () => (
    <g>
      <path d="M 60 118 a 50 22 0 0 1 100 0 l -4 26 a 46 18 0 0 1 -92 0 z" fill="#C8A262" stroke={P.ink} strokeWidth="2.4" />
      <ellipse cx="110" cy="118" rx="50" ry="18" fill="#F2EAD8" stroke={P.ink} strokeWidth="2.4" />
      <g stroke={P.ink} strokeWidth="1.8" fill="#E9E2D0">
        <circle cx="90" cy="116" r="8" />
        <circle cx="126" cy="120" r="8" />
        <circle cx="110" cy="110" r="7" />
      </g>
      <g fill={P.leafDark}>
        <ellipse cx="76" cy="108" rx="6" ry="3" transform="rotate(-25 76 108)" />
        <ellipse cx="142" cy="112" rx="6" ry="3" transform="rotate(20 142 112)" />
      </g>
      <Eyes x={100} y={114} />
      <Smile x={105} y={122} />
      <Steam x={150} y={70} />
    </g>
  ),
  egg: () => (
    <g>
      <Plate cx={110} cy={152} />
      <g transform="rotate(-7 110 118)">
        <ellipse cx="110" cy="118" rx="34" ry="42" fill="#F7F1E0" stroke={P.ink} strokeWidth="2.4" />
        <circle cx="110" cy="122" r="15" fill="#E8B84B" stroke={P.ink} strokeWidth="2" />
        <circle cx="106" cy="118" r="4" fill="#F5D67A" />
      </g>
      <Eyes x={102} y={106} />
      <Smile x={105} y={114} />
      <g fill={P.leafDark} opacity="0.9">
        <ellipse cx="72" cy="146" rx="7" ry="3" transform="rotate(-18 72 146)" />
        <ellipse cx="146" cy="148" rx="7" ry="3" transform="rotate(14 146 148)" />
      </g>
    </g>
  ),
  biscuit: () => (
    <g>
      <rect x="52" y="130" width="116" height="22" rx="4" fill="#C9A05C" stroke={P.ink} strokeWidth="2" />
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i} transform={`translate(${52 + i * 24} ${130 - i * 4})`}>
          <circle cx="12" cy="0" r="16" fill="#E3B96A" stroke={P.ink} strokeWidth="2.2" />
          <circle cx="12" cy="0" r="9" fill="none" stroke="#B08A4A" strokeWidth="1.6" />
          <circle cx="8" cy="-4" r="1.6" fill="#B08A4A" />
          <circle cx="16" cy="-4" r="1.6" fill="#B08A4A" />
          <path d="M 7 4 q 5 4 10 0" stroke="#B08A4A" strokeWidth="1.6" fill="none" />
        </g>
      ))}
      <Glass x={158} y={96} fill="#6B4226" deep="#4A2C1A" />
    </g>
  ),
  payasam: () => (
    <g>
      <path d="M 66 108 q 44 10 88 0 l -6 34 a 40 14 0 0 1 -76 0 z" fill="#C9A05C" stroke={P.ink} strokeWidth="2.4" />
      <ellipse cx="110" cy="108" rx="44" ry="13" fill="#E8C873" stroke={P.ink} strokeWidth="2.4" />
      <g fill="#B67A3A">
        <circle cx="92" cy="105" r="3.4" />
        <circle cx="112" cy="110" r="3.4" />
        <circle cx="130" cy="104" r="3.4" />
      </g>
      <path d="M 122 84 l 20 -20" stroke={P.woodDark} strokeWidth="4" strokeLinecap="round" />
      <path d="M 138 66 q 6 -8 14 -4" stroke="#E8C873" strokeWidth="4" fill="none" strokeLinecap="round" />
      <g fill={P.leafDark} opacity="0.9">
        <ellipse cx="64" cy="126" rx="7" ry="3" transform="rotate(-24 64 126)" />
        <ellipse cx="152" cy="130" rx="7" ry="3" transform="rotate(20 152 130)" />
      </g>
      <Eyes x={98} y={102} />
      <Smile x={103} y={110} />
    </g>
  ),
  pickle: () => (
    <g>
      <path d="M 76 96 h 68 l -4 56 a 10 10 0 0 1 -10 8 H 90 a 10 10 0 0 1 -10 -8 z" fill="#B89455" stroke={P.ink} strokeWidth="2.4" />
      <rect x="72" y="82" width="76" height="16" rx="4" fill="#5C3617" stroke={P.ink} strokeWidth="2.4" />
      <rect x="86" y="88" width="48" height="5" fill="#A87B22" />
      <g fill="#C96A2A" stroke={P.ink} strokeWidth="1.4">
        <circle cx="94" cy="120" r="6" />
        <circle cx="112" cy="126" r="6" />
        <circle cx="128" cy="118" r="6" />
        <circle cx="104" cy="112" r="5" />
        <circle cx="122" cy="132" r="5" />
      </g>
      <g stroke={P.leafDark} strokeWidth="2">
        <path d="M 88 106 q 12 -8 24 0" />
        <path d="M 116 108 q 10 -6 20 0" />
      </g>
      <text x="110" y="86" textAnchor="middle" fontSize="11" fill="#E3D5B0" fontFamily="inherit" letterSpacing="2">
        ACHAR
      </text>
      <Eyes x={100} y={122} />
      <Smile x={105} y={130} />
    </g>
  ),
}

export function FoodPortrait({ food, size = 220 }: { food: Food; size?: number }) {
  const draw = DRAWINGS[food.id]
  return (
    <svg
      viewBox="0 0 220 190"
      width={size}
      height={(size * 190) / 220}
      className="food-portrait"
      role="img"
      aria-label={`Hand-drawn portrait of ${food.name}`}
    >
      <rect x="0" y="0" width="220" height="190" fill="none" />
      {draw ? draw() : <FallbackFace name={food.name} />}
    </svg>
  )
}

function FallbackFace({ name }: { name: string }) {
  const initials = name
    .split(/\s+/)
    .map((w) => w[0])
    .join('')
    .slice(0, 3)
    .toUpperCase()
  return (
    <g>
      <ellipse cx="110" cy="120" rx="56" ry="40" fill={P.gold} stroke={P.ink} strokeWidth="2.4" />
      <Eyes x={94} y={108} />
      <Smile x={99} y={118} />
      <text x="110" y="172" textAnchor="middle" fontSize="14" fill={P.woodDark} letterSpacing="3" fontFamily="inherit">
        {initials}
      </text>
    </g>
  )
}
