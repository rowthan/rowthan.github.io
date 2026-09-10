import type { ReactNode } from 'react'

export type SiteSection = 'tools' | 'skills'

export function PageLayout({ active, children }: { active: SiteSection; children: ReactNode }) {
  return (
    <>
      <header className="site-header">
        <a className="brandmark" href="/" aria-label="Markfor Tools 首页">
          <span>MF</span> Tools
        </a>
        <nav className="site-nav" aria-label="主导航">
          <a href="/" aria-current={active === 'tools' ? 'page' : undefined}>
            工具
          </a>
          <a href="/skills/" aria-current={active === 'skills' ? 'page' : undefined}>
            Skills
          </a>
          <a href="https://github.com/rowthan" target="_blank" rel="noreferrer">
            GitHub ↗
          </a>
        </nav>
      </header>
      {children}
      <footer>
        <p>由 Rowthan 制作 · 代码以 MIT 许可开源</p>
        <p>tools.markfor.me</p>
      </footer>
    </>
  )
}
