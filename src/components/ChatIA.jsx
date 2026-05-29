import React from 'react'

export default function ChatIA({ data }) {
  return (
    <div className="fade-in">
      <div className="section-header">
        <div className="section-tag">Módulo 10 — Próximamente</div>
        <h2>Chat IA</h2>
        <p>Consulta en lenguaje natural las propuestas de los candidatos.</p>
      </div>

      <div style={{
        textAlign: 'center',
        padding: '64px 32px',
        background: 'var(--papel)',
        borderRadius: '12px',
        border: '2px dashed var(--gris-light)',
        maxWidth: '560px',
        margin: '0 auto',
      }}>
        <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🤖</div>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', marginBottom: '12px' }}>
          Módulo en construcción
        </h3>
        <p style={{ color: 'var(--gris)', lineHeight: '1.7', marginBottom: '24px' }}>
          El asistente de IA estará disponible próximamente. 
          Mientras tanto, puedes usar el <strong>Comparador</strong> y el 
          módulo <strong>En sus propias palabras</strong> para explorar 
          las propuestas en detalle.
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <span className="tag tag-eje">📋 Usa el Comparador</span>
          <span className="tag tag-eje">💬 En sus propias palabras</span>
          <span className="tag tag-eje">🧠 Haz el Quiz</span>
        </div>
      </div>
    </div>
  )
}
