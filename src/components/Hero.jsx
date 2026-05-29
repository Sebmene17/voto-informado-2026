import React from 'react'

export default function Hero({ modules, onNavigate }) {
  return (
    <>
      <section className="hero">
        <div className="hero-tag">🗳️ Primera vuelta — 31 de mayo de 2026</div>
        <h1>Vota con <em>criterio</em>,<br />no con inercia</h1>
        <p>
          Compara las propuestas de los 5 candidatos presidenciales de Colombia. 
          Neutral, gratuito, sin registro. Solo información rigurosa y directa.
        </p>
        <div className="hero-modules">
          {modules.map(m => (
            <button
              key={m.id}
              className={`hero-module-btn ${m.interactive ? 'interactive' : ''}`}
              onClick={() => onNavigate(m.id)}
            >
              {m.icon} {m.label}
            </button>
          ))}
        </div>
      </section>

      <section className="main-content">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '48px' }}>
          {[
            { emoji: '📋', title: 'Solo planes oficiales', desc: 'Toda la información proviene de los planes de gobierno publicados.' },
            { emoji: '⚖️', title: 'Sin jerarquías', desc: 'Los candidatos aparecen en orden alfabético en todos los módulos.' },
            { emoji: '🚫', title: 'Sin editoriales', desc: 'La app presenta los hechos sin calificarlos como buenos o malos.' },
            { emoji: '🆓', title: 'Gratuito y sin datos', desc: 'Sin registro, sin publicidad, sin venta de información.' },
          ].map(p => (
            <div key={p.emoji} className="card" style={{ padding: '20px' }}>
              <div style={{ fontSize: '1.8rem', marginBottom: '8px' }}>{p.emoji}</div>
              <div style={{ fontWeight: '700', fontSize: '0.92rem', marginBottom: '6px' }}>{p.title}</div>
              <div style={{ fontSize: '0.83rem', color: 'var(--gris)', lineHeight: '1.5' }}>{p.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', padding: '32px', background: 'var(--papel)', borderRadius: '12px', border: '1px solid var(--gris-light)' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: '700', marginBottom: '8px' }}>
            ¿Por dónde empezar?
          </div>
          <p style={{ color: 'var(--gris)', fontSize: '0.9rem', marginBottom: '20px', maxWidth: '500px', margin: '0 auto 20px' }}>
            Si tienes 2 minutos: haz el <strong>Quiz</strong>. Si tienes 5: el <strong>Test de afinidad</strong>. Si tienes más: explora los <strong>Candidatos</strong>.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn btn-amarillo" onClick={() => onNavigate('quiz')}>🧠 Hacer el Quiz</button>
            <button className="btn btn-primary" onClick={() => onNavigate('afinidad')}>🎯 Test de afinidad</button>
            <button className="btn btn-secondary" onClick={() => onNavigate('fichas')}>👤 Ver candidatos</button>
          </div>
        </div>
      </section>
    </>
  )
}
