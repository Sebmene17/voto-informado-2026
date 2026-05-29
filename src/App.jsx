import React, { useState } from 'react'
import data from './data/data.json'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Fichas from './components/Fichas.jsx'
import Comparador from './components/Comparador.jsx'
import EnSusPropiasPalabras from './components/EnSusPropiasPalabras.jsx'
import Coincidencias from './components/Coincidencias.jsx'
import Periodometro from './components/Periodometro.jsx'
import Quiz from './components/Quiz.jsx'
import TestAfinidad from './components/TestAfinidad.jsx'
import SaposElectorales from './components/SaposElectorales.jsx'
import PrometasRealidad from './components/PromesasRealidad.jsx'
import Footer from './components/Footer.jsx'

const MODULES = [
  { id: 'fichas', label: 'Candidatos', icon: '👤', interactive: false },
  { id: 'comparador', label: 'Comparador', icon: '⚖️', interactive: false },
  { id: 'palabras', label: 'Sus palabras', icon: '💬', interactive: false },
  { id: 'coincidencias', label: 'Coincidencias', icon: '🤝', interactive: false },
  { id: 'periodometro', label: 'Periodómetro', icon: '📊', interactive: false },
  { id: 'quiz', label: 'Quiz', icon: '🧠', interactive: true },
  { id: 'afinidad', label: 'Test afinidad', icon: '🎯', interactive: true },
  { id: 'sapos', label: 'Sapos electorales', icon: '🐸', interactive: true },
  { id: 'promesas', label: 'Promesas vs Realidad', icon: '🔍', interactive: true },
]

export default function App() {
  const [activeModule, setActiveModule] = useState('home')

  const renderModule = () => {
    switch(activeModule) {
      case 'fichas': return <Fichas data={data} navigate={setActiveModule} />
      case 'comparador': return <Comparador data={data} />
      case 'palabras': return <EnSusPropiasPalabras data={data} />
      case 'coincidencias': return <Coincidencias data={data} />
      case 'periodometro': return <Periodometro data={data} />
      case 'quiz': return <Quiz data={data} />
      case 'afinidad': return <TestAfinidad data={data} />
      case 'sapos': return <SaposElectorales data={data} />
      case 'promesas': return <PrometasRealidad data={data} />
      default: return <Hero modules={MODULES} onNavigate={setActiveModule} />
    }
  }

  return (
    <div className="app-container">
      <Navbar
        modules={MODULES}
        activeModule={activeModule}
        onNavigate={setActiveModule}
      />
      <main className={activeModule === 'home' ? '' : 'main-content fade-in'}>
        {renderModule()}
      </main>
      <Footer />
    </div>
  )
}
