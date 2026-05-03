// Sticky filter bar: pro toggle, country dropdown, city dropdown, fight-style pills
const FilterBar = ({ lang, filters, setFilters, resultCount }) => {
  const c = window.COPY[lang];
  const [countryOpen, setCountryOpen] = React.useState(false);
  const [cityOpen, setCityOpen] = React.useState(false);
  const dropRef = React.useRef(null);

  React.useEffect(() => {
    function onDoc(e) {
      if (dropRef.current && !dropRef.current.contains(e.target)) setCityOpen(false);
    }
    document.addEventListener('click', onDoc);
    return () => document.removeEventListener('click', onDoc);
  }, []);

  const toggleStyle = (s) => {
    const next = filters.styles.includes(s)
      ? filters.styles.filter((x) => x !== s)
      : [...filters.styles, s];
    setFilters({ ...filters, styles: next });
  };

  const selectedCountry = window.COUNTRIES.find((co) => co.id === filters.country);
  const selectedCity = window.CITIES.find((ci) => ci.id === filters.city);

  // Filter cities by selected country
  const citiesByCountry = filters.country
    ? window.CITIES.filter((ci) => ci.country === filters.country)
    : window.CITIES;

  return (
    <div style={{
      position: 'sticky', top: 61, zIndex: 15,
      background: 'rgba(13,13,20,0.88)',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      borderBottom: '1px solid var(--border)',
    }}>
      <div style={{
        maxWidth: 1280, margin: '0 auto',
        padding: '14px 24px',
        display: 'flex', alignItems: 'center', gap: 12,
        flexWrap: 'wrap',
      }}>
        {/* Pro-only toggle */}
        <button
          onClick={() => setFilters({ ...filters, proOnly: !filters.proOnly })}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            padding: '8px 14px 8px 10px',
            background: filters.proOnly ? 'var(--status-green-bg)' : 'var(--card)',
            border: `1px solid ${filters.proOnly ? 'var(--status-green)' : 'var(--border)'}`,
            borderRadius: 999,
            color: filters.proOnly ? 'var(--status-green)' : 'var(--text-secondary)',
            fontFamily: 'inherit', fontWeight: 600, fontSize: 13,
            cursor: 'pointer',
            transition: 'all var(--dur-fast) var(--ease-out)',
          }}
        >
          <span style={{
            width: 28, height: 16, borderRadius: 999,
            background: filters.proOnly ? 'var(--status-green)' : 'var(--border-strong)',
            position: 'relative',
            transition: 'background var(--dur-fast) var(--ease-out)',
          }}>
            <span style={{
              position: 'absolute', top: 2, left: filters.proOnly ? 14 : 2,
              width: 12, height: 12, borderRadius: 999, background: '#fff',
              transition: 'left var(--dur-fast) var(--ease-out)',
            }} />
          </span>
          {c.proOnly}
        </button>

        {/* Country dropdown */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={(e) => { e.stopPropagation(); setCountryOpen((v) => !v); }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '8px 12px',
              background: filters.country ? 'var(--primary)' : 'var(--card)',
              border: `1px solid ${filters.country ? 'var(--accent)' : 'var(--border)'}`,
              borderRadius: 999,
              color: filters.country ? 'var(--accent)' : 'var(--text-primary)',
              fontFamily: 'inherit', fontWeight: 600, fontSize: 13,
              cursor: 'pointer',
              transition: 'all var(--dur-fast) var(--ease-out)',
            }}
          >
            <span style={{ fontSize: 14 }}>🌍</span>
            {selectedCountry ? selectedCountry.label : c.allCountries}
            <window.Icon.chevron size={12} />
          </button>
          {countryOpen && (
            <div style={{
              position: 'absolute', top: 'calc(100% + 6px)', left: 0,
              background: 'var(--card)', border: '1px solid var(--border)',
              borderRadius: 12, padding: 8,
              boxShadow: 'var(--shadow-elev)',
              width: 220, maxHeight: 320, overflowY: 'auto',
              zIndex: 30,
            }}>
              <button onClick={() => { setFilters({ ...filters, country: null, city: null }); setCountryOpen(false); }}
                style={dropItemStyle(!filters.country)}>
                {c.allCountries}
              </button>
              {window.COUNTRIES.map((co) => (
                <button key={co.id} onClick={() => { setFilters({ ...filters, country: co.id, city: null }); setCountryOpen(false); }}
                  style={dropItemStyle(filters.country === co.id)}>
                  {co.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* City dropdown */}
        <div ref={dropRef} style={{ position: 'relative' }}>
          <button
            onClick={(e) => { e.stopPropagation(); setCityOpen((v) => !v); }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '8px 12px',
              background: filters.city ? 'var(--primary)' : 'var(--card)',
              border: `1px solid ${filters.city ? 'var(--accent)' : 'var(--border)'}`,
              borderRadius: 999,
              color: filters.city ? 'var(--accent)' : 'var(--text-primary)',
              fontFamily: 'inherit', fontWeight: 600, fontSize: 13,
              cursor: 'pointer',
              transition: 'all var(--dur-fast) var(--ease-out)',
            }}
          >
            <window.Icon.pin size={14} />
            {selectedCity ? selectedCity.label : c.allCities}
            <window.Icon.chevron size={12} />
          </button>
          {cityOpen && (
            <div style={{
              position: 'absolute', top: 'calc(100% + 6px)', left: 0,
              background: 'var(--card)', border: '1px solid var(--border)',
              borderRadius: 12, padding: 8,
              boxShadow: 'var(--shadow-elev)',
              width: 220, maxHeight: 320, overflowY: 'auto',
              zIndex: 30,
            }}>
              <button onClick={() => { setFilters({ ...filters, city: null }); setCityOpen(false); }}
                style={dropItemStyle(!filters.city)}>
                {c.allCities}
              </button>
              {citiesByCountry.map((ci) => (
                <button key={ci.id} onClick={() => { setFilters({ ...filters, city: ci.id }); setCityOpen(false); }}
                  style={dropItemStyle(filters.city === ci.id)}>
                  {ci.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Divider */}
        <div style={{ width: 1, height: 24, background: 'var(--border)' }} />

        {/* Fight style pills */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {window.FIGHT_STYLES.map((s) => {
            const on = filters.styles.includes(s);
            return (
              <button key={s} onClick={() => toggleStyle(s)} style={{
                padding: '7px 14px',
                background: on ? 'var(--accent)' : 'transparent',
                border: `1px solid ${on ? 'var(--accent)' : 'var(--border)'}`,
                borderRadius: 999,
                color: on ? 'var(--text-on-accent)' : 'var(--text-secondary)',
                fontFamily: 'inherit', fontWeight: 600, fontSize: 13,
                cursor: 'pointer',
                transition: 'all var(--dur-fast) var(--ease-out)',
              }}>{s}</button>
            );
          })}
        </div>

        <div style={{ flex: 1 }} />

        {/* Count */}
        <div style={{
          color: 'var(--text-secondary)', fontSize: 13, fontWeight: 500,
          whiteSpace: 'nowrap',
        }}>
          <b style={{ color: 'var(--accent)', fontWeight: 700 }}>{resultCount}</b>{' '}
          {c.resultsCount(resultCount).replace(/^\d+\s*/, '')}
        </div>
      </div>
    </div>
  );
};

const dropItemStyle = (on) => ({
  width: '100%',
  textAlign: 'left',
  padding: '8px 12px',
  background: on ? 'var(--primary)' : 'transparent',
  border: 'none',
  color: on ? 'var(--accent)' : 'var(--text-primary)',
  borderRadius: 8,
  fontFamily: 'inherit', fontSize: 13, fontWeight: 500,
  cursor: 'pointer',
});

window.FilterBar = FilterBar;
