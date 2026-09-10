import { describe, expect, it } from 'vitest'
import { tools } from '../src/config/tools'

describe('tool catalog', () => {
  it('has unique relative or absolute URLs and optional GitHub repositories', () => {
    const urls = tools.map((tool) => tool.url)
    expect(new Set(urls).size).toBe(urls.length)

    for (const tool of tools) {
      const url = new URL(tool.url, 'https://tools.markfor.me')
      expect(url.protocol).toMatch(/^https?:$/)
      if (tool.repository) {
        expect(tool.repository).toMatch(/^https:\/\/github\.com\//)
      }
    }
  })
})
