import { PageLayout } from '../../components/PageLayout'
import { ToolCard } from '../../components/ToolCard'
import { tools } from '../../config/tools'

export function HomePage() {
  return (
    <PageLayout active="tools">
      <main>
        <section className="hero">
          <p className="eyebrow">OPEN SOURCE · LOCAL FIRST</p>
          <h1>
            小而专注的
            <br />
            <span>浏览器工具。</span>
          </h1>
          <p className="hero__summary">
            无需账号，不依赖后端。每个工具都拥有独立源码，并尽可能在你的浏览器本地完成处理。
          </p>
        </section>
        <section className="catalog" aria-labelledby="catalog-title">
          <div className="section-heading">
            <div>
              <p className="eyebrow">TOOL CATALOG</p>
              <h2 id="catalog-title">所有工具</h2>
            </div>
            <p>{tools.length} 个可用工具</p>
          </div>
          <div className="tool-grid">
            {tools.length ? (
              tools.map((tool, index) => <ToolCard key={tool.url} index={index} tool={tool} />)
            ) : (
              <p className="empty-state">新的工具正在准备中。</p>
            )}
          </div>
        </section>
      </main>
    </PageLayout>
  )
}
