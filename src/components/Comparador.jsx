import React, { useState } from 'react'

const CAND_COLORS = {
  cepeda: '#CE1126', espriella: '#2E7D32', claudia: '#1A4DB3', paloma: '#4A148C', fajardo: '#E07B00',
}

const EJE_LABELS = {
  economia_e_impuestos: '💰 Economía e impuestos',
  seguridad_y_paz: '🛡️ Seguridad y paz',
  salud: '🏥 Salud',
  educacion: '🎓 Educación',
  medio_ambiente: '🌿 Medio ambiente',
  anticorrupcion_e_instituciones: '⚖️ Anticorrupción e instituciones',
  relaciones_internacionales: '🌍 Relaciones internacionales',
  vivienda_y_campo: '🏡 Vivienda y campo',
}

export default function Comparador({ data }) {
  const [activeEje, setActiveEje] = useState('economia_e_impuestos')
  const candidatos = data.candidatos

  return (
    <div className="fade-in">
      <div className="section-header">
        <div className="section-tag">Módulo 02 — Informativo</div>
        <h2>Comparador de propuestas</h2>
        <p>Selecciona un eje temático para ver qué propone cada candidato. Lado a lado, sin editoriales.</p>
      </div>

      <div className="filter-chips" style={{ marginBottom: '24px', flexWrap: 'nowrap', overflowX: 'auto', paddingBottom: '4px' }}>
        {Object.entries(EJE_LABELS).map(([key, label]) => (
          <button key={key} className={`chip ${activeEje === key ? 'active' : ''}`} onClick={() => setActiveEje(key)}>
            {label}
          </button>
        ))}
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${candidatos.length}, minmax(200px, 1fr))`,
        gap: '12px',
        overflowX: 'auto',
        paddingBottom: '8px',
      }}>
        {candidatos.map(c => {
          const cand = c.candidato
          const color = CAND_COLORS[c.id]
          const ejeData = c.ejes_tematicos[activeEje]

          return (
            <div key={c.id} className="card fade-in" style={{ borderTop: `5px solid ${color}`, minWidth: '200px' }}>
              <div className="card-header" style={{ padding: '12px 16px' }}>
                <div style={{ fontWeight: '700', fontSize: '0.9rem', color: color }}>{cand.nombre.split(' ')[0]}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--gris)', marginTop: '2px' }}>{cand.partido}</div>
              </div>
              <div style={{ padding: '16px' }}>
                {ejeData ? (
                  <>
                    {ejeData.resumen && (
                      <p style={{ fontSize: '0.85rem', color: 'var(--tinta-suave)', lineHeight: '1.6', marginBottom: '12px', fontStyle: 'italic', borderLeft: `3px solid ${color}`, paddingLeft: '10px' }}>
                        {ejeData.resumen}
                      </p>
                    )}
                    {ejeData.propuestas && ejeData.propuestas.slice(0, 4).map((p, i) => (
                      <div key={i} style={{ padding: '8px 0', borderBottom: '1px solid var(--gris-light)', fontSize: '0.83rem' }}>
                        <div style={{ fontWeight: '600', color: 'var(--tinta)', marginBottom: '3px', lineHeight: '1.4' }}>
                          ✓ {p.propuesta}
                        </div>
                        {p.detalle && (
                          <div style={{ color: 'var(--tinta-suave)', fontSize: '0.8rem', lineHeight: '1.5' }}>
                            {p.detalle}
                          </div>
                        )}
                      </div>
                    ))}
                    {ejeData.propuestas && ejeData.propuestas.length > 4 && (
                      <div style={{ fontSize: '0.78rem', color: 'var(--gris)', marginTop: '8px', textAlign: 'center' }}>
                        +{ejeData.propuestas.length - 4} propuestas más
                      </div>
                    )}
                  </>
                ) : (
                  <div style={{ color: 'var(--gris)', fontSize: '0.85rem', fontStyle: 'italic' }}>
                    Sin datos disponibles
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
