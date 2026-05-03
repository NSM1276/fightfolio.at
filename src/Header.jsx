// Header: logo wordmark, nav, DE/EN switcher
const Header = ({ lang, setLang }) => {
  const c = window.COPY[lang];
  const current = window.location.pathname.split('/').pop() || 'index.html';
  const nav = [
    { key: 'home',    label: c.navHome,    href: 'FightFolio Homepage.html',   active: current === 'FightFolio Homepage.html' || current === 'index.html' || current === '' },
    { key: 'submit',  label: c.navSubmit,  href: '#', active: false },
    { key: 'imprint', label: c.navImprint, href: '#', active: false },
  ];
  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 20,
      background: 'rgba(13,13,20,0.88)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--border)',
    }}>
      <div style={{
        maxWidth: 1280, margin: '0 auto',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '16px 24px',
      }}>
        {/* Wordmark logo */}
        <a href="FightFolio Homepage.html" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <span style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            width: 32, height: 32, borderRadius: 8,
            background: 'var(--accent)',
            color: 'var(--text-on-accent)',
          }}>
            <window.Icon.glove size={17} />
          </span>
          <span style={{
            fontSize: 18, fontWeight: 800,
            letterSpacing: '-0.03em',
            color: 'var(--text-primary)',
          }}>
            Fight<span style={{ color: 'var(--accent)' }}>Folio</span>
            <span style={{ color: 'var(--text-tertiary)', fontWeight: 400, fontSize: 13 }}>.at</span>
          </span>
        </a>

        <nav className="ak-nav-desktop" style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
          {nav.map((item) => (
            <a key={item.key} href={item.href} style={{
              padding: '8px 14px',
              color: item.active ? 'var(--text-primary)' : 'var(--text-secondary)',
              textDecoration: 'none',
              fontSize: 14, fontWeight: 500,
              borderRadius: 8,
              transition: 'color var(--dur-fast) var(--ease-out)',
            }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--text-primary)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = item.active ? 'var(--text-primary)' : 'var(--text-secondary)'; }}
            >{item.label}</a>
          ))}
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div role="group" aria-label="Sprache" style={{
            display: 'inline-flex', alignItems: 'center',
            background: 'var(--card)', border: '1px solid var(--border)',
            borderRadius: 999, padding: 3,
          }}>
            {['DE', 'EN'].map((l) => {
              const on = lang === l.toLowerCase();
              return (
                <button key={l} onClick={() => setLang(l.toLowerCase())} style={{
                  border: 'none', background: on ? 'var(--primary)' : 'transparent',
                  padding: '5px 11px', borderRadius: 999,
                  color: on ? 'var(--accent)' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  fontFamily: 'inherit', fontWeight: 600, fontSize: 12,
                  letterSpacing: '0.04em',
                  transition: 'all var(--dur-fast) var(--ease-out)',
                }}>{l}</button>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
};

window.Header = Header;
