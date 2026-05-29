import React, { useState } from 'react'

export default function Navbar({ modules, activeModule, onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <div className="navbar-logo" onClick={() => onNavigate('home')}>
          <div className="logo-flag">
            <div className="f1"></div>
            <div className="f2"></div>
            <div className="f3"></div>
          </div>
          <span>Voto <span>Informado</span> 2026</span>
        </div>
        <ul className="navbar-menu">
          {modules.map(m => (
            <li key={m.id}>
              <button
                className={`${m.interactive ? 'interactive-btn' : ''} ${activeModule === m.id ? 'active' : ''}`}
                onClick={() => onNavigate(m.id)}
              >
                {m.icon} {m.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
