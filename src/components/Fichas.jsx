import React, { useState } from 'react'

const POS_CLASS = {
  'Izquierda': 'pos-izquierda',
  'Centro-izq.': 'pos-centro-izq',
  'Centro': 'pos-centro',
  'Derecha': 'pos-derecha',
}

const CAND_COLORS = {
  cepeda: '#CE1126',
  espriella: '#2E7D32',
  claudia: '#1A4DB3',
  paloma: '#4A148C',
  fajardo: '#E07B00',
}

const EJE_LABELS = {
  economia_e_impuestos: 'Economía e impuestos',
  seguridad_y_paz: 'Seguridad y paz',
  salud: 'Salud',
  educacion: 'Educación',
  medio_ambiente: 'Medio ambiente',
  anticorrupcion_e_instituciones: 'Anticorrupción e instituciones',
  relaciones_internacionales: 'Relaciones internacionales',
  vivienda_y_campo: 'Vivienda y campo',
}

export default function Fichas({ data }) {
  const [selected, setSelected] = useState(null)
  const [activeEje, setActiveEje] = useState('economia_e_impuestos')

  const candidatos = data.candidatos

  if (selected) {
    const c = candidatos.find(c => c.id === selected)
    const cand = c.candidato
    const color = CAND_COLORS[c.id]
    const ejeData = c.ejes_tematicos[activeEje]

    return (
      <div className="fade-in">
        <button className="back-btn" onClick={() => setSelected(null)}>
          ← Volver a candidatos
        </button>

        <div className="candidato-hero" style={{ borderBottom: `6px solid ${color}` }}>
          <div className="candidato-nombre">{cand.nombre}</div>
          {cand.eslogan && <div className="candidato-eslogan">"{cand.eslogan}"</div>}
          <div className="candidato-meta">
            <span>{cand.partido}</span>
            <span>·</span>
            <span className={`pos-badge ${POS_CLASS[cand.posicion_politica] || ''}`} style={{ marginTop: 0 }}>
              {cand.posicion_politica}
            </span>
            {cand.formula_vice && <><span>·</span><span>Fórmula: {cand.formula_vice}</span></>}
          </div>
          {cand.descripcion_perfil && (
            <p style={{ marginTop: '16px', color: 'rgba(255,255,255,0.85)', fontSize: '0.9rem', maxWidth: '640px', lineHeight: '1.7' }}>
              {cand.descripcion_perfil}
            </p>
          )}
        </div>

        <div className="section-header">
          <div className="section-tag">Propuestas por eje</div>
          <h2>Plan de gobierno</h2>
        </div>

        <div className="filter-chips" style={{ marginBottom: '24px' }}>
          {Object.entries(EJE_LABELS).map(([key, label]) => (
            <button
              key={key}
              className={`chip ${activeEje === key ? 'active' : ''}`}
              onClick={() => setActiveEje(key)}
            >
              {label}
            </button>
          ))}
        </div>

        {ejeData && (
          <div className="card fade-in">
            <div className="card-header" style={{ borderTop: `4px solid ${color}` }}>
              <div className="section-tag">{EJE_LABELS[activeEje]}</div>
              <div style={{ fontWeight: '700', fontSize: '1rem', marginTop: '4px' }}>{ejeData.titulo}</div>
              {ejeData.resumen && (
                <p style={{ color: 'var(--tinta-suave)', fontSize: '0.9rem', marginTop: '8px', lineHeight: '1.6' }}>
                  {ejeData.resumen}
                </p>
              )}
            </div>
            <div className="card-body">
              {ejeData.propuestas && ejeData.propuestas.map((p, i) => (
                <div key={i} className="propuesta-row">
                  <div className="propuesta-title">✓ {p.propuesta}</div>
                  {p.detalle && <div className="propuesta-detail">{p.detalle}</div>}
                  {p.fuente && <div className="source">{p.fuente}</div>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="fade-in">
      <div className="section-header">
        <div className="section-tag">Módulo 01 — Informativo</div>
        <h2>Candidatos presidenciales</h2>
        <p>Exploración de perfiles y propuestas. Orden alfabético, sin jerarquía por encuestas.</p>
      </div>

      <div className="grid-auto">
        {candidatos.map(c => {
          const cand = c.candidato
          const color = CAND_COLORS[c.id]
          return (
            <div
              key={c.id}
              className="card"
              style={{ cursor: 'pointer', borderTop: `6px solid ${color}` }}
              onClick={() => setSelected(c.id)}
            >
              <div className="card-body">
                <div style={{
                  width: '52px', height: '52px', borderRadius: '50%',
                  background: color, color: 'white',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.3rem', fontWeight: '900', fontFamily: 'var(--font-display)',
                  marginBottom: '12px',
                  boxShadow: `0 3px 0 0 ${color}44`
                }}>
                  {cand.nombre.split(' ')[0][0]}{cand.nombre.split(' ').slice(-1)[0][0]}
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: '700', marginBottom: '4px', lineHeight: '1.2' }}>
                  {cand.nombre}
                </h3>
                <div style={{ fontSize: '0.82rem', color: 'var(--gris)', marginBottom: '8px' }}>
                  {cand.partido}
                </div>
                <div className={`pos-badge ${POS_CLASS[cand.posicion_politica] || ''}`}>
                  {cand.posicion_politica}
                </div>
                {cand.eslogan && (
                  <div style={{ marginTop: '12px', fontStyle: 'italic', fontSize: '0.85rem', color: 'var(--tinta-suave)', borderLeft: `3px solid ${color}`, paddingLeft: '10px', lineHeight: '1.5' }}>
                    "{cand.eslogan}"
                  </div>
                )}
                {cand.formula_vice && (
                  <div style={{ marginTop: '12px', fontSize: '0.8rem', color: 'var(--gris)' }}>
                    Fórmula: <strong style={{ color: 'var(--tinta)' }}>{cand.formula_vice}</strong>
                  </div>
                )}
                <div style={{ marginTop: '16px' }}>
                  <button className="btn btn-sm btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>
                    Ver propuestas →
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
