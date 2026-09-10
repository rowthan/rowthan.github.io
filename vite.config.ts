import { readdirSync } from 'node:fs'
import { join, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

const projectRoot = fileURLToPath(new URL('.', import.meta.url))
const pagesRoot = resolve(projectRoot, 'src/pages')

function findPageEntries(directory: string): Record<string, string> {
  const entries: Record<string, string> = {}

  for (const item of readdirSync(directory, { withFileTypes: true })) {
    const itemPath = join(directory, item.name)

    if (item.isDirectory()) {
      Object.assign(entries, findPageEntries(itemPath))
    } else if (item.name === 'index.html') {
      const entryName = relative(pagesRoot, itemPath).replace(/\.html$/, '')
      entries[entryName] = itemPath
    }
  }

  return entries
}

export default defineConfig({
  root: pagesRoot,
  publicDir: resolve(projectRoot, 'public'),
  plugins: [react()],
  build: {
    outDir: resolve(projectRoot, 'dist'),
    emptyOutDir: true,
    rollupOptions: {
      input: findPageEntries(pagesRoot),
    },
  },
  test: {
    root: projectRoot,
    include: ['tests/**/*.test.ts'],
  },
})
