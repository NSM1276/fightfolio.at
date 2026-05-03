// NextFight, FightHistory, FighterStats, Reviews, CareerLog, SimilarList

const NextFight = ({ venue, lang }) => {
  const c = window.DETAIL_COPY[lang];
  const nf = venue.nextFight;
  if (!nf) return <p style={{ color: 'var(--text-secondary)' }}>{c.noNextFight}</p>;

  const isTBD = !nf.opponent_de || nf.opponent_de === 'TBD';

  return (
    <div style={{
      background: 'linear-gradient(135deg, rgba(30,30,48,0.8) 0%, rgba(19,19,30,0.9) 100%)',
      border: '1px solid var(--accent)',
      borderRadius: 'var(--radius-card)',
      padding: 24,
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div aria-hidden style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(ellipse at 80% 50%, rgba(212,175,55,0.06) 0%, transparent 60%)',
      }} />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', gap: 16, marginBottom: 20 }}>
        {/* Fighter side */}
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: 64, height: 64, borderRadius: 999,
            background: `radial-gradient(circle, hsla(${venue.gallery[0]?.hue || 45}, 60%, 40%, 0.5), rgba(19,19,30,0.9))`,
            border: '2px solid var(--accent)',
            margin: '0 auto 8px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <window.Icon.glove size={24} style={{ color: 'var(--accent)' }} />
          </div>
          <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--text-primary)' }}>{venue.name}</div>
          <div style={{ fontSize: 12, color: 'var(--status-green)', fontWeight: 600 }}>{venue.record}</div>
        </div>

        {/* VS */}
        <div style={{
          fontSize: 20, fontWeight: 800,
          color: 'var(--accent)', letterSpacing: '0.08em',
        }}>VS</div>

        {/* Opponent side */}
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: 64, height: 64, borderRadius: 999,
            background: 'rgba(30,30,48,0.7)',
            border: isTBD ? '2px dashed var(--border-strong)' : '2px solid var(--border-strong)',
            margin: '0 auto 8px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: isTBD ? 20 : 24,
          }}>
            {isTBD ? '?' : <window.Icon.glove size={24} />}
          </div>
          <div style={{ fontWeight: 700, fontSize: 14, color: isTBD ? 'var(--text-tertiary)' : 'var(--text-primary)' }}>
            {lang === 'de' ? nf.opponent_de : nf.opponent_en}
          </div>
        </div>
      </div>

      {/* Details */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12,
        borderTop: '1px solid var(--border)', paddingTop: 16,
      }}>
        {[
          [c.nextFightLabels.date, lang === 'de' ? nf.date_de : nf.date_en],
          [c.nextFightLabels.event, nf.event],
          [c.nextFightLabels.location, nf.location],
        ].map(([label, val]) => (
          <div key={label}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-tertiary)', marginBottom: 4 }}>{label}</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{val}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const FightHistory = ({ venue, lang }) => {
  const c = window.DETAIL_COPY[lang];
  const rl = c.resultLabels;
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{
        width: '100%', borderCollapse: 'collapse',
        fontSize: 13,
      }}>
        <thead>
          <tr>
            {['Ergebnis', 'Gegner', 'Methode', 'Event', 'Runde', 'Zeit', 'Datum']
              .map((h) => (
                <th key={h} style={{
                  textAlign: 'left', padding: '8px 12px',
                  fontSize: 10, fontWeight: 700, letterSpacing: '0.08em',
                  textTransform: 'uppercase', color: 'var(--text-tertiary)',
                  borderBottom: '1px solid var(--border)',
                  whiteSpace: 'nowrap',
                }}>{h}</th>
              ))
            }
          </tr>
        </thead>
        <tbody>
          {(venue.fightHistory || []).map((f, i) => {
            const isWin = f.result === 'W';
            const isLoss = f.result === 'L';
            const color = isWin ? 'var(--win)' : isLoss ? 'var(--loss)' : 'var(--nc)';
            const bg = isWin ? 'var(--win-bg)' : isLoss ? 'var(--loss-bg)' : 'var(--nc-bg)';
            return (
              <tr key={i} style={{
                borderBottom: '1px solid var(--border)',
                transition: 'background var(--dur-fast)',
              }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(30,30,48,0.4)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
              >
                <td style={{ padding: '12px 12px' }}>
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    padding: '3px 10px', borderRadius: 999,
                    background: bg, border: `1px solid ${color}55`,
                    color, fontWeight: 700, fontSize: 12,
                    minWidth: 48,
                  }}>
                    {rl[f.result] || f.result}
                  </span>
                </td>
                <td style={{ padding: '12px 12px', fontWeight: 600, color: 'var(--text-primary)' }}>{f.opponent}</td>
                <td style={{ padding: '12px 12px', color: 'var(--text-secondary)' }}>{f.method}</td>
                <td style={{ padding: '12px 12px', color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>{f.event}</td>
                <td style={{ padding: '12px 12px', color: 'var(--text-tertiary)', textAlign: 'center' }}>{f.round}</td>
                <td style={{ padding: '12px 12px', color: 'var(--text-tertiary)', fontVariantNumeric: 'tabular-nums' }}>{f.time}</td>
                <td style={{ padding: '12px 12px', color: 'var(--text-tertiary)', whiteSpace: 'nowrap', fontVariantNumeric: 'tabular-nums' }}>
                  {new Date(f.date).toLocaleDateString(lang === 'de' ? 'de-AT' : 'en-GB', { year: 'numeric', month: 'short', day: 'numeric' })}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {(!venue.fightHistory || venue.fightHistory.length === 0) && (
        <p style={{ color: 'var(--text-tertiary)', textAlign: 'center', padding: 32 }}>—</p>
      )}
    </div>
  );
};

const FighterStats = ({ venue, lang }) => {
  const c = window.DETAIL_COPY[lang];
  const sl = c.statLabels;
  const stats = venue.stats || {};
  const items = [
    [sl.age,         stats.age ? stats.age + ' Jahre' : '—'],
    [sl.height,      stats.height || '—'],
    [sl.reach,       stats.reach || '—'],
    [sl.stance,      stats.stance || '—'],
    [sl.nationality, stats.nationality || '—'],
    [sl.gym,         stats.gym || '—'],
    [sl.born,        stats.born || '—'],
  ];
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10,
    }}>
      {items.map(([label, val]) => (
        <div key={label} style={{
          padding: '12px 14px',
          background: 'rgba(30,30,48,0.4)',
          border: '1px solid var(--border)',
          borderRadius: 8,
        }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-tertiary)', marginBottom: 4 }}>{label}</div>
          <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{val}</div>
        </div>
      ))}
    </div>
  );
};

const Reviews = ({ venue, lang }) => {
  const c = window.DETAIL_COPY[lang];
  return (
    <div>
      <div style={{
        padding: 20,
        background: 'rgba(30,30,48,0.4)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-card)',
        marginBottom: 20,
        display: 'flex', alignItems: 'center', gap: 16,
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 48, fontWeight: 700, color: 'var(--accent)', lineHeight: 1, letterSpacing: '-0.02em' }}>
            {venue.rating.toFixed(1)}
          </div>
          <div style={{ display: 'flex', gap: 2, color: 'var(--accent)', justifyContent: 'center', marginTop: 4 }}>
            {[1,2,3,4,5].map((i) => <window.Icon.star key={i} size={12} />)}
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 4 }}>
            {c.reviewsCount(venue.reviews)}
          </div>
        </div>
        <div style={{ flex: 1, color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.6 }}>
          {lang === 'de'
            ? 'Community-Bewertungen basieren auf Fan-Einsendungen und öffentlichen Daten.'
            : 'Community ratings are based on fan submissions and public data.'}
        </div>
      </div>

      {(venue.reviews_list || []).length === 0 && (
        <div style={{ textAlign: 'center', padding: '32px 0', color: 'var(--text-tertiary)' }}>
          {lang === 'de' ? 'Noch keine Bewertungen.' : 'No reviews yet.'}
        </div>
      )}

      <button style={{
        marginTop: 8,
        background: 'transparent', border: '1px solid var(--border)',
        color: 'var(--text-primary)', padding: '10px 18px',
        borderRadius: 999, fontFamily: 'inherit', fontWeight: 600, fontSize: 13,
        cursor: 'pointer',
      }}>{c.writeReview}</button>
    </div>
  );
};

const CareerLog = ({ venue, lang }) => {
  const c = window.DETAIL_COPY[lang];
  return (
    <div>
      <p style={{ margin: '0 0 18px', color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.55 }}>
        {c.statusBlurb}
      </p>
      <ol style={{ listStyle: 'none', margin: 0, padding: 0, position: 'relative' }}>
        <span style={{
          position: 'absolute', left: 7, top: 8, bottom: 8, width: 2,
          background: 'var(--border)',
        }} />
        {(venue.career_log || []).map((e, i) => (
          <li key={i} style={{ position: 'relative', paddingLeft: 28, paddingBottom: 16 }}>
            <span style={{
              position: 'absolute', left: 0, top: 4,
              width: 16, height: 16, borderRadius: 999,
              background: i === 0 ? 'var(--accent)' : 'var(--card)',
              border: `2px solid ${i === 0 ? 'var(--accent)' : 'var(--border-strong)'}`,
              boxShadow: i === 0 ? '0 0 0 4px rgba(212,175,55,0.2)' : 'none',
            }} />
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>
              {lang === 'de' ? e.event_de : e.event_en}
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2 }}>
              {new Date(e.date).toLocaleDateString(lang === 'de' ? 'de-AT' : 'en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}
              {' · '}
              {lang === 'de' ? e.actor_de : e.actor_en}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};

const SimilarList = ({ venue, lang }) => {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
      {(venue.similar || []).map((s) => (
        <a key={s.id} href={'FightFolio Fighter Detail.html?id=' + s.id} style={{
          textDecoration: 'none',
          background: 'var(--card)', border: '1px solid var(--border)',
          borderRadius: 'var(--radius-card)',
          overflow: 'hidden',
          transition: 'border-color 150ms, transform 150ms',
          display: 'block',
        }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)'; }}
        >
          <div style={{
            height: 90,
            background: `radial-gradient(circle at 30% 50%, hsla(${s.hue},65%,40%,0.5), hsla(${s.hue+20},50%,15%,0.95))`,
            position: 'relative',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <window.Icon.glove size={28} style={{ opacity: 0.2, color: '#fff' }} />
            <div style={{ position: 'absolute', top: 8, left: 8 }}>
              <window.StatusBadge status={s.status} lang={lang} compact />
            </div>
          </div>
          <div style={{ padding: 12 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 3 }}>{s.name}</div>
            <div style={{ fontSize: 11, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 6 }}>
              <span>{s.city} {s.country === 'Austria' ? '🇦🇹' : '🇩🇪'}</span>
              <span>·</span>
              <span style={{ color: 'var(--text-tertiary)' }}>{s.weightClass}</span>
            </div>
            <div style={{ marginTop: 6, fontSize: 12, fontWeight: 700 }}>
              {(s.record || '').split('-').map((v, i) => (
                <span key={i} style={{ color: i === 0 ? 'var(--win)' : i === 1 ? 'var(--loss)' : 'var(--text-tertiary)' }}>
                  {v}{i < 2 ? <span style={{ color: 'var(--text-tertiary)', fontWeight: 400 }}> – </span> : ''}
                </span>
              ))}
            </div>
          </div>
        </a>
      ))}
    </div>
  );
};

Object.assign(window, { NextFight, FightHistory, FighterStats, Reviews, CareerLog, SimilarList });
