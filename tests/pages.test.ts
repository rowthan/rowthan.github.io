import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const pageEntries = [
  ['src/pages/index.html', './home/main.tsx'],
  ['src/pages/skills/index.html', './main.tsx'],
  ['src/pages/skills/codex-traffic-light/index.html', './main.tsx'],
] as const

describe('multi-page entries', () => {
  it.each(pageEntries)('%s loads its own page entry', (htmlPath, scriptPath) => {
    const html = readFileSync(htmlPath, 'utf8')

    expect(html).toContain(`<script type="module" src="${scriptPath}"></script>`)
    expect(html).not.toContain('/src/main.ts')
    expect(html).not.toContain('<div id="app"></div>')
  })
})
