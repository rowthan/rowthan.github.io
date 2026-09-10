import type { ReactNode } from 'react'
import { PageLayout } from '../../../components/PageLayout'
import { findSkill, type SkillEntry } from '../../../config/skills'

function highlightProblem(skill: SkillEntry): ReactNode[] {
  const nodes: ReactNode[] = []
  let cursor = 0

  for (const highlight of skill.problemHighlights) {
    const index = skill.problem.indexOf(highlight, cursor)
    if (index === -1) continue

    nodes.push(skill.problem.slice(cursor, index))
    nodes.push(
      <span className="text-highlight" key={highlight}>
        {highlight}
      </span>,
    )
    cursor = index + highlight.length
  }

  nodes.push(skill.problem.slice(cursor))
  return nodes
}

export function CodexTrafficLightPage() {
  const skill = findSkill('codex-traffic-light')

  if (!skill) throw new Error('Missing codex-traffic-light skill')

  const [productName, ...localizedNameParts] = skill.name.split(' ')
  const localizedName = localizedNameParts.join(' ')

  return (
    <PageLayout active="skills">
      <main className="skill-detail">
        <nav className="breadcrumb" aria-label="面包屑">
          <a href="/skills/">Skills</a>
          <span>/</span>
          <span>{skill.slug}</span>
        </nav>
        <section className="detail-hero">
          <div className="detail-hero__copy">
            <p className="eyebrow">CODEX SKILL</p>
            <h1>
              <span>{productName}</span>
              {localizedName ? <span>{localizedName}</span> : null}
            </h1>
            <p>{skill.summary}</p>
          </div>
          <figure className="detail-hero__visual">
            <img
              src="/assets/og-codex-traffic-light.png"
              alt="Codex 任务标题通过稳定编号和状态图标展示当前进度"
              width="1536"
              height="1024"
              fetchPriority="high"
            />
          </figure>
        </section>
        <div className="detail-layout">
          <article className="detail-content">
            <section aria-labelledby="problem-title">
              <p className="section-index">01</p>
              <h2 id="problem-title">它解决什么问题</h2>
              <p className="detail-lead">{highlightProblem(skill)}</p>
            </section>
            <section aria-labelledby="behavior-title">
              <p className="section-index">02</p>
              <h2 id="behavior-title">状态如何工作</h2>
              <ul className="behavior-grid">
                {skill.behaviors.map((behavior) => (
                  <li className="behavior-card" key={behavior.label}>
                    <span className="behavior-card__icon" aria-hidden="true">
                      {behavior.icon}
                    </span>
                    <div>
                      <strong>{behavior.label}</strong>
                      <p>{behavior.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="numbering-note">
                <strong>稳定编号</strong>
                <p>{skill.numbering}</p>
              </div>
            </section>
            <section aria-labelledby="install-title">
              <p className="section-index">03</p>
              <h2 id="install-title">安装</h2>
              <p className="detail-lead">把以下这段话发给 AI Agent 安装：</p>
              <pre className="install-command" aria-label="发送给 AI Agent 的安装指令">
                <code>{skill.installPrompt}</code>
              </pre>
            </section>
          </article>
          <aside className="skill-aside">
            <p className="eyebrow">DETAILS</p>
            <dl>
              <div>
                <dt>格式</dt>
                <dd>Codex Skill</dd>
              </div>
              <div>
                <dt>安装位置</dt>
                <dd>~/.codex/skills</dd>
              </div>
              <div>
                <dt>状态</dt>
                <dd>可用</dd>
              </div>
            </dl>
            <a
              className="source-link aside-link"
              href={skill.sourceUrl}
              target="_blank"
              rel="noreferrer"
            >
              在 GitHub 查看 SKILL.md ↗
            </a>
          </aside>
        </div>
      </main>
    </PageLayout>
  )
}
