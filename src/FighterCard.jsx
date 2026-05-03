// Fighter card — bento grid member. Supports 3 sizes (1x1, 2x1, 2x2)
const FighterCard = ({ r, lang, span = 'sm', onClick, onHoverId, hoveredId }) => {
  const c = window.COPY[lang];
  const [hover, setHover] = React.useState(false);
  const isHovered = hoveredId === r.id || hover;

  const tall = span === 'lg';
  const wide = span === 'md';
  const imgHeight = tall ? 260 : wide ? 180 : 160;

  // Parse record to extract wins/losses
  const recordParts = (r.record || '0-0-0').split('-');
  const wins = parseInt(recordParts[0]) || 0;
  const losses = parseInt(recordParts[1]) || 0;

  return (
    <article
      onMouseEnter={() => { setHover(true); onHoverId && onHoverId(r.id); }}
      onMouseLeave={() => { setHover(false); onHoverId && onHoverId(null); }}
      onClick={onClick || (() => { window.location.href = 'FightFolio Fighter Detail.html?id=' + r.id; })}
      style={{
        gridColumn: wide ? 'span 2' : undefined,
        gridRow: tall ? 'span 2' : undefined,
        background: 'var(--card)',
        border: `1px solid ${isHovered ? 'var(--accent)' : 'var(--border)'}`,
        borderRadius: 'var(--radius-card)',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'transform var(--dur-med) var(--ease-out), border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-med) var(--ease-out)',
        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: isHovered ? '0 12px 28px rgba(0,0,0,0.5), 0 0 0 1px rgba(212,175,55,0.18)' : 'var(--shadow-elev)',
        display: 'flex', flexDirection: 'column',
        position: 'relative',
      }}
    >
      {/* Image area */}
      <div style={{
        position: 'relative',
        height: imgHeight,
        background: `linear-gradient(135deg, ${r.img[0]} 0%, ${r.img[1]} 100%)`,
        overflow: 'hidden',
      }}>
        {/* Accent glow */}
        <div aria-hidden style={{
          position: 'absolute', inset: 0,
          backgroundImage: `radial-gradient(ellipse at 50% 50%, hsla(${r.accentHue}, 70%, 55%, 0.22) 0%, transparent 65%)`,
        }} />
        {/* Fighter name overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '40px 24px',
          textAlign: 'center',
        }}>
          <span style={{
            fontSize: tall ? 30 : wide ? 24 : 20,
            fontWeight: 800,
            letterSpacing: '-0.03em',
            lineHeight: 1.05,
            color: 'rgba(255,255,255,0.95)',
            textShadow: '0 2px 16px rgba(0,0,0,0.5)',
            fontFamily: 'inherit',
          }}>{r.name}</span>
        </div>
        {/* Bottom fade */}
        <div aria-hidden style={{
          position: 'absolute', inset: 'auto 0 0 0', height: '40%',
          background: 'linear-gradient(to top, rgba(0,0,0,0.55), transparent)',
        }} />

        {/* Status badge top-left */}
        <div style={{ position: 'absolute', top: 12, left: 12 }}>
          <window.StatusBadge status={r.status} lang={lang} />
        </div>

        {/* Record top-right */}
        <div style={{
          position: 'absolute', top: 12, right: 12,
          background: 'rgba(0,0,0,0.65)',
          backdropFilter: 'blur(4px)',
          border: '1px solid rgba(255,255,255,0.12)',
          padding: '4px 10px',
          borderRadius: 999,
          fontSize: 12, fontWeight: 800,
          display: 'flex', alignItems: 'center', gap: 4,
          letterSpacing: '0.02em',
        }}>
          <span style={{ color: 'var(--win)' }}>{wins}</span>
          <span style={{ color: 'var(--text-tertiary)' }}>-</span>
          <span style={{ color: 'var(--loss)' }}>{losses}</span>
        </div>

        {/* Featured badge */}
        {r.featured && (
          <div style={{
            position: 'absolute', bottom: 12, left: 12,
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: 'var(--accent)', color: 'var(--text-on-accent)',
            padding: '4px 10px', borderRadius: 999,
            fontSize: 11, fontWeight: 700, letterSpacing: '0.04em',
            textTransform: 'uppercase',
          }}>
            <window.Icon.trophy size={10} />
            {c.featured}
          </div>
        )}
      </div>

      {/* Body */}
      <div style={{
        padding: 16,
        display: 'flex', flexDirection: 'column', gap: 10,
        flex: 1,
      }}>
        <div style={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between', gap: 12 }}>
          <h3 style={{
            margin: 0,
            fontSize: tall ? 20 : 16,
            fontWeight: 700,
            letterSpacing: '-0.02em',
            lineHeight: 1.2,
            color: 'var(--text-primary)',
          }}>{r.name}</h3>
          {/* Weight class badge */}
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 4,
            color: 'var(--accent)',
            fontSize: 11, fontWeight: 700,
            flexShrink: 0,
            whiteSpace: 'nowrap',
          }}>
            <window.Icon.weight size={10} />
            {r.weightClass ? r.weightClass.replace(' ', ' ') : ''}
          </span>
        </div>

        <div style={{
          fontSize: 13, color: 'var(--text-secondary)', fontWeight: 500,
          display: 'flex', alignItems: 'center', gap: 6,
        }}>
          <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>
            <window.Icon.pin size={12} style={{ marginRight: 3 }} />
            {r.city}
          </span>
          <span style={{ color: 'var(--text-tertiary)' }}>·</span>
          <span style={{ color: r.country === 'Austria' ? '#EF4444' : '#3B82F6', fontWeight: 600, fontSize: 12 }}>
            {r.country === 'Austria' ? '🇦🇹' : '🇩🇪'} {r.country}
          </span>
          <span style={{ color: 'var(--text-tertiary)' }}>·</span>
          <span>{r.styles ? r.styles.join(', ') : ''}</span>
        </div>

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 'auto', paddingTop: 4 }}>
          {(r.tags || []).slice(0, tall ? 5 : 3).map((t) => (
            <span key={t} style={{
              padding: '3px 8px',
              background: 'rgba(30,30,48,0.6)',
              border: '1px solid var(--border)',
              borderRadius: 999,
              fontSize: 11,
              color: 'var(--text-secondary)',
              fontWeight: 500,
            }}>{t}</span>
          ))}
        </div>

        {/* Sponsors */}
        {(r.sponsors || []).length > 0 && (
          <div style={{
            marginTop: 10,
            paddingTop: 10,
            borderTop: '1px solid var(--border)',
            display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center',
          }}>
            <span style={{ fontSize: 10, color: 'var(--text-tertiary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              🤝 Sponsors:
            </span>
            {r.sponsors.map((sponsor, idx) => (
              <span key={idx} style={{
                display: 'inline-block',
                padding: '4px 10px',
                background: 'rgba(237, 104, 31, 0.08)',
                border: '1px solid rgba(237, 104, 31, 0.2)',
                borderRadius: 6,
                fontSize: 11,
                color: 'var(--accent)',
                fontWeight: 600,
                whiteSpace: 'nowrap',
              }}>{sponsor.name}</span>
            ))}
          </div>
        )}

        {tall && (
          <div style={{
            marginTop: 4, paddingTop: 12,
            borderTop: '1px solid var(--border)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            fontSize: 12, color: 'var(--text-secondary)',
          }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ color: 'var(--win)', fontWeight: 700 }}>{wins}W</span>
              {' · '}
              <span style={{ color: 'var(--loss)', fontWeight: 700 }}>{losses}L</span>
            </span>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 4,
              color: isHovered ? 'var(--accent)' : 'var(--text-secondary)',
              fontWeight: 600,
              transition: 'color var(--dur-fast) var(--ease-out)',
            }}>
              {lang === 'de' ? 'Profil' : 'Profile'}
              <window.Icon.arrow size={12} />
            </span>
          </div>
        )}
      </div>
    </article>
  );
};

window.FighterCard = FighterCard;
