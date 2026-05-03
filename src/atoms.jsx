// Small shared UI atoms: StatusDot, StatusBadge, Icon

const StatusDot = ({ status, size = 8 }) => {
  const color =
    status === 'verified' ? 'var(--status-green)' :
    status === 'self' ? 'var(--status-yellow)' :
    'var(--status-red)';
  return (
    <span style={{
      display: 'inline-block',
      width: size, height: size, borderRadius: 999,
      background: color,
      boxShadow: `0 0 0 3px ${color}33`,
      flexShrink: 0,
    }} />
  );
};

const StatusBadge = ({ status, lang, compact = false }) => {
  const c = window.COPY[lang];
  const label =
    status === 'verified' ? c.statusVerified :
    status === 'self' ? c.statusSelf :
    c.statusUnknown;
  const color =
    status === 'verified' ? 'var(--status-green)' :
    status === 'self' ? 'var(--status-yellow)' :
    'var(--status-red)';
  const bg =
    status === 'verified' ? 'var(--status-green-bg)' :
    status === 'self' ? 'var(--status-yellow-bg)' :
    'var(--status-red-bg)';
  const glyph =
    status === 'verified'
      ? <svg width="10" height="10" viewBox="0 0 10 10"><path d="M1.5 5.2 L4 7.5 L8.5 2.5" stroke={color} strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
      : status === 'self'
      ? <svg width="10" height="10" viewBox="0 0 10 10"><circle cx="5" cy="5" r="3.5" fill="none" stroke={color} strokeWidth="1.5"/><path d="M5 1.5 A3.5 3.5 0 0 1 5 8.5 Z" fill={color}/></svg>
      : <svg width="10" height="10" viewBox="0 0 10 10"><text x="5" y="7.5" textAnchor="middle" fontSize="8" fontWeight="700" fill={color}>?</text></svg>;

  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: compact ? '3px 8px' : '5px 10px',
      background: bg,
      border: `1px solid ${color}55`,
      color,
      borderRadius: 999,
      fontSize: compact ? 11 : 12,
      fontWeight: 600,
      letterSpacing: '0.01em',
      lineHeight: 1,
      whiteSpace: 'nowrap',
    }}>
      {glyph}
      {label}
    </span>
  );
};

const Icon = {
  search: (p) => (
    <svg width={p.size || 18} height={p.size || 18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" />
    </svg>
  ),
  chevron: (p) => (
    <svg width={p.size || 14} height={p.size || 14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  ),
  pin: (p) => (
    <svg width={p.size || 16} height={p.size || 16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" /><circle cx="12" cy="10" r="3" />
    </svg>
  ),
  star: (p) => (
    <svg width={p.size || 12} height={p.size || 12} viewBox="0 0 24 24" fill="currentColor">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26" />
    </svg>
  ),
  sliders: (p) => (
    <svg width={p.size || 16} height={p.size || 16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/>
      <circle cx="8" cy="6" r="2" fill="var(--background)"/><circle cx="16" cy="12" r="2" fill="var(--background)"/><circle cx="10" cy="18" r="2" fill="var(--background)"/>
    </svg>
  ),
  arrow: (p) => (
    <svg width={p.size || 14} height={p.size || 14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
    </svg>
  ),
  close: (p) => (
    <svg width={p.size || 14} height={p.size || 14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="5" x2="19" y2="19"/><line x1="19" y1="5" x2="5" y2="19"/>
    </svg>
  ),
  layers: (p) => (
    <svg width={p.size || 16} height={p.size || 16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" />
    </svg>
  ),
  // MMA/sport icons
  glove: (p) => (
    <svg width={p.size || 18} height={p.size || 18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6.5 6.5C6.5 4.6 8 3 9.9 3c1.9 0 3.4 1.6 3.4 3.5V8h1c1.1 0 2 .9 2 2v1c0 1.1-.9 2-2 2h-1v3c0 2.8-2.2 5-5 5H7c-2.2 0-4-1.8-4-4v-6c0-1.7 1.3-3 3-3h0.5V6.5z"/>
    </svg>
  ),
  trophy: (p) => (
    <svg width={p.size || 16} height={p.size || 16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2z"/>
    </svg>
  ),
  weight: (p) => (
    <svg width={p.size || 16} height={p.size || 16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 3h12l4 18H2L6 3z"/><path d="M9 3a3 3 0 0 1 6 0"/>
    </svg>
  ),
  flag: (p) => (
    <svg width={p.size || 14} height={p.size || 14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/>
    </svg>
  ),
};

Object.assign(window, { StatusDot, StatusBadge, Icon });
