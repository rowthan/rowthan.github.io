export type SkillEntry = {
  slug: string
  name: string
  summary: string
  problem: string
  problemHighlights: readonly string[]
  tags: readonly string[]
  behaviors: readonly {
    label: string
    icon: string
    description: string
  }[]
  numbering: string
  installPrompt: string
  sourceUrl: `https://github.com/${string}`
}

export const skills: readonly SkillEntry[] = [
  {
    slug: 'codex-traffic-light',
    name: 'Codex 红绿灯',
    summary: '用稳定编号和红绿灯状态前缀，让 Codex 任务列表一眼可读。',
    problem:
      '当任务越来越多，仅靠标题很难快速判断哪个任务正在思考、等待输入、执行中或已经完成。这个 skill 会在任务标题前维护稳定编号和状态图标，并在关键生命周期节点自动同步。',
    problemHighlights: ['稳定编号', '状态图标'],
    tags: ['任务管理', '状态同步', 'Codex'],
    behaviors: [
      { label: '思考中', icon: '🟡', description: '正在探索、阅读、分析或规划，尚未写入项目。' },
      { label: '等待中', icon: '🔴', description: '需要用户补充信息、确认或授权后才能继续。' },
      { label: '执行中', icon: '♻️', description: '已经开始项目写入或其他实质性执行。' },
      { label: '已完成', icon: '✅', description: '当前请求已完成并交付。' },
    ],
    numbering:
      '每个任务获得稳定的顺序编号：01–99 使用两位数字，从 100 开始自动扩展为三位。日常状态变化只更新图标，不改变任务编号。',
    installPrompt:
      '安装skill 到用户本地 https://tools.markfor.me/skills/codex-traffic-light/SKILL.md',
    sourceUrl:
      'https://github.com/rowthan/rowthan.github.io/blob/main/public/skills/codex-traffic-light/SKILL.md',
  },
]

export function getSkillPath(skill: SkillEntry) {
  return `/skills/${skill.slug}/`
}

export function findSkill(slug: string) {
  return skills.find((skill) => skill.slug === slug)
}
