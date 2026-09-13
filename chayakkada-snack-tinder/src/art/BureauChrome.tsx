import type { ReactNode } from 'react'

/** Rotated rubber-stamp box, ink-bleed style. */
export function RubberStamp({
  lines,
  tone = 'red',
  rotate = -8,
  size = 'md',
  className = '',
}: {
  lines: string[]
  tone?: 'red' | 'green' | 'ink'
  rotate?: number
  size?: 'sm' | 'md' | 'lg'
  className?: string
}) {
  const tones = {
    red: '#8A2F1E',
    green: '#1F4A33',
    ink: '#2B2118',
  }
  const sizes = {
    sm: { font: '10px', pad: '4px 8px', bw: 2 },
    md: { font: '13px', pad: '7px 12px', bw: 2.5 },
    lg: { font: '17px', pad: '9px 16px', bw: 3 },
  }
  const t = tones[tone]
  const s = sizes[size]
  return (
    <span
      className={`rubber-stamp ${className}`}
      style={{
        color: t,
        borderColor: t,
        borderWidth: s.bw,
        fontSize: s.font,
        padding: s.pad,
        transform: `rotate(${rotate}deg)`,
      }}
      aria-hidden="true"
    >
      {lines.map((l, i) => (
        <span key={i} className="stamp-line">
          {l}
        </span>
      ))}
    </span>
  )
}

/** Circular bureau seal with curved text. Pure SVG. */
export function BureauSeal({ size = 110, text = 'CHAYAKKADA FOOD BUREAU' }: { size?: number; text?: string }) {
  const id = `seal-${text.length}-${size}`
  return (
    <svg viewBox="0 0 120 120" width={size} height={size} className="bureau-seal" aria-hidden="true">
      <defs>
        <path id={id} d="M 60 12 a 48 48 0 1 1 -0.01 0" fill="none" />
      </defs>
      <circle cx="60" cy="60" r="56" fill="none" stroke="#1F4A33" strokeWidth="2.5" />
      <circle cx="60" cy="60" r="47" fill="none" stroke="#1F4A33" strokeWidth="1.2" />
      <circle cx="60" cy="60" r="30" fill="none" stroke="#1F4A33" strokeWidth="1.2" />
      <text fontSize="10.5" fill="#1F4A33" letterSpacing="2.2" fontFamily="'Karla', sans-serif" fontWeight="700">
        <textPath href={`#${id}`} startOffset="2%">
          {text}
        </textPath>
      </text>
      <text x="60" y="58" textAnchor="middle" fontSize="9" fill="#1F4A33" letterSpacing="1" fontFamily="'Karla', sans-serif" fontWeight="700">
        REGD.
      </text>
      <text x="60" y="70" textAnchor="middle" fontSize="9" fill="#1F4A33" letterSpacing="1" fontFamily="'Karla', sans-serif" fontWeight="700">
        1938
      </text>
      <g stroke="#1F4A33" strokeWidth="1.4">
        <path d="M 38 88 l 6 6" />
        <path d="M 46 92 l 4 4" />
        <path d="M 82 88 l -6 6" />
        <path d="M 74 92 l -4 4" />
      </g>
    </svg>
  )
}

/** A strip of aged masking tape. Optional label text. */
export function Tape({ label, className = '' }: { label?: string; className?: string }) {
  return (
    <span className={`bureau-tape ${className}`} aria-hidden={label ? undefined : 'true'}>
      {label}
    </span>
  )
}

/** Tea-stain blotch. Decorative, absolutely positioned by parent. */
export function TeaStain({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={`tea-stain ${className}`} aria-hidden="true">
      <path
        d="M 50 8 C 74 8 92 26 92 50 C 92 74 74 92 50 92 C 26 92 8 74 8 50 C 8 26 26 8 50 8 Z
           M 50 18 C 30 18 18 32 18 50 C 18 68 32 82 50 82 C 68 82 82 68 82 50 C 82 32 68 18 50 18 Z"
        fill="currentColor"
        fillRule="evenodd"
        opacity="0.16"
      />
      <ellipse cx="47" cy="47" rx="20" ry="17" fill="currentColor" opacity="0.14" />
      <ellipse cx="60" cy="66" rx="7" ry="5" fill="currentColor" opacity="0.1" />
    </svg>
  )
}

/** Handwritten chalk-style annotation. */
export function Handwritten({ children, tilt = -2 }: { children: ReactNode; tilt?: number }) {
  return (
    <span className="handwritten" style={{ transform: `rotate(${tilt}deg)` }}>
      {children}
    </span>
  )
}

/** Pin used on the noticeboard. */
export function NoticePin({ tone = 'red' }: { tone?: 'red' | 'green' | 'mustard' }) {
  const tones = { red: '#8A2F1E', green: '#1F4A33', mustard: '#A87B22' }
  return <span className="notice-pin" style={{ background: tones[tone] }} aria-hidden="true" />
}

/** Divider printed like an old newspaper rule with a centred ornament. */
export function PressRule({ ornament = '§' }: { ornament?: string }) {
  return (
    <div className="press-rule" aria-hidden="true">
      <span className="press-rule-line" />
      <span className="press-rule-mark">{ornament}</span>
      <span className="press-rule-line" />
    </div>
  )
}
