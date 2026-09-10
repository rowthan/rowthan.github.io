import { existsSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { getSkillPath, skills } from '../src/config/skills'

describe('skill catalog', () => {
  it('has unique URL-safe slugs and complete public metadata', () => {
    const slugs = skills.map((skill) => skill.slug)
    expect(new Set(slugs).size).toBe(slugs.length)

    for (const skill of skills) {
      expect(skill.slug).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
      expect(getSkillPath(skill)).toBe(`/skills/${skill.slug}/`)
      expect(skill.name.trim()).not.toBe('')
      expect(skill.summary.trim()).not.toBe('')
      expect(skill.problem.trim()).not.toBe('')
      expect(skill.tags.length).toBeGreaterThan(0)
      expect(skill.behaviors.find((behavior) => behavior.label === '执行中')?.icon).toBe('♻️')
      expect(skill.installPrompt).toBe(
        `安装skill 到用户本地 https://tools.markfor.me/skills/${skill.slug}/SKILL.md`,
      )
      expect(skill.sourceUrl).toMatch(/^https:\/\/github\.com\/rowthan\//)
    }
  })

  it('points every install command at a bundled skill', () => {
    for (const skill of skills) {
      expect(existsSync(`public/skills/${skill.slug}/SKILL.md`)).toBe(true)
      expect(existsSync(`public/skills/${skill.slug}/agents/openai.yaml`)).toBe(true)
      expect(skill.installPrompt).toContain(`/skills/${skill.slug}/SKILL.md`)
    }
  })
})
