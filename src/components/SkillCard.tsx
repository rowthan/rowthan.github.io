import { getSkillPath, type SkillEntry } from '../config/skills'

export function SkillCard({ index, skill }: { index: number; skill: SkillEntry }) {
  return (
    <article className="tool-card skill-card">
      <div className="tool-card__topline">
        <span className="tool-card__number">{String(index + 1).padStart(2, '0')}</span>
        <span className="tool-card__status">SKILL</span>
      </div>
      <h2>{skill.name}</h2>
      <p>{skill.summary}</p>
      <ul className="tag-list" aria-label="标签">
        {skill.tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
      <div className="tool-card__actions">
        <a className="primary-link" href={getSkillPath(skill)}>
          了解与安装 <span aria-hidden="true">→</span>
        </a>
      </div>
    </article>
  )
}
