import React, { useState } from 'react'

const CAND_COLORS = {
  cepeda: '#CE1126', espriella: '#2E7D32', claudia: '#1A4DB3', paloma: '#4A148C', fajardo: '#E07B00',
}

export default function SaposElectorales({ data }) {
  const [filterCand, setFilterCand] = useState('all')
  const [viewMode, setViewMode] = useState('lista') // lista | paralelo

  const candidatos = data.candidatos

  const allSapos = []
  candidatos.forEach(c => {
    const sapos = c.sapos_electorales
    if (Array.isArray(sapos)) {
      sapos.forEach(s => {
        allSapos.push({ ...s, candidatoId: c.id, candidatoNombre: c.candidato.nombre })
      })
    }
  })

  const filtered = filterCand === 'all' ? allSapos : allSapos.filter(s => s.candidatoId === filterCand)

  return (
    <div className="fade-in">
      <div className="section-header">
        <div className="section-tag">Módulo 08 — Interactivo</div>
        <h2>Sapos electorales 🐸</h2>
        <p>Lo que tendrías que aceptar si votas por cada candidato. Contradicciones, posiciones polémicas, puntos ciegos. Todo con fuente verificable.</p>
      </div>

      <div className="info-box">
        <strong>Tono directo, sin sensacionalismo.</strong> Solo hechos verificables de planes de gobierno y fuentes citadas. 
        Este módulo no pretende disuadir de ningún candidato — la información es para que decidas con criterio propio.
      </div>

      <div className="filter-bar">
        <span className="filter-label">Candidato:</span>
        <div className="filter-chips">
          <button className={`chip ${filterCand === 'all' ? 'active' : ''}`} onClick={() => { setFilterCand('all'); setViewMode('lista') }}>
            Todos
          </button>
          {candidatos.map(c => (
            <button key={c.id} className={`chip ${filterCand === c.id ? 'active' : ''}`} onClick={() => setFilterCand(c.id)}>
              {c.candidato.nombre.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {filterCand === 'all' ? (
        // Side by side view when all
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '20px',
        }}>
          {candidatos.map(c => {
            const color = CAND_COLORS[c.id]
            const sapos = Array.isArray(c.sapos_electorales) ? c.sapos_electorales : []
            return (
              <div key={c.id} style={{ borderTop: `5px solid ${color}`, background: 'var(--blanco)', border: `2px solid var(--gris-light)`, borderRadius: '8px', overflow: 'hidden' }}>
                <div style={{ padding: '14px 16px', background: color, color: 'white' }}>
                  <div style={{ fontWeight: '700', fontSize: '0.9rem' }}>{c.candidato.nombre}</div>
                  <div style={{ fontSize: '0.75rem', opacity: 0.85 }}>{sapos.length} sapos</div>
                </div>
                <div style={{ padding: '12px' }}>
                  {sapos.map((s, i) => (
                    <div key={i} className="sapo-card">
                      <div className="sapo-title">{s.sapo}</div>
                      {s.detalle && <div className="sapo-detail">{s.detalle}</div>}
                      {s.fuente && <div className="source" style={{ marginTop: '6px' }}>{s.fuente}</div>}
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div>
          {filtered.length === 0 ? (
            <div className="empty-state">
              <div className="icon">🐸</div>
              <p>No hay sapos para este candidato</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gap: '12px' }}>
              {filtered.map((s, i) => {
                const color = CAND_COLORS[s.candidatoId]
                return (
                  <div key={i} className="card fade-in" style={{ borderLeft: `5px solid ${color}` }}>
                    <div className="card-body" style={{ padding: '20px 24px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px' }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: '1.3rem', marginBottom: '8px' }}>🐸</div>
                          <div style={{ fontWeight: '700', fontSize: '1rem', color: 'var(--tinta)', marginBottom: '8px' }}>
                            {s.sapo}
                          </div>
                          {s.detalle && (
                            <p style={{ color: 'var(--tinta-suave)', fontSize: '0.87rem', lineHeight: '1.7', marginBottom: '8px' }}>
                              {s.detalle}
                            </p>
                          )}
                          {s.fuente && <div className="source">{s.fuente}</div>}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
