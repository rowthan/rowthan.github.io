import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HomePage } from './HomePage'
import '../../styles.css'

const root = document.getElementById('root')

if (!root) throw new Error('Missing #root element')

createRoot(root).render(
  <StrictMode>
    <HomePage />
  </StrictMode>,
)
