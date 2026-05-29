import React, { useState } from 'react'

const CAND_COLORS = {
  cepeda: '#CE1126', espriella: '#2E7D32', claudia: '#1A4DB3', paloma: '#4A148C', fajardo: '#E07B00',
}

// Viabilidad data based on context document's analysis sources
const VIABILIDAD_DATA = [
  {
    candidato: 'cepeda',
    propuesta: 'Banco del Pueblo para comunidades pobres',
    escala: 'posible',
    analisis: 'Propuesta con precedentes en otros países (bancos de desarrollo comunitario). Su viabilidad depende de la capitalización inicial y del modelo de supervisión. No detalla fuente de financiación inicial.',
    fuente: 'Análisis Cambio Colombia, abril 2026',
  },
  {
    candidato: 'cepeda',
    propuesta: 'Austeridad republicana estricta del Estado',
    escala: 'realista',
    analisis: 'El recorte de gastos suntuarios es factible vía decreto ejecutivo sin cambio constitucional. El impacto fiscal es limitado pero simbólicamente relevante.',
    fuente: 'La Silla Vacía, análisis programático',
  },
  {
    candidato: 'espriella',
    propuesta: 'Eliminar dos regulaciones por cada nueva creada',
    escala: 'dificil',
    analisis: 'Mecanismo inspirado en el modelo Trump/DOGE. En Colombia requeriría reformas legales profundas y coordinación interinstitucional compleja. No hay precedente exitoso a esta escala.',
    fuente: 'Razón Pública, mayo 2026',
  },
  {
    candidato: 'espriella',
    propuesta: 'Reducción del 10% en burocracia estatal',
    escala: 'dificil',
    analisis: 'Requiere reformas al estatuto de carrera administrativa. El margen real de acción del ejecutivo es limitado sin reforma legal. Propuesta similar ha fracasado en gobiernos anteriores.',
    fuente: 'La Silla Vacía',
  },
  {
    candidato: 'claudia',
    propuesta: '"Todos a la U" — Becas educación superior nacional',
    escala: 'realista',
    analisis: 'Lo implementó en Bogotá con resultados verificables. A escala nacional requiere mayor financiación, pero la arquitectura institucional (ICETEX) ya existe. Es la propuesta con mayor trazabilidad de implementación.',
    fuente: 'Informe de gestión Alcaldía de Bogotá 2020-2023',
  },
  {
    candidato: 'claudia',
    propuesta: 'Reducción de 2 puntos en impuesto empresarial por crecimiento PIB',
    escala: 'posible',
    analisis: 'Mecanismo técnico que podría formalizarse como reforma tributaria. Requiere mayorías en el Congreso. El incentivo automático genera debate entre economistas sobre su eficacia.',
    fuente: 'Análisis Razón Pública',
  },
  {
    candidato: 'paloma',
    propuesta: 'Plan 30-30: 30.000 nuevos militares y 30.000 policías',
    escala: 'sin-fuente',
    analisis: 'La propuesta no incluye estimado de costo ni fuente de financiación. El Ministerio de Defensa históricamente no ha podido escalar el pie de fuerza a este ritmo por restricciones presupuestales.',
    fuente: 'Análisis Cambio Colombia',
  },
  {
    candidato: 'paloma',
    propuesta: 'Reforma política integral con umbral electoral elevado',
    escala: 'dificil',
    analisis: 'Requiere reforma constitucional con mayorías del Congreso. Los partidos pequeños tendrán incentivo para oponerse. Es ambiciosa pero sin ruta legislativa clara desde el ejecutivo.',
    fuente: 'La Silla Vacía',
  },
  {
    candidato: 'fajardo',
    propuesta: 'Modelo "Antioquia la más educada" a escala nacional',
    escala: 'posible',
    analisis: 'Fajardo tiene una trayectoria comprobada en educación subnacional. Escalar a nivel nacional implica coordinación con 32 gobernaciones y 1.100 municipios. Factible con voluntad política y tiempo.',
    fuente: 'Análisis programático Razón Pública',
  },
  {
    candidato: 'fajardo',
    propuesta: 'Corte Constitucional de doce magistrados con paridad de género',
    escala: 'posible',
    analisis: 'Requiere reforma constitucional. Tiene precedentes en otros países latinoamericanos. La paridad de género es la parte más fácil; ampliar la Corte requiere consenso político amplio.',
    fuente: 'La Silla Vacía, mayo 2026',
  },
]

const ESCALA_CONFIG = {
  realista: { label: 'Realista', color: '#2E7D32', bg: '#E8F5E9', emoji: '🟢' },
  posible: { label: 'Ambiciosa pero posible', color: '#F57F17', bg: '#FFF3E0', emoji: '🟡' },
  dificil: { label: 'Difícil de implementar', color: '#E53935', bg: '#FFEBEE', emoji: '🔴' },
  'sin-fuente': { label: 'Sin fuente de financiación', color: '#757575', bg: '#F5F5F5', emoji: '⚪' },
}

export default function Periodometro({ data }) {
  const [filterCand, setFilterCand] = useState('all')

  const candidatos = data.candidatos

  const filtered = filterCand === 'all'
    ? VIABILIDAD_DATA
    : VIABILIDAD_DATA.filter(v => v.candidato === filterCand)

  return (
    <div className="fade-in">
      <div className="section-header">
        <div className="section-tag">Módulo 05 — Informativo</div>
        <h2>Periodómetro</h2>
        <p>Viabilidad de propuestas según análisis de medios especializados. La app no opina — agrega lo que ya dijeron los analistas.</p>
      </div>

      <div className="info-box">
        Fuentes: <strong>La Silla Vacía</strong>, <strong>Razón Pública</strong>, <strong>Cambio Colombia</strong>. 
        Escala de viabilidad determinada por los analistas citados, no por este proyecto.
      </div>

      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '24px' }}>
        {Object.entries(ESCALA_CONFIG).map(([key, cfg]) => (
          <div key={key} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem' }}>
            <span>{cfg.emoji}</span>
            <span style={{ color: cfg.color, fontWeight: '600' }}>{cfg.label}</span>
          </div>
        ))}
      </div>

      <div className="filter-bar">
        <span className="filter-label">Candidato:</span>
        <div className="filter-chips">
          <button className={`chip ${filterCand === 'all' ? 'active' : ''}`} onClick={() => setFilterCand('all')}>Todos</button>
          {candidatos.map(c => (
            <button key={c.id} className={`chip ${filterCand === c.id ? 'active' : ''}`} onClick={() => setFilterCand(c.id)}>
              {c.candidato.nombre.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gap: '16px' }}>
        {filtered.map((item, i) => {
          const cfg = ESCALA_CONFIG[item.escala]
          const color = CAND_COLORS[item.candidato]
          const cand = candidatos.find(c => c.id === item.candidato)

          return (
            <div key={i} className="card fade-in" style={{ borderLeft: `5px solid ${color}` }}>
              <div className="card-body">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px', marginBottom: '10px' }}>
                  <div>
                    <div style={{ fontSize: '0.78rem', color: color, fontWeight: '700', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      {cand?.candidato.nombre.split(' ')[0]}
                    </div>
                    <div style={{ fontWeight: '700', fontSize: '0.97rem', color: 'var(--tinta)' }}>
                      {item.propuesta}
                    </div>
                  </div>
                  <div className="viabilidad-pill" style={{ background: cfg.bg, color: cfg.color, flexShrink: 0 }}>
                    {cfg.emoji} {cfg.label}
                  </div>
                </div>
                <p style={{ color: 'var(--tinta-suave)', fontSize: '0.87rem', lineHeight: '1.7', marginBottom: '8px' }}>
                  {item.analisis}
                </p>
                <div className="source">{item.fuente}</div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
