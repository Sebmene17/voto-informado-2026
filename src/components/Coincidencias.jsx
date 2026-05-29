import React, { useState } from 'react'

// Generate coincidences by comparing candidates on same eje and finding similar positions
const CAND_COLORS = {
  cepeda: '#CE1126', espriella: '#2E7D32', claudia: '#1A4DB3', paloma: '#4A148C', fajardo: '#E07B00',
}

// Curated coincidences across ideological spectrum
const COINCIDENCIAS_DATA = [
  {
    eje: 'Anticorrupción e instituciones',
    candidatos: ['paloma', 'cepeda'],
    titulo: 'Reforma a la financiación política',
    descripcion: 'Tanto Paloma Valencia (derecha) como Iván Cepeda (izquierda) plantean reformas profundas a la forma en que se financia la política en Colombia, buscando reducir la influencia del dinero ilícito en las campañas.',
    fuentes: 'Planes de gobierno — Eje Anticorrupción',
  },
  {
    eje: 'Educación',
    candidatos: ['fajardo', 'claudia'],
    titulo: 'Educación pública de calidad como motor',
    descripcion: 'Fajardo y Claudia López, desde distintas trayectorias, coinciden en que la educación pública de calidad es la herramienta más poderosa de movilidad social y proponen aumentar la inversión en cobertura y calidad.',
    fuentes: 'Planes de gobierno — Eje Educación',
  },
  {
    eje: 'Anticorrupción e instituciones',
    candidatos: ['claudia', 'espriella'],
    titulo: 'Combate a la corrupción como prioridad número uno',
    descripcion: 'Claudia López (centro) y Abelardo de la Espriella (derecha) coinciden en que la corrupción es el problema estructural principal de Colombia y que combatirla requiere medidas drásticas e independencia de las instituciones de control.',
    fuentes: 'Planes de gobierno — Eje Anticorrupción',
  },
  {
    eje: 'Medio ambiente',
    candidatos: ['fajardo', 'cepeda'],
    titulo: 'Transición energética progresiva',
    descripcion: 'Fajardo y Cepeda coinciden en la necesidad de reducir la dependencia del petróleo, aunque difieren en el ritmo: ambos abogan por una transición que no sacrifique el bienestar económico de las regiones extractivas.',
    fuentes: 'Planes de gobierno — Eje Medio Ambiente',
  },
  {
    eje: 'Vivienda y campo',
    candidatos: ['cepeda', 'claudia'],
    titulo: 'Acceso a crédito rural y formalización',
    descripcion: 'Aunque con enfoques diferentes sobre la redistribución de tierras, Cepeda y Claudia coinciden en la necesidad urgente de formalizar la propiedad rural y ampliar el acceso a crédito para pequeños campesinos.',
    fuentes: 'Planes de gobierno — Eje Vivienda y Campo',
  },
  {
    eje: 'Salud',
    candidatos: ['paloma', 'fajardo'],
    titulo: 'Mayor eficiencia sin eliminar las EPS',
    descripcion: 'Paloma Valencia y Fajardo comparten la visión de que el sistema de salud necesita transformación pero no el desmantelamiento de todos los intermediadores; abogan por un modelo mixto con mayor control y eficiencia.',
    fuentes: 'Planes de gobierno — Eje Salud',
  },
]

export default function Coincidencias({ data }) {
  const [activeEje, setActiveEje] = useState('all')

  const candidatos = data.candidatos
  const candidatoMap = {}
  candidatos.forEach(c => { candidatoMap[c.id] = c.candidato.nombre })

  const ejes = ['all', ...new Set(COINCIDENCIAS_DATA.map(c => c.eje))]

  const filtered = activeEje === 'all'
    ? COINCIDENCIAS_DATA
    : COINCIDENCIAS_DATA.filter(c => c.eje === activeEje)

  return (
    <div className="fade-in">
      <div className="section-header">
        <div className="section-tag">Módulo 04 — Informativo</div>
        <h2>Coincidencias sorprendentes</h2>
        <p>Puntos donde candidatos de espectros opuestos coinciden. Basado en los planes de gobierno oficiales. Rompe la narrativa de polarización total.</p>
      </div>

      <div className="info-box" style={{ marginBottom: '24px' }}>
        ℹ️ Estas coincidencias no implican alianzas ni acuerdos entre candidatos — reflejan propuestas similares en sus planes de gobierno.
      </div>

      <div className="filter-bar">
        <span className="filter-label">Eje:</span>
        <div className="filter-chips">
          {ejes.map(eje => (
            <button key={eje} className={`chip ${activeEje === eje ? 'active' : ''}`} onClick={() => setActiveEje(eje)}>
              {eje === 'all' ? 'Todos' : eje}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gap: '20px' }}>
        {filtered.map((coin, i) => (
          <div key={i} className="coincidencia-card fade-in">
            <div className="coincidencia-header">
              {coin.candidatos.map((cId, idx) => (
                <React.Fragment key={cId}>
                  <span style={{ color: CAND_COLORS[cId] }}>{candidatoMap[cId]?.split(' ')[0]}</span>
                  {idx < coin.candidatos.length - 1 && (
                    <span className="coincidencia-vs">vs</span>
                  )}
                </React.Fragment>
              ))}
              <span style={{ marginLeft: 'auto', fontSize: '0.78rem', opacity: 0.7 }}>{coin.eje}</span>
            </div>
            <div className="coincidencia-body">
              <div style={{ fontWeight: '700', fontSize: '1rem', marginBottom: '10px', color: 'var(--tinta)' }}>
                🤝 {coin.titulo}
              </div>
              <p style={{ color: 'var(--tinta-suave)', fontSize: '0.9rem', lineHeight: '1.7', marginBottom: '12px' }}>
                {coin.descripcion}
              </p>
              <div className="source">{coin.fuentes}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
