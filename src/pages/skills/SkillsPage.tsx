import { PageLayout } from '../../components/PageLayout'
import { SkillCard } from '../../components/SkillCard'
import { skills } from '../../config/skills'

export function SkillsPage() {
  return (
    <PageLayout active="skills">
      <main>
        <section className="hero skills-hero">
          <p className="eyebrow">CODEX SKILLS</p>
          <h1>
            把工作方式
            <br />
            <span>交给 Codex。</span>
          </h1>
          <p className="hero__summary">
            这些可复用的 skills 将一套明确的工作规则交给 Codex，安装后即可在日常任务中使用。
          </p>
        </section>
        <section className="catalog" aria-labelledby="skills-title">
          <div className="section-heading">
            <div>
              <p className="eyebrow">SKILL CATALOG</p>
              <h2 id="skills-title">所有 Skills</h2>
            </div>
            <p>{skills.length} 个可用 skill</p>
          </div>
          <div className="tool-grid">
            {skills.length ? (
              skills.map((skill, index) => (
                <SkillCard key={skill.slug} index={index} skill={skill} />
              ))
            ) : (
              <p className="empty-state">新的 skill 正在准备中。</p>
            )}
          </div>
        </section>
      </main>
    </PageLayout>
  )
}
