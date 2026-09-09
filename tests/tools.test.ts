import { describe, expect, it } from 'vitest'
import { getToolUrl, tools } from '../src/tools'

describe('tool catalog', () => {
  it('has unique URL-safe slugs and valid repositories', () => {
    const slugs = tools.map((tool) => tool.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
    for (const tool of tools) {
      expect(tool.slug).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
      expect(tool.repository).toMatch(/^https:\/\/github\.com\/rowthan\//)
      expect(getToolUrl(tool)).toBe(`/${tool.slug}/`)
    }
  })
})
