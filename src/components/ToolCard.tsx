import type { ToolEntry } from '../config/tools'

export function ToolCard({ index, tool }: { index: number; tool: ToolEntry }) {
  const isExternal = /^https?:\/\//.test(tool.url)

  return (
    <article className="tool-card">
      <div className="tool-card__topline">
        <span className="tool-card__number">{String(index + 1).padStart(2, '0')}</span>
        <span className="tool-card__status">可用</span>
      </div>
      <h2>{tool.name}</h2>
      <p>{tool.summary}</p>
      <ul className="tag-list" aria-label="标签">
        {tool.tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
      <div className="tool-card__actions">
        <a
          className="primary-link"
          href={tool.url}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noreferrer' : undefined}
        >
          打开工具 <span aria-hidden="true">↗</span>
        </a>
        {tool.repository ? (
          <a className="source-link" href={tool.repository} target="_blank" rel="noreferrer">
            查看源码
          </a>
        ) : null}
      </div>
    </article>
  )
}
