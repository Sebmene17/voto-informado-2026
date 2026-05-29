import React, { useState } from 'react'

// Quiz questions derived from real proposals in data.json
const QUIZ_QUESTIONS = [
  {
    pregunta: '¿Qué propone Iván Cepeda sobre el papel del Estado en la economía?',
    opciones: [
      'Reducir el Estado al mínimo y dejar al mercado libre',
      'Austeridad republicana del Estado con mayor gasto social y persecución de evasión fiscal',
      'Privatizar los servicios públicos para mejorar su eficiencia',
      'Mantener exactamente el modelo económico actual',
    ],
    correcta: 1,
    fuente: 'Plan de gobierno Cepeda — pág. 172-188',
    explicacion: 'Cepeda propone austeridad en gastos suntuarios del Estado (viajes, viáticos) pero con más gasto social. También propone un Banco del Pueblo y persecución de la evasión fiscal.',
  },
  {
    pregunta: '¿Cuál es el nombre del programa de becas universitarias que Claudia López implementó en Bogotá y ahora propone a escala nacional?',
    opciones: [
      'Colombia Aprende',
      'Todos a la U',
      'Universidad para Todos',
      'Generación 2026',
    ],
    correcta: 1,
    fuente: 'Plan de gobierno Claudia López — pág. 30-35',
    explicacion: '"Todos a la U" es el programa de becas de educación superior que Claudia implementó en Bogotá con resultados verificables y que ahora propone a escala nacional.',
  },
  {
    pregunta: '¿Qué propone Abelardo de la Espriella respecto a las regulaciones del Estado?',
    opciones: [
      'Crear nuevas regulaciones para proteger la industria nacional',
      'Mantener el marco regulatorio actual pero aplicarlo con más rigor',
      'Gran Revolución de Desregulación: por cada nueva regulación, eliminar dos',
      'Transferir la regulación del Estado a organismos internacionales',
    ],
    correcta: 2,
    fuente: 'Propuesta 6 — Plan de gobierno De la Espriella',
    explicacion: 'De la Espriella propone que por cada nueva regulación que cree el Estado, deban eliminarse dos existentes, siguiendo un modelo de desregulación radical.',
  },
  {
    pregunta: '¿Cuántos nuevos militares y policías propone Paloma Valencia con su "Plan 30-30"?',
    opciones: [
      '10.000 militares y 10.000 policías',
      '20.000 militares y 20.000 policías',
      '30.000 nuevos militares y 30.000 nuevos policías',
      '50.000 militares y 10.000 policías',
    ],
    correcta: 2,
    fuente: 'Punto 1 — Plan de gobierno Paloma Valencia',
    explicacion: 'El Plan 30-30 de Paloma Valencia contempla 30.000 nuevos militares y 30.000 nuevos policías para recuperar el control territorial.',
  },
  {
    pregunta: '¿En qué cargo logró Sergio Fajardo que Medellín ganara el premio a la ciudad más innovadora del mundo?',
    opciones: [
      'Gobernador de Antioquia',
      'Senador de la República',
      'Alcalde de Medellín',
      'Ministro de Educación',
    ],
    correcta: 2,
    fuente: 'Historial de gestión — Urban Land Institute, 2013',
    explicacion: 'Durante su alcaldía en Medellín (2004-2007), Fajardo implementó el urbanismo social que llevó a que la ciudad ganara en 2013 el premio a la ciudad más innovadora del mundo.',
  },
  {
    pregunta: '¿Qué propone Iván Cepeda para los grupos armados en Colombia?',
    opciones: [
      'Ofensiva militar total sin ningún tipo de diálogo',
      'Negociación y paz total, atacando las causas estructurales de la violencia',
      'Extradición inmediata de todos los líderes armados',
      'Mantener el statu quo actual de negociación del gobierno Petro',
    ],
    correcta: 1,
    fuente: 'Plan de gobierno Cepeda — pág. 759',
    explicacion: 'Cepeda propone paz total mediante negociación, argumentando que la reforma agraria es una estrategia integral para transformar las economías ilegales.',
  },
  {
    pregunta: '¿Cuál es la posición de Claudia López frente a los grupos armados?',
    opciones: [
      'Negociación política con todos los grupos',
      'Paz total siguiendo el modelo del gobierno Petro',
      'Tratarlos exclusivamente como organizaciones criminales, sin tratamiento político',
      'Crear zonas de distensión y promover acuerdos territoriales',
    ],
    correcta: 2,
    fuente: 'Plan de gobierno Claudia López — pág. 10',
    explicacion: 'Claudia López argumenta que desde 2016 ya solo quedan organizaciones criminales transnacionales, no actores políticos, y propone combate frontal sin mesas de paz.',
  },
  {
    pregunta: '¿Qué ciudad transformó Fajardo con el "urbanismo social", instalando escaleras eléctricas en las comunas?',
    opciones: [
      'Bogotá',
      'Cali',
      'Medellín',
      'Barranquilla',
    ],
    correcta: 2,
    fuente: 'Historial de gestión Alcaldía de Medellín 2004-2007',
    explicacion: 'En Medellín, como alcalde, Fajardo implementó el urbanismo social con las famosas escaleras eléctricas en las comunas, el Parque Biblioteca España y el Metrocable.',
  },
  {
    pregunta: '¿Qué propone Paloma Valencia respecto a los recursos naturales y el medio ambiente?',
    opciones: [
      'Prohibición inmediata de toda extracción de petróleo',
      'Explotar los recursos naturales financiando con esas regalías la conservación ambiental',
      'Transferir la gestión ambiental a entidades privadas',
      'Seguir el modelo venezolano de control estatal total',
    ],
    correcta: 1,
    fuente: 'Puntos 26 y 100 — Plan de gobierno Paloma Valencia',
    explicacion: 'Paloma Valencia propone que Colombia aproveche sus recursos naturales y use las regalías para financiar la conservación, argumentando que "crecer y conservar no son opuestos".',
  },
  {
    pregunta: '¿Cuál fue el mayor cuestionamiento al mandato de Claudia López como alcaldesa de Bogotá?',
    opciones: [
      'No terminó su mandato por escándalo de corrupción',
      'Conflicto permanente con el Concejo de Bogotá que hundió su Plan de Desarrollo en primera instancia',
      'El metro de Bogotá fue cancelado definitivamente bajo su gestión',
      'Aumentó la deuda de Bogotá en un 200%',
    ],
    correcta: 1,
    fuente: 'Registros del Concejo de Bogotá, medios verificables 2020-2023',
    explicacion: 'Su mandato fue marcado por bloqueos frecuentes del Concejo, incluyendo el hundimiento del Plan de Desarrollo en primera instancia. Su estilo confrontacional generó coaliciones en su contra.',
  },
  {
    pregunta: '¿Qué candidato propone un modelo de "Colombia como potencia mundial agroalimentaria"?',
    opciones: [
      'Sergio Fajardo',
      'Paloma Valencia',
      'Claudia López',
      'Iván Cepeda',
    ],
    correcta: 3,
    fuente: 'Plan de gobierno Cepeda — pág. 109-117',
    explicacion: 'Cepeda propone un modelo económico basado en la economía rural, campesina y productiva como motor nacional, sustituyendo el extractivismo.',
  },
  {
    pregunta: '¿Cuál es la fórmula vicepresidencial de Iván Cepeda?',
    opciones: [
      'Francia Márquez',
      'Aída Quilcué',
      'Piedad Córdoba',
      'Irene Vélez',
    ],
    correcta: 1,
    fuente: 'Ficha candidato — datos oficiales campaña',
    explicacion: 'La fórmula vicepresidencial de Iván Cepeda es Aída Quilcué, lideresa indígena del pueblo Nasa.',
  },
]

export default function Quiz({ data }) {
  const [phase, setPhase] = useState('intro') // intro, playing, done
  const [currentQ, setCurrentQ] = useState(0)
  const [selected, setSelected] = useState(null)
  const [answered, setAnswered] = useState(false)
  const [score, setScore] = useState(0)
  const [answers, setAnswers] = useState([])

  const question = QUIZ_QUESTIONS[currentQ]
  const total = QUIZ_QUESTIONS.length

  const handleSelect = (idx) => {
    if (answered) return
    setSelected(idx)
    setAnswered(true)
    const isCorrect = idx === question.correcta
    if (isCorrect) setScore(s => s + 1)
    setAnswers(prev => [...prev, { isCorrect, selected: idx }])
  }

  const handleNext = () => {
    if (currentQ < total - 1) {
      setCurrentQ(q => q + 1)
      setSelected(null)
      setAnswered(false)
    } else {
      setPhase('done')
    }
  }

  const handleRestart = () => {
    setPhase('intro')
    setCurrentQ(0)
    setSelected(null)
    setAnswered(false)
    setScore(0)
    setAnswers([])
  }

  if (phase === 'intro') {
    return (
      <div className="fade-in">
        <div className="section-header">
          <div className="section-tag">Módulo 06 — Interactivo</div>
          <h2>¿Qué tanto sabes?</h2>
          <p>Preguntas sobre las propuestas reales de los candidatos antes de votar. Retroalimentación inmediata con fuente oficial.</p>
        </div>
        <div className="card" style={{ maxWidth: '600px', margin: '0 auto', padding: '40px', textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🧠</div>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', marginBottom: '12px' }}>Quiz Electoral 2026</h3>
          <p style={{ color: 'var(--gris)', marginBottom: '24px', lineHeight: '1.7' }}>
            {total} preguntas sobre las propuestas reales de los 5 candidatos. Si te equivocas, 
            verás la respuesta correcta y su fuente oficial. ¿Qué tan informado vas a votar?
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '24px' }}>
            <div style={{ padding: '12px 20px', background: 'var(--papel)', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontWeight: '700', fontSize: '1.3rem' }}>{total}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--gris)' }}>preguntas</div>
            </div>
            <div style={{ padding: '12px 20px', background: 'var(--papel)', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontWeight: '700', fontSize: '1.3rem' }}>5</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--gris)' }}>candidatos</div>
            </div>
            <div style={{ padding: '12px 20px', background: 'var(--papel)', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontWeight: '700', fontSize: '1.3rem' }}>~5min</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--gris)' }}>duración</div>
            </div>
          </div>
          <button className="btn btn-amarillo" style={{ width: '100%', justifyContent: 'center', padding: '14px' }} onClick={() => setPhase('playing')}>
            Empezar el quiz →
          </button>
        </div>
      </div>
    )
  }

  if (phase === 'done') {
    const pct = Math.round((score / total) * 100)
    let mensaje = ''
    if (pct >= 90) mensaje = '¡Excepcional! Estás muy bien informado.'
    else if (pct >= 70) mensaje = 'Bien informado. Conoces las propuestas principales.'
    else if (pct >= 50) mensaje = 'Medio camino. Hay propuestas que vale la pena revisar.'
    else mensaje = 'Hay mucho por descubrir. Explora los módulos informativos.'

    return (
      <div className="fade-in">
        <div className="section-header">
          <div className="section-tag">Resultado del quiz</div>
          <h2>Tu puntuación</h2>
        </div>
        <div className="card" style={{ maxWidth: '600px', margin: '0 auto', padding: '40px', textAlign: 'center' }}>
          <div style={{ fontSize: '4rem', fontFamily: 'var(--font-display)', fontWeight: '900', color: pct >= 70 ? '#2E7D32' : pct >= 50 ? '#F57F17' : 'var(--rojo)' }}>
            {score}/{total}
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '8px' }}>{pct}%</div>
          <p style={{ color: 'var(--gris)', marginBottom: '24px', lineHeight: '1.7' }}>{mensaje}</p>
          <div style={{ width: '100%', height: '12px', background: 'var(--gris-light)', borderRadius: '6px', marginBottom: '24px', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${pct}%`, background: pct >= 70 ? '#2E7D32' : pct >= 50 ? '#F57F17' : 'var(--rojo)', borderRadius: '6px', transition: 'width 1s ease' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '6px', marginBottom: '24px' }}>
            {answers.map((a, i) => (
              <div key={i} style={{
                height: '32px', borderRadius: '4px',
                background: a.isCorrect ? '#E8F5E9' : '#FFEBEE',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1rem'
              }}>
                {a.isCorrect ? '✓' : '✗'}
              </div>
            ))}
          </div>
          <button className="btn btn-amarillo" onClick={handleRestart} style={{ width: '100%', justifyContent: 'center' }}>
            Intentar de nuevo
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="fade-in">
      <div className="section-header">
        <div className="section-tag">Pregunta {currentQ + 1} de {total}</div>
        <div style={{ display: 'flex', gap: '4px', marginTop: '12px' }}>
          {QUIZ_QUESTIONS.map((_, i) => (
            <div key={i} style={{
              height: '4px', flex: 1, borderRadius: '2px',
              background: i < currentQ ? '#2E7D32' : i === currentQ ? 'var(--azul)' : 'var(--gris-light)',
              transition: 'background 0.3s'
            }} />
          ))}
        </div>
      </div>

      <div className="card" style={{ maxWidth: '700px', margin: '0 auto' }}>
        <div className="card-body" style={{ padding: '32px' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: '700', marginBottom: '28px', lineHeight: '1.4', color: 'var(--tinta)' }}>
            {question.pregunta}
          </h3>

          <div style={{ display: 'grid', gap: '10px', marginBottom: '24px' }}>
            {question.opciones.map((opcion, idx) => {
              let className = 'quiz-option'
              if (answered) {
                className += ' disabled'
                if (idx === question.correcta) className += ' show-correct'
                if (idx === selected && idx !== question.correcta) className += ' selected-wrong'
              }

              return (
                <button key={idx} className={className} onClick={() => handleSelect(idx)}>
                  <span style={{ fontWeight: '700', marginRight: '8px', color: 'var(--gris)' }}>
                    {String.fromCharCode(65 + idx)}.
                  </span>
                  {opcion}
                </button>
              )
            })}
          </div>

          {answered && (
            <div className="fade-in" style={{
              background: selected === question.correcta ? '#E8F5E9' : '#FFF3E0',
              border: `2px solid ${selected === question.correcta ? '#2E7D32' : '#F57F17'}`,
              borderRadius: '8px', padding: '16px 20px', marginBottom: '20px'
            }}>
              <div style={{ fontWeight: '700', marginBottom: '6px', color: selected === question.correcta ? '#2E7D32' : '#E07B00' }}>
                {selected === question.correcta ? '✓ ¡Correcto!' : `✗ La respuesta correcta es: "${question.opciones[question.correcta]}"`}
              </div>
              <p style={{ fontSize: '0.87rem', color: 'var(--tinta-suave)', lineHeight: '1.6', marginBottom: '8px' }}>
                {question.explicacion}
              </p>
              <div className="source">{question.fuente}</div>
            </div>
          )}

          {answered && (
            <button className="btn btn-primary fade-in" onClick={handleNext} style={{ width: '100%', justifyContent: 'center' }}>
              {currentQ < total - 1 ? 'Siguiente pregunta →' : 'Ver resultado final'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
