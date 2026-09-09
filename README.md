# Markfor Tools

`tools.markfor.me` 的公开工具目录。每个工具拥有独立仓库和 GitHub Pages 部署，并通过仓库名共享一级路径。

在线访问：<https://tools.markfor.me/>

## 添加工具

在 `src/tools.ts` 中增加一个通过 `ToolEntry` 校验的条目。`slug` 必须与工具仓库名及 GitHub Pages 一级路径一致。

```ts
{
  slug: 'image-metadata',
  name: '图片 Metadata',
  summary: '在浏览器本地读取、编辑并写入图片 XMP 元数据。',
  tags: ['XMP', '隐私', '图片'],
  repository: 'https://github.com/rowthan/image-metadata',
}
```

## 开发

```sh
npm install
npm run dev
npm run check
```

## License

[MIT](./LICENSE)
