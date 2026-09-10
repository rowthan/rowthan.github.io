import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { CodexTrafficLightPage } from './CodexTrafficLightPage'
import '../../../styles.css'

const root = document.getElementById('root')

if (!root) throw new Error('Missing #root element')

createRoot(root).render(
  <StrictMode>
    <CodexTrafficLightPage />
  </StrictMode>,
)
