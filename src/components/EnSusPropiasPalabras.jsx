import React, { useState } from 'react'

const CAND_COLORS = {
  cepeda: '#CE1126', espriella: '#2E7D32', claudia: '#1A4DB3', paloma: '#4A148C', fajardo: '#E07B00',
}

export default function EnSusPropiasPalabras({ data }) {
  const [filterCand, setFilterCand] = useState('all')

  const candidatos = data.candidatos
  const allCitas = []

  candidatos.forEach(c => {
    const citas = c.citas_textuales
    if (Array.isArray(citas)) {
      citas.forEach(cita => {
        allCitas.push({ ...cita, candidatoId: c.id, candidatoNombre: c.candidato.nombre })
      })
    }
  })

  const filtered = filterCand === 'all'
    ? allCitas
    : allCitas.filter(c => c.candidatoId === filterCand)

  return (
    <div className="fade-in">
      <div className="section-header">
        <div className="section-tag">Módulo 03 — Informativo</div>
        <h2>En sus propias palabras</h2>
        <p>Frases textuales y declaraciones reales de cada candidato. Sin interpretaciones — solo sus palabras, con fuente verificable.</p>
      </div>

      <div className="filter-bar">
        <span className="filter-label">Candidato:</span>
        <div className="filter-chips">
          <button className={`chip ${filterCand === 'all' ? 'active' : ''}`} onClick={() => setFilterCand('all')}>
            Todos
          </button>
          {candidatos.map(c => (
            <button
              key={c.id}
              className={`chip ${filterCand === c.id ? 'active' : ''}`}
              onClick={() => setFilterCand(c.id)}
            >
              {c.candidato.nombre.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gap: '20px' }}>
        {filtered.map((cita, i) => {
          const color = CAND_COLORS[cita.candidatoId]
          return (
            <div key={i} className="card fade-in" style={{ borderLeft: `6px solid ${color}` }}>
              <div className="card-body">
                <blockquote className="styled" style={{ borderColor: color, marginBottom: '16px' }}>
                  {cita.cita}
                </blockquote>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '8px' }}>
                  <div>
                    <div style={{ fontWeight: '700', color: color, fontSize: '0.9rem' }}>
                      — {cita.candidatoNombre}
                    </div>
                    {cita.contexto && (
                      <div style={{ fontSize: '0.82rem', color: 'var(--gris)', marginTop: '4px' }}>
                        📍 {cita.contexto}
                      </div>
                    )}
                    {cita.tema && (
                      <div style={{ marginTop: '8px' }}>
                        <span className="tag tag-eje">{cita.tema}</span>
                      </div>
                    )}
                  </div>
                  {cita.fuente && (
                    <div className="source">{cita.fuente}</div>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
