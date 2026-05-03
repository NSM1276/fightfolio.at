// Fighter gallery — main image + thumbnails + lightbox
const Gallery = ({ venue, lang }) => {
  const c = window.DETAIL_COPY[lang];
  const [lightbox, setLightbox] = React.useState(null);

  // Photo paths: main.webp + photo-2..5.webp — shown when file exists, gradient otherwise
  const photoUrls = [
    `fighters/${venue.id}/main.webp`,
    `fighters/${venue.id}/photo-2.webp`,
    `fighters/${venue.id}/photo-3.webp`,
    `fighters/${venue.id}/photo-4.webp`,
    `fighters/${venue.id}/photo-5.webp`,
  ];

  const photo = (g, i, big) => (
    <div style={{
      width: '100%', height: '100%',
      backgroundImage: `
        radial-gradient(circle at 30% 40%, hsla(${g.hue}, 65%, 55%, 0.38) 0%, transparent 45%),
        radial-gradient(circle at 70% 70%, hsla(${g.hue + 20}, 70%, 40%, 0.32) 0%, transparent 40%),
        linear-gradient(135deg, ${g.a} 0%, ${g.b} 100%)
      `,
      position: 'relative',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      {/* Real photo — hides itself if file doesn't exist */}
      <img
        src={photoUrls[i]}
        alt=""
        onError={(e) => { e.target.style.display = 'none'; }}
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover',
          objectPosition: big ? 'center top' : 'center center',
          display: 'block',
          zIndex: 1,
        }}
      />
      {big && (
        <window.Icon.glove size={64} style={{
          opacity: 0.12, color: '#fff',
          position: 'absolute', bottom: 24, right: 24,
          zIndex: 0,
        }} />
      )}
    </div>
  );

  return (
    <>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr 1fr',
        gridTemplateRows: '1fr 1fr',
        gap: 8,
        height: 460,
        borderRadius: 'var(--radius-card)',
        overflow: 'hidden',
      }} className="ak-gallery">
        <button onClick={() => setLightbox(0)}
          style={{ gridRow: '1 / 3', cursor: 'pointer', border: 'none', padding: 0, background: 'transparent' }}>
          {photo(venue.gallery[0], 0, true)}
        </button>
        {venue.gallery.slice(1, 5).map((g, i) => (
          <button key={i} onClick={() => setLightbox(i + 1)}
            style={{ cursor: 'pointer', border: 'none', padding: 0, background: 'transparent', position: 'relative' }}>
            {photo(g, i + 1, false)}
            {i === 3 && (
              <div style={{
                position: 'absolute', inset: 0,
                background: 'rgba(0,0,0,0.55)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontWeight: 700, fontSize: 14,
                gap: 6,
                zIndex: 2,
              }}>
                <window.Icon.layers size={16} />
                {c.seeAllPhotos}
              </div>
            )}
          </button>
        ))}
      </div>

      {lightbox !== null && (
        <div onClick={() => setLightbox(null)} style={{
          position: 'fixed', inset: 0, zIndex: 200,
          background: 'rgba(0,0,0,0.95)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: 24,
        }}>
          <button onClick={(e) => { e.stopPropagation(); setLightbox(null); }} style={{
            position: 'absolute', top: 20, right: 20,
            background: 'var(--card)', border: '1px solid var(--border)',
            color: '#fff', borderRadius: 999, width: 40, height: 40,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer',
          }}><window.Icon.close /></button>
          <button onClick={(e) => { e.stopPropagation(); setLightbox((lightbox - 1 + venue.gallery.length) % venue.gallery.length); }} style={{
            position: 'absolute', left: 20, top: '50%', transform: 'translateY(-50%)',
            background: 'var(--card)', border: '1px solid var(--border)',
            color: '#fff', borderRadius: 999, width: 44, height: 44,
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
            fontSize: 20,
          }}>‹</button>
          <button onClick={(e) => { e.stopPropagation(); setLightbox((lightbox + 1) % venue.gallery.length); }} style={{
            position: 'absolute', right: 20, top: '50%', transform: 'translateY(-50%)',
            background: 'var(--card)', border: '1px solid var(--border)',
            color: '#fff', borderRadius: 999, width: 44, height: 44,
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
            fontSize: 20,
          }}>›</button>
          <div onClick={(e) => e.stopPropagation()} style={{
            width: 'min(1100px, 90vw)', height: 'min(720px, 80vh)',
            borderRadius: 16, overflow: 'hidden',
          }}>{photo(venue.gallery[lightbox], lightbox, true)}</div>
          <div style={{
            position: 'absolute', bottom: 24, left: '50%', transform: 'translateX(-50%)',
            color: '#fff', fontSize: 13, fontWeight: 500,
            background: 'rgba(0,0,0,0.5)', padding: '6px 14px', borderRadius: 999,
          }}>{lightbox + 1} / {venue.gallery.length}</div>
        </div>
      )}
    </>
  );
};

window.Gallery = Gallery;
