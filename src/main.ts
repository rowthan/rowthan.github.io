import './styles.css'
import { getToolUrl, tools } from './tools'

const app = document.querySelector<HTMLDivElement>('#app')

if (!app) throw new Error('Missing #app root')

const toolCards = tools.map((tool, index) => `
  <article class="tool-card">
    <div class="tool-card__topline">
      <span class="tool-card__number">${String(index + 1).padStart(2, '0')}</span>
      <span class="tool-card__status">可用</span>
    </div>
    <h2>${tool.name}</h2>
    <p>${tool.summary}</p>
    <ul class="tag-list" aria-label="标签">
      ${tool.tags.map((tag) => `<li>${tag}</li>`).join('')}
    </ul>
    <div class="tool-card__actions">
      <a class="primary-link" href="${getToolUrl(tool)}">打开工具 <span aria-hidden="true">↗</span></a>
      <a class="source-link" href="${tool.repository}" target="_blank" rel="noreferrer">查看源码</a>
    </div>
  </article>
`).join('')

app.innerHTML = `
  <header class="site-header">
    <a class="brandmark" href="/" aria-label="Markfor Tools 首页"><span>MF</span> Tools</a>
    <a class="github-link" href="https://github.com/rowthan" target="_blank" rel="noreferrer">GitHub ↗</a>
  </header>
  <main>
    <section class="hero">
      <p class="eyebrow">OPEN SOURCE · LOCAL FIRST</p>
      <h1>小而专注的<br /><span>浏览器工具。</span></h1>
      <p class="hero__summary">无需账号，不依赖后端。每个工具都拥有独立源码，并尽可能在你的浏览器本地完成处理。</p>
    </section>
    <section class="catalog" aria-labelledby="catalog-title">
      <div class="section-heading">
        <div>
          <p class="eyebrow">TOOL CATALOG</p>
          <h2 id="catalog-title">所有工具</h2>
        </div>
        <p>${tools.length} 个公开项目</p>
      </div>
      <div class="tool-grid">${toolCards || '<p class="empty-state">新的工具正在准备中。</p>'}</div>
    </section>
  </main>
  <footer>
    <p>由 Rowthan 制作 · 代码以 MIT 许可开源</p>
    <p>tools.markfor.me</p>
  </footer>
`
