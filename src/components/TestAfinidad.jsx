import React, { useState } from 'react'

const CAND_COLORS = {
  cepeda: '#CE1126', espriella: '#2E7D32', claudia: '#1A4DB3', paloma: '#4A148C', fajardo: '#E07B00',
}

// Questions derived directly from posiciones_test_afinidad in data.json
// Each question maps responses to candidate positions
function buildQuestions(data) {
  // Use the three axes available: economia, seguridad, campo/medio_ambiente
  const axes = ['economia', 'seguridad', 'campo']
  const axisLabels = { economia: 'Economía', seguridad: 'Seguridad', campo: 'Campo / Medio Ambiente' }
  
  const questionsByAxis = {}
  
  data.candidatos.forEach(c => {
    const posiciones = c.posiciones_test_afinidad
    if (!posiciones) return
    
    Object.entries(posiciones).forEach(([eje, pos]) => {
      if (!questionsByAxis[eje]) {
        questionsByAxis[eje] = {
          pregunta: pos.pregunta,
          eje,
          opciones: [],
        }
      }
      // Add this candidate's option
      questionsByAxis[eje].opciones.push({
        candidatoId: c.id,
        posicion: pos.posicion,
        descripcion: pos.descripcion,
        cita: pos.cita_respaldo,
      })
    })
  })

  // Sort options by position letter
  Object.values(questionsByAxis).forEach(q => {
    q.opciones.sort((a, b) => a.posicion.localeCompare(b.posicion))
  })

  return Object.values(questionsByAxis)
}

export default function TestAfinidad({ data }) {
  const [phase, setPhase] = useState('intro') // intro, playing, done
  const [currentQ, setCurrentQ] = useState(0)
  const [userAnswers, setUserAnswers] = useState([])
  const [selected, setSelected] = useState(null)
  const [showCita, setShowCita] = useState(false)

  const questions = buildQuestions(data)
  const total = questions.length

  const handleSelect = (idx) => {
    setSelected(idx)
    setShowCita(false)
  }

  const handleNext = () => {
    if (selected === null) return
    const newAnswers = [...userAnswers, { questionIdx: currentQ, selectedOptionIdx: selected }]
    setUserAnswers(newAnswers)

    if (currentQ < total - 1) {
      setCurrentQ(q => q + 1)
      setSelected(null)
      setShowCita(false)
    } else {
      setPhase('done')
    }
  }

  const handleRestart = () => {
    setPhase('intro')
    setCurrentQ(0)
    setUserAnswers([])
    setSelected(null)
    setShowCita(false)
  }

  if (phase === 'intro') {
    return (
      <div className="fade-in">
        <div className="section-header">
          <div className="section-tag">Módulo 07 — Interactivo</div>
          <h2>Test de afinidad</h2>
          <p>Responde sobre tus posiciones en temas concretos, sin ver nombres de candidatos. Al final verás con quién coincides y por qué.</p>
        </div>
        <div className="card" style={{ maxWidth: '600px', margin: '0 auto', padding: '40px', textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🎯</div>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', marginBottom: '12px' }}>¿Con quién coincido?</h3>
          <p style={{ color: 'var(--gris)', marginBottom: '24px', lineHeight: '1.7' }}>
            {total} preguntas sobre economía, seguridad y campo. Los candidatos están ocultos — 
            solo verás sus posiciones. Al final, descubres tu afinidad programática con cada uno, 
            respaldada por citas textuales de sus planes de gobierno.
          </p>
          <div className="info-box" style={{ textAlign: 'left', marginBottom: '24px' }}>
            <strong>Importante:</strong> El test mide afinidad <em>programática</em>, no te dice a quién votar. 
            Puede haber candidatos con los que no coincides en todo pero que valoras por otras razones.
          </div>
          <button className="btn btn-amarillo" style={{ width: '100%', justifyContent: 'center', padding: '14px' }} onClick={() => setPhase('playing')}>
            Empezar el test →
          </button>
        </div>
      </div>
    )
  }

  if (phase === 'done') {
    // Calculate affinity scores
    const candidatoScores = {}
    data.candidatos.forEach(c => { candidatoScores[c.id] = 0 })

    userAnswers.forEach(({ questionIdx, selectedOptionIdx }) => {
      const q = questions[questionIdx]
      const selectedOption = q.opciones[selectedOptionIdx]
      if (selectedOption) {
        candidatoScores[selectedOption.candidatoId] = (candidatoScores[selectedOption.candidatoId] || 0) + 1
      }
    })

    const sorted = Object.entries(candidatoScores)
      .sort(([,a], [,b]) => b - a)
      .map(([id, score]) => {
        const cand = data.candidatos.find(c => c.id === id)
        const pct = Math.round((score / total) * 100)
        return { id, score, pct, nombre: cand?.candidato.nombre, partido: cand?.candidato.partido }
      })

    // For each chosen answer, get the candidate's quote
    const myAnswers = userAnswers.map(({ questionIdx, selectedOptionIdx }) => {
      const q = questions[questionIdx]
      const opt = q.opciones[selectedOptionIdx]
      return { pregunta: q.pregunta, opcion: opt }
    })

    return (
      <div className="fade-in">
        <div className="section-header">
          <div className="section-tag">Resultado del test de afinidad</div>
          <h2>Tu afinidad programática</h2>
          <p>Basada en {total} preguntas temáticas. Cada coincidencia respaldada por cita textual del plan de gobierno.</p>
        </div>

        <div style={{ display: 'grid', gap: '12px', marginBottom: '40px' }}>
          {sorted.map((c, idx) => (
            <div key={c.id} className="afinidad-result fade-in">
              <div className="afinidad-pct" style={{ color: CAND_COLORS[c.id] }}>{c.pct}%</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: '700', marginBottom: '4px' }}>{c.nombre}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--gris)', marginBottom: '8px' }}>{c.partido}</div>
                <div style={{ background: 'var(--gris-light)', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${c.pct}%`, background: CAND_COLORS[c.id], borderRadius: '4px', transition: 'width 0.8s ease' }} />
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--gris)', marginTop: '4px' }}>
                  {c.score} de {total} coincidencias
                </div>
              </div>
              {idx === 0 && <div style={{ background: 'var(--amarillo)', color: 'var(--tinta)', padding: '4px 10px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '700', flexShrink: 0 }}>Mayor afinidad</div>}
            </div>
          ))}
        </div>

        <div style={{ marginBottom: '32px' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', marginBottom: '16px' }}>Mis respuestas con sus posiciones</h3>
          {myAnswers.map((a, i) => {
            const color = CAND_COLORS[a.opcion?.candidatoId]
            const cand = data.candidatos.find(c => c.id === a.opcion?.candidatoId)
            return (
              <div key={i} className="card" style={{ marginBottom: '12px', borderLeft: `5px solid ${color}` }}>
                <div className="card-body" style={{ padding: '16px 20px' }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--gris)', marginBottom: '6px' }}>Pregunta {i+1}: {a.pregunta}</div>
                  <div style={{ fontWeight: '600', fontSize: '0.9rem', marginBottom: '8px' }}>Tu posición: {a.opcion?.descripcion}</div>
                  <div style={{ fontSize: '0.8rem', color: color, fontWeight: '600', marginBottom: '6px' }}>
                    → Coincide con: {cand?.candidato.nombre}
                  </div>
                  {a.opcion?.cita && (
                    <blockquote style={{ fontSize: '0.82rem', borderLeft: `3px solid ${color}`, paddingLeft: '10px', fontStyle: 'italic', color: 'var(--tinta-suave)', marginTop: '8px', lineHeight: '1.5' }}>
                      "{a.opcion.cita}"
                    </blockquote>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        <div className="info-box">
          Recuerda: este test mide afinidad programática en los ejes disponibles. Tu decisión de voto 
          puede contemplar muchos otros factores. Explora el módulo <strong>Comparador</strong> para ver el cuadro completo.
        </div>

        <button className="btn btn-secondary" onClick={handleRestart} style={{ marginTop: '16px' }}>
          Repetir el test
        </button>
      </div>
    )
  }

  const question = questions[currentQ]

  return (
    <div className="fade-in">
      <div className="section-header">
        <div className="section-tag">Pregunta {currentQ + 1} de {total} — Los candidatos están ocultos</div>
        <div style={{ display: 'flex', gap: '4px', marginTop: '12px' }}>
          {questions.map((_, i) => (
            <div key={i} style={{
              height: '4px', flex: 1, borderRadius: '2px',
              background: i < currentQ ? 'var(--azul)' : i === currentQ ? 'var(--amarillo)' : 'var(--gris-light)',
            }} />
          ))}
        </div>
      </div>

      <div className="card" style={{ maxWidth: '700px', margin: '0 auto' }}>
        <div className="card-body" style={{ padding: '32px' }}>
          <div className="tag tag-eje" style={{ marginBottom: '16px' }}>
            {question.eje === 'economia' ? '💰 Economía' : question.eje === 'seguridad' ? '🛡️ Seguridad' : '🌿 Campo / Medio Ambiente'}
          </div>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: '700', marginBottom: '24px', lineHeight: '1.4' }}>
            {question.pregunta}
          </h3>

          <div style={{ display: 'grid', gap: '10px' }}>
            {question.opciones.map((opcion, idx) => (
              <button
                key={idx}
                className={`quiz-option ${selected === idx ? 'selected-correct' : ''}`}
                onClick={() => handleSelect(idx)}
                style={selected === idx ? { borderColor: 'var(--azul)', background: 'var(--azul-light)' } : {}}
              >
                <div style={{ fontWeight: '600', fontSize: '0.87rem', marginBottom: '4px' }}>
                  Opción {opcion.posicion}
                </div>
                <div style={{ fontSize: '0.9rem', lineHeight: '1.5' }}>{opcion.descripcion}</div>
              </button>
            ))}
          </div>

          {selected !== null && (
            <div style={{ marginTop: '16px' }}>
              <button
                className="btn-ghost"
                onClick={() => setShowCita(!showCita)}
                style={{ fontSize: '0.82rem' }}
              >
                {showCita ? '▲ Ocultar' : '▼ Ver'} la cita de quién propone esto
              </button>
              {showCita && (
                <div className="fade-in" style={{ marginTop: '12px', padding: '12px 16px', background: 'var(--papel)', borderRadius: '8px', fontSize: '0.83rem', lineHeight: '1.6', fontStyle: 'italic', color: 'var(--tinta-suave)' }}>
                  {question.opciones[selected]?.cita}
                </div>
              )}
            </div>
          )}

          <button
            className={`btn btn-primary ${selected === null ? '' : 'fade-in'}`}
            onClick={handleNext}
            disabled={selected === null}
            style={{ width: '100%', justifyContent: 'center', marginTop: '24px', opacity: selected === null ? 0.5 : 1, cursor: selected === null ? 'not-allowed' : 'pointer' }}
          >
            {currentQ < total - 1 ? 'Siguiente →' : 'Ver mi resultado'}
          </button>
        </div>
      </div>
    </div>
  )
}
