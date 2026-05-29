import React, { useState } from 'react'

const CAND_COLORS = {
  cepeda: '#CE1126', espriella: '#2E7D32', claudia: '#1A4DB3', paloma: '#4A148C', fajardo: '#E07B00',
}

function getResultadoClass(texto) {
  if (!texto) return ''
  const t = texto.toUpperCase()
  if (t.includes('CUMPLIDO PARCIALMENTE') || t.includes('PARCIALMENTE')) return 'resultado-parcial'
  if (t.includes('CUMPLIDO')) return 'resultado-cumplido'
  if (t.includes('FALLIDO')) return 'resultado-fallido'
  if (t.includes('CONTROVERSIA')) return 'resultado-controversia'
  if (t.includes('MIXTO')) return 'resultado-mixto'
  return ''
}

function extractResultadoLabel(texto) {
  if (!texto) return ''
  const t = texto.toUpperCase()
  if (t.includes('CUMPLIDO PARCIALMENTE')) return 'CUMPLIDO PARCIALMENTE'
  if (t.includes('CUMPLIDO')) return 'CUMPLIDO'
  if (t.includes('FALLIDO')) return 'FALLIDO'
  if (t.includes('CONTROVERSIA')) return 'CONTROVERSIA'
  if (t.includes('MIXTO')) return 'MIXTO'
  return ''
}

function cleanResultadoText(texto) {
  if (!texto) return ''
  const labels = ['CUMPLIDO PARCIALMENTE. ', 'CUMPLIDO. ', 'FALLIDO. ', 'CONTROVERSIA. ', 'MIXTO. ']
  let clean = texto
  for (const l of labels) {
    clean = clean.replace(l, '')
  }
  return clean
}

export default function PromesasRealidad({ data }) {
  const [selected, setSelected] = useState(null)

  const candidatos = data.candidatos

  const withTrack = candidatos.filter(c => {
    const pv = c.promesas_vs_realidad
    return pv && pv.aplica === true
  })

  const withoutTrack = candidatos.filter(c => {
    const pv = c.promesas_vs_realidad
    return pv && pv.aplica === false
  })

  const renderCandidato = (c) => {
    const pv = c.promesas_vs_realidad
    const color = CAND_COLORS[c.id]
    const historial = pv.historial || []

    return (
      <div>
        <button className="back-btn" onClick={() => setSelected(null)}>← Volver</button>

        <div className="candidato-hero" style={{ borderBottom: `6px solid ${color}` }}>
          <div className="candidato-nombre">{c.candidato.nombre}</div>
          <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem', marginTop: '8px' }}>
            📋 Cargo previo: <strong style={{ color: 'var(--amarillo)' }}>{pv.cargo_previo}</strong>
          </div>
        </div>

        {historial.length > 0 && (
          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', marginBottom: '16px', fontWeight: '700' }}>
              Promesas vs Realidad
            </h3>
            <div style={{ display: 'grid', gap: '12px' }}>
              {historial.map((item, i) => {
                const badgeClass = getResultadoClass(item.resultado)
                const label = extractResultadoLabel(item.resultado)
                const cleanText = cleanResultadoText(item.resultado)

                return (
                  <div key={i} className="card" style={{ borderLeft: `5px solid ${color}` }}>
                    <div className="card-body" style={{ padding: '20px 24px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px', marginBottom: '8px', flexWrap: 'wrap' }}>
                        <div style={{ fontWeight: '700', fontSize: '0.97rem' }}>📌 {item.promesa}</div>
                        {label && <span className={`resultado-badge ${badgeClass}`}>{label}</span>}
                      </div>
                      <p style={{ color: 'var(--tinta-suave)', fontSize: '0.87rem', lineHeight: '1.7', marginBottom: '8px' }}>
                        {cleanText}
                      </p>
                      {item.fuente && <div className="source">{item.fuente}</div>}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {pv.logros && pv.logros.length > 0 && (
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', marginBottom: '12px', fontWeight: '700', color: '#2E7D32' }}>
              ✓ Logros reconocidos
            </h3>
            <div style={{ display: 'grid', gap: '8px' }}>
              {pv.logros.map((logro, i) => (
                <div key={i} style={{ padding: '12px 16px', background: '#E8F5E9', borderRadius: '8px', borderLeft: '4px solid #2E7D32', fontSize: '0.87rem', lineHeight: '1.6' }}>
                  {logro}
                </div>
              ))}
            </div>
          </div>
        )}

        {pv.criticas && pv.criticas.length > 0 && (
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', marginBottom: '12px', fontWeight: '700', color: 'var(--rojo)' }}>
              ⚠️ Críticas y cuestionamientos
            </h3>
            <div style={{ display: 'grid', gap: '8px' }}>
              {pv.criticas.map((critica, i) => (
                <div key={i} style={{ padding: '12px 16px', background: 'var(--rojo-light)', borderRadius: '8px', borderLeft: '4px solid var(--rojo)', fontSize: '0.87rem', lineHeight: '1.6' }}>
                  {critica}
                </div>
              ))}
            </div>
          </div>
        )}

        {pv.fuente && <div className="source">{pv.fuente}</div>}
      </div>
    )
  }

  if (selected) {
    const c = candidatos.find(c => c.id === selected)
    return <div className="fade-in">{renderCandidato(c)}</div>
  }

  return (
    <div className="fade-in">
      <div className="section-header">
        <div className="section-tag">Módulo 09 — Interactivo</div>
        <h2>Promesas vs Realidad</h2>
        <p>Lo que prometieron vs. lo que hicieron en cargos anteriores. Contexto histórico real para evaluar credibilidad.</p>
      </div>

      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: '700', marginBottom: '16px' }}>
        Con cargo previo verificable
      </h3>
      <div className="grid-auto" style={{ marginBottom: '32px' }}>
        {withTrack.map(c => {
          const pv = c.promesas_vs_realidad
          const color = CAND_COLORS[c.id]
          const historial = pv.historial || []
          const cumplidas = historial.filter(h => h.resultado && h.resultado.toUpperCase().includes('CUMPLIDO') && !h.resultado.toUpperCase().includes('PARCIALMENTE')).length
          const parciales = historial.filter(h => h.resultado && h.resultado.toUpperCase().includes('PARCIALMENTE')).length
          const fallidas = historial.filter(h => h.resultado && h.resultado.toUpperCase().includes('FALLIDO')).length

          return (
            <div key={c.id} className="card" style={{ cursor: 'pointer', borderTop: `6px solid ${color}` }} onClick={() => setSelected(c.id)}>
              <div className="card-body">
                <h3 style={{ fontWeight: '700', fontSize: '1.05rem', marginBottom: '4px' }}>{c.candidato.nombre}</h3>
                <div style={{ fontSize: '0.82rem', color: color, fontWeight: '600', marginBottom: '12px' }}>
                  {pv.cargo_previo}
                </div>
                {historial.length > 0 && (
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
                    {cumplidas > 0 && <span className="resultado-badge resultado-cumplido">✓ {cumplidas} cumplidas</span>}
                    {parciales > 0 && <span className="resultado-badge resultado-parcial">◑ {parciales} parciales</span>}
                    {fallidas > 0 && <span className="resultado-badge resultado-fallido">✗ {fallidas} fallidas</span>}
                  </div>
                )}
                <div style={{ fontSize: '0.8rem', color: 'var(--gris)', fontStyle: 'italic', marginBottom: '16px' }}>
                  {historial.length} promesas rastreadas
                </div>
                <button className="btn btn-sm btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>
                  Ver el historial →
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {withoutTrack.length > 0 && (
        <>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: '700', marginBottom: '16px' }}>
            Sin cargo ejecutivo previo
          </h3>
          <div style={{ display: 'grid', gap: '12px' }}>
            {withoutTrack.map(c => {
              const pv = c.promesas_vs_realidad
              const color = CAND_COLORS[c.id]
              return (
                <div key={c.id} className="card" style={{ borderLeft: `5px solid ${color}` }}>
                  <div className="card-body">
                    <div style={{ fontWeight: '700', marginBottom: '6px' }}>{c.candidato.nombre}</div>
                    <p style={{ color: 'var(--tinta-suave)', fontSize: '0.87rem', lineHeight: '1.6', marginBottom: '8px' }}>
                      {pv.razon}
                    </p>
                    {pv.nota && (
                      <div style={{ background: 'var(--papel)', borderRadius: '6px', padding: '10px 14px', fontSize: '0.83rem', color: 'var(--tinta-suave)', fontStyle: 'italic', borderLeft: `3px solid ${color}` }}>
                        💡 {pv.nota}
                      </div>
                    )}
                    {pv.fuente && <div className="source" style={{ marginTop: '8px' }}>{pv.fuente}</div>}
                  </div>
                </div>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}
