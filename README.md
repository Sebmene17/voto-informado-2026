# 🗳️ Voto Informado 2026

Aplicación web interactiva para comparar las propuestas de los 5 candidatos presidenciales de Colombia (primera vuelta: 31 de mayo de 2026).

## Módulos

| # | Módulo | Tipo |
|---|--------|------|
| 01 | Fichas de candidatos | Informativo |
| 02 | Comparador por eje | Informativo |
| 03 | En sus propias palabras | Informativo |
| 04 | Coincidencias sorprendentes | Informativo |
| 05 | Periodómetro (viabilidad) | Informativo |
| 06 | Quiz electoral | Interactivo |
| 07 | Test de afinidad | Interactivo |
| 08 | Sapos electorales | Interactivo |
| 09 | Promesas vs Realidad | Interactivo |
| 10 | Chat IA | Interactivo |

## Stack técnico

- **Frontend:** React + Vite → GitHub Pages
- **Backend:** Node.js + Express → Railway
- **IA:** Claude API (claude-sonnet-4-5)
- **Datos:** `src/data/data.json` (planes de gobierno)

## Instalación y desarrollo local

### Frontend
```bash
npm install
cp .env.example .env
npm run dev
```

### Backend
```bash
cd backend
npm install
export ANTHROPIC_API_KEY=tu_api_key_aqui
npm start
```

## Deploy

### GitHub Pages (frontend)
```bash
npm run build
# Sube la carpeta /dist a GitHub Pages
```

### Railway (backend)
1. Conecta el repo en Railway
2. Agrega variable de entorno: `ANTHROPIC_API_KEY`
3. Configura root directory: `backend`
4. Deploy automático

## Principios editoriales

- Sin publicidad ni patrocinadores
- Sin jerarquía por encuestas (orden alfabético)
- Sin editoriales: solo hechos verificables
- Toda la información proviene de planes de gobierno oficiales

---
*Versión 1.0 — Mayo 2026*
