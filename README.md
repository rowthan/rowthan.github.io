# Markfor Tools

`tools.markfor.me` 的工具目录。工具可以使用站内相对链接，也可以指向独立产品网站；开源工具还可以附带 GitHub 仓库地址。

在线访问：<https://tools.markfor.me/>

## 添加工具

在 `src/config/tools.ts` 中增加一个 `ToolEntry` 条目。`url` 支持相对链接和绝对链接，`repository` 为可选的 GitHub 地址。

```ts
{
  url: '/image-metadata/',
  name: '图片 Metadata',
  summary: '在浏览器本地读取、编辑并写入图片 XMP 元数据。',
  tags: ['XMP', '隐私', '图片'],
  repository: 'https://github.com/rowthan/image-metadata',
}
```

## 添加 Codex Skill

将可公开分发的 skill 原始文件放入 `public/skills/<slug>/`，再在 `src/config/skills.ts` 中添加对应的 `SkillEntry`。列表页位于 `/skills/`，详情页使用 `/skills/<slug>/` 路径。

每个条目需提供 skill 解决的问题、主要行为、标签、安装命令和 GitHub 源码链接。新增 Skill 详情页时，在 `src/pages/skills/<slug>/` 中创建 `index.html`、`main.tsx` 和对应的页面组件。Vite 会自动发现这个 HTML 入口，无需手动维护页面列表。

其他新增页面也采用相同模式：`/about/` 对应 `src/pages/about/index.html`、`main.tsx` 和 `AboutPage.tsx`。可复用界面放在 `src/components/`，站点数据放在 `src/config/`，每个 HTML 只加载自己的 TSX 入口。

## 开发

```sh
npm install
npm run dev
npm run check
```

## License

[MIT](./LICENSE)
